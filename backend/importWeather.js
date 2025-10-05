import fetch from "node-fetch";
import mongoose from "mongoose";
import { transformFlatToNested } from "./src/utils/transform.js";
import { upsertWeatherData } from "./src/utils/merge.js";

const variables = [
  "T2M_MAX",
  "T2M_MIN",
  "T2M_RANGE",
  "WS10M",
  "WD10M",
  "PRECTOTCORR",
  "RH2M",
  "T2MDEW",
  "ALLSKY_SFC_SW_DWN",
  "ALLSKY_SFC_UV_INDEX",
  "AOD_55",
];

const startYear = 1995;
const endYear = 2023;

async function fetchDataForLatLng(lat, lon) {
  const results = [];

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(year, month, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}${String(month).padStart(2, "0")}${String(
          day
        ).padStart(2, "0")}`;
        const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${variables.join(
          ","
        )}&community=AG&longitude=${lon}&latitude=${lat}&start=${dateStr}&end=${dateStr}&format=JSON`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const values = data?.properties?.parameter || {};

          const record = {
            date: `${year}-${String(month).padStart(2, "0")}-${String(
              day
            ).padStart(2, "0")}`,
            lat,
            lon,
          };

          for (const varName of variables) {
            record[varName] = values[varName]?.[dateStr] ?? null;
          }

          results.push(record);
          console.log(
            `✅ Retrieved data for ${record.date}, lat=${lat}, lon=${lon}`
          );
          await new Promise((r) => setTimeout(r, 500)); // avoid hammering API
        } catch (err) {
          console.error(`❌ Failed for ${year}-${month}-${day}`, err);
        }
      }
    }
  }

  return results;
}

async function main() {
  await mongoose.connect("mongodb://localhost:27017/weather_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");

  const latResults = [];
  const lat = 12;
  const lon = 77;

  console.log(`\n🌍 Fetching data for lat=${lat}, lon=${lon}...`);
  const data = await fetchDataForLatLng(lat, lon);
  latResults.push(...data);

  console.log(`\n📦 Transforming and storing data for lat=${lat}...`);
  const nestedData = transformFlatToNested(latResults);
  await upsertWeatherData(nestedData);
  console.log(`✅ Stored all data for lat=${lat} in DB`);

  console.log("🎉 Automation complete!");
  mongoose.connection.close();
}

main();

import express from "express";
const router = express.Router();
import WeatherData from "../models/Weather.js";
import fetch from "node-fetch";
import { transformFlatToNested } from "../utils/transform.js";
import { upsertWeatherData } from "../utils/merge.js";

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

router.get("/historical", async (req, res) => {
  try {
    const { lat, lng, type, value } = req.query;
    console.log(lat, lng, type, value);

    if (!lat || !lng || !type || !value) {
      return res.status(400).json({ error: "Missing query parameters" });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const existingData = await WeatherData.findOne({
      lat: latitude,
      lng: longitude,
    });

    const startYear = 1995;
    const endYear = 2024;

    let monthMissing = false;

    if (!existingData) {
      monthMissing = true;
      console.log("⚡ No data for location — fetching from NASA...");
    } else {
      if (type === "month") {
        const monthNum = parseInt(value);
        monthMissing = !existingData.weatherData.some((wd) =>
          wd.months.some((m) => m.month === monthNum)
        );
      } else if (type === "season") {
        const seasonMonths = {
          winter: [12, 1, 2],
          spring: [3, 4, 5],
          summer: [6, 7, 8],
          autumn: [9, 10, 11],
        };
        const months = seasonMonths[value.toLowerCase()] || [];
        monthMissing = !months.every((monthNum) =>
          existingData.weatherData.some((wd) =>
            wd.months.some((m) => m.month === monthNum)
          )
        );
      }
    }

    if (monthMissing) {
      console.log("⚡ Missing month(s) for location — fetching from NASA...");
      await fetchAndStoreMonthData(
        latitude,
        longitude,
        type,
        value,
        startYear,
        endYear
      );
    }

    // Step 2: Aggregation
    let data;

    if (type === "month") {
      const monthNum = parseInt(value);
      console.log(type);

      data = await WeatherData.aggregate([
        { $match: { lat: latitude, lng: longitude } },
        { $unwind: "$weatherData" },
        { $unwind: "$weatherData.months" },
        { $match: { "weatherData.months.month": monthNum } },
        { $unwind: "$weatherData.months.days" },
        {
          $project: {
            _id: 0,
            year: "$weatherData.year",
            date: "$weatherData.months.days.date",
            temp: "$weatherData.months.days.T2M_MAX",
            rain: "$weatherData.months.days.PRECTOTCORR",
            T2M_MAX: "$weatherData.months.days.T2M_MAX",
            T2M_MIN: "$weatherData.months.days.T2M_MIN",
            T2M_RANGE: "$weatherData.months.days.T2M_RANGE",
            WS10M: "$weatherData.months.days.WS10M",
            WD10M: "$weatherData.months.days.WD10M",
            PRECTOTCORR: "$weatherData.months.days.PRECTOTCORR",
            RH2M: "$weatherData.months.days.RH2M",
            T2MDEW: "$weatherData.months.days.T2MDEW",
            ALLSKY_SFC_SW_DWN: "$weatherData.months.days.ALLSKY_SFC_SW_DWN",
            ALLSKY_SFC_UV_INDEX: "$weatherData.months.days.ALLSKY_SFC_UV_INDEX",
            AOD_55: "$weatherData.months.days.AOD_55",
          },
        },
        { $sort: { year: 1, date: 1 } },
      ]);
    } else if (type === "season") {
      const seasonMonths = {
        winter: [12, 1, 2],
        spring: [3, 4, 5],
        summer: [6, 7, 8],
        autumn: [9, 10, 11],
      };
      const months = seasonMonths[value.toLowerCase()];
      if (!months) {
        return res.status(400).json({ error: "Invalid season value" });
      }

      data = await WeatherData.aggregate([
        { $match: { lat: latitude, lng: longitude } },
        { $unwind: "$weatherData" },
        { $unwind: "$weatherData.months" },
        { $match: { "weatherData.months.month": { $in: months } } },
        { $unwind: "$weatherData.months.days" },
        {
          $group: {
            _id: "$weatherData.year",
            avgTemp: { $avg: "$weatherData.months.days.T2M_MAX" },
            avgRain: { $avg: "$weatherData.months.days.PRECTOTCORR" },
            avgT2M_MAX: { $avg: "$weatherData.months.days.T2M_MAX" },
            avgT2M_MIN: { $avg: "$weatherData.months.days.T2M_MIN" },
            avgT2M_RANGE: { $avg: "$weatherData.months.days.T2M_RANGE" },
            avgWS10M: { $avg: "$weatherData.months.days.WS10M" },
            avgWD10M: { $avg: "$weatherData.months.days.WD10M" },
            avgPRECTOTCORR: { $avg: "$weatherData.months.days.PRECTOTCORR" },
            avgRH2M: { $avg: "$weatherData.months.days.RH2M" },
            avgT2MDEW: { $avg: "$weatherData.months.days.T2MDEW" },
            avgALLSKY_SFC_SW_DWN: {
              $avg: "$weatherData.months.days.ALLSKY_SFC_SW_DWN",
            },
            avgALLSKY_SFC_UV_INDEX: {
              $avg: "$weatherData.months.days.ALLSKY_SFC_UV_INDEX",
            },
            avgAOD_55: { $avg: "$weatherData.months.days.AOD_55" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id",
            temp: "$avgTemp",
            rain: "$avgRain",
            T2M_MAX: "$avgT2M_MAX",
            T2M_MIN: "$avgT2M_MIN",
            T2M_RANGE: "$avgT2M_RANGE",
            WS10M: "$avgWS10M",
            WD10M: "$avgWD10M",
            PRECTOTCORR: "$avgPRECTOTCORR",
            RH2M: "$avgRH2M",
            T2MDEW: "$avgT2MDEW",
            ALLSKY_SFC_SW_DWN: "$avgALLSKY_SFC_SW_DWN",
            ALLSKY_SFC_UV_INDEX: "$avgALLSKY_SFC_UV_INDEX",
            AOD_55: "$avgAOD_55",
          },
        },
        { $sort: { year: 1 } },
      ]);
    } else {
      return res.status(400).json({ error: "Invalid type parameter" });
    }

    console.log(data);
    return res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

async function fetchAndStoreMonthData(
  lat,
  lng,
  type,
  value,
  startYear,
  endYear
) {
  const results = [];

  const monthsToFetch = [];
  if (type === "month") {
    monthsToFetch.push(parseInt(value));
  } else if (type === "season") {
    const seasonMonths = {
      winter: [12, 1, 2],
      spring: [3, 4, 5],
      summer: [6, 7, 8],
      autumn: [9, 10, 11],
    };
    monthsToFetch.push(...(seasonMonths[value.toLowerCase()] || []));
  }

  for (let year = startYear; year <= endYear; year++) {
    for (let month of monthsToFetch) {
      const mm = String(month).padStart(2, "0");
      const sampleDays = [5]; // Sample day

      for (let day of sampleDays) {
        const dd = String(day).padStart(2, "0");
        const dateStr = `${year}${mm}${dd}`;

        const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${variables.join(
          ","
        )}&community=AG&longitude=${lng}&latitude=${lat}&start=${dateStr}&end=${dateStr}&format=JSON`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          const values = data?.properties?.parameter || {};
          console.log("PRECTOTCORR", values["PRECTOTCORR"], dateStr);

          const record = {
            date: `${year}-${mm}-${dd}`,
            lat: lat,
            lon: lng,
          };

          for (const varName of variables) {
            record[varName] = values[varName]?.[dateStr] ?? null;
          }

          results.push(record);
          await new Promise((r) => setTimeout(r, 200));
        } catch (err) {
          console.error(`❌ Failed for ${year}-${mm}-${dd}`, err);
        }
      }
    }
  }

  const nestedData = transformFlatToNested(results);
  await upsertWeatherData(nestedData);
  console.log("📦 Missing months data stored in DB");
}

export default router;

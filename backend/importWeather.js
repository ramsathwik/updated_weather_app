import mongoose from "mongoose";
import fs from "fs";
import { transformFlatToNested } from "./src/utils/transform.js";
import { upsertWeatherData } from "./src/utils/merge.js";

mongoose
  .connect("mongodb://localhost:27017/weather_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

async function importJSON(filePath) {
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);

  const nestedData = transformFlatToNested(jsonData);
  await upsertWeatherData(nestedData);

  console.log("Import complete!");
  mongoose.connection.close();
}

importJSON("./weatherData.json");

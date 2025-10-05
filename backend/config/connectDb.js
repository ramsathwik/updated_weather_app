import mongoose from "mongoose";
import logger from "./logger.js";
async function mongoConnect() {
  await mongoose.connect("mongodb://localhost:27017/weather_db");
  logger.info("connected to db");
}
export default mongoConnect;

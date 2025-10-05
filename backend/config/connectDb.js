import mongoose from "mongoose";
import logger from "./logger.js";
async function mongoConnect() {
  await mongoose.connect(
    "mongodb+srv://root:root@coding.pjiw4gp.mongodb.net/weather_db"
  );
  logger.info("connected to db");
}
export default mongoConnect;

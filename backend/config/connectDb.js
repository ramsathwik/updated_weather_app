import mongoose from "mongoose";
import logger from "./logger.js";
async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URI);
  logger.info("connected to db");
}
export default mongoConnect;

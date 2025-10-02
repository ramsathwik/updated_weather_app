import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

//custom
import logger from "./config/logger.js";

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`server is running at http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./config/logger.js";
import router from "./src/routes/historicRouter.js";
import searchRouter from "./src/routes/searchRouter.js";
import mongoConnect from "./config/connectDb.js";

dotenv.config();

const app = express();
app.use(cors());

app.use("/search", searchRouter);

app.use("/analyze", router);

const PORT = process.env.PORT;
mongoConnect().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
});

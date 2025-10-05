import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./config/logger.js";
import router from "./src/routes/historicRouter.js";
import searchRouter from "./src/routes/searchRouter.js";
import mongoConnect from "./config/connectDb.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());

app.use("/search", searchRouter);

app.use("/analyze", router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT;
mongoConnect().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
});

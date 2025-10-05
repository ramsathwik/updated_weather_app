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

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3000;

mongoConnect().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
});

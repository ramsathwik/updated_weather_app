import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./config/logger.js";

dotenv.config();

const app = express();
app.use(cors());

app.use("/", async (req, res) => {
  let text = req.query.text;
  let controller = new AbortController();
  let signal = controller.signal;
  req.on("close", () => {
    controller.abort();
    console.log("conncetion disconnected");
  });
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&apiKey=${process.env.SEARCH_API_KEY}&filter=countrycode:in&limit=5`,
      { signal }
    );
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch was aborted due to client disconnect.");
      return;
    }
    logger.error("Error:", err);
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    }
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});

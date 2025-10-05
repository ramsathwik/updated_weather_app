import express from "express";
const searchRouter = express.Router();
searchRouter.get("/", async (req, res) => {
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
export default searchRouter;

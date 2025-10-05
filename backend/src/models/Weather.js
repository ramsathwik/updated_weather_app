import mongoose from "mongoose";

const daySchema = new mongoose.Schema(
  {
    date: String, // Example: "2024-03-01"
    T2M_MAX: Number,
    T2M_MIN: Number,
    T2M_RANGE: Number,
    WS10M: Number,
    WD10M: Number,
    PRECTOTCORR: Number,
    RH2M: Number,
    T2MDEW: Number,
    ALLSKY_SFC_SW_DWN: Number,
    ALLSKY_SFC_UV_INDEX: Number,
    AOD_55: Number,
  },
  { _id: false }
);

const monthSchema = new mongoose.Schema(
  {
    month: Number, // 1–12
    days: [daySchema], // 👈 now includes days array
  },
  { _id: false }
);

const yearSchema = new mongoose.Schema(
  {
    year: Number,
    months: [monthSchema],
  },
  { _id: false }
);

const weatherSchema = new mongoose.Schema(
  {
    lat: Number,
    lng: Number,
    weatherData: [yearSchema],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // optional: adds createdAt and updatedAt
);

const Weather = mongoose.model("Weather", weatherSchema);
export default Weather;

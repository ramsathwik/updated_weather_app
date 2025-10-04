import mongoose from "mongoose";

const monthSchema = new mongoose.Schema(
  {
    month: Number,
    T2M_MAX: Number,
    T2M_MIN: Number,
    T2M_RANGE: Number,
    WS10M: Number,
    WD10M: Number,
    PRECTOT: Number,
    RH2M: Number,
    T2MDEW: Number,
    ALLSKY_SFC_SW_DWN: Number,
    ALLSKY_SFC_UV_INDEX: Number,
    AOD_55: Number,
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

const weatherSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  weatherData: [yearSchema],
});

export const Weather = mongoose.model("Weather", weatherSchema);

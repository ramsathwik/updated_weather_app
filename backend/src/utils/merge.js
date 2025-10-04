import { Weather } from "../models/Weather.js";

export async function upsertWeatherData(nestedData) {
  for (let data of nestedData) {
    const { lat, lng, weatherData } = data;

    let existing = await Weather.findOne({ lat, lng });

    if (!existing) {
      await Weather.create(data);
      console.log(`Added new location: lat=${lat}, lng=${lng}`);
      continue;
    }

    for (let yearData of weatherData) {
      let yearIndex = existing.weatherData.findIndex(
        (y) => y.year === yearData.year
      );

      if (yearIndex === -1) {
        existing.weatherData.push(yearData);
      } else {
        for (let monthData of yearData.months) {
          let monthIndex = existing.weatherData[yearIndex].months.findIndex(
            (m) => m.month === monthData.month
          );
          if (monthIndex === -1) {
            existing.weatherData[yearIndex].months.push(monthData);
          } else {
            existing.weatherData[yearIndex].months[monthIndex] = {
              ...existing.weatherData[yearIndex].months[monthIndex],
              ...monthData,
            };
          }
        }
      }
    }

    existing.updatedAt = new Date();
    await existing.save();
    console.log(`Updated location: lat=${lat}, lng=${lng}`);
  }
}

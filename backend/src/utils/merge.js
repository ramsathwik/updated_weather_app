import Weather from "../models/Weather.js";

export async function upsertWeatherData(nestedData) {
  for (let data of nestedData) {
    const { lat, lng, weatherData } = data;

    let existing = await Weather.findOne({ lat, lng });

    if (!existing) {
      const formattedWeatherData = weatherData.map((yearData) => ({
        year: yearData.year,
        months: yearData.months.map((m) => ({
          month: m.month,
          days: [
            {
              date: m.date, // ✅ keep real date
              ...m,
            },
          ],
        })),
      }));

      await Weather.create({ lat, lng, weatherData: formattedWeatherData });
      console.log(`✅ Added new location: lat=${lat}, lng=${lng}`);
      continue;
    }

    for (let yearData of weatherData) {
      let yearIndex = existing.weatherData.findIndex(
        (y) => y.year === yearData.year
      );

      if (yearIndex === -1) {
        existing.weatherData.push({
          year: yearData.year,
          months: yearData.months.map((m) => ({
            month: m.month,
            days: [
              {
                date: m.date, // ✅ keep real date
                ...m,
              },
            ],
          })),
        });
        continue;
      }

      for (let monthData of yearData.months) {
        let monthIndex = existing.weatherData[yearIndex].months.findIndex(
          (m) => m.month === monthData.month
        );

        if (monthIndex === -1) {
          existing.weatherData[yearIndex].months.push({
            month: monthData.month,
            days: [
              {
                date: monthData.date, // ✅ keep real date
                ...monthData,
              },
            ],
          });
          continue;
        }

        let monthEntry = existing.weatherData[yearIndex].months[monthIndex];

        if (!monthEntry.days) monthEntry.days = [];

        let dayIndex = monthEntry.days.findIndex(
          (d) => d.date === monthData.date
        );

        if (dayIndex === -1) {
          monthEntry.days.push({
            date: monthData.date, // ✅ keep real date
            ...monthData,
          });
        } else {
          monthEntry.days[dayIndex] = {
            ...monthEntry.days[dayIndex],
            ...monthData,
          };
        }
      }
    }

    existing.updatedAt = new Date();
    await existing.save();
    console.log(`🔄 Updated location: lat=${lat}, lng=${lng}`);
  }
}

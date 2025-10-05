// export function transformFlatToNested(data) {
//   const result = {};

//   for (let record of data) {
//     const { lat, lon, date, ...rest } = record;

//     const dt = new Date(date);
//     const year = dt.getFullYear();
//     const month = dt.getMonth() + 1;

//     const locationKey = `${lat}_${lon}`;
//     if (!result[locationKey]) {
//       result[locationKey] = {
//         lat,
//         lng: lon,
//         weatherData: {},
//       };
//     }

//     if (!result[locationKey].weatherData[year]) {
//       result[locationKey].weatherData[year] = [];
//     }

//     result[locationKey].weatherData[year].push({
//       month,
//       ...rest,
//     });
//   }

//   const finalDocs = [];
//   for (let locKey in result) {
//     const { lat, lng } = result[locKey];
//     const weatherData = [];

//     for (let year in result[locKey].weatherData) {
//       // ✅ use locKey here
//       weatherData.push({
//         year: parseInt(year),
//         months: result[locKey].weatherData[year], // ✅ fixed
//       });
//     }

//     finalDocs.push({
//       lat,
//       lng,
//       weatherData,
//     });
//   }

//   return finalDocs;
// }
export function transformFlatToNested(data) {
  const result = {};

  for (let record of data) {
    const { lat, lon, date, ...rest } = record;

    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = dt.getMonth() + 1;

    const locationKey = `${lat}_${lon}`;
    if (!result[locationKey]) {
      result[locationKey] = {
        lat,
        lng: lon,
        weatherData: {},
      };
    }

    if (!result[locationKey].weatherData[year]) {
      result[locationKey].weatherData[year] = [];
    }

    result[locationKey].weatherData[year].push({
      month,
      date, // ✅ keep the real date
      ...rest,
    });
  }

  const finalDocs = [];
  for (let locKey in result) {
    const { lat, lng } = result[locKey];
    const weatherData = [];

    for (let year in result[locKey].weatherData) {
      weatherData.push({
        year: parseInt(year),
        months: result[locKey].weatherData[year], // raw daily data per month
      });
    }

    finalDocs.push({
      lat,
      lng,
      weatherData,
    });
  }

  return finalDocs;
}

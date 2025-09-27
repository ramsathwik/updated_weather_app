export default function Location() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        let { latitude, longitude } = position.coords;
        resolve([latitude, longitude]);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

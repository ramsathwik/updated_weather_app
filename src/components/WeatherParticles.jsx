import Particles from "react-tsparticles";

export default function WeatherParticles() {
  return (
    <Particles
      className="absolute inset-0 -z-10"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: ["circle", "image"], image: [
            { src: "/sun.png", width: 20, height: 20 },
            { src: "/cloud.jpg", width: 30, height: 20 },
            { src: "/raindrop.webp", width: 10, height: 20 }
          ] },
          opacity: { value: 0.8 },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 0.5, random: true, outModes: "out" }
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
          modes: { repulse: { distance: 100 }, push: { quantity: 4 } }
        },
        detectRetina: true,
      }}
    />
  );
}

// src/components/Bird.jsx
export default function Bird({ size = 24, top = 50, speed = "flyCurve" }) {
  return (
    <div
      className={`absolute bg-black/80 rotate-45 rounded-sm animate-${speed}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `-10%`,
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      }}
    ></div>
  );
}

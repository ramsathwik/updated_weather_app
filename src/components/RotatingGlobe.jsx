// src/components/RotatingGlobe.jsx
import { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

export default function RotatingGlobe() {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();

      // Auto-rotate
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.2;

      // Allow manual rotation and zoom
      controls.enableRotate = true;
      controls.enableZoom = true;
      controls.enablePan = false;

      // Pause auto-rotate while dragging
      const onStart = () => (controls.autoRotate = false);
      const onEnd = () => (controls.autoRotate = true);

      controls.addEventListener("start", onStart);
      controls.addEventListener("end", onEnd);

      return () => {
        controls.removeEventListener("start", onStart);
        controls.removeEventListener("end", onEnd);
      };
    }
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={400}
      height={400}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="#ffffff"
      showAtmosphere={true}
      atmosphereColor="lightblue"
      atmosphereAltitude={0.25}
      enablePointerInteraction={true}
    />
  );
}

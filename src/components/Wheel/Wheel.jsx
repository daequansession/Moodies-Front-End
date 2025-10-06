import { useRef, useState, useEffect } from "react";
import "./Wheel.css";
import wheelRef from "../../assets/images/FeelingsWheel.png";

const Wheel = ({ src, size = 400 }) => {
  const imgRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const lastAngle = useRef(0);

  const getAngleFromEvent = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX ?? e.touches?.[0].clientX) - cx;
    const y = (e.clientY ?? e.touches?.[0].clientY) - cy;
    return (Math.atan2(y, x) * 180) / Math.PI;
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    lastAngle.current = getAngleFromEvent(e);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    const a = getAngleFromEvent(e);
    let diff = a - lastAngle.current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setAngle((prev) => prev + diff);
    lastAngle.current = a;
  };

  const handlePointerUp = () => {
    dragging.current = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        userSelect: "none",
        touchAction: "none",
        cursor: "grab",
      }}
      onPointerDown={handlePointerDown}
    >
      <img
        ref={imgRef}
        src={wheelRef}
        alt="Spinning wheel"
        draggable="false"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: `rotate(${angle}deg)`,
          transition: "transform 0s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Wheel;

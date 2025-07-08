import React from "react";

const LiveBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: "linear-gradient(135deg, #ff6ec4 0%, #7873f5 100%)",
        opacity: 0.3,
      }}
    />
  );
};

export default LiveBackground;
import React, { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const GradientBackground = ({ text, children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas ref is not assigned");
      return;
    }

    const config = {
      colors: [
        {
          color: "#384770",
          enabled: true,
        },
        {
          color: "#1D283C",
          enabled: true,
        },
        {
          color: "#ADADFF",
          enabled: true,
        },
        {
          color: "#151E2F",
          enabled: true,
        },
        {
          color: "#8A7B7C",
          enabled: false,
        },
      ],
      speed: 4,
      horizontalPressure: 4,
      verticalPressure: 5,
      waveFrequencyX: 2,
      waveFrequencyY: 3,
      waveAmplitude: 5,
      shadows: 0,
      highlights: 2,
      colorBrightness: 1,
      colorSaturation: 7,
      wireframe: false,
      colorBlending: 6,
      backgroundColor: "#003FFF",
      backgroundAlpha: 1,
      resolution: 1,
    };

    const gradient = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    // Cleanup on unmount
    return () => {
      gradient.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-xl md:text-4xl lg:text-6xl font-bold text-center">
          {text}
        </p>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default GradientBackground;

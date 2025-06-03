"use client";

import { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  variant?: "default" | "dark" | "cinema" | "search";
  particleCount?: number;
  className?: string;
}

export default function AnimatedBackground({
  variant = "default",
  particleCount = 12,
  className = ""
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random particle positions and colors
  const generateParticles = () => {
    const particles = [];
    const colors = [
      "bg-red-500",
      "bg-blue-500", 
      "bg-purple-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500"
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        size: Math.random() > 0.7 ? "large" : Math.random() > 0.4 ? "medium" : "small",
        color: colors[Math.floor(Math.random() * colors.length)],
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.6
      });
    }
    return particles;
  };

  const particles = generateParticles();

  const getBackgroundClasses = () => {
    switch (variant) {
      case "dark":
        return "bg-gradient-to-br from-gray-900 via-black to-gray-800";
      case "cinema":
        return "bg-gradient-to-br from-black via-red-950 to-black";
      case "search":
        return "bg-gradient-to-br from-slate-900 via-blue-950 to-black";
      default:
        return "animated-bg";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${getBackgroundClasses()} ${className}`}
    >
      {/* Primary floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`
            absolute particle particle-${particle.size} ${particle.color} floating-animation
          `}
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity
          }}
        />
      ))}

      {/* Orbital elements for cinema variant */}
      {variant === "cinema" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 orbit-animation opacity-30" />
          <div 
            className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 orbit-animation opacity-40"
            style={{ animationDelay: "10s" }}
          />
        </>
      )}

      {/* Pulse elements for search variant */}
      {variant === "search" && (
        <>
          <div className="absolute top-20 right-20 w-3 h-3 bg-blue-400 rounded-full pulse-glow opacity-50" />
          <div 
            className="absolute bottom-40 left-20 w-2 h-2 bg-purple-400 rounded-full pulse-glow opacity-40"
            style={{ animationDelay: "2s" }}
          />
        </>
      )}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/30" />
    </div>
  );
}

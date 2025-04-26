"use client";

import { Leaf } from "lucide-react";

export default function LeafPattern({
  className = "",
  opacity = 10,
  additionalLeavesOpacity = 10,
  leafSizes = {
    topLeft: 40,
    topRight: 30,
    bottomLeft: 25,
    bottomRight: 35,
  },
  leafPositions = {
    topLeft: { top: "10", left: "10", rotate: "12" },
    topRight: { top: "20", right: "20", rotate: "-12" },
    bottomLeft: { bottom: "10", left: "20", rotate: "45" },
    bottomRight: { bottom: "20", right: "10", rotate: "-30" },
  },
  additionalLeaves = [],
  color = "white",
}) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full opacity-${opacity} ${className}`}
    >
      {/* Main corner leaves */}
      <div
        className="absolute transform"
        style={{
          top: leafPositions.topLeft.top,
          left: leafPositions.topLeft.left,
          transform: `rotate(${leafPositions.topLeft.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.topLeft} className={`text-${color}`} />
      </div>
      <div
        className="absolute transform"
        style={{
          top: leafPositions.topRight.top,
          right: leafPositions.topRight.right,
          transform: `rotate(${leafPositions.topRight.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.topRight} className={`text-${color}`} />
      </div>
      <div
        className="absolute transform"
        style={{
          bottom: leafPositions.bottomLeft.bottom,
          left: leafPositions.bottomLeft.left,
          transform: `rotate(${leafPositions.bottomLeft.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.bottomLeft} className={`text-${color}`} />
      </div>
      <div
        className="absolute transform"
        style={{
          bottom: leafPositions.bottomRight.bottom,
          right: leafPositions.bottomRight.right,
          transform: `rotate(${leafPositions.bottomRight.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.bottomRight} className={`text-${color}`} />
      </div>

      {/* Additional leaves */}
      {additionalLeaves.map((leaf, index) => (
        <div
          key={index}
          className="absolute transform"
          style={{
            top: leaf.top,
            left: leaf.left,
            right: leaf.right,
            bottom: leaf.bottom,
            transform: `rotate(${leaf.rotate}deg)`,
            opacity: additionalLeavesOpacity / 100,
          }}
        >
          <Leaf size={leaf.size} className={`text-${color}`} />
        </div>
      ))}
    </div>
  );
}

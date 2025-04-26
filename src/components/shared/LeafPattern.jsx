"use client";

import { Leaf } from "lucide-react";

export default function LeafPattern({
  className = "",
  opacity = 10,
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
}) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full opacity-${opacity} ${className}`}
    >
      <div
        className="absolute transform"
        style={{
          top: leafPositions.topLeft.top,
          left: leafPositions.topLeft.left,
          transform: `rotate(${leafPositions.topLeft.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.topLeft} />
      </div>
      <div
        className="absolute transform"
        style={{
          top: leafPositions.topRight.top,
          right: leafPositions.topRight.right,
          transform: `rotate(${leafPositions.topRight.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.topRight} />
      </div>
      <div
        className="absolute transform"
        style={{
          bottom: leafPositions.bottomLeft.bottom,
          left: leafPositions.bottomLeft.left,
          transform: `rotate(${leafPositions.bottomLeft.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.bottomLeft} />
      </div>
      <div
        className="absolute transform"
        style={{
          bottom: leafPositions.bottomRight.bottom,
          right: leafPositions.bottomRight.right,
          transform: `rotate(${leafPositions.bottomRight.rotate}deg)`,
        }}
      >
        <Leaf size={leafSizes.bottomRight} />
      </div>
    </div>
  );
}

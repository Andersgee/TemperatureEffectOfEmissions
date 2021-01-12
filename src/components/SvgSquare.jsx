import React from "react";

export default function Square(props) {
  return (
    <svg width="24" height="20">
      <rect x="0" y="3" width="16" height="16" fill={props.color} />
    </svg>
  );
}

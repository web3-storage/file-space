import React from "react";
import "./LineBg.css";

export default function LineBg() {
  const lines = Math.floor(window.innerWidth / 30);

  return (
    <div className="lines">
      {[...Array(lines).keys()].map((e, index) => (
        <div
          key={e}
          className="line"
          style={{
            marginLeft: `${(100 / lines) * index}%`,
          }}
        >
          <div
            className="line__animated"
            style={{
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="lds-grid">
      {[...Array(9).keys()].map((e) => (
        <div key={e}></div>
      ))}
    </div>
  );
}

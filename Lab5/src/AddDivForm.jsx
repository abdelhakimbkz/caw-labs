import React, { useState } from "react";

export default function AddDivForm() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [divs, setDivs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!width || !height || !bgColor) return;

    const newDiv = {
      width,
      height,
      bgColor
    };

    setDivs([...divs, newDiv]);

    // Clear inputs
    setWidth("");
    setHeight("");
    setBgColor("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Div Form</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Width (px):{" "}
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Height (px):{" "}
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Background Color:{" "}
            <input
              type="text"
              placeholder="e.g. red or #ff0000"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Add Div</button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {divs.map((div, index) => (
          <div
            key={index}
            style={{
              width: `${div.width}px`,
              height: `${div.height}px`,
              backgroundColor: div.bgColor
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

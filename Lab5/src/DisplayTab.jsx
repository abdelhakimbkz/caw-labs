import React, { useState } from "react";

export default function DisplayTab({ table }) {
  const [items, setItems] = useState(table);

  const handleRemove = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => handleRemove(index)}
          style={{ cursor: "pointer" }}
        >
          Element {index + 1} is: {item}
        </li>
      ))}
    </ul>
  );
}

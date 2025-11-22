import { useState } from "react";

export default function ToggleButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button onClick={() => setClicked(prev => !prev)}>ClickMe</button>
      <p>{clicked ? "Clicked" : "Not Clicked"}</p>
    </div>
  );
}

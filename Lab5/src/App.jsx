import React from "react";
import "./App.css"
import ClickMeButton from "./ClickMeButton";
import ToggleButton from "./ToggleButton";
import Counter from "./Counter";
import DisplayTab from "./DisplayTab";
import AuthForm from "./AuthForm";
import AddDivForm from "./AddDivForm";

export default function App() {
  const table1 = ["hello", "world", "from", "react"];
  const table2 = ["Barcelona", "Real Madrid", "Liverpool"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Lab5</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>Exercise 1: ClickMe Button</h2>
        <ClickMeButton />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2> 2: Toggle Button</h2>
        <ToggleButton />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>3: Counter</h2>
        <Counter />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Exercise 2 : DisplayTab 1</h2>
        <DisplayTab table={table1} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>2: DisplayTab 2</h2>
        <DisplayTab table={table2} />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Exercise 3: Authentication Form</h2>
        <AuthForm />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Exercise 4: Add Div Form</h2>
        <AddDivForm />
      </section>
    </div>
  );
}

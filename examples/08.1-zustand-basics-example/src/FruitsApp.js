import "./App.css";
import { useStore } from "./fruits-store";
import { useRef } from 'react'

export default function FruitsApp() {
  const fruits = useStore((state) => state.fruits);
  const addFruits = useStore((state) => state.addFruits);
  const inputRef = useRef();

  const addFruit = () => {
    addFruits(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <h1>I have {fruits.length} fruits in my basket</h1>
      <p>Add a new fruit</p>
      <input ref={inputRef} />
      <button onClick={addFruit}>Add a fruit</button>
      {fruits.map((fruit) => (
        <p key={fruit}>{fruit}</p>
      ))}
    </div>
  )
}
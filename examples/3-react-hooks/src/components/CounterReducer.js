import React, { useReducer, useState } from "react";
import countReducer from "./CountReducerFn";

const initialState = { count: 0 };

export default function Counter2() {
  const [initValue, setInitValue] = useState(0); 
  const [state, dispatch] = useReducer(countReducer, initialState);
  return (
    <>
      Count: {state.count} &nbsp;
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <input value={initValue} onChange={ (e) => setInitValue(parseInt(e.target.value))  }/>
      <button onClick={() => dispatch({ type: "init", payload: initValue })}>Init</button>
    </>
  );
}
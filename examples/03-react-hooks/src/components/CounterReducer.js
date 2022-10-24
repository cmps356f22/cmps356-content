import React, { useReducer, useState } from "react";
import countReducer from "./CountReducerFn";
import { actionType } from "./CountReducerFn";

const initialState = { count: 0 };

export default function Counter2() {
  const [initValue, setInitValue] = useState(0); 
  const [state, dispatch] = useReducer(countReducer, initialState);
  return (
    <>
      Count: {state.count} &nbsp;
      <button onClick={() => dispatch({ type: actionType.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: actionType.DECREMENT })}>-</button>
      <button onClick={() => dispatch({ type: actionType.RESET })}>Reset</button>
      <input value={initValue} onChange={ (e) => setInitValue(parseInt(e.target.value))  }/>
      <button onClick={() => dispatch({ type: actionType.INIT, payload: initValue })}>Init</button>
    </>
  );
}
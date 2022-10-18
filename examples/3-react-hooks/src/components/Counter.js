import {useState, useEffect, useRef} from "react";

function Counter() {
    const [initValue, setInitValue] = useState(0); 
    const [count, setCount] = useState(0);


    //Gets auto-executed on every render (i.e., every time count changes)
    /*useEffect(() => {
        console.log(`The count is now ${count}`);
    }, [count]); */

    return <div>
        Count: {count} &nbsp;
        <button onClick={ () => setCount(count + 1) }>+</button>
        <button onClick={ () => setCount(count - 1) }>-</button>
        <button onClick={ () => setCount(0) }>Reset</button>
        &nbsp; Init Val <input  onChange={ (e) => setCount(parseInt(e.target.value)) } />
       { /* <button onClick={() => setCount(initValue) }>Init</button> */ }
    </div>
}
export default Counter;
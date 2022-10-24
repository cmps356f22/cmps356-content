import {useState} from "react";

export default function Counter() {
    const [count, setCount] = useState(0)
    return <div>
        Count: {count}
        <button onClick={ () => setCount(count + 1) }>+</button>
        <button onClick={ () => setCount(count - 1) }>-</button>
        <button onClick={ () => setCount(0) }>Reset</button>
        Init Val <input  onChange={ (e) => setCount(parseInt(e.target.value)) } />
    </div>    
}


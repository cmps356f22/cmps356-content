import React, {useState, useEffect, memo, useCallback} from "react";
import SurahSelector from "./SurahSelector";

function UseMemoExample() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    const onSurahSelected = useCallback ((surahId) => {
        console.log(`The selected Surah is ${surahId}`)
    }, []);

    //Gets auto-executed on every render (i.e., every time count changes)
    useEffect(() => {
        console.log(`Parent component re-render. The count is now ${count}`);
    });

    return <div>
        Count: {count} &nbsp;
        <button type="button" onClick={increment}>+</button>
        <button type="button" onClick={decrement}>-</button>
    <br />
        <SurahSelector onSurahSelected={onSurahSelected}/>
    </div>
}
export default UseMemoExample;
import React, {useState, useEffect} from "react";
import SurahSelector from "./SurahSelector";

function Counter(props) {
    const [count, setCount] = useState(0);

    const increment = () => {
        const updatedCount = count + 1;
        setCount(updatedCount);
        props?.onChange(updatedCount);
    };

    const decrement = () => {
        const updatedCount = count - 1;
        setCount(updatedCount);
        props.onChange(updatedCount);
    };

    //Invoked only one time when the component is first mounted to the DOM.
    useEffect(() => {
        console.log(`I just mounted!`)
    }, []);

    function onSurahSelected(surahId) {
        console.log(`The selected Surah is ${surahId}`)
    }

    //Gets auto-executed on every render (i.e., every time count changes)
    useEffect(() => {
        console.log(`The count is now ${count}`);
        //Another way - Let the parent component know that count has changed
        //props.onChange(count);
    });

    return <div>
        Count: {count} &nbsp;
        <button type="button" onClick={increment}>+</button>
        <button type="button" onClick={decrement}>-</button>
    <br />
        <SurahSelector onSurahSelected={onSurahSelected}/>
    </div>
}
export default Counter;
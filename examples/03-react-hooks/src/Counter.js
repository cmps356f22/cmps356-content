import {useState, useEffect} from "react"
export default function MyCounter() {
    const [count, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    useEffect(() => {
        console.log(`Count: ${count}`)
        console.log(`Count2: ${count2}`)
        return () => {
            setCount2(0)
        };
    }, [count1])
    return <>
        Count1: {count1}
        <button onClick={() => setCount1(count1 + 1) }>
        +</button>
        Count2: {count2}
        <button onClick={() => setCount2(count2 + 1) }>
        +</button>
    </>
}




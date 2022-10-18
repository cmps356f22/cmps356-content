import {useState, useEffect} from "react"
export default function MyCounter() {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    useEffect(() => {
        document.title = `Count ${count1}`
        return () => {
            setCount2(0)
        };
    }, [count1])
    return <div>
        Count1: {count1}
        <button onClick={() => setCount1(count1 + 1) }>
        +</button>
        Count2: {count2}
        <button onClick={() => setCount2(count2 + 1) }>
        +</button>
    </div>
}



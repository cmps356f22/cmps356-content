import React, {useState, useEffect, useRef} from 'react'

export default function HookTimer() {
  const [state, setState] = useState(0)
  let intervalRef = null

  useEffect(() => {
    intervalRef = setInterval(() => {
      setState(prev => prev + 1)
    }, 1000)

    return () => clearInterval(intervalRef);

  }, [])

  return (
    <div>
      HookTimer - {state} -
      <button onClick={() => clearInterval(intervalRef)}>Clear Timer</button>
    </div>
  )
}
import { useState, useEffect, useMemo, useCallback } from 'react';
import ShowMoreTextToggle from './ShowMoreTextToggle'

export default function UseMemoExample() {
  const array = new Array(100).fill(1);
  const [count, setCount] = useState(0);

  const getValue = useCallback((value) => console.log(value), []);
  const reducedValue = useMemo(() => array.reduce((a,b) => {
    console.log('computed again');
    return a + b; 
  }), [])

  return (
    <div>
      <p>{reducedValue}</p>
      <h1>{count}</h1>1
      <button type="button" onClick={() => setCount(count + 1)}>Increase count</button>
      <ShowMoreTextToggle text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"/>
      <br />
      <ChildComponent onItemClick={getValue}/>
    </div>
  );
}

//useMemo(
const ChildComponent = ({onItemClick}) => {
  const array = new Array(100).fill(1);
  const renderItem = (item) => <div onClick={onItemClick}>{item}</div>

  useEffect(() => {
    console.log('child component render again')
  })

  return <div>
    {array.map((elem)=> renderItem(elem))}
  </div>
}

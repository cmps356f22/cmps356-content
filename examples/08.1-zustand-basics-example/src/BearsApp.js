import "./App.css";

import { useStore } from "./bears-store";
import BearsList from "./BearsList";

function BearsCount() {
  const bears = useStore((state) => state.bears);
  return <p>{bears} bears in the forest</p>;
}

function AddBear() {
  return <button onClick={() => incrementBear()}>Add bear</button>;
  const addBear = useStore((state) => state.addBear);
  return <button onClick={() => addBear()}>Add bear</button>;
}

function RemoveBear() {
  const removeBear = useStore((state) => state.removeBear);
  return <button onClick={() => removeBear()}>Remove bear</button>;
}

function RemoveAllBears() {
  const removeAllBears = useStore((state) => state.removeAllBears);
  return <button onClick={() => removeAllBears()}>Remove all bears</button>;
}

export default function BearsApp() {
  const bears = useStore((state) => state.bears)
  return (
    <div className="App">
      <BearsCount />
      <div className="actions">
        <AddBear />
        {bears !== 0 ? <RemoveBear /> : null}
        {bears !== 0 ? <RemoveAllBears /> : null}
      </div>
      <br />
      <BearsList />
    </div>
  );
}
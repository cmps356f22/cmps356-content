import "./App.css";

import { useStore } from "./bears-store";
import Bears from "./Bears";

function ShowBears() {
  const bears = useStore((state) => state.bears);
  return <p>{bears} bears in the forest</p>;
}

function AddBear() {
  const incrementBear = useStore((state) => state.increasePopulation);
  return <button onClick={() => incrementBear()}>Add bear</button>;
}

function RemoveBear() {
  const removeBear = useStore((state) => state.removeBear);
  return <button onClick={() => removeBear()}>Remove bear</button>;
}

function RemoveAllBears() {
  const removeAllBears = useStore((state) => state.removeAllBears);
  return <button onClick={() => removeAllBears()}>Remove all bears</button>;
}

function App() {
  return (
    <div className="App">
      <ShowBears />
      <div className="actions">
        <AddBear />
        {useStore((state) => state.bears) !== 0 ? <RemoveBear /> : null}
        {useStore((state) => state.bears) !== 0 ? <RemoveAllBears /> : null}
      </div>
      <br />
      <Bears />
    </div>
  );
}

export default App;

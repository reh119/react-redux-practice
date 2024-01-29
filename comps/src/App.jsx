import Dropdown from "./components/Dropdown";
import { useState } from "react";
// import Accordion from "./components/Accordion";
// import AccordionPage from "./pages/AccrodionPage";

function App() {
  const [selection, setSelection] = useState(null); // options object or null when no item is selected\

  const handleSelect = (newOption) => {
    setSelection(newOption); // so when user selects an option, new option will be passed in from dropdown as a prop, update selection state
  };

  const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ];

  return (
    //<AccordionPage/>
    <div className="flex">
      <Dropdown options={options} value={selection} onChange={handleSelect} />
      <Dropdown options={options} value={selection} onChange={handleSelect} />
    </div>
  );
}

export default App;

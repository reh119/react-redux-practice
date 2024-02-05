import Button from "../components/Button";
import { useState } from "react";
import Panel from "../components/Panel";
// import useCounter from "../hooks/use-counter";

function CounterPage({ initialCount }) {
  // const { count, increment } = useCounter(initialCount); // custom hooks!
  const [count, setCount] = useState(initialCount);
  const [valueToAdd, setValueToAdd] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const handleChange = (event) => {
     const value = parseInt(event.target.value) || 0; // turn string to int 
     setValueToAdd(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setCount(count+valueToAdd)
    setValueToAdd(0);
  } 

  return (
    <Panel className="m-3">
      <h1 className="text-lg"> Count is {count} </h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={valueToAdd || ""}
          onChange={handleChange}
          type="number"
          className="p-1 m-2 bg-gray-50 border border-gray-300"
        />
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;

/* 
Counter Page: 
    count --
    useEffect--> three chunks of code that create number state based on initial value, logs value anytimes theres a change, provdes a way to change value... all 3 seem useful.. we should create a hook!
    handleClick--
    JSX

    Custom Hooks Strategy:
        find code in a component releated to a single piece of state
        copy paste it all into a helper function
        fix all the broken references
        ta-da, you now have a new hook
Brute Force hook creation: 
    1.) make a function called useSomething
    2.) find all the non-JSX expressions rhat refer to 1-2 related pieces of state
    3.) cut them all out, paste them into useSomething
    4.) find 'not defined' errors in component
    5.) in your hook, return an object that contains the variables the component needs. 
    6.) in your component, call you hook, destructure the properties that the component needs
    7.) find 'not defined' erros in your hook. pass the missing variables in as arguments to the hook
    8.) rename the hook to something more meaninful
    9.) rename returned properties to something more descriptive

    useReducer
      alternative to useState
      produces state
      changing this state makes component re render 
      useful when you have several different closely related pieces of state 
      useful when future state values depend on the current state 




*/

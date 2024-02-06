import Button from "../components/Button";
import { useReducer } from "react";
import Panel from "../components/Panel";
import {produce} from 'immer'
//import useCounter from "../hooks/use-counter";

const INCREMENT_COUNT = "increment"; // for reducer function
const SET_VALUE_TO_ADD = "change_value_to_add";
const DECREMENT_COUNT = "decrement";
const ADD_VALUE_TO_COUNT = "add_value_to_count";

const reducer = (state, action) => {
  // used by calling dispatch
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state, // all values from exisiting state object(copy and paste)
        count: state.count + 1,
      };

    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ADD_VALUE_TO_COUNT:
      return {
        ...state, // whats the point of this?
        // state object might have an additional property that we dont update here, so we dont want to lose it! so we make sure we copy and paste it to new object(...state)
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
        //
      };

    default:
      return state;
  }

  // return state; //default case
};

function CounterPage({ initialCount }) {
  // const { count, increment } = useCounter(initialCount); // custom hooks!
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    count: initialCount, // initial values for this state
    valueToAdd: 0,
  });
  // when we call useReducer, we will get back state variable which is an object, it will have properties of count and valueToAdd.
  const increment = () => {
    // setCount(count + 1); // future value of state depends on current value of state(count)
    dispatch({
      // calls reducer function
      type: INCREMENT_COUNT,
    });
  };

  const decrement = () => {
    // setCount(count - 1); // future value of state depends on current value of state(count)
    dispatch({
      type: "decrement",
    });
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0; // turn string to int
    // setValueToAdd(value);

    dispatch({
      type: SET_VALUE_TO_ADD, // action object
      payload: value, // add on optional payload property to set value to add to
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setCount(count+valueToAdd);
    // setValueToAdd(0);
    dispatch({
      type: ADD_VALUE_TO_COUNT,
    });
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg"> Count is {state.count} </h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ""}
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
        useReducer vs useState (commuity convention)
          useState -> each piece of state defined as a seperate variable
          useReducer -> all state for the whole component defined in a single object


  
  state -> state variable(like in useState)
  dispatch -> function to change state (like in useState), when called, react will find reducer function we define and run it. when executed, 
  the first argument (state) is gonna be what the current 
  state of component is that is being maintiend by the that reducer. so it will be an object (count and valueToAdd)
  action -> second argumnet named action by convention. the value of thsi argument is whatever passed into dispatch. 

  so reducer will run, and whatever we return from this function will be the brand new updated state.
  our component will then re render, we call useReducer again, and the state object will have updated propertires

  Rules around reducer function:
    whatever uou return will be your new state 
    if you return nothing then your state will be undefined 
    reducer funtion will never use no async/await(rule), no request, no promises, no outside variables(convention/recommended), we want our reducer function to only operate on
     state and action. 
Reminder: Like almost everywhere else in React, dont directly modify the state object!!

Note: whenevr we call disptach, how do we know which state to change
  dispatch()
    - when we call dispatch, we need to pass along some info to tell the reducer how the state should be updated
    - billions ways to do this!
    - the react community has come up with a convention on how to tell the reducer what it needs to do
      solution:
        - when we nned to modify state, we will call dispatch and always pass in an 'action' object
        - the 'action' object will always have a 'type' property that is a string. this helps tell the reducer what state update it needs to make, watch spelling here!!
        - if we need to communicate some data to the reducer, it will be placed on the 'payload' property of the action object
        - this is very common community convention, not a requirment. react doesnt treat these action objects any differently. 

      Update my state in new way:
        1.) add a new constant action type
        2.) add a call to 'dispatch' 
        3.) add a new case statement in your reducer

        Note on dispatchers: 
          Usually makes more sense to stuff more logic into the reducer and keep the dispatches simple
          less duplicated code if you need to dispatch the same action multiple times 
          part of the goal of reducers is to have a very specific set of ways that state can be changed 

  Introducing Immer:
    Library lets you write code to directly mutate code. yes we can break the rule
      not all react projects wul use immer 
      you NEED to know how to handle states without it 
        Reducer with Immer:
          you can mutate state 
          do not have to return a new value
          still return in each case, otherwise you get 'fallthrough' 
        Normal Reducer
          no directly changing state
          must return a new value for use state
        


    

  




*/

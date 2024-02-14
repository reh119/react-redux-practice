import { useDispatch, useSelector } from "react-redux";
import { changeName, changeCost, addCar } from "../store";

function CarForm() {
  const dispatch = useDispatch();

  const { name, cost } = useSelector((state) => {
    return {
      name: state.form.name,
      cost: state.form.cost,
    };
  });

  const handleNameChange = (event) => {
    // whenever this is called, we want to update state
    // event.target.value -> what user typed into input
    dispatch(changeName(event.target.value)); // remember we need to provide payload
  };

  const handleCostChange = (event) => {
    const carCost = parseInt(event.target.value) || 0; // dealing with number inputs (theyre coming in as strings but we want ints ), or 0 incase carCost is Nan
    dispatch(changeCost(carCost));
  };

  const handleSubmit = (event) => { // called with event object
    // remember browswer will want to reload page to submit form so we stop it 
    event.preventDefault(); 
    dispatch(addCar({name: name, cost: cost})) // need to supply addCar with payload !
    // how can reset fields on sibmissions? we used extraReducers so formSlice will watch for cars/addCars
   
    
  }

  return (
    <div className="car-form panel">
      <h4 className="subtitle is-3">Add Car</h4>
      <form onSubmit = {handleSubmit}>
        <div className="field-group">
          <div className="field">
            <label className="label">Name</label>
            <input
              value={name} // name here is name piece of state from store. so well have to access state it so we can place it here
              onChange={handleNameChange}
              className="input is-expanded"
            />
          </div>
          <div className="field">
            <label className="label">Cost</label>
            <input
              value={cost || ""} // name here is name piece of state from store. so well have to access state it so we can place it here || '' ensures the input field is cleared if cost is false allowing users to see empty input filed insteas of displaying falsy value
              onChange={handleCostChange}
              className="input is-expanded"
              type="number"
            />
          </div>
        </div>
        <div className="field" ></div>
        <button className="button is-link " >Submit</button>
      </form>
    </div>
  );
}
export default CarForm;

/* Notes:
  Two text inputs and "car name"

   Changing State: (many times per project)
            1.) add a reducer to one of your slices that changes state in a particular way
            2.) export the action creator that the slice automatically creates
            3.) find the component that you want to dispatch from 
            4.) import the action creator function and 'useDispatch' from react-redux
            5.) call the 'useDisptach' hook to get access to the dispatch function in store 
            6.) when the user does something, call the action creator to get an action, then 
    Accessing State from inside a component: (many times per proj)
            1.) Find the component that needs to access some state 
            2.) import the 'useSelector' hook from react-redux ( hook will allow us to reach into redux store and access state inside of it)
            3.) call the hook, passing in a selector function( this is a function thats gonna be called with the entire big state object (param),  whatver is returned from this function is what we get access to inside our component)
            4.) use the state! anytime state changes, the component will automatically render 

*/

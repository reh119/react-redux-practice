import { useSelector, useDispatch } from "react-redux";
import { removeCar } from "../store";

function CarList() {
  const dispatch = useDispatch(); // so we can dispatch function in store
  const {cars,name} = useSelector(({ form , cars: { data, searchTerm } }) => {
    // state object (big one)
    const filteredCars =  data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); // logic for search input filtering

    return {
      cars: filteredCars, 
      name: form.name
    }
  });

  const handleCarDelete = (car) => {
    // we want to update state
    dispatch(removeCar(car.id)); // needs a payload
  };

  // map over cars and produce elements for every car weve added in
  // logic to decide if car should e bold , we need car and name being typed into form state.form.name
  const renderedCars = cars.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase()); // bold or not? 
    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}> 
        <p>
          {car.name} - ${car.cost}
        </p>
        <button
          className="button is-danger"
          onClick={() => handleCarDelete(car)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}
export default CarList;

/* Note: Here, we want to get access to car list coming from redux store, iterate over them and print out some information about the car


        Accessing State from inside a component: (many times per proj)
            1.) Find the component that needs to access some state 
            2.) import the 'useSelector' hook from react-redux ( hook will allow us to reach into redux store and access state inside of it)
            3.) call the hook, passing in a selector function
            4.) use the state! anytime state changes, the component will automatically render 
  */

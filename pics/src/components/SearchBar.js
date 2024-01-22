import { useState } from "react";
import './SearchBar.css'

function SearchBar({ onSubmit }) {
  // destruct prop
  const [term, setTerm] = useState(""); // this will be used to handle user input issue.. 1.)

  // in order to get 'term' from custom searchBar (child)component  back to parent App compoennt, we will treat it like an event handler.
  // detect user pressed enter key.. now we need to communicate some data from child up to parent
  // call onSubmit with the current term and pass in term back to parent component where it will show up in handleSubmit function, inside handleSubmit callback we will call searchImages(terrm)
  // from here our after we get images in parent component(after api is called previously), we simply use prop system to take list of images and get it fown to ImageList

  // recieve prop from App.js aka parent component
  const handleFormSubmit = (event) => {
    // event object so that we bypass normal behavior of forms. anytime wewe wire up event handle on plain jsx element (in our case form), we will always have event handler recieve event object.we dont have to use it but its always there.
    event.preventDefault();
    onSubmit(term);
  };

  const handleChange = (event) => {
    // so when user changes contents in input, fucntion will be called and state will be updated.. remember that every time setState is called, it causes component to re render.  3.)
    setTerm(event.target.value);
  };
  return (
    <div className="search-bar">
      <form onSubmit={handleFormSubmit}>
        <label> Enter Search Term</label>
        <input value={term} onChange={handleChange} />
      </form>
    </div>
  );

  // when using button (jsx element), we HAVE to use onCLick prop!! this is not true when using a custom component event *eg in SearchBar.
  // instead we will be using when user uses 'enter' key and not a button. we will do this by putting input element inside form element. we are watching for submit event
  // we added on value prop
}
export default SearchBar;
/* Order: 
    - user selects input
    - user presses enter. this will trigger a submit event on form 
    - form event look at whatever prop was passed to onSubmit/onChange, and call it and run handleFormSubmit

    Notes on INput form: 
     Our next challenge here was, how can we get user input from the input element to be used later on? how do we read data out of input
        - never ever try to get a value out of an input usuing a query selector or similar!!!
        eg (onSubmit(document.querySelector('input).value))
        - react handles form elements kinda wierd (text input, checkboxes etc)
        Handling Text Inputs: 
            1.) create new piece of state
            2.) create event handler to watch for 'onChange' event
            3.) when the 'onChange' event fires, get the value from the input
            4.) take that value from the input and use it to update your state
            5.) pass your state to the input as the value prop

    

*/

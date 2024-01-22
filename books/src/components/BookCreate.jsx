import { useState } from "react";

function BookCreate({ onCreate }) {
  const [title, setTitle] = useState(""); // needed for input element. we want to wire up value prop and onCHange prop when user enters title and submits
  // we wire up title, and and handleCHange to input value

  const handleChange = (event) => {
    // event handler used when user changes input in any way. these recieve an event object as argument
    setTitle(event.target.value); // to figure out what was typed in and update title piece of state
   // console.log(event.target.value)
  };

  const handleSubmit = (event) => {
    // event handler used when button 'Create!' is clicked
    event.preventDefault();
    onCreate(title); //callinf prop passed in from App.js, and giving it the value 'title' which the user submitted
    setTitle(""); // after we create the book we can go ahead and show the text to be empty again
  };

  return (
    <div className="book-create">
        <h3> Add a book</h3>
      <form onSubmit={handleSubmit}>
        <label>Title </label>
        <input className="input" value={title} onChange={handleChange} />
        <button className="button">Create!</button>
      </form>
    </div>
  );
}
export default BookCreate;
// on create being passed in as prop from app component
// will show form to users so that users can add a book
// we will watch for submit event on enter or submir button
// we always treat text inputs the same way, thats where we do value = {title} and onChange
/*
onChange is a prop that specifies the function to be called when the value of the input changes.

handleChange is the event handler function, and it is called when the onChange event occurs (i.e., when the user interacts with the input field).

The value being updated in the event handler is the title state. The handleChange function is responsible for updating the title state based on the changes in the input field.
*/

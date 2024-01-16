import { useState } from "react";

// return random animal/string
function getRandomAnimal() {
  const animals = ["bird", "cat", "gator", "dog", "gator", "horse"];
  //generate random number 0-5
  return animals[Math.floor(Math.random() * animals.length)]; // dont want decimals
}

function App() {
  
    const [animals, setAnimals] = useState([]);
  // handleclick function using arrow function
  const handleClick = () => {
    setAnimals([...animals, getRandomAnimal()]); // c takes all existing elements from animals array, and puts them into a new one. at the end array it puts in a new random animal
    
  };
  return (
    <div>
      <button onClick={handleClick}>Add Animal</button>
      <div> 
        {animals}
      </div>
    </div>
  );
}

export default App;

/* Notes: 
Using Events:
    1.) Decide what kind of events you want to watch for.. clicking, dragging, typing, right click, dragging,  etc --> can look at react doc for most events we can watch for
    2.) Create a function, usually called an event handler or callback function 
    3.) Nae the function using the pattern name of handle + EventName.. this is the usual convention but can change
    4.) Pass the function as a prop to the plain element
    5.) Make sure you pass the function using valid event name ('onCLick' , ' onMouseOver' , etc)
    6.) make sure you pass a reference to the function. (dont call it aka use parenthesis!*) we do have some other alternatives:
        - above when referencing the handleCLick into the button element. we dont use () because we want ot give the button the whole function so the button can call the function in the future when the button is clicked
        - if we use the (), then the function will be envoked right away when the component is rendered. it will call onButtonCLick right away and gives the button the return value, not in the future when its clicked 
Using State System: (updating something on screen)
    - Using use state
        1.) define piece of state with useState function
        2.) give vaue to useState functiion, this is the default starting value
        3.) use the state in some way in our component( often in returned jsx)
        4.)when user does something, update the piece of state. this causes react to rerender the component
*/

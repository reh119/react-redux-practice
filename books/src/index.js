import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Provider} from "./context/books";


const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider>
    <App />
  </Provider>
);
// so now app will have access to this value prop. any component not wrapped in context will not have access. 

// root.render(
//     <BooksContext.Provider value = {10}>
//       <App />
//     </BooksContext.Provider>
//   );


//  we can now go into any of our child components and access the value prop
/*
Now our goal is to chnange the value prop over time  as it is static right now. whenever it changes, we want to re render this content. this is a sign to use STATE!!
we will need to create a second provider component that wraps the first one, so it can display the context provider it wraps on the screen

To summarize context: 
    - make custom provider on top with some state that changes over time
    - it will use the build in context provider to share a value/object with data and functions
    - any child component will be able to reach out, and get those properties ane make use of them
A good question is always: what data should be shared through context? 
    - What should we move up into context (Provider)? We will look at all our states and classify it as application or component states 
        Application state: Data used used many different components. Primary focus of our app. probably want to define this state inside of context 
        Component state: data that is used by very few components. states that no other components care about. -> often a good idea to put application state into contextso we can easily access anywhere insside app. 
    Both of these are still the same exact 'state' we have been working with -> no need to put in context as well never need to share states. no ones cares about these states
    these terms are a way to figure out how to best design your state.
    - its good practice to kinda go through your app design/diagram and decide whether its an application state or component state x 

*/
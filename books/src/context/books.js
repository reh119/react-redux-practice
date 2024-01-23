// context object
import { createContext, useState } from "react";

const BooksContext = createContext(); // this is where context is created

function Provider({ children }) {
  // custom provider
 

 
  return (
    <BooksContext.Provider value={{}}>
      {children}
    </BooksContext.Provider>
  );
}

// when count is updated this component will rerender along with its children
export { Provider };
export default BooksContext;

/* ***FINAL REFACTOR*****
Due to the use of context. We will have to due a large refactor in this code
    - We need to take functions out of app component and put it into our provider instead. 
    - we cant just change location. needs more work than that
    - we will no longer use the props system to pass down 'books' piece of state along with some functions to change it.
    - instead we will share using context
    Steps: 
        1.) We will move 'books' state and its function up to the provider/context, this means we dont need to pass them through our application using props anymore
        2.) go back to each of our different components, and tell them they no longer recieve certain functions through the props system. instead 
            we will change these components so they reach up to context  and get access to functions using context. repeat for all components.

*/

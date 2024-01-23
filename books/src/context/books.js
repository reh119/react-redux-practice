// context object
import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext(); // this is where context is created

function Provider({ children }) {
  // custom provider
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    // when do we call this?
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    // update local book
    // find object inside array then make change using map
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        // this is book we want to change
        return { ...book, ...response.data }; // ...response.data - take properties out of object ad add them into new object we return
      }
      return book;
    });
    setBooks(updatedBooks); // update state with new book
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    // removing object out of array, we usually use filter function. reference lecture or react doc
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
      //so say we want to remove book with id of 3, when we find the book with this id, return false, meaning it wont be added to new array leaving book with id 3 out
    });
    setBooks(updatedBooks); // update state with new array
    // now we need to communicate this function to other children components as props
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title, // since its the argument passed in we dont need title: "title"
    });
    const updatedBooks = [
      ...books,
      response.data,
      //   { id: Math.round(Math.random() * 9999), title: title }, // pre api line
    ]; // the '...books' syntax says go and find exisiting books piece of state, copy-paste the contents into new array. after this we add in new objects. order can be flipped to add in at beggining
    setBooks(updatedBooks); // update books state with new contents from updatedBooks
  };

 

  const valueToShare = { // share as object
     books,
     deleteBookById,
     editBookById,
     createBook,
     fetchBooks
  }
// BE CAREFUL :   return <BooksContext.Provider value={{valueToShare}}>{children}</BooksContext.Provider>; , i was wrapping my value in an object giving me a super nasty bug!!!!! 
  return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>;
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


import {useEffect, useContext} from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";


function App() {
  // every time something is re rendered do we start back up at begginnig of aPP?

  const { fetchBooks } = useContext(BooksContext); // reach into context 

  useEffect(() => {
    // leave here. this is because we stll want to attempt to fetch books when the app component is first displayed on screen
    fetchBooks();
  }, []);


  // now we want to take this array and pass it down into the BookList as props. So BooksList will receive 'books' as props (array of objects)
  // inside of BooksList, we will map over this array, and for each object inside array, we will create seperate BookShow component. Passing it down as props called 'book' since we are passing down 1 individual book
  //console.log(books.id)
  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}
// prop name can be anything
// BookCreate is gonna recieve prop
export default App;

/* Refactor Notes **
 -  Now that we are using context, BooksList and BooksCreate components will not need to be passing props 
 - we will instead have these components reach up directly to context provider and get access to whatever they need 
 1.) Make sure app component can reach up to context, and get access to the fetchBooks function so that when app component is first disolayed on screen we can call fecthBooks and reach out to the api and get list of books
    this will happen using the useContext function
 2.) 

*/







//Plans: all of these plans were pre context version and relied on props. major refactor has been implemented.
/* Reminder on Event handler: 
    - BookCreate component will need to be able to modify state (that is defined in App component) **children to parent communication**

        - user will type title in BookCreate component, we want to take this text and add it as a new object inside 'books' array {id: 123, title: 'new book}
        - now that we have a new object inside this array, we want the rest of the application to be updated as well. 
        - we expect to see new card appear/render with text user typed in

Event Handlers we will use: these are intended to modify our 'books' piece of state . these functions/event handlers will be passed as props down into components like BookCreate and eventually BookEdit, BookShow

            - createBook
            - editBook
            - deleteBook

Inside App component:
    - we have 'books' piece of state 
    - will have createBooks function that will modify the books piece of state when called. we will take this function/event handler and pass it down to the BookCreate component through prop system
    - inside BookCreate Component, user will enter text, and press 'enter'. this needs to be communicated to app component 
    - we need to call createBook function passed down and pass in whatever text user just entered. this info will flow up and end up insde createBook function then inside createBook function 
    we can use this information to modify 'books' piece of state. (add in new object with title and id)
    - when we update 'books' state, our component and all its children will re render, and all children will recieve new version of books array with new object we just added.. causing all compoennts to re render
    and new book will appear 

*/ //---------------------------
/* Component/Design Planning Notes *component diagram in udemy course*

    BookCreate - will need access to 'books' piece of state. its job is to add a new object to the array of books as user types it in and presses enter 
    BookList - needs to know about books piece of state. BooksList will look at array of books and create one BookShow component for every object inside 
    BookShow - needs to know about the objects inside books so they know what content to show on the screen
    BookEdit - needs to know about objects inside books so that it can eventually updated the title property as user edits it 
        So whats the lowest common parent? It will be the App parent component where we need to define the 'books' piece of state
            - So now when we re render the app component, it will cause all the differenc echildren compoennts to be re rendered as well.

    Plan: 
        -have a 'books' piece of state that is an array of objects where every object has an id prop and title prop, each of the objects represents 
        one single book that a user has created 
        - we will add objects into this array through our BookCreate component, and eventually take this array and pass it down to BookList
        - BookList will be responsible for taking a look at every object inside array and making one copy of the BookShow Component
        So where should we define the 'books' piece of state?, 
            - State updated? Rerender the components our piece of state is defined in  + all that components children
            - Find all the components that need to use this state.
            - define the state in the LOWEST COMMON parent. 
            -** see reasoning above plan** 
    piece of states: 'books' , that is an array of objects, id title, defined in App comp
------------------------
Notes on updated piece of state that is an object/array: ONLY WHEN USING STATE SYSTEM
    - ** eg in createBooks function **
         once we succesfully have title value from user, we need to take this title value and update 'books' pievce of state (book object/array...this is not as simple as using .push)
         books.push()
         setBooks(books)
         ^ wont work because react gets a reference to "new" state, but the current state was referencing the same thing place in memory/array/object in mem. react will not re render. How to fix? 
                  // we will need to create a new array, then copy elements from old array into new one
                 // add new element to end 
       
    - if its a string, int, bool etc, update by calling setState function and pass in new value
    - if not we need to use syntax like in createBooks
    - if we want to INSERT at a specific index, we need to use array.slice. reference hwo this works
    - in order to remove an element with a particular value we use array method called filter
        - if filter function returns true, the value is ADDED to new array
        - if filter function returns false, value is not added. 
        - filter always returns new array
        - can also remove filter and specific index
        -can also filter element with particular property
    Modifying elements uses map function 

    ** would be a good idea to go back to optional lectures and copy the examples he gave for modifyig arrays and objects** i missed alot of this(section 7)
----------------
    useEffect: used to run code when a component is initially rendered and (sometimes) when it is re rendered. 
        - first argument is a function that contains code we want to run
        - second is an array OR nothing. this controls whether the function is executed on rerenders 
        - second argument is : [], nothing, or [counter]
        - [] means we will never call it again after its first render
        - nothing/rempty  means we will call it after every render 
        -[counter] re renders after counter variable is changed 

        Tricky things around useEffect: 
            1.) Understand when arrow function gets called 
               -  immediatley after first render, function to useEffect always called!
               -  after the first render, the function we passed to useEffect MIGHT be called depedning on second argument []
------------------
    Context: is like an alternatives to props system. the props system is all about communicate parents and children. context allows us to share data across components even thougb there is no direct link to each other
            in this project things got kind of tricky due to the passing of props to communicate with parent child or child parent. context will help
            - context is NOT replacement for props
            - context is not a replacement for redux
            - context by itself is like a communication chanel, not caring what data is being shared or how its organized
            - setting up context is slighlty painful 
        Using context:
            - 1.) create context
                - usually in a new file. we call createContxt and get back the context object name after what its storing. 
                - this object has two properties, one called provider and the other is consumer 
                    - consumer: used to get access to data(not often used)
                    - provider: component used to specify what data we want to share
            - 2.) Specify the data that will be shared. 
                --> the value prop is super special. its the data being shared
                <BookContext.Provider value = {5}>
                    <MyComponent />  // this component and its children can now access the value shared in context (5)
                </BookContext.Provider> 
                    Usually, we create provider as a new component, and how it render the rest if the application. so its on top, and it renders the app component, which in turn renders its children. 
            - 3.) Consume the data: get access to it inside of a component and use it. 

            
                
*/

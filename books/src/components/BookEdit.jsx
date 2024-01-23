import { useState, useContext } from "react";
import BooksContext from "../context/books";

// due to refactor, BookEdit will need to reach all the way back up to context and get the editBookbyId function
function BookEdit({book,onSubmit}) {
    // user will have option to click edit icon, this will cause change on the screen. 

    const [title,setTitle] = useState(book.title) // default to current title right befire editing
    const {editBookById} = useContext(BooksContext);

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    // need to keep track of user hitting enter or hitting save button to save edit like in BookCreate

    const handleSubmit =(event) => {
        event.preventDefault();
        //console.log('new title is ', title)
        // onEdit(singleBook.id, title);
        onSubmit() // gets communicated back up to booShow
        // due to refactor, we dont need to pass in singleBook.id, title anymore because the BookShow component no longer needs the id or title :) 
        editBookById(book.id, title);
    }

    // now, bookEdit needs to communicate to app.js component and tell it to update a piece of state. (find a book object and change a PROPERTY) ** in optional videos i skipped** or i can reference it in docs
 

    return(
       <form onSubmit = {handleSubmit} className="book-edit">
        <label>Title</label>
        <input className="input" value = {title} onChange = {handleChange} />
        <button className="button is-primary">
            Save
        </button>
       </form>
    )
}
// remeber we have an inout element so we need the state system to keep track of input elements value
export default BookEdit;

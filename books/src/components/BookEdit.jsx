import { useState } from "react";

function BookEdit({singleBook,onSubmit}) {
    // user will have option to click edit icon, this will cause change on the screen. 

    const [title,setTitle] = useState(singleBook.title) // default to current title right befire editing

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    // need to keep track of user hitting enter or hitting save button to save edit like in BookCreate

    const handleSubmit =(event) => {
        event.preventDefault();
        //console.log('new title is ', title)
        // onEdit(singleBook.id, title);
        onSubmit(singleBook.id, title) // gets communicated back up to booShow
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

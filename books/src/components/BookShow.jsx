import { useState } from "react";
import BookEdit from "./BookEdit";

function BookShow({singleBook, onDelete ,onEdit}) {
  // user will have the option to click on a delete button in this component and we will have to communicate with app component to do something (delete entry)
  // onDelete being passed all the way from app
  // clicking the pencil icon will toggle showEdit between true and false. showEdit === false displays books title, showEdit ===true displays BookEdit


  const [showEdit,setShowEdit] = useState(false); 


  const handleDeleteClick = () => {
    onDelete(singleBook.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit); // flipping state
  }

//   const handleSubmit = () => {
//     setShowEdit(false);
//   }
  const handleSubmit = (id,newTitle) => {
    setShowEdit(false);
    onEdit(id,newTitle) // id and title being edited 
  }



  let content = <h3>{singleBook.title}</h3> // let will let us change this variable
  if(showEdit){
      content = <BookEdit onSubmit = {handleSubmit} singleBook={singleBook}/>;
  }

  return (
    <div className="book-show">
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick = {handleEditClick}> Edit</button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}
export default BookShow;

/* challenge 
 we need to make sure that when user submits the form, we hide the edit form and then just show the edited book title. this is tricky
    Two things need to happen
        - need to tell app that there is a new title for book
        - need to tell BookShow to close form
        - one not good solution to to make another prop called a handleSubmit function, that would update showEdit piece of state. then pass it into BookEdit as a prop called onSubmit. 
            - the issue here is onEdit and handleSubmit are both called when a user submits the form. both function are being called when user submits a form. theyre the same!
        - the good solution is: 
            - BookShow is recieving prop called onEdit, we need to make sure its called when user submits form
            - we also need to make sure that the showEdit piece of state is gets updated as well. 
            - so inside of book we, we create an event handler called handleSubmit. then inside this event handler, we will call onEdit(id,newTitle) AND update our showEdit piece of state. 
            - we then take this function/event handler and pass down into BookEdit as a prop called on Submit. we combined two callbacks into one. 
            ** for clarification, both ways work, but the second is much cleaner. refer to lecture 114.
*/
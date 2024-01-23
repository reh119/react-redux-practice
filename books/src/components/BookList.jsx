import BookShow from "./BookShow";
import { useContext } from "react";
import BooksContext from "../context/books";

function BookList({ bookslist, onDelete, onEdit }) {
  // we need to map over the books props which is an array ob objects
  //onDelete is prop being passed in from app
 

  const renderedBooks = bookslist.map((book) => {
    return (
      <BookShow
        onEdit={onEdit}
        onDelete={onDelete}
        key={book.id}
        singleBook={book}
      />
    );
  });

  return (
    <div className="book-list">
      {renderedBooks}
    </div>
  );
}
export default BookList;

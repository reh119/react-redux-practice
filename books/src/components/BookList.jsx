import BookShow from "./BookShow";
import useBooksContext from "../hooks/use-books-context";

function BookList() { // due to refactor, this compoennt no longer recieves props bookslist, onDelete, onEdit instead calling functions directly using context from provider

  // we need to map over the books props which is an array ob objects
  //onDelete is prop being passed in from app

  const { books } = useBooksContext(); // rwach into context and get books object -> small hook
  // NOTES 'books' is a singleBook 

// valid to use both context and props 
// here BookShow need to know what books its supposed to display. so its easier for us to just pass the singleBook prop we are using directly into BookSHow  as opposed as trying to get book show to use context and figure out what book to display
// this is because  each BookShow component is supposed to display a different book to user 

// change back to singleBook in props and whatever props back to. remeber that books.map is actuallty just one book 
  const renderedBooks = books.map((book) => {
    return (
      <BookShow
        key={book.id}
        book={book}
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

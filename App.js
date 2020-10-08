import React from 'react';
import './App.css';

// use a text file of library as the state
// write new books to the text file
// use an effect hook
// add a delete button to each book

// initial library contents
const initialLibrary = [
  {
    title: "The Hobbit",
    author: "Tolkien",
    pages: "295",
    read: true
  },
  {
    title: "The Two Towers",
    author: "Tolkien",
    pages: "352",
    read: true
  }
]

function App() {
  const [myLibrary, setMyLibrary] = React.useState(initialLibrary);

  // setter function, adds a new book to the library
  // should be passed to a child component
  function addBook(newBook) {
    setMyLibrary([newBook, ...myLibrary])
  }

  // toggle the 'read' boolean on a book in the library
  function toggleBookRead(index) {
    // access the desired book
    const currentBook = myLibrary[index]

    // toggle the 'read' key
    currentBook.read = !currentBook.read

    // copy the library so we can safely edit
    const newLibrary = [...myLibrary]
    
    // set the edited book
    newLibrary[index] = currentBook
    setMyLibrary(newLibrary)
  }

  return (
    <div className="App">
      <AddBooktoLibrary onAddBook={addBook} />
      <div className="books"></div>
      <div>
        {myLibrary.map(({title, author, pages, read}, index) => (
          <div key={index}>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{pages}</p>
            <p>Read? <input type='checkbox' checked={read} onChange={() => toggleBookRead(index)} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

// initial new book state
const initialState = {title: '', author: '', pages: '', read: false}

function AddBooktoLibrary(props) {
  const [newBook, setNewBook] = React.useState(initialState)
  
  // add book to library using prop
  // clear form state after
  const handleClick = () => {
    props.onAddBook(newBook)
    setNewBook(initialState)
  }

  return (
    <div>
      <input type='text' value={newBook.title} onChange={(event) => setNewBook({...newBook, title: event.target.value})} />
      <input type='text' value={newBook.author} onChange={(event) => setNewBook({...newBook, author: event.target.value})} />
      <input type='text' value={newBook.pages} onChange={(event) => setNewBook({...newBook, pages: event.target.value})} />
      <input type='checkbox' checked={newBook.read} onChange={(event) => setNewBook({...newBook, read: event.target.checked})} />
      <br></br>
      <button onClick={handleClick}>Add Book</button>
    </div>
  )
};

export default App;

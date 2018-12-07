import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

function Book(props) {
  const { book, onBookMovefunc } = props

  return(
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          {
          book.imageLinks ? (//check if book has image
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
              }}>
            </div>
            ):(
            <div className="book-cover-title">{book.title}</div>
            )
          }
          <div className="book-shelf-changer">
            <select value = {book.shelf}
              onChange = {(event) => onChangeHandle(book,event.target.value,onBookMovefunc)} >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {
          /*rendering each author on new line*/
          book.authors ?
            book.authors.map((author) => <div key={author} className="book-authors">{author}</div>)
            : <div className="book-authors">N/A</div> // author field empty
        }
      </div>
    </li>
  )
}

const onChangeHandle = (bookToMove,changedShelf,onBookMoveFunc) =>{
  onBookMoveFunc(bookToMove,changedShelf)
}

onChangeHandle.propTypes = {
  bookToMove : PropTypes.object.isRequired,
  changedShelf : PropTypes.string.isRequired,
  onBookMovefunc : PropTypes.func.isRequired
}

Book.propTypes = {
  book : PropTypes.object.isRequired,
  onBookMovefunc : PropTypes.func.isRequired
}

export default Book
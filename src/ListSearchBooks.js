import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Book from './Book'

function ListSearchBooks(props) {
  const retrivedBooks = props.RetrivedBooks
  const booksInShelfs = props.BooksInShelfs
  const onBookMovefunc = props.MoveBookToShelf

  return(
    retrivedBooks.map((book) => {

      booksInShelfs.map((shelfBook) => {
        if(shelfBook.id === book.id){//check if book is in bookshelf
          book.shelf = shelfBook.shelf
        }
        return book
      })

      if(!book.shelf){
        book.shelf = 'none'
      }

      return (
       <Book key= { book.id } book= { book }  onBookMovefunc= { onBookMovefunc }/>
      )
    })
  )
}

const onChangeHandle = (bookToMove,changedShelf,onBookMoveFunc) =>{//for check props
  onBookMoveFunc(bookToMove,changedShelf)
}

ListSearchBooks.propTypes ={
  BooksInShelfs : PropTypes.array.isRequired,
  MoveBookToShelf : PropTypes.func.isRequired,
  RetrivedBooks : PropTypes.array.isRequired
}

onChangeHandle.propTypes = {
  bookToMove : PropTypes.object.isRequired,
  changedShelf : PropTypes.string.isRequired,
  OnBookMovefunc : PropTypes.func.isRequired
}


export default ListSearchBooks;
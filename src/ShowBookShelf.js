import React from 'react'
import './App.css'
import Book from './Book'
import PropTypes from 'prop-types'


function ShowBookShelf(props){
  const { BooksToShow, OnBookMovefunc } = props

  return(
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          BooksToShow.map((book) => {
            return (
              <Book key= { book.id } book= { book }  onBookMovefunc= { OnBookMovefunc }/>
            )
          })
        }
      </ol>
    </div>
  )
}

ShowBookShelf.propTypes = {
  BooksToShow : PropTypes.array.isRequired,
  OnBookMovefunc : PropTypes.func.isRequired
}

export default ShowBookShelf
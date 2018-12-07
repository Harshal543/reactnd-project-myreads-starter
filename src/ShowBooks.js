import React from 'react'
import Shelf from './Shelf'
import './App.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ShowBooks(props){
	const books = props.books;
	let currentlyReadingBooks = []
	let wantToReadBooks = []
	let readBooks = []

	if(books.length > 0){//sort book by shelf
		currentlyReadingBooks = books.filter(
			(book) => book.shelf ==='currentlyReading');
		wantToReadBooks = books.filter(
			(book) => book.shelf ==='wantToRead');
		readBooks = books.filter(
			(book) => book.shelf ==='read');
	}

	return(
		<div>
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<Shelf shelfTitle = 'Currently Reading'
						BooksOfShelf = { currentlyReadingBooks }
						OnBookMove = { props.MoveBookToShelf } />
					<Shelf shelfTitle = 'Want to read'
						BooksOfShelf ={ wantToReadBooks }
						OnBookMove = { props.MoveBookToShelf } />
					<Shelf shelfTitle = 'Read'
						BooksOfShelf ={ readBooks }
						OnBookMove = { props.MoveBookToShelf } />
				</div>
			</div>
			<div className="open-search">
				<Link to='/search'>Add Book</Link>
			</div>
		</div>
	)
}

ShowBooks.propTypes = {
		books : PropTypes.array.isRequired,
		MoveBookToShelf : PropTypes.func.isRequired
}

export default ShowBooks;
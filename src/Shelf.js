import React from 'react'
import './App.css'
import ShowBookShelf from './ShowBookShelf'
import PropTypes from 'prop-types'

function Shelf(props){
	const shelfTitle = props.shelfTitle
	const booksToShow = Object.values(props.currentlyReadingBooks);
	return(
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ shelfTitle }</h2>
			<ShowBookShelf BooksToShow = { booksToShow }/>
		</div>
	)
}

Shelf.propTypes = {
		shelfTitle : PropTypes.string.isRequired,
		currentlyReadingBooks : PropTypes.array.isRequired
}

export default Shelf;
import React from 'react'
import './App.css'
import ShowBookShelf from './ShowBookShelf'
import PropTypes from 'prop-types'

function Shelf(props){
	const shelfTitle = props.shelfTitle
	const booksToShow = Object.values(props.BooksOfShelf)
	const onBookMovefunc = props.OnBookMove
	return(
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ shelfTitle }</h2>
			<ShowBookShelf BooksToShow = { booksToShow } 
				OnBookMovefunc = { onBookMovefunc } />
		</div>
	)
}

Shelf.propTypes = {
		shelfTitle : PropTypes.string.isRequired,
		BooksOfShelf : PropTypes.array.isRequired,
		OnBookMove : PropTypes.func.isRequired
}

export default Shelf;
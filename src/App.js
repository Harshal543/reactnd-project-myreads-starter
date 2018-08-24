import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends Component {
	state = {
		Books :[]
	}

	componentDidMount() {
		BooksAPI.getAll()
			.then((Books) => {
				this.setState(() => ({
					Books
				}))
		 })
	}


	render() {
		const books = this.state.Books;
		let currentlyReadingBooks = []
		let wantToReadBooks = []
		let readBooks = []

		if(books.length > 0){
			currentlyReadingBooks = books.filter(
				(book) => book.shelf ==='currentlyReading');
			wantToReadBooks = books.filter(
				(book) => book.shelf ==='wantToRead');
			readBooks = books.filter(
				(book) => book.shelf ==='read');
		}

		return (
			books.length > 0 &&(
			<div className="app">
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<Shelf shelfTitle = 'Currently Reading' currentlyReadingBooks ={ currentlyReadingBooks } />
						<Shelf shelfTitle = 'Want to read' currentlyReadingBooks ={ wantToReadBooks } />
						<Shelf shelfTitle = 'Read' currentlyReadingBooks ={ readBooks } />
					</div>
				</div>
			</div>
			)
		)
	}
}

export default BooksApp;
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

	moveBookToShelf = (bookToMove,changedShelf) => {
		BooksAPI.update(bookToMove,changedShelf)
			.then(() => {
				this.setState((prevState) => ({
					Books : 
						prevState.Books.map((book) =>{
							if(book.id === bookToMove.id)
								{
									book.shelf = changedShelf
								}
								return book;
							}
						)
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
			<div className="app">
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					{books.length === 0 && <h3>Populating...</h3>}
					{books.length > 0 &&(
							<div className="list-books-content">
								<Shelf shelfTitle = 'Currently Reading' 
									BooksOfShelf ={ currentlyReadingBooks } 
									OnBookMove = {this.moveBookToShelf} />
								<Shelf shelfTitle = 'Want to read' 
									BooksOfShelf ={ wantToReadBooks } 
									OnBookMove = {this.moveBookToShelf} />
								<Shelf shelfTitle = 'Read' 
									BooksOfShelf ={ readBooks } 
									OnBookMove = {this.moveBookToShelf} />
							</div>
					)}
				</div>
			</div>
		)
	}
}

export default BooksApp;
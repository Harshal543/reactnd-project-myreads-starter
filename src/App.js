import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ShowBooks from './ShowBooks'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route } from 'react-router-dom'


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

	updateShelf = (bookToMove,changedShelf) => {
		BooksAPI.update(bookToMove,changedShelf)
			.then(() => {
				this.localMoveBook(bookToMove,changedShelf)//local change
			})
	}

	localMoveBook = (bookToMove,changedShelf) =>{
		const newBookState = this.state.Books;
		let isNewBook = true
		newBookState.map((book) =>{// check if book is in state
			if(book.id === bookToMove.id){
				isNewBook = false
			}
			return 0
		})//is there better way to do this?

		if(isNewBook){//add new book
			const bookToAdd = bookToMove;
			bookToAdd.shelf = changedShelf;
			newBookState.push(bookToAdd);
			this.setState((prevState) => ({
				Books : newBookState
			}))
		}
		else{
			if(changedShelf === 'none'){//removing book from state
					this.setState((prevState) =>({
						Books: prevState.Books.filter((book) =>
							book.id !== bookToMove.id
						)
					}))
			}
			else{
				this.setState((prevState) => ({//updating shelf of book in state
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
			}
		}
	}


	render() {
		const books = this.state.Books
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<ShowBooks Books = { books }
						MoveBookToShelf = { this.updateShelf }/>
				)} />
				<Route path='/search' render = {() =>(
					<SearchBooks BooksInShelfs = { books }
						MoveBookToShelf = { this.updateShelf }/>
				)} />
			</div>
		)
	}
}

export default BooksApp;
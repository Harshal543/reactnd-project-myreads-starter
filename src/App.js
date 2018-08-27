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
				this.localMoveBook(bookToMove,changedShelf)
			})
	}

	localMoveBook = (bookToMove,changedShelf) =>{
		const newBookState = this.state.Books;
		let flag = true
		newBookState.map((book) =>{
			if(book.id === bookToMove.id){
				flag = false
			}
			return 0
		})

		if(flag){
			const bookToAdd = bookToMove;
			bookToAdd.shelf = changedShelf;
			newBookState.push(bookToAdd);
			// console.log('local move book',bookToMove)
			this.setState((prevState) => ({
				Books : newBookState
			}))
		}
		else{
			if(changedShelf === 'none'){
					this.setState((prevState) =>({
						Books: prevState.Books.filter((book) =>{
							return book.id !== bookToMove.id
						})
					}))
			}
			else{
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
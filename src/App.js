import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ShowBooks from './ShowBooks'
import SearchBooks from './SearchBooks'
import ErrorPage from './Page404'
import './App.css'
import { Route, Switch } from 'react-router-dom'


class BooksApp extends Component {
	state = {
		books :[]
	}

	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				this.setState(() => ({
					books
				}))
		 })
	}

	updateShelf = (bookToMove,changedShelf) => {
		BooksAPI.update(bookToMove,changedShelf)
			.then(() => {
				this.localMoveBook(bookToMove,changedShelf)//local change
			})
	}


	localMoveBook = (bookToMove,changedShelf) => {
		bookToMove.shelf = changedShelf
		if(changedShelf === 'none') { // remove book from state
			this.setState((prevState) => ({
				books: prevState.books.filter((book) =>
					book.id !== bookToMove.id)
			}))
		}
		else {
			this.setState((prevState) => ({ // adding book or updating book shelf
				books: prevState.books.filter((book) =>
					book.id !== bookToMove.id).concat(bookToMove)
			}))
		}
	}

	render() {
		const books = this.state.books
		return (
			<div className="app">
				<Switch>
					<Route exact path='/' render={() => (
						<ShowBooks books = { books }
							MoveBookToShelf = { this.updateShelf }/>
					)} />
					<Route exact path='/search' render = {() =>(
						<SearchBooks BooksInShelfs = { books }
							MoveBookToShelf = { this.updateShelf }/>
					)} />
					<Route component = { ErrorPage } />
				</Switch>
			</div>
		)
	}
}

export default BooksApp;
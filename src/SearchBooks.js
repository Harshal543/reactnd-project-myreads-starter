import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Proptype from 'prop-types'

class SearchBooks extends Component{
	static propTypes ={
		BooksInShelfs : Proptype.array.isRequired,
		MoveBookToShelf : Proptype.func.isRequired
	}

	state = {
		SearchQuery: '',
		retrivedBooks: []
	}

	updateSearchQuery = (query) => {
		BooksAPI.search(query)
			.then((retriveBooks) => {
				this.setState(() => ({
					retrivedBooks: retriveBooks
				}))
			})
		this.setState(() => ({
			SearchQuery: query.trim()
		}))
	}

	queryEmpty = (query) => {
		if(query.trim() !== ''){
			this.updateSearchQuery(query)
		}
		else{
			this.setState(() => ({
				retrivedBooks: [],
				SearchQuery: ''
			}))
		}
	}

	render(){
		const searchQuery = this.state.SearchQuery;
		let retriveBooks = this.state.retrivedBooks;
		// console.log(retriveBooks)
		// console.log(typeof(retriveBooks))
		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author"
							value= { searchQuery }
							onChange={(event) => this.queryEmpty(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{ retriveBooks !== undefined && (
								retriveBooks.length === 0 ? (
									<h4>Books are shown here..</h4>
								):(
								retriveBooks.map((book) => {
									return (
										<li key={book.id}>
											<div className="book">
												<div className="book-top">
													<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
													</div>
													<div className="book-shelf-changer">
														<select value = "none"
															onChange= {(event) => onChangeHandle(book,event.target.value,this.props.MoveBookToShelf)} >
																<option value="move" disabled>Move to...</option>
																<option value="currentlyReading">Currently Reading</option>
																<option value="wantToRead">Want to Read</option>
																<option value="read">Read</option>
																<option value="none">None</option>
														</select>
													</div>
												</div>
												<div className="book-title">{book.title}</div>
												<div className="book-authors">{book.authors}</div>
											</div>
										</li>
									)
								})
						))}
					</ol>
				</div>
			</div>
		)
	}
}

const onChangeHandle = (bookToMove,changedShelf,onBookMoveFunc) =>{
	onBookMoveFunc(bookToMove,changedShelf)
}

export default SearchBooks;
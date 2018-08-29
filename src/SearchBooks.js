import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListSearchBooks from './ListSearchBooks'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component{
	static propTypes ={
		BooksInShelfs : PropTypes.array.isRequired,
		MoveBookToShelf : PropTypes.func.isRequired
	}

	state = {
		SearchQuery: '',
		retrivedBooks: []
	}

	updateSearchQuery = (query) => {
		BooksAPI.search(query.trim())
			.then((searchedBooks) => {
				this.setState(() => ({
					retrivedBooks: searchedBooks
				}))
			},(error) =>{
				this.setState(() => ({
					retrivedBooks: []
				}))
			})
		this.setState(() => ({
			SearchQuery: query
		}))
	}

	queryIsEmpty = (query) => {//is query empty
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
		let retrivedBooks = this.state.retrivedBooks;
		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author"
							value= { searchQuery }
							onChange={(event) => this.queryIsEmpty(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{ retrivedBooks.hasOwnProperty('error') ? (//empty array returned by function
									<h4 style={{color : '#FF1744'}}>Oops..No books found</h4>
								):(
								(retrivedBooks.length === 0 || searchQuery.trim() === '') ? (//initial state
									<h4>Books are shown here..</h4>
								):(
									<ListSearchBooks BooksInShelfs = { this.props.BooksInShelfs }
										MoveBookToShelf = { this.props.MoveBookToShelf }
										RetrivedBooks = { retrivedBooks }/>
								)
						)}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks;
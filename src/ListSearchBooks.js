import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

function ListSearchBooks(props) {
	const retrivedBooks = props.RetrivedBooks
	const booksInShelfs = props.BooksInShelfs
	return(
		retrivedBooks.map((book) => {
			booksInShelfs.map((shelfBook) => {
				if(shelfBook.id === book.id){
					book.shelf = shelfBook.shelf
				}
				return book
			})
			if(!book.hasOwnProperty('shelf')){
				book.shelf = 'none'
			}
			return (
				<li key={book.id}>
					<div className="book">
						<div className="book-top">
							{
							book.hasOwnProperty('imageLinks') ? (
								<div className="book-cover"
									style={{ width: 128,
														height: 193,
														backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
								</div>
								):(
								<div className="book-cover-title">{book.title}</div>
								)
							}
							<div className="book-shelf-changer">
								<select value = {book.shelf}
									onChange= {(event) => onChangeHandle(book,event.target.value,props.MoveBookToShelf)} >
										<option value="move" disabled>Move to...</option>
										<option value="currentlyReading">Currently Reading</option>
										<option value="wantToRead">Want to Read</option>
										<option value="read">Read</option>
										<option value="none">None</option>
								}
								</select>
							</div>
						</div>
						<div className="book-title">{book.title}</div>
						<div className="book-authors">{book.authors}</div>
					</div>
				</li>
			)
		})
	)
}

const onChangeHandle = (bookToMove,changedShelf,onBookMoveFunc) =>{
	onBookMoveFunc(bookToMove,changedShelf)
}

ListSearchBooks.propTypes ={
		BooksInShelfs : PropTypes.array.isRequired,
		MoveBookToShelf : PropTypes.func.isRequired,
		RetrivedBooks : PropTypes.array.isRequired
}

onChangeHandle.propTypes = {
		bookToMove : PropTypes.object.isRequired,
		changedShelf : PropTypes.string.isRequired,
		OnBookMovefunc : PropTypes.func.isRequired
}


export default ListSearchBooks;
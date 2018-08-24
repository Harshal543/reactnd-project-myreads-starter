import React from 'react'
import './App.css'
import PropTypes from 'prop-types'


function ShowBookShelf(props){
	const BooksToShow = Object.values(props.BooksToShow);
	return(
		BooksToShow.length > 0 && (	
			<div className="bookshelf-books">
        <ol className="books-grid">
        	{
        		BooksToShow.map((book) => {

        			return (
        				<li key={book.id}>
        					<div className="book">
        					  <div className="book-top">
        					    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
        					    	{/*<div className="book-cover-title">{book.title}</div>*/}
        					    </div>
        					    <div className="book-shelf-changer">
        					      <select>
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
        	}
        </ol>
    	</div>
  	)
	)
}

ShowBookShelf.propTypes = {
		BooksToShow : PropTypes.array.isRequired
}

export default ShowBookShelf;
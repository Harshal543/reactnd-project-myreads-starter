import React, { Component } from 'react'
import './App.css'
import ShowBookShelf from './ShowBookShelf'

class CurrentlyReading extends Component{
	render(){
		return(
			<div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ShowBookShelf />
            </div>
		)
	}
}

export default CurrentlyReading;
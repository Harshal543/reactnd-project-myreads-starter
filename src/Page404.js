import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound(){
  return(
    <div style = {{ width: '100%', height: '100%', textAlign: 'center' }}>
        <h5>404 Page not found</h5>
        <p>Sorry! Page you are looking for does not exists</p>
        <Link to= '/'>Go to home</Link>{/*add link*/}
    </div>
  )
}
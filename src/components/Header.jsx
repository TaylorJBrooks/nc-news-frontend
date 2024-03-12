import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <h1>Northcoders News</h1>

    <nav className='nav-bar'>
        <Link to="/">Home</Link>
        <Link>Topics</Link>
        <Link>New Article</Link>
        <Link to="/log-in">Log In</Link>
    </nav>
    </>
  )
}

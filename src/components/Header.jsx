import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/User'
import TopicsList from './TopicsList'

export default function Header() {
  const { loggedInUser } = useContext(UserContext)
  
  return (
    <div className='header-section'>
    <h1 className='header'>Northcoders News</h1>
    <p className='logged-in-user'>{loggedInUser.loggedIn ? `${loggedInUser.name} is logged in.` : 'Please Log In.'}</p>
    <nav className='nav-bar'>
        <Link to="/">Home</Link>
        <TopicsList/>
        <Link>New Article</Link>
        <Link to="/log-in">Log In</Link>
    </nav>
    </div>
  )
}

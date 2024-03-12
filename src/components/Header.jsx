import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/User'
import TopicsList from './TopicsList'

export default function Header() {
  const { loggedInUser } = useContext(UserContext)
  
  return (
    <>
    <h1>Northcoders News</h1>
    <p>{loggedInUser.loggedIn ? `${loggedInUser.name} is logged in.` : 'Please Log In.'}</p>
    <nav className='nav-bar'>
        <Link to="/">Home</Link>
        <TopicsList/>
        {/* <Link to='/topics'>Topics</Link> */}
        <Link>New Article</Link>
        <Link to="/log-in">Log In</Link>
    </nav>
    </>
  )
}

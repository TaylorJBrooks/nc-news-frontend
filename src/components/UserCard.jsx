import { useContext } from 'react'
import { UserContext } from '../contexts/User'

export default function UserCard({user}) {
    const { setLoggedInUser } = useContext(UserContext);

  return (
    <li className='user-card'>
        <img src={user.avatar_url} className='user-card-section'/>
        <div className='user-card-section'>
            <h3>{user.name}</h3>
            <p>Username: {user.username}</p>
        </div>
    </li>
  )
}

import { useContext } from 'react'
import { UserContext } from '../contexts/User'
import { useNavigate } from 'react-router-dom';

export default function UserCard({user}) {
    const { setLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate()

    function handleUserCardClick(){
        setLoggedInUser({...user, loggedIn: true})
        navigate('/')
    }

  return (
    <li className='user-card' onClick={handleUserCardClick}>
        <img src={user.avatar_url} className='user-card-section'/>
        <div className='user-card-section'>
            <h3>{user.name}</h3>
            <p>Username: {user.username}</p>
        </div>
    </li>
  )
}

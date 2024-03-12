import { createContext, useState } from 'react'

const UserContext = createContext();

function UserProvider({children}) {
    const [loggedInUser, setLoggedInUser] = useState({ username: "guest", loggedIn: false})
  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };

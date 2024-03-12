import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const Context = createContext()

export default function UserContext({children}) {
    const [loggedInUser, setLoggedInUser] = useState({ username: "guest", loggedIn: false})
  return (
    <Context.Provider value={{loggedInUser, setLoggedInUser}}>{children}</Context.Provider>
  )
}

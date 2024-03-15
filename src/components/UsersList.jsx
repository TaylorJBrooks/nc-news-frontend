import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";
import Loading from "./Loading";
import UserCard from "./UserCard";
import ErrorPage from "./ErrorPage";
import "./UsersList.css"

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsersList(users);
      setIsLoading(false);
      setError(null)
    }).catch((err)=>{
      setError({err})
    });
  }, []);

  if(error) {
    return <ErrorPage error={error.err.response}/>
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="users-page">
      <h2>Select User to Log In:</h2>
      <ul className="users-list">
        {usersList.map((user) => {
          return <UserCard key={user.username} user={user} />;
        })}
      </ul>
    </div>
  );
}

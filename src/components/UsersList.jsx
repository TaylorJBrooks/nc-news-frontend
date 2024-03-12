import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";
import Loading from "./Loading";
import UserCard from "./UserCard";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ users }) => {
      setUsersList(users);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h2>Select User to Log In:</h2>
      <ul className="users-list">
        {usersList.map((user) => {
          return <UserCard key={user.username} user={user} />;
        })}
      </ul>
    </>
  );
}

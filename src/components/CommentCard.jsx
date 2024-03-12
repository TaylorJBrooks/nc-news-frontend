import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/User';
import { deleteComment } from '../../api';
import ErrorComponent from './ErrorComponent';

export default function CommentCard({comment}) {
  const {loggedInUser} = useContext(UserContext);
  const { comment_id, body, article_id, author, created_at, votes} = comment
  const UTCString = new Date(created_at).toUTCString();
  const [isDeleted, setIsDeleted] = useState(false)
  const [isError, setIsError] = useState(false);

  function handleDeleteComment(){
    setIsDeleted(true)
    deleteComment(comment_id).then(()=>{
      setIsError(false)
    }).catch(()=>{
      setIsError(true)
      setIsDeleted(false)
    })
  }

  return isDeleted ? <p>Comment Deleted</p> : (
    <li className='comment-card'>
        <h3>{author}</h3>
        <p>{body}</p>
        <p>Created at: {UTCString} <br/>
        Votes: {votes}</p>
        {loggedInUser.username === author ? <button onClick={handleDeleteComment}>Delete Comment</button> : null}
        <ErrorComponent isError={isError}/>
    </li>
  )
}

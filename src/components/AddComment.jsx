import React, { useContext, useState } from 'react'
import { postComment } from '../../api'
import { UserContext } from '../contexts/User'
import ErrorComponent from './ErrorComponent'

export default function AddComment({setCommentsList, article_id}) {
    const [newCommentInput, setNewCommentInput] = useState('')
    const [isPosting, setIsPosting] = useState(false)
    const { loggedInUser } = useContext(UserContext)
    const [isError, setIsError] = useState(false)

    function handlePostComment(){
        setIsPosting(true)
        const newCommentToPost = {
            body: newCommentInput,
            username: loggedInUser.username
        }
        postComment(article_id, newCommentToPost).then(({comment})=>{
            setIsError(false)
            setCommentsList((currComments)=>{
                return [comment, ...currComments]
            })
            setNewCommentInput('')
            setIsPosting(false)
        }).catch(()=>{
            setNewCommentInput('')
            setIsPosting(false)
            setIsError(true)
        })
    }

  return isPosting ? <p>Posting...</p> : (
    <>
    <label htmlFor='comment-input'>Add a Comment:</label>
    <textarea id='comment-input' value={newCommentInput} onChange={(e)=> setNewCommentInput(e.target.value)}/>
    <button onClick={handlePostComment} disabled={!loggedInUser.loggedIn || newCommentInput === ''}>{loggedInUser.loggedIn ? 'Post Comment' : 'Please log in to post a comment'}</button>
    <ErrorComponent isError={isError}/>
    </>
  )
}

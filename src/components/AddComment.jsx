import React, { useContext, useState } from 'react'
import { postComment } from '../../api'
import { UserContext } from '../contexts/User'

export default function AddComment({setCommentsList, article_id}) {
    const [newCommentInput, setNewCommentInput] = useState('')
    const [isPosting, setIsPosting] = useState(false)
    const { loggedInUser } = useContext(UserContext)

    function handlePostComment(){
        setIsPosting(true)
        const newCommentToPost = {
            body: newCommentInput,
            username: loggedInUser.username
        }
        postComment(article_id, newCommentToPost).then(({comment})=>{
            setCommentsList((currComments)=>{
                return [comment, ...currComments]
            })
            setNewCommentInput('')
            setIsPosting(false)
        })
    }

  return isPosting ? <p>Posting...</p> : (
    <>
    <label htmlFor='comment-input'>Add a Comment:</label>
    <textarea id='comment-input' value={newCommentInput} onChange={(e)=> setNewCommentInput(e.target.value)}/>
    <button onClick={handlePostComment} disabled={!loggedInUser.loggedIn}>{loggedInUser.loggedIn ? 'Post Comment' : 'Please log in to post a comment'}</button>
    </>
  )
}

import React from 'react'

export default function CommentCard({comment}) {
    const { comment_id, body, article_id, author, created_at, votes} = comment
    const UTCString = new Date(created_at).toUTCString();
  return (
    <li className='comment-card'>
        <h3>{author}</h3>
        <p>{body}</p>
        <p>Created at: {UTCString} <br/>
        Votes: {votes}</p>
    </li>
  )
}

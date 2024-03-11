import React from 'react'
import { Link } from 'react-router-dom';

export default function ArticleCard({article}) {
    const {author, title, article_id, article_img_url, topic, created_at, comment_count, votes} = article;
    const linkTo = `/articles/${article_id}`
  return (
    <Link to={linkTo}>
    <li className='article-card'>
        <h2>{title}</h2>
        <img src={article_img_url}/>
        <p>Author: {author} <br/>
        Topic: {topic} <br/>
        Comment count: {comment_count} <br/>
        Votes: {votes}<br/>
        Article id: {article_id} <br/>
        Created at: {created_at}        
        </p>
    </li></Link>
  )
}

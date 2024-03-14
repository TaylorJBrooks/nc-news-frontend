import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const {
    author,
    title,
    article_id,
    article_img_url,
    topic,
    created_at,
    comment_count,
    votes,
  } = article;

  const UTCString = new Date(created_at).toUTCString();
  const linkTo = `/articles/${article_id}`;
  return (
    <Link to={linkTo}>
      <li className="article-card">
        <h2>{title}</h2>
        <p>
          Author: {author}
        </p>
        <img src={article_img_url} alt="" />
        <div className="article-card-section">
          <p>Comments: {comment_count}</p>
          <p>Votes: {votes}</p>
        </div>
        <div className="article-card-section">
          <p>Created at: {UTCString} </p>
          <p>Topic: {topic}</p>
        </div>
      </li>
    </Link>
  );
}

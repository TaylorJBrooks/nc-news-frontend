import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import CommentsList from "./CommentsList";
import Loading from "./Loading";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = selectedArticle;

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getArticleById(article_id).then(({ article }) => {
      setSelectedArticle(article);
      setIsLoading(false)
    });
  }, []);

  return isLoading ? <Loading/> : (
    <div className="single-article">
      <h2>{title}</h2>
      <img src={article_img_url} />
      <p>
        Body: {body} <br />
        Author: {author} <br />
        Topic: {topic} <br />
        Comment count: {comment_count} <br />
        Votes: {votes}
        <br />
        Article id: {article_id} <br />
        Created at: {created_at}
      </p>
      <CommentsList article_id={article_id}/>
    </ div>
  );
}

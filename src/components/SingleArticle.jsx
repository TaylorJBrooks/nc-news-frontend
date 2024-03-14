import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticle } from "../../api";
import CommentsList from "./CommentsList";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";
import ErrorPage from "./ErrorPage";

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

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then(( article ) => {
      setSelectedArticle(article);
      setIsLoading(false);
      setError(null);
    }).catch((err)=>{
      setError({err})
    })
  }, []);

  function handleVoteButtons(vote){
    setHasVoted(true)
    setSelectedArticle((currArticle)=>{
        return {...currArticle, votes: currArticle.votes + vote}
    })
    patchArticle(article_id, vote).then(()=>{
        setIsError(false)
    })
    .catch((err)=>{
        setSelectedArticle((currArticle)=>{
            return {...currArticle, votes: currArticle.votes - vote}
        })
        setIsError(true)
        setHasVoted(false)
    })
  }

  if(error) {
    return <ErrorPage error={error.err.response}/>
}

  return isLoading ? (
    <Loading />
  ) : (
    <div className="single-article">
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>Created at: {created_at}</p>
      <img src={article_img_url} alt="" />
      <p>Body: {body}</p>
      <div className="article-card-section">
        <p>Topic: {topic}</p>
        <p>Comments: {comment_count}</p>
        <p>Votes: {votes}</p>
      </div>
      <div className="article-card-section">
        <button onClick={()=>{handleVoteButtons(1)}} disabled={hasVoted}>Like This! +1</button>
        <button onClick={()=>{handleVoteButtons(-1)}} disabled={hasVoted}>Not For Me -1</button>
     </div>
     <ErrorComponent isError={isError}/>
      <CommentsList article_id={article_id} />
    </div>
  );
}

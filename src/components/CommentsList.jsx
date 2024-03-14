import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { getCommentsByArticleId } from "../../api";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import ErrorPage from "./ErrorPage";

export default function CommentsList({ article_id }) {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id).then(({ comments }) => {
      setCommentsList(comments);
      setIsLoading(false);
      setError(null);
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
    <div>
        <h2>Comments:</h2>
      <AddComment setCommentsList={setCommentsList} article_id={article_id}/>
    <ul className="comments-list">
      {commentsList.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment}/>;
      })}
    </ul>
    </div>
  );
}

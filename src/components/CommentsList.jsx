import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { getCommentsByArticleId } from "../../api";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import ErrorPage from "./ErrorPage";

export default function CommentsList({ selectedArticle, setSelectedArticle }) {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5)

  useEffect(() => {
    setIsLoading(true);
    const articleId = selectedArticle.article_id
    getCommentsByArticleId({articleId, limit}).then(({ comments }) => {
      setCommentsList(comments);
      setIsLoading(false);
      setError(null);
    }).catch((err)=>{
      setError({err})
    });
  }, [limit]);

  if(error) {
    return <ErrorPage error={error.err.response}/>
}

  return isLoading ? (
    <Loading />
  ) : (
    <div className="comments-list-section">
        <h2>Comments:</h2>
      <AddComment setCommentsList={setCommentsList} article_id={selectedArticle.article_id}/>
    <ul className="comments-list">
      {commentsList.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment}/>;
      })}
    </ul>
    <button
    onClick={() => {
      setLimit((currentLimit)=>currentLimit + 5)
    }}
    disabled={limit >= selectedArticle.comment_count}
    >See More</button>
    </div>
  );
}

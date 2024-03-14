import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import {
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function ArticlesList() {
  const [articlesListItems, setArticlesListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSortBy, setSelectedSortBy] = useState(
    "created_at&desc"
  );
  const location = useLocation();
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState()

  useEffect(()=>{
    setPage(1)
  }, [location])

  useEffect(() => {
    const order = searchParams.get("order") || "desc";
    const sort = searchParams.get("sort") || "created_at";
    setIsLoading(true);
    getArticles({order, sort, topic_name, page})
      .then(({ articles, total_count }) => {
        setTotalCount(total_count)
        setArticlesListItems(articles);
        setSelectedSortBy(`${sort}&${order}`);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [page, location]);

  function handleSelection(e) {
    const selectedSort = e.target.value.split('&')[0]
    const selectedOrder = e.target.value.split('&')[1]
    setSearchParams({'order': selectedOrder, 'sort': selectedSort})
  }

  if (error) {
    return <ErrorPage error={error.err.response} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <label htmlFor="sort-by-dropdown">
        Sort By:
        <select
          id="sort-by-dropdown"
          className="dropdown"
          name="sort-by-dropdown"
          value={selectedSortBy}
          onChange={(e) => handleSelection(e)}
        >
          <option value="created_at&desc">Most recent</option>
          <option value="created_at&asc">Oldest</option>
          <option value="votes&desc">Votes high to low</option>
          <option value="votes&asc">Votes low to high</option>
          <option value="comment_count&desc">
            Comments high to low
          </option>
          <option value="comment_count&asc">
            Comments low to high
          </option>
        </select>
      </label>
      <ul className="articles-list">
        {articlesListItems.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
      <button
        onClick={() => {
          setPage((currentPage) => currentPage - 1);
        }}
        disabled={page === 1}
      >
        Previous Page
      </button>

      <button
        onClick={() => {
          setPage((currentPage) => currentPage + 1);
        }}
        disabled={10 * page >= totalCount}
      >
        Next Page
      </button>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTopics } from "../../api";
import ErrorPage from "./ErrorPage";

export default function FilterTopics() {
  const [topicsList, setTopicsList] = useState([]);
  const location = useLocation();
  const [error, setError] = useState(null);
  const [filterSelection, setFilterSelection] = useState("");
  const navigate = useNavigate();
  const { topic_name } = useParams();

  useEffect(() => {
    if (location.pathname === "/") {
      setFilterSelection("");
    } else {
      setFilterSelection(topic_name);
    }
  }, [location]);

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopicsList(topics);
        setError(null);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  if (error) {
    return <ErrorPage error={error.err.response} />;
  }

  function handleSelection(e) {
    const topic = e.target.value
    if(topic === ''){
        navigate('/')
    } else {
        navigate(`/topics/${e.target.value}`);
    }
  }

  return (
    <label htmlFor="filter-dropdown" id="filter-area">
      Filter:
      <select
        id="filter-dropdown"
        className="dropdown"
        name="filter-dropdown"
        value={filterSelection}
        onChange={(e) => handleSelection(e)}
      >
        <option value="">All Articles</option>
        {topicsList.map((topic) => {
          const topicName =
            topic.slug[0].toUpperCase() + topic.slug.slice(1) + " Articles";
          return (
            <option key={topic.slug} value={topic.slug}>
              {topicName}
            </option>
          );
        })}
      </select>
    </label>
  );
}

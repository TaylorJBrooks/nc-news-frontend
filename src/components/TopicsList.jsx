import React, { useEffect, useState } from "react";
import { getTopics } from "../../api";
import { useLocation, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function TopicsList() {
  const [topicsList, setTopicsList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All Articles");
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedTopic("All Articles");
    }
    const pathSections = location.pathname.split('/')
    if(pathSections[1] === 'topics'){
      const selectedTopicName = pathSections[2][0].toUpperCase() + pathSections[2].slice(1) + " Articles"
      setSelectedTopic(selectedTopicName)
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

  return (
    <div className="dropdown" id="topics-dropdown">
      <p className="drop-button">{selectedTopic}</p>
      <div className="dropdown-content">
        <Link
          to="/"
          onClick={() => setSelectedTopic("All Articles")}
          className="topic-links"
        >
          All Articles
        </Link>
        {topicsList.map((topic) => {
          const topicName =
            topic.slug[0].toUpperCase() + topic.slug.slice(1) + " Articles";
          const linkTo = `/topics/${topic.slug}`;
          return (
            <Link
              to={linkTo}
              key={topic.slug}
              onClick={() => setSelectedTopic(topicName)}
              className="topic-links"
            >
              {topicName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

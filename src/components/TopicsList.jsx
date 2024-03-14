import React, { useEffect, useState } from "react";
import { getTopics } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function TopicsList() {
  const [topicsList, setTopicsList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All Articles");
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(location.pathname === '/'){
      setSelectedTopic("All Articles")
    }
  }, [location])

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicsList(topics);
      setError(null)
    }).catch((err)=>{
      setError({err})
    });
  }, []);

  function handleTopicSelection(topic, topicName) {
    setSelectedTopic(topicName);
    if (topic === "") {
      navigate(`/`);
    } else {
      navigate(`/topics/${topic}`);
    }
  }

  if(error) {
    return <ErrorPage error={error.err.response}/>
  }

  return (
    <div className="dropdown" id="topics-dropdown">
      <p className="drop-button">{selectedTopic}</p>
      <div className="dropdown-content">
        <p onClick={() => handleTopicSelection("", "All Articles")}>
          All Articles
        </p>
        {topicsList.map((topic) => {
          const topicName = topic.slug[0].toUpperCase() + topic.slug.slice(1) + ' Articles'
          return (
            <p
              key={topic.slug}
              onClick={() => handleTopicSelection(topic.slug, topicName)}
            >
              {topicName}
            </p>
          );
        })}
      </div>
    </div>
  );
}

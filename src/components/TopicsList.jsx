import React, { useEffect, useState } from "react";
import { getTopics } from "../../api";
import { Link, useNavigate } from "react-router-dom";

export default function TopicsList() {
  const [topicsList, setTopicsList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All Articles");
  const navigate = useNavigate();
  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicsList(topics);
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

  return (
    <div className="topics-dropdown">
      <p className="drop-button">{selectedTopic}</p>
      <div className="topics-dropdown-content">
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
      <Link />
    </div>
  );
}

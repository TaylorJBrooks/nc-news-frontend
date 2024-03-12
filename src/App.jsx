import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, UsersList, SingleArticle, TopicsList, ArticlesList } from "./components";
import { UserProvider } from "./contexts/User";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path='/topics/:topic_name' element={<ArticlesList />}/>
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/log-in" element={<UsersList />} />
        <Route path="/topics" element={<TopicsList/>}/>
      </Routes>
    </UserProvider>
  );
}

export default App;

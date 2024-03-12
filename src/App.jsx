import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, Home, SingleArticle } from "./components";
import UserContext from "./contexts/User";

function App() {
  return (
    <UserContext>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </UserContext>
  );
}

export default App;

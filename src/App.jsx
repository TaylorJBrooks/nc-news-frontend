import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, Home, UsersList, SingleArticle } from "./components";
import { UserProvider } from "./contexts/User";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/log-in" element={<UsersList />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

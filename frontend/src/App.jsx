import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import List from "./pages/List";
import Friends from "./pages/Friends";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/*Message for Wheeler, just ask me about this and I'll explain it. */}
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/search" element={<Home />} />
            <Route path="/search/:movie" element={<SearchResult />} />
            <Route path="/list" element={<List />} />
            <Route path="/friends" element={<Friends />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

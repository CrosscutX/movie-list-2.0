import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import List from "./pages/List";
import Friends from "./pages/Friends";
import FriendsMovieList from "./pages/FriendsMovieList";
import "./styles/App.css";

export default function App() {
  // State to show the movie information, needs to be in app because we use it
  // on multiple different pages.
  const [showInfo, setShowInfo] = useState(false);
  // You underestimate my true power
  const [displayType, setDisplayType] = useState();
  // Selected Movie is used for displaying movie info on the movie info pane
  const [selectedMovie, setSelectedMovie] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  // Home Search bar text, will be routed between home and searchResult
  const [searchText, setSearchText] = useState();
  // Login authentication, send the user to a login page if not logged in.
  useEffect(() => {
    function shouldRedirect() {
      if (!user) {
        navigate("/login");
      }
      return null;
    }
    shouldRedirect();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/search"
            element={
              <Home
                searchText={searchText}
                setSearchText={setSearchText}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                displayType={displayType}
                setDisplayType={setDisplayType}
                user={user}
                navigate={navigate}
              />
            }
          />
          <Route
            path="/search/:movie"
            element={
              <SearchResult
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                displayType={displayType}
                setDisplayType={setDisplayType}
                searchText={searchText}
                user={user}
              />
            }
          />
          <Route
            path="/list"
            element={
              <List
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                displayType={displayType}
                setDisplayType={setDisplayType}
                user={user}
              />
            }
          />
          <Route path="/friends" element={<Friends user={user} />} />
          <Route
            path="/friends/:name/:id"
            element={
              <FriendsMovieList
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                displayType={displayType}
                setDisplayType={setDisplayType}
                user={user}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

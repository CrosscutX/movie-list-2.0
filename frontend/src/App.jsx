import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import List from "./pages/List";
import Friends from "./pages/Friends";
import "./styles/App.css";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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
          <Route path="/search" element={<Home />} />
          <Route path="/search/:movie" element={<SearchResult />} />
          <Route path="/list" element={<List />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import List from "./pages/List";
import Friends from "./pages/Friends";
import "./styles/App.css";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

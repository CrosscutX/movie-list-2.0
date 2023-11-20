import { useState } from "react";
import HomeSearchBar from "../components/home/HomeSearchBar";
import "../styles/Home.css";

export default function Home() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  return (
    <nav className="home">
      <div className="home-container">
        <h1>The List 2.0</h1>
        <HomeSearchBar
          searchDropdown={searchDropdown}
          setSearchDropdown={setSearchDropdown}
        />
      </div>
    </nav>
  );
}

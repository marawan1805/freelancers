import React, { useContext } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import { SearchContext } from "../../Contexts/SearchContext";

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  return (
    <div className="header-container">
      <HamburgerMenu />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default Header;

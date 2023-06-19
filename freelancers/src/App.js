import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import FreelancersGrid from "./Components/FreelancersGrid/FreelancersGrid";
import { SearchProvider } from "./Contexts/SearchContext";

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<FreelancersGrid />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;

import React, { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // fetching data from the API, updating the rows state
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://9yy4xr6sd3.execute-api.eu-central-1.amazonaws.com/dev/freelancers/search?search=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        const updatedRows = (data || data.Items).map((item) => ({
          id: item.id,
          firstName: item.first_name,
          lastName: item.last_name,
          email: item.email,
          followers: item.social_media_followers,
          skill: item.skill,
        }));
        setRows(updatedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <SearchContext.Provider
      value={{
        rows,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./FreelancersGrid.css";
import { SearchContext } from "../../Contexts/SearchContext";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "followers", headerName: "Followers", width: 150 },
  { field: "skill", headerName: "Skill", width: 150 },
];

const FreelancersGrid = () => {
  // using fetched data from the SearchContext
  const { rows, selectedCategory } = useContext(SearchContext);

  // filtering rows based on the selected category
  const filteredRows =
    selectedCategory !== "All"
      ? rows.filter((row) => row.skill === selectedCategory)
      : rows;

  return (
    <div className="freelancer-grid-container">
      <CategoryFilter />
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
    </div>
  );
};

export default FreelancersGrid;

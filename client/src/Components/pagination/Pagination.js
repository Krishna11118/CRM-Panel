// Pagination.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ totalPages }) => {
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    navigate(`/users?page=${value}`);
  };

  return (
    <MuiPagination
      count={totalPages}
      shape="rounded"
      onChange={handleChange}
      color="primary"
    />
  );
};

export default Pagination;

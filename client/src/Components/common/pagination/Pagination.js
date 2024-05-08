import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div
      style={{ marginTop: "1rem", textAlign: "center", color: "white" }}
      className="pb-8 "
    >
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className=" p-2 bg-custom-500 rounded hover:shadow hover:bg-blue-900"
      >
          <div className="flex items-center justify-center">
          <GrFormPrevious />
          <span>Previous</span>
        </div>
      </button>
      <span style={{ margin: "0 1rem" }} className="px-16">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className=" p-2 bg-custom-500 rounded hover:shadow hover:bg-blue-900"
      >
        <div className="flex items-center justify-center">
          <span>Next</span>
          <GrFormNext />
        </div>
      </button>
    </div>
  );
};

export default Pagination;

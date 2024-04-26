import React from "react";
import { Sidebar2 } from "../sidebar/Sidebar";
import RightSideRouter from "../../routers/RightSideRouter";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  const { isOpen } = useAuth();

  return (
    <>
      <div className="flex ">
        <div className=" fixed left-0 top-0 bottom-0">
          <Sidebar2 />
        </div>
        <div
          className={`w-full  ${
            isOpen ? "pl-64" : "pl-24"
          } overflow-y-auto bg-custom-700 h-screen w-screen  transition-all duration-500 ease`}
        >
          <Navbar />
          <RightSideRouter />
        </div>
      </div>
    </>
  );
};

export default Layout;

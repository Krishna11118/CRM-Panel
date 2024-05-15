import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  return (
    <>
      <nav
        className="flex  justify-between flex-row-reverse items-center h-16 bg-custom-900 shadow-2xl "
        role="navigation"
      >
        {/* <a href="/" className="pl-8">Logo</a> */}
        {/* <div className="pr-8 md:hidden">
                <i className="fas fa-bars"></i>
            </div> */}
        <div className="pr-8  flex ">
          {/* <a href="/" className="p-4">Home</a>
                <a href="/" className="p-4">About</a> */}
          <div className="pr-5 cursor-pointer hover:brightness-50">
            <RxAvatar size={30} color="white" />
          </div>

          <div className="cursor-pointer hover:brightness-50">
            <AiFillSetting size={30} color="white" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

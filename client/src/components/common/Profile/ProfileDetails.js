import React from "react";
import { IoPersonCircle } from "react-icons/io5";

const ProfileDetails = ({ name, resRole, mobile, email }) => (
  <div className="">
    <div className="user-profile flex items-center justify-center mt-8">
      <IoPersonCircle size={50} color="white" />
      <div className="ml-6">
        <div className="username text-white font-bold text-xl uppercase ">
          {name}
        </div>
        <div className="bio text-red-800 font-semibold uppercase">
          {resRole}
        </div>
      </div>
    </div>
    <ul className="data flex justify-center items-center mt-4">
      <li className="flex-1">
        <span className=" font-semibold text-white ">Mobile No:</span>
        <span className="text-blue-500 px-4">{mobile}</span>
      </li>
      <li className="flex-1">
        <span className=" font-semibold  text-white">E-mail:</span>
        <span className="text-blue-500 px-4">{email}</span>
      </li>
    </ul>
    <footer className="mt-8 text-center"></footer>
  </div>
);

export default ProfileDetails;

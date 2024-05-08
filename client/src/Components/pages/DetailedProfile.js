import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../Config/Config";
import { useLocalStorage } from "../../utils/LocalStorage";
import { IoPersonCircle } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const DetailedProfile = () => {
  const [loading, setLoading] = useState(true);
  const { getFromLocalStorage } = useLocalStorage();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const { subAdminId } = useParams();
  const [resRole, setResRole] = useState("");

  useEffect(() => {
    const token = getFromLocalStorage("token");
    const fetchSubAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${config.endpoint}/admin/subAdmin/single/${subAdminId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setName(response.data.fname);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        setResRole(response.data.role[0]);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching car details:", error);
        setLoading(false);
      }
    };
    fetchSubAdminDetails();
  }, [subAdminId]);

  return (
    <div className="    ">
      <h1 className="text-center text-3xl font-bold text-white uppercase text-blue-500 ">
        
      </h1>
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
};

export default DetailedProfile;

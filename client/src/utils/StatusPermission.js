import { React, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "./LocalStorage";
import { useNavigate } from "react-router-dom";

const StatusPermission = () => {
  const { resData } = useAuth();
  const { clearLocalStorage } = useLocalStorage();
  const navigate = useNavigate();

  const statusPermission = (loggedInStatus) => {
    console.log("resData", resData);
    console.log("loggedInStatus", loggedInStatus);
    if (loggedInStatus === false) {
      clearLocalStorage();
      navigate("/subAdmin/login");
    }
  };

  useEffect(() => {
    const loggedInStatus = resData.users.isActive;
    statusPermission(loggedInStatus);
  }, [resData]);

  return null; 
};

export default StatusPermission;

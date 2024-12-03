import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config/config";
import { useLocalStorage } from "../utils/LocalStorage";
import { getCookie, removeTokenCookie } from "../utils/Cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { getFromLocalStorage } = useLocalStorage();
  const [user, setUser] = useState(null);
  const [rolesAndPermissions, setrolesAndPermissions] = useState({});
  const [loader, setLoader] = useState(false);
  const [CMSData, setCMSData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [localRole, setLocalRole] = useState([]);
  const [responseRole, setResponseRole] = useState([]);
  const [role, setRole] = useState([]);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [resData, setResData] = useState({});
  const [usersData, setUsersData] = useState(0);
  const [subAdminsData, setSubAdminsData] = useState({});
  const [updateUseEffect, setUpdateUseEffect] = useState(false);

  // console.log("localRole", localRole);

  //----------------------------------------------------Fetching User Data --------------------
  useEffect(() => {
    let role = getCookie("role");
    let token = getCookie("token");

    // ---- if the role from the cookie is undefined, null, or blank, try getting it from local storage
    if (role === undefined || role === null || role.trim() === "") {
      role = getFromLocalStorage("role");
    }
    setLocalRole(role);
    // console.log("Use effect role", role);

    // ---- if the token from the cookie is undefined, null, or blank, try getting it from local storage
    if (token === undefined || token === null || token.trim() === "") {
      token = getFromLocalStorage("token");
    }
    setToken(token);
    // console.log("Use effect token", token);
  }, [updateUseEffect]);

  // useEffect(() => {
  //     CMSUpdate Profile.getCMS().then((res) => {
  //         setCMSData(res.data)
  //         document.documentElement.style.setProperty('--brand-color', res.data.colors.brand);
  //         document.documentElement.style.setProperty('--brand-pastel-color', res.data.colors.pastel);
  //         document.documentElement.style.setProperty('--brand-grey-color', res.data.colors.grey);
  //         document.documentElement.style.setProperty('--brand-white-color', res.data.colors.white);
  //         setLoader(false)
  //         // localStorage.setItem(logo, res.data?.logo)
  //         localStorage.setItem("logo", res.data.logo)
  //     })
  // }, [])

  //----------------------------------------------------Fetching User Data --------------------
  const fetchData = async () => {
    const getRole = getFromLocalStorage("role");
    setLocalRole(getRole);

    try {
      setLoader(true);
      const response = await axios.get(
        `${config.endpoint}/${getRole}/singleData`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setUser(response.data);
      // console.log("User Data: ", response.data);
      
      setResData(response.data);
      setLoader(false);
      if (response.data.users.role[0] === "noAccess") {
        setRole("user");
      } else if (response.data.users.role[0] === "midLevelAccess") {
        setRole("subAdmin");
      } else if (response.data.users.role[0] === "globalAccess") {
        setRole("admin");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateUseEffect, token, localRole]);

  //------------------------------------Setting Role--------------------
  useEffect(() => {
    const setUIRole = async () => {
      if (localRole === responseRole && responseRole === "noAccess") {
        setRole("user");
      } else if (
        localRole === responseRole &&
        responseRole === "midLevelAccess"
      ) {
        setRole("subAdmin");
      } else if (
        localRole === responseRole &&
        responseRole === "globalAccess"
      ) {
        setRole("admin");
      }
    };
    setUIRole();
  }, [localRole, responseRole]);

  //------------------------------------------------------------ Logout
  const logout = () => {
    localStorage.clear();
    removeTokenCookie("token");
    removeTokenCookie("role");
    removeTokenCookie("id");
    removeTokenCookie("logo");
    setUser(null);
    setToken(null);
    setRole([]);
    setResData({});
    setLocalRole("");
    setResponseRole([]);
  };

  //----------------------------------------providing value --------------------
  const value = {
    CMSData,
    user,
    setUser,
    loader,
    rolesAndPermissions,
    isOpen,
    setIsOpen,
    token,
    role,
    resData,
    usersData,
    setUsersData,
    subAdminsData,
    setSubAdminsData,

    logout,
    updateUseEffect,
    setUpdateUseEffect,
    fetchData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

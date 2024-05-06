import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../Config/Config";
import { useLocalStorage } from "../utils/LocalStorage";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rolesAndPermissions, setrolesAndPermissions] = useState({});
  const [loader, setLoader] = useState(false);
  const [CMSData, setCMSData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [localRole, setLocalRole] = useState([]);
  const [responseRole, setResponseRole] = useState([]);
  const [role, setRole] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [resData, setResData] = useState({});
  const { getFromLocalStorage } = useLocalStorage();
  const [usersData, setUsersData] = useState(0);
  const [subAdminsData, setSubAdminsData] = useState(0);

  

  // useEffect(() => {
  //     CMSServices.getCMS().then((res) => {
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
  useEffect(() => {
    const fetchData = async () => {
      const getRole = getFromLocalStorage("role");
      setLocalRole(getRole);

      try {
        setLoader(true);
        const response = await axios.get(
          `${config.endpoint}/${getRole}/singleData`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setUser(response.data);
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

    if (!user && token) {
      fetchData();
    }
  }, [token, role]);

  console.log(resData, " resData from context");
  //------------------------------------Setting Role--------------------
  useEffect(() => {
    const setUIRole = async () => {
      if (localRole === responseRole && responseRole === "noAccess") {
        setRole("user");
        console.log("user");
      } else if (
        localRole === responseRole &&
        responseRole === "midLevelAccess"
      ) {
        setRole("subAdmin");
        console.log("subAdmin");
      } else if (
        localRole === responseRole &&
        responseRole === "globalAccess"
      ) {
        setRole("admin");
      }
    };
    setUIRole();
  }, [localRole, responseRole]);
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
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

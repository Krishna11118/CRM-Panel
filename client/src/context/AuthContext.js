import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../Config/Config";

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

  const fetchUser = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      console.log("🚀 ~ fetchUser ~ token:", token)
      const response = await axios.get(`${config.endpoint}/user/singleuserdata`, {
        headers: {
          authorization: `${token}`,
        },
      });

      setUser(response.data);
      setLoader(false);
      // if (!response.data.success) return;
      // setUser(response.data.data.user);
      // setRolesAndPermissions(response.data.data.rolesAndPermissions);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    // Only fetch user data if it hasn't been fetched before
    if (!user) {
      fetchUser();
    }
  }, []); // Fetch user data whenever the "user" state change

  const value = {
    CMSData,
    user,
    setUser,
    loader,
    rolesAndPermissions,
    isOpen,
    setIsOpen,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

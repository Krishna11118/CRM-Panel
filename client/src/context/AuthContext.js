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
  const [role, setRole] = useState("");

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getRole = localStorage.getItem("role");
    setRole(getRole);

    const fetchUser = async () => {
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
        setLoader(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoader(false);
      }
    };

    if (!user && token) {
      fetchUser();
    }
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  const value = {
    CMSData,
    user,
    setUser,
    loader,
    rolesAndPermissions,
    isOpen,
    setIsOpen,
    role,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

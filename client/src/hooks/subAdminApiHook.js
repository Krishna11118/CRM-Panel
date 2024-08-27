import { React, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config/config";
import { useAuth } from "../context/AuthContext";

export const useSubAdminApiHook = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token , role } = useAuth();

  //-------------------------------------------------------------------------------------------------subAdmin's API
  //-------------------------------------------------------------------subAdmin register
  const handleSubAdminRegister = (fname, mobile, email, password) => {
    setLoading(true);
    axios
      .post(`${config.endpoint}/user/register`, {
        fname,
        mobile,
        email,
        password,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("User registered successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while registering. Please try again.");
        setLoading(false);
        if (
          error.response &&
          error.response.data.error.includes("Email is Already Exist")
        ) {
          setError("This email is already registered");
          toast.error("This email is already registered");
        } else {
          toast.error("An error occurred while registering. Please try again.");
        }
      });
  };

  // -----------------------------------------------subAdmin login
  const handleSubAdminLogin = (email, password) => {
    setLoading(true);
    axios
      .post(`${config.endpoint}/subAdmin/login`, {
        email,
        password,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000)
        toast.success("SubAdmin logged in successfully");
       
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while logging in. Please try again.");
        setLoading(false);
        if (
          error.response &&
          error.response.data.error.includes("Invalid credentials")
        ) {
          setError("Invalid credentials");
          toast.error("Invalid credentials");
        } else {
          toast.error("An error occurred while logging in. Please try again.");
        }
      });
  };

  // -------------------------------------------------------------------------------------------------- user's API
  // ---------------------------------------- handle delete user pending
  const handleDeleteUser = (userId) => {
    setLoading(true);
    axios
      .delete(`${config.endpoint}/deleteUser/${userId}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("User deleted successfully");
      })
      .catch((error) => {
        setError("An error occurred while deleting user. Please try again.");
        setLoading(false);
        toast.error("An error occurred while deleting user. Please try again.");
      });
  };

  // ---------------------------------------- handle update user
  // const handleUpdateUser = (userId, fname, mobile, email, password) => {
  //   setLoading(true);
  //   axios
  //     .patch(
  //       `${config.endpoint}/${role}/user/update/${userId}`,
  //       {
  //         fname,
  //         mobile,
  //         email,
  //         password,
  //       },
  //       {
  //         headers: { authorization: `${token}` },
  //       }
  //     )
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //       toast.success("User updated successfully");
  //     })
  //     .catch((error) => {
  //       setError("An error occurred while updating user. Please try again.");
  //       setLoading(false);
  //       if (
  //         error.response &&
  //         error.response.data.error.includes("Email is Already Exist")
  //       ) {
  //         setError("This email is already registered");
  //         toast.error("This email is already registered");
  //       } else {
  //         toast.error(
  //           "An error occurred while updating user. Please try again."
  //         );
  //       }
  //     });
  // };

  return {
    handleSubAdminRegister,
    handleSubAdminLogin,
    handleDeleteUser,
    // handleUpdateUser,
  };
};

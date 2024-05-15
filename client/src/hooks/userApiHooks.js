// user hook

import axios from "axios";
import { useState } from "react";
import config from "../Config/Config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from "../utils/LocalStorage";

export const useUserApiHooks = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoading] = useState(false);

  const navigate = useNavigate();
  const { saveToLocalStorage } = useLocalStorage();


  // -----------------------------------------------user login
  const handleUserLogin = (email, password) => {
    setLoading(true);
    axios
      .post(`${config.endpoint}/user/login`, {
        email,
        password,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("User logged in successfully");

        saveToLocalStorage("token", response.data.token);
        saveToLocalStorage("mobile", response.data.user.mobile);
        saveToLocalStorage("fname", response.data.user.fname);
        saveToLocalStorage("email", response.data.user.email);


        response.data.success && navigate("/");
        // setTimeout(() => {
        // window.location.reload();
        // }, 100);
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setError(error);
        toast.error(error);
      });
  };

  //-------------------------------------------------------------------user register
  const handleUserRegister = (fname, mobile, email, password) => {
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

  // ---------------------------------------- handle update user
  // const updateUser = (userId, fname, mobile, email, password) => {
  //   setLoading(true);
  //   axios
  //     .patch(`${config.endpoint}/user/updateUser/${userId}`, {
  //       fname,
  //       mobile,
  //       email,
  //       password,
  //     })
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

  // ---------------------------------------- handle delete user
  // const handleDeleteUser = (userId) => {
  //   setLoading(true);
  //   axios
  //     .delete(`${config.endpoint}/deleteUser/${userId}`)
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //       toast.success("User deleted successfully");
  //     })
  //     .catch((error) => {
  //       setError("An error occurred while deleting user. Please try again.");
  //       setLoading(false);
  //       toast.error("An error occurred while deleting user. Please try again.");
  //     });
  // };

  //   ---------------------------------------- handle fetch data
  // const handleFetchData = () => {
  //   setLoading(true);
  //   axios
  //     .get(`${config.endpoint}/usersdata`)
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError("An error occurred while fetching data. Please try again.");
  //       setLoading(false);
  //       toast.error("An error occurred while fetching data. Please try again.");
  //     });
  // };

  return {
    loader,
    data,
    error,
    handleUserRegister,
    handleUserLogin,
  };
};

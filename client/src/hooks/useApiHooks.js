import axios from "axios";
import { useState } from "react";
import config from "../Config/Config";
import { toast } from "react-hot-toast";

export const useApiHooks = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //-------------------------------------------------------------------user register
  const handleSubmit = (fname, mobile, email, password ) => {
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
  const updateUser = (userId, fname, mobile, email, password) => {
    setLoading(true);
    axios
      .patch(`${config.endpoint}/user/updateUser/${userId}`, {
        fname,
        mobile,
        email,
        password,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("User updated successfully");
      })
      .catch((error) => {
        setError("An error occurred while updating user. Please try again.");
        setLoading(false);
        if (
          error.response &&
          error.response.data.error.includes("Email is Already Exist")
        ) {
          setError("This email is already registered");
          toast.error("This email is already registered");
        } else {
          toast.error(
            "An error occurred while updating user. Please try again."
          );
        }
      });
  };

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

  // ---------------------------------------- handle user status
  const handleUserStatus = (userId, isActive) => {
    setLoading(true);
    axios
      .put(`${config.endpoint}/users/${userId}/${isActive}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("User status updated successfully");
      })
      .catch((error) => {
        setError(
          "An error occurred while updating user status. Please try again."
        );
        setLoading(false);
        toast.error(
          "An error occurred while updating user status. Please try again."
        );
      });
  };

  return {
    loading,
    data,
    error,
    handleSubmit,
    updateUser,
    handleDeleteUser,
    handleUserStatus,
  };
};

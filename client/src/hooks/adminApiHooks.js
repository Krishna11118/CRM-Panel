import axios from "axios";
import { useState, useEffect } from "react";
import config from "../config/config";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export const useAdminApiHook = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token, role } = useAuth();

  // -------------------------------------------------------------------------------------------------admin
  // ---------------------------------------- admin login
  const handleLoginAdmin = (email, password) => {
    setLoading(true);
    axios
      .post(`${config.endpoint}/admin/login`, {
        email,
        password,
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("Admin logged in successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setError("An error occurred while logging in. Please try again.");
        setLoading(false);
        toast.error("An error occurred while logging in. Please try again.");
      });
  };
  //-------------------------------------------------------------------------------------------------subAdmin

  // ---------------------------------------- update subAdmin
  const handleUpdateSubAdmin = (subAdminId, fname, mobile, email, password) => {
    setLoading(true);
    const requestBody = {
      ...(fname.trim() !== "" && { fname }),
      ...(mobile.trim() !== "" && { mobile }),
      ...(email.trim() !== "" && { email }),
      ...(password.trim() !== "" && { password }),
    };

    axios
      .patch(
        `${config.endpoint}/admin/subAdmin/update/${subAdminId}`,
        requestBody,
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("SubAdmin updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };

  //--------------------------------------------update subAdmin permission
  const handleUpdateSubAdminPermissions = (
    subAdminId,
    { createUser, readUser, updateUser, deleteUser, changeStatus }
  ) => {
    setLoading(true);

    axios
      .patch(
        `${config.endpoint}/admin/subAdmin/update/permissions/${subAdminId}`,
        {
          createUser,
          readUser,
          updateUser,
          changeStatus,
          deleteUser,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("SubAdmin updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Unexpected error");
        setLoading(false);
      });
  };

  // ---------------------------------------- delete subAdmin
  const handleDeleteSubAdmin = (subAdminId) => {
    setLoading(true);
    axios
      .delete(`${config.endpoint}/admin/subAdmin/delete/${subAdminId}`, {
        headers: { authorization: token },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("SubAdmin deleted successfully");
      })
      .catch((error) => {
        setError(
          "An error occurred while deleting SubAdmin. Please try again."
        );
        setLoading(false);
        toast.error(
          "An error occurred while deleting SubAdmin. Please try again."
        );
      });
  };

  // --------------------------------------- handle subAdmin status
  const handleSubAdminStatus = (subAdminId, isActive) => {
    setLoading(true);
    axios
      .put(
        `${config.endpoint}/admin/subAdmin/${subAdminId}/${isActive}`,
        {},
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("Sub Admin status updated successfully");
      })
      .catch((error) => {
        setError(
          "An error occurred while updating SubAdmin status. Please try again."
        );
        setLoading(false);
        toast.error(
          "An error occurred while updating SubAdmin status. Please try again."
        );
      });
  };

  //------------------------------------------- create subAdmin
  const handleCreateSubAdmin = (
    fname,
    mobile,
    email,
    password,
    { createUser, readUser, updateUser, changeStatus, deleteUser }
  ) => {
    setLoading(true);
    axios
      .post(
        `${config.endpoint}/subAdmin/register`,
        {
          fname,
          mobile,
          email,
          password,
          createUser,
          readUser,
          updateUser,
          changeStatus,
          deleteUser,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("Sub Admin created successfully");
      })
      .catch((error) => {
        if (error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while registering. Please try again.");
        }
      });
  };

  // -------------------------------------------------------------------------------------------------- user's API

  // ---------------------------------------- create user
  const handleCreatUser = (fname, mobile, email, password) => {
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

  // ---------------------------------------- handle delete user
  const handleDeleteUser = (userId) => {
    setLoading(true);
    axios
      .delete(`${config.endpoint}/${role}/user/delete/${userId}`, {
        headers: {
          authorization: token,
        },
      })
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
  const handleUpdateUser = (userId, fname, mobile, email, password) => {
    setLoading(true);
    axios
      .patch(
        `${config.endpoint}/${role}/user/update/${userId}`,
        {
          fname,
          mobile,
          email,
          password,
        },
        {
          headers: { authorization: token },
        }
      )
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
  // ---------------------------------------- handle user status
  const handleUserStatus = (userId, isActive) => {
    setLoading(true);
    axios
      .put(
        `${config.endpoint}/${role}/user/${userId}/${isActive}`,
        {},
        {
          headers: { authorization: token },
        }
      )
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

  //---------------------------------------------------------------------------------- common route admin and sub admin

  //----------------------------------------update user permission
  const handleUpdateUserPermissions = (
    userId,
    { createUser, readUser, updateUser, deleteUser, changeStatus }
  ) => {
    setLoading(true);

    axios
      .patch(
        `${config.endpoint}/${role}/user/update/permissions/${userId}`,
        {
          createUser,
          readUser,
          updateUser,
          changeStatus,
          deleteUser,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        toast.success("SubAdmin updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.error || "Unexpected error");
        setLoading(false);
      });
  };

  return {
    data,
    error,
    loading,
    handleLoginAdmin,
    handleUpdateSubAdmin,
    handleUpdateSubAdminPermissions,
    handleUpdateUserPermissions,
    handleDeleteSubAdmin,
    handleSubAdminStatus,
    handleCreateSubAdmin,
    handleCreatUser,
    handleDeleteUser,
    handleUpdateUser,
    handleUserStatus,
    // chartData,
  };
};

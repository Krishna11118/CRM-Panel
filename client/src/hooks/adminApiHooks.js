import axios from "axios";
import { useState } from "react";
import config from "../Config/Config";
import { toast } from "react-hot-toast";

export const adminApiHook = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------------------  create sub admin and admin
  const handleSubmitSubAdmin = (fname, mobile, email, password, role) => {
    setLoading(true);
    axios
      .post(`${config.endpoint}/${role}register`, {
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

  return {
    handleSubmitSubAdmin,
  };
};

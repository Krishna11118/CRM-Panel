// Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import config from "../../../Config/Config";
import AddSubAdminModal from "../../common/modals/AddSubAdminModal";
import { useSubAdminApiHook } from "../../../hooks/subAdminApiHook";
import UsersTable from "./SubadminTable";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { useAuth } from "../../../context/AuthContext";

const SubUserData = () => {
  const [subAdmin, setSubAdmin] = useState([]);
  const [hideForUser, setHideForUser] = useState(false);
  const { handleSubAdminStatus, handleDeleteSubAdmin, loading, error } =
    useSubAdminApiHook();
  const { getFromLocalStorage } = useLocalStorage();
  const { role, setSubAdminsData  } = useAuth();

  //----------------------------------------get user data from local storage----------------------------------
  const fullName = getFromLocalStorage("name");
  const token = getFromLocalStorage("token");

  //-----------------------------------------fetch all subAdmin Data----------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${config.endpoint}/admin/subAdmin/data`, {
          headers: {
            authorization: `${token}`,
          },
        });
        setSubAdmin(res.data);
        setSubAdminsData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // -----------------------------------------Delete User--------------------------------
  const handleDelete = async (subAdminId) => {
    handleDeleteSubAdmin(subAdminId);
    setSubAdmin(subAdmin.filter((subAdmin) => subAdmin._id !== subAdminId));
  };

  //------------------------------------------User Avatar--------------------------------
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.toUpperCase(i).charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.toUpperCase().split(" ")[0][0]}`,
    };
  };

  // ------------------------------------------Status switch---------------------------
  const handleStatus = async (subAdminId) => {
    const userToUpdate = subAdmin.find((user) => user._id === subAdminId);
    const updatedStatus = !userToUpdate.isActive;

    handleSubAdminStatus(subAdminId, updatedStatus);

    //------------------------------------Update status in UI---------------------------
    setSubAdmin((prevUsers) =>
      prevUsers.map((user) =>
        user._id === subAdminId ? { ...user, isActive: updatedStatus } : user
      )
    );
  };

  //----------------------------------------Hide for user and subAdmin---------------------
  useEffect(() => {
    if (role === "user" || role === "subAdmin") {
      setHideForUser(true);
    }
  }, []);

  return (
    <>
      {!hideForUser && (
        <div className="home  bg-custom-800">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <div>
              <Typography
                sx={{ fontSize: "1.5rem", fontWeight: "600 " }}
                className="flex text-white"
              >
                Sub Admins{" "}
                {/*  Welcome &nbsp;{" "}
                <div className="uppercase"> {fullName}</div> */}
              </Typography>
            </div>
          </div>
          <Grid sx={{ margin: "1.5rem auto" }}>
            <AddSubAdminModal />
            <UsersTable
              users={subAdmin}
              handleDelete={handleDelete}
              handleStatus={handleStatus}
              stringAvatar={stringAvatar}
            />
          </Grid>
        </div>
      )}
    </>
  );
};

export default SubUserData;

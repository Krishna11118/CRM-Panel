// Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import config from "../../../config/config";
import AddUserModal from "./AddUserModal";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import UsersTable from "./UsersTable";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { useAuth } from "../../../context/AuthContext";
import { useSetRole } from "../../../utils/SetPermission";
import Pagination from "../../common/pagination/Pagination";
import SkeletonLoader from "../../skeletonLoader/TableSkeleton";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { handleUserStatus, handleDeleteUser, error } = useAdminApiHook();
  const { getFromLocalStorage } = useLocalStorage();
  const { role } = useAuth();
  const { subAdminCreatePermissions } = useSetRole();
  const [loading, setLoading] = useState(false);

  //-----------------------------------Pagination----------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //-----------------------------------------get data from localStorage----------------------------------
  const fullName = getFromLocalStorage("name");

  //-----------------------------------------Fetch All Data----------------------------------
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getFromLocalStorage("token");
      setLoading(true);

      try {
        const res = await axios.get(`${config.endpoint}/${role}/user/data`, {
          headers: {
            authorization: `${token}`,
          },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchUserData();
  }, [role]);

  // -----------------------------------------Delete User--------------------------------
  const handleDelete = async (userId) => {
    handleDeleteUser(userId);
    setUsers(users.filter((user) => user._id !== userId));
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
  const handleStatus = async (userId) => {
    const userToUpdate = users.find((user) => user._id === userId);
    const updatedStatus = !userToUpdate.isActive;

    await handleUserStatus(userId, updatedStatus);

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isActive: updatedStatus } : user
      )
    );
  };

  //------------------------------------------ Pagination---------------------------------------------
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = users.slice(firstIndex, lastIndex);

  return (
    <>
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
              Users
              {/* Welcome &nbsp; <div className="uppercase"> {fullName}</div> */}
            </Typography>
          </div>
        </div>

        <Grid sx={{ margin: "1.5rem auto" }}>
          {subAdminCreatePermissions && <AddUserModal />}

          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {" "}
              <UsersTable
                users={currentItems}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                stringAvatar={stringAvatar}
              />
            </>
          )}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(users.length / itemsPerPage)}
                setCurrentPage={setCurrentPage}
              />
        </Grid>
      </div>
    </>
  );
};

export default Users;

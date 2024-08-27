import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import config from "../../../config/config";
import AddSubAdminModal from "./AddSubAdminModal";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import SubAdminTable from "./SubadminTable";
import { useAuth } from "../../../context/AuthContext";
import Pagination from "../../common/pagination/Pagination"; // Import the Pagination component
import { useLocalStorage } from "../../../utils/LocalStorage";
import TableSkeleton from "../../skeletonLoader/TableSkeleton";

const SubAdminData = () => {
  const [subAdmin, setSubAdmin] = useState([]);
  const [hideForUser, setHideForUser] = useState(false);
  const { handleSubAdminStatus, handleDeleteSubAdmin, loading, error } =
    useAdminApiHook();
  const { getFromLocalStorage } = useLocalStorage();
  const { role, setSubAdminsData } = useAuth();
  const [loadingData, setLoadingData] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //--------------------------------------Fetch sub-admin data
  useEffect(() => {
    const token = getFromLocalStorage("token");
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const res = await axios.get(`${config.endpoint}/admin/subAdmin/data`, {
          headers: {
            authorization: `${token}`,
          },
        });
        setSubAdmin(res.data);
        setSubAdminsData(res.data);
        setLoadingData(false);
      } catch (err) {
        setLoadingData(false);
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

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

  //----------------------------------------Delete sub-admin------------------------------------
  const handleDelete = async (subAdminId) => {
    handleDeleteSubAdmin(subAdminId);
    setSubAdmin(subAdmin.filter((subAdmin) => subAdmin._id !== subAdminId));
  };

  //----------------------------------------Toggle sub-admin status
  const handleStatus = async (subAdminId) => {
    const userToUpdate = subAdmin.find((user) => user._id === subAdminId);
    const updatedStatus = !userToUpdate.isActive;

    handleSubAdminStatus(subAdminId, updatedStatus);

    //---------------------------------------Update status in UI-----------------------------------
    setSubAdmin((prevUsers) =>
      prevUsers.map((user) =>
        user._id === subAdminId ? { ...user, isActive: updatedStatus } : user
      )
    );
  };

  //----------------------------------------Hide for user and sub-admin------------------------------
  useEffect(() => {
    if (role === "user" || role === "subAdmin") {
      setHideForUser(true);
    }
  }, []);

  //------------------------------------------ Pagination---------------------------------------------
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = subAdmin.slice(firstIndex, lastIndex);

  return (
    <>
      {!hideForUser && (
        <div className="home  bg-custom-800 ">
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
                Sub Admins
              </Typography>
            </div>
          </div>
          <Grid sx={{ margin: "1.5rem auto" }}>
            <AddSubAdminModal />
            {loadingData ? (
              <TableSkeleton />
            ) : (
              <SubAdminTable
                users={currentItems}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                stringAvatar={stringAvatar}
              />
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(subAdmin.length / itemsPerPage)}
              setCurrentPage={setCurrentPage}
            />
          </Grid>
        </div>
      )}
    </>
  );
};

export default SubAdminData;

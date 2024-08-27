import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Pages from "./Pagination";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import config from "../../config/config";
import AddUserModal from "./user/AddUserModal";
import MenuButton from "../common/editMenuButton/EditMenuButton";
import { useUserApiHooks } from "../../hooks/userApiHooks";
import { useLocalStorage } from "../../utils/LocalStorage";

const Users = () => {
  const { setUser, user } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getFromLocalStorage } = useLocalStorage();
  const { handleUserStatus, handleDeleteUser, loading, error } =
    useUserApiHooks();
  const [userStatus, setUserStatus] = useState({});

  const fullName = getFromLocalStorage("fname");
  if (fullName === "undefined") {
    fullName = "Admin";
  }
  //-----------------------------------------Fetch Data--------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${config.endpoint}/user/usersdata`);
        setUsers(res.data);

        // Create an object with userId as key and isActive as value
        const statusObj = {};

        res.data.forEach((user) => {
          statusObj[user._id] = user.isActive;
        });

        setUserStatus(statusObj);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

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
    const updatedStatus = !userStatus[userId];
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: updatedStatus,
    }));
    handleUserStatus(userId, updatedStatus);
  };

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
              Welcome &nbsp; <div className="uppercase"> {fullName}</div>
            </Typography>
          </div>
        </div>
        <Grid sx={{ margin: "1.5rem auto" }}>
          <TableContainer
            className="bg-custom-600"
            component={Paper}
            sx={{
              margin: "auto",
              marginTop: "1rem",
              width: "96%",
              padding: "10px",
            }}
          >
            <AddUserModal />

            <Table
              size="medium"
              aria-label="a dense table "
              className=" bg-custom-700 rounded-md"
            >
              <TableHead>
                <TableRow className="main">
                  <TableCell className="text-white ">#</TableCell>
                  <TableCell className="text-white">Name</TableCell>
                  <TableCell className="text-white">E-mail</TableCell>
                  <TableCell className="text-white">Mobile No</TableCell>
                  <TableCell className="text-white">Status</TableCell>
                  <TableCell className="text-white">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="rounded-md bg-custom-600  hover:bg-custom-700 h-[100]"
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="text-white"
                    >
                      {index + 1}
                    </TableCell>

                    <TableCell className="text-white">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Avatar {...stringAvatar(user.fname)} />
                        {user.fname}
                      </div>
                    </TableCell>

                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell className="text-white">{user.mobile}</TableCell>
                    <TableCell className="text-white">
                      {" "}
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          checked={userStatus[user._id]} // Updated to use userStatus
                          onChange={() => handleStatus(user._id)} // Updated to pass userId to handleStatus
                          className="sr-only peer"
                        />
                        <div
                          className="relative w-11 h-6 bg-red-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-800 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-green-400"
                        ></div>
                      </label>
                    </TableCell>

                    <TableCell>
                      <MenuButton />
                      <CancelIcon
                        className="cursor-pointer"
                        color="error"
                        size="large"
                        onClick={() => handleDelete(user._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pages />
        </Grid>
      </div>
    </>
  );
};

export default Users;

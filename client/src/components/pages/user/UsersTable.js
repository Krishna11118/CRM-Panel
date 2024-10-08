import React, { useState } from "react";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import UserRow from "./UserRow";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";
import { useSetRole } from "../../../utils/SetPermission";

const UsersTable = ({ users, handleDelete, handleStatus, stringAvatar }) => {
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { resData } = useAuth();
  const {
    subAdminUpdatePermissions,
    subAdminDeletePermissions,
    subAdminStatusPermissions,
    subAdminReadPermissions,
  } = useSetRole();

  //-----------------------------------------Delete User--------------------------------
  const handleDeletebtn = async (userId) => {
    await handleDelete(userId);
  };

  //-----------------------------------------Open Delete Modal--------------------------------
  const handleOpenDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setOpenDeleteModal(!openDeleteModal);
  };

  //-----------------------------------------Close Delete Modal--------------------------------
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    // --------------------------------------------------Table Container for Users
    <>
      {" "}
      {subAdminReadPermissions && (
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
                {subAdminStatusPermissions && (
                  <TableCell className="text-white">Status</TableCell>
                )}
                {subAdminUpdatePermissions && (
                  <TableCell className="text-white">Edit</TableCell>
                )}
                {subAdminDeletePermissions && (
                  <TableCell className="text-white">Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            {/* // ------------------------------------------Table Body */}
            <TableBody>
              {users.map((user, index) => (
                <UserRow
                  key={user._id}
                  user={user}
                  index={index}
                  handleDelete={() => handleOpenDeleteModal(user._id)}
                  handleStatus={handleStatus}
                  stringAvatar={stringAvatar}
                />
              ))}
            </TableBody>
            {/* ****************************************************************** */}

            {/* // ---------------------------------------------Delete Modal */}
            <Modal
              show={openDeleteModal}
              size="md"
              onClose={handleCloseDeleteModal}
              popup
              className="bg-opacity-70"
            >
              <Modal.Header className="bg-custom-500" />
              <Modal.Body className="bg-custom-600">
                <div className="text-center ">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-white dark:text-gray-200" />

                  <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>

                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => {
                        handleDeletebtn(deleteUserId);
                        handleCloseDeleteModal();
                      }}
                    >
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={handleCloseDeleteModal}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            {/* ******************************************* */}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UsersTable;

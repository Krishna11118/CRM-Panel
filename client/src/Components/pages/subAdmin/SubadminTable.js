import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import SubAdminRow from "./SubAdminRow";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const SubAdminTable = ({
  users,
  handleDelete,
  handleStatus,
  stringAvatar,
  handleProfile,
}) => {
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  //-----------------------------------------handle Profile--------------------------------

  return (
    // --------------------------------------------------Table Container for Users
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
        {/* // -----------------------------------------Table header */}
        <TableHead>
          <TableRow className="main">
            <TableCell className="text-white ">#</TableCell>
            <TableCell className="text-white">Name</TableCell>
            <TableCell className="text-white">E-mail</TableCell>
            <TableCell className="text-white">Mobile No</TableCell>
            <TableCell className="text-white">Status</TableCell>
            <TableCell className="text-white">Edit</TableCell>
            <TableCell className="text-white">Action</TableCell>
            {/* <Button variant="outlined" onClick={() => handleOpenDetails(user._id)}>Details</Button> */}
          </TableRow>
        </TableHead>
        {/* // -----------------------------------------Table Body */}
        <TableBody>
          {users.map((user, index) => (
            <SubAdminRow
              key={user._id}
              user={user}
              index={index}
              handleDelete={() => handleOpenDeleteModal(user._id)}
              handleStatus={handleStatus}
              stringAvatar={stringAvatar}
              handleProfile={handleProfile}
            />
          ))}
        </TableBody>
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
      </Table>
    </TableContainer>
  );
};

export default SubAdminTable;

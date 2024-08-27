import React from "react";
import Button from "@mui/material/Button";
import { AiOutlineUserAdd } from "react-icons/ai";

const AddUserBtn = () => {
  return (
    <>
        <Button
            variant="contained"
            color="primary"
            starticon={<AiOutlineUserAdd />}
            style={{ margin: "10px" }}
        >
            Add User
        </Button>

    </>
  );
};

export default AddUserBtn;

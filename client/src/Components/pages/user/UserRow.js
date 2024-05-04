// UserRow.js
import React from "react";
import { TableRow, TableCell, Avatar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuButton from "../../common/editMenuButton/EditMenuButton";
import { useAuth } from "../../../context/AuthContext";
import { useSetRole } from "../../../utils/SetPermission";

const UserRow = ({ user, index, handleDelete, handleStatus, stringAvatar }) => {
  const {
    subAdminCreatePermissions,
    subAdminReadPermissions,
    subAdminUpdatePermissions,
    subAdminDeletePermissions,
    subAdminStatusPermissions,
  } = useSetRole();

  return (
    <>
    {/* //------------------------------------------------------------------User Row */}
      {/* //--------------------read permission */}
      {subAdminReadPermissions && (
        <TableRow
          key={user._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          className="rounded-md bg-custom-600  hover:bg-custom-700 h-[100]"
        >
          <TableCell component="th" scope="row" className="text-white">
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

          {/* //---------------------------------change ui acc to subAdmin response--------------------------------- */}
          {subAdminStatusPermissions && (
            <TableCell className="text-white">
              {/* Status Toggle button */}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  checked={user.isActive}
                  onChange={() => handleStatus(user._id)}
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
          )}

          {subAdminUpdatePermissions && (
            <TableCell className="text-white">
              {" "}
              <MenuButton />
            </TableCell>
          )}

          {subAdminDeletePermissions && (
            <TableCell>
              <CancelIcon
                className="cursor-pointer"
                color="error"
                size="large"
                onClick={() => handleDelete(user._id)}
              />
            </TableCell>
          )}
        </TableRow>
      )}
    </>
  );
};

export default UserRow;

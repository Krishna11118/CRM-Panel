import { React, useState, useEffect } from "react";
import axios from "axios";
import ToggleBtn from "../../common/buttons/ToggleBtn";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../../utils/LocalStorage";
import config from "../../../config/config";
import { useAuth } from "../../../context/AuthContext";

const UserUpdatePermission = () => {
  const { handleUpdateUserPermissions } = useAdminApiHook();
  const [createUserPermission, setCreateUserPermission] = useState(null);
  const [readUserPermission, setReadUserPermission] = useState(null);
  const [updateUserPermission, setUpdateUserPermission] = useState(null);
  const [changeStatusPermission, setChangeStatusPermission] = useState(null);
  const [deleteUserPermission, setDeleteUserPermission] = useState(null);

  const { role } = useAuth();

  const { getFromLocalStorage } = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const token = getFromLocalStorage("token");
    const fetchSubAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${config.endpoint}/${role}/subAdmin/single/${userId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        setCreateUserPermission(response.data.permissions.createUser);
        setReadUserPermission(response.data.permissions.readUser);
        setUpdateUserPermission(response.data.permissions.updateUser);
        setChangeStatusPermission(response.data.permissions.changeStatus);
        setDeleteUserPermission(response.data.permissions.deleteUser);

        setLoading(false);
      } catch (error) {
        console.log("Error fetching car details:", error);
        setLoading(false);
      }
    };
    fetchSubAdminDetails();
  }, [subAdminId]);

  const handleUpdatePermission = async () => {
    const permission = {
      createUser: createUserPermission,
      readUser: readUserPermission,
      updateUser: updateUserPermission,
      deleteUser: changeStatusPermission,
      changeStatus: deleteUserPermission,
    };
    await handleUpdateUserPermissions(subAdminId, permission);
  };

  return (
    <>
      <div className="flex  justify-center items-center  w-full h-full gap-12 ">
        <div className="flex    justify-center items-center gap-8">
          <ToggleBtn
            text="Create User"
            createUserPermission={createUserPermission}
            setCreateUserPermission={setCreateUserPermission}
          />
          <ToggleBtn
            text="Read User"
            createUserPermission={readUserPermission}
            setCreateUserPermission={setReadUserPermission}
          />
          <ToggleBtn
            text="Update User"
            createUserPermission={updateUserPermission}
            setCreateUserPermission={setUpdateUserPermission}
          />
          <ToggleBtn
            text="Change Status"
            createUserPermission={changeStatusPermission}
            setCreateUserPermission={setChangeStatusPermission}
          />
          <ToggleBtn
            text="Delete User"
            createUserPermission={deleteUserPermission}
            setCreateUserPermission={setDeleteUserPermission}
          />
          <div className="w-full">
            <div className="flex justify-center items-center font-medium">
              <Button
                variant="contained"
                onClick={handleUpdatePermission}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUpdatePermission;

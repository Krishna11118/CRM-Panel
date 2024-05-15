import { useAuth } from "../context/AuthContext";

export const useSetRole = () => {
  const { resData } = useAuth();

  const subAdminCreatePermissions = resData.users.permissions.createUser;
  const subAdminReadPermissions = resData.users.permissions.readUser;
  const subAdminUpdatePermissions = resData.users.permissions.updateUser;
  const subAdminDeletePermissions = resData.users.permissions.deleteUser;
  const subAdminStatusPermissions = resData.users.permissions.changeStatus;

  return {
    subAdminCreatePermissions,
    subAdminReadPermissions,
    subAdminUpdatePermissions,
    subAdminDeletePermissions,
    subAdminStatusPermissions,
  };
};

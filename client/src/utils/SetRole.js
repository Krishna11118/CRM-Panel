import { React, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useSetRole = () => {
  const { localRole, responseRole } = useAuth();

  const roleCheck = (role) => {
    // setLocalRole(role);
    console.log(localRole, responseRole, "rolesssssssss");
    console.log("role", role);
  };
  return { roleCheck };
};

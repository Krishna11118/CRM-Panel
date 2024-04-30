import { Outlet, Navigate } from "react-router-dom";
import { useAuthRouter } from "../Auth/useAuth";
// import { useAuth } from "../../context/AuthContext";

function PrivateRoutes() {
  const token = useAuthRouter();
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
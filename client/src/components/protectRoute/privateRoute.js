import { Outlet, Navigate } from "react-router-dom";
import { useAuthRouter } from "../auth/useAuth";

function PrivateRoutes() {
  const token = useAuthRouter();
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;



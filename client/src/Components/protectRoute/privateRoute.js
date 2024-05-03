import { Outlet, Navigate } from "react-router-dom";
import { useAuthRouter } from "../Auth/useAuth";

function PrivateRoutes() {
  const token = useAuthRouter();
  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;

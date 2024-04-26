import { Outlet, Navigate } from "react-router-dom";
import { useAuthRouter } from "../Auth/useAuth";

function PublicRoutes() {
  const token = useAuthRouter();
  return token ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;

import { Outlet, Navigate } from "react-router-dom";
import { useAuthRouter } from "../auth/useAuth";

function PublicRoutes() {
  const token = useAuthRouter();
  return token ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;

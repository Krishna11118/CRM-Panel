//Router

import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Login from "../components/pages/user/Login";
import Register from "../components/pages/user/Register";
import PrivateRoutes from "../components/protectRoute/privateRoute";
import PublicRoutes from "../components/protectRoute/publicRoute";
import { useAuth } from "../context/AuthContext";
import AdminLogin from "../components/pages/admin/AdminLogin";
import Layout from "../components/layout/Layout";
import { useAuthRouter } from "../components/auth/useAuth";
import Skelton from "../components/pages/Skelton";
import SubAdminLogin from "../components/pages/subAdmin/SubAdminLogin";

function Routers() {
  const { user } = useAuth();
  const token = useAuthRouter();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {token && user && <Layout />}
        {token && !user && <Skelton />}

        <Routes>
          <Route element={<Outlet />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" />
            <Route path="/dashboard" />
            <Route path="/subAdmins" />
            <Route path="/users" />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route element={<Login />} path="/login" />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/subAdmin/login" element={<SubAdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Routers;

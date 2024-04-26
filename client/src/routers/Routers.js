import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Login from "../Components/pages/user/Login";
import Register from "../Components/pages/user/Register";
import PrivateRoutes from "../Components/protectRoute/privateRoute";
import PublicRoutes from "../Components/protectRoute/publicRoute";
import { useAuth } from "../context/AuthContext";
import AdminLogin from "../Components/pages/admin/AdminLogin";
import Layout from "../Components/layout/Layout";
import { useAuthRouter } from "../Components/Auth/useAuth";
import Skelton from "../Components/pages/Skelton";

function Routers() {
  const { user } = useAuth();
  const token = useAuthRouter();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {token && user && <Layout />}
        {token && !user && <Skelton />}

        <Routes>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Routers;

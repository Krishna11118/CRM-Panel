import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import News from "../Components/pages/News";
import Performance from "../Components/pages/Performance";
import Support from "../Components/pages/Support";
import PrivateRoutes from "../Components/protectRoute/privateRoute";
import Dashboard from "../Components/pages/Dashboard";
import Profile from "../Components/pages/Profile";

const RightSideRouter = () => {
  return (
    <Routes>
      <Route element={<Outlet />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/" />
        <Route element={<News />} path="/subAdmins" />
        <Route element={<Performance />} path="/users" />
        <Route element={<Support />} path="/support" />
        <Route element={<Profile />} path="/profile" />
      </Route>
    </Routes>
  );
};

export default RightSideRouter;

import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Support from "../Components/pages/Support";
import PrivateRoutes from "../Components/protectRoute/privateRoute";

//-----------------------------------------------------main pages
import Dashboard from "../Components/pages/Dashboard";
import SubAdmin from "../Components/pages/subAdmin/SubAdmin";
import Users from "../Components/pages/user/Users";
import SubAdminProfile from "../Components/pages/subAdmin/SubAdminProfile";
import UserProfile from "../Components/pages/user/UserProfile";
import LaunchingUI from "../Components/LaunchingUI";
const RightSideRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/" />
        <Route element={<SubAdmin />} path="/subAdmins" />
        <Route element={<Users />} path="/users" />
        <Route element={<Support />} path="/support" />
        <Route
          element={<SubAdminProfile />}
          path="/subAdmin/profile/:subAdminId"
        />
        <Route element={<LaunchingUI />} path="/messages" />
        <Route element={<LaunchingUI />} path="/analytics" />
        <Route element={<LaunchingUI />} path="/settings" />
      </Route>
    </Routes>
  );
};

export default RightSideRouter;

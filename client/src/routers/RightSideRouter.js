import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Support from "../components/pages/Support";
import PrivateRoutes from "../components/protectRoute/privateRoute";

//-----------------------------------------------------main pages
import Dashboard from "../components/pages/Dashboard";
import SubAdmin from "../components/pages/subAdmin/SubAdmin";
import Users from "../components/pages/user/Users";
import SubAdminProfile from "../components/pages/subAdmin/SubAdminProfile";
import UserProfile from "../components/pages/user/UserProfile";
import LaunchingUI from "../components/LaunchingUI";
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
        <Route
          element={<UserProfile />}
          path="/user/profile/:userId"
        />
        <Route element={<LaunchingUI />} path="/messages" />
        <Route element={<LaunchingUI />} path="/analytics" />
        <Route element={<LaunchingUI />} path="/settings" />
      </Route>
    </Routes>
  );
};

export default RightSideRouter;

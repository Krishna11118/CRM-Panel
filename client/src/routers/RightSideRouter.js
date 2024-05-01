import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Support from "../Components/pages/Support";
import PrivateRoutes from "../Components/protectRoute/privateRoute";
import Profile from "../Components/pages/Profile";

//-----------------------------------------------------main pages
import Dashboard from "../Components/pages/Dashboard";
import SubAdmin from "../Components/pages/subAdmin/SubUserData";
import Users from "../Components/pages/user/Users";



const RightSideRouter = () => {
  return (
    <Routes>
      <Route element={<Outlet />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/" />
        <Route element={<SubAdmin />} path="/subAdmins" />
        <Route element={<Users />} path="/users" />
        <Route element={<Support />} path="/support" />
        <Route element={<Profile />} path="/profile" />
      </Route>
    </Routes>
  );
};

export default RightSideRouter;

import { React, useEffect } from "react";
import { useState } from "react";
import {
  FaBars,
  FaUser,
  FaComments,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUser, isOpen, setIsOpen, role, logout } = useAuth();
  const [hideForSubAdmin, setHideForSubAdmin] = useState(false);
  const [hideForUser, setHideForUser] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dashboardButton = () => {
    navigate("/");
  };

  const subAdminsButton = () => {
    navigate("/subAdmins");
  };

  const usersButton = () => {
    navigate("/users");
  };

  const messagesButton = () => {
    setIsDropdownOpen(!isDropdownOpen);
    navigate("/messages");
  };

  const logoutButton = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    if (role === "user") {
      setHideForUser(true);
    }
    if (role === "subAdmin") {
      setHideForSubAdmin(true);
    }
  }, []);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content cursor-pointer">
        {" "}
        <div className="logo-details ">
          <div className="logo_name">Dashboard</div>
          <FaBars id="btn" color="white" onClick={toggleSidebar} />
        </div>
        <div className="sidebar-top-bottom">
          {" "}
          <ul className="nav-list">
            {/* ------------------------------------Dashboard */}
            <li onClick={dashboardButton} className="cursor-pointer">
              <a>
                <FaChartPie color="white" />
                <span className="links_name">Dashboard</span>
              </a>
              <span className="tooltip">Dashboard</span>
            </li>

            {/* ------------------------------------Sub admin */}
            {!hideForUser && !hideForSubAdmin && (
              <li onClick={subAdminsButton}>
                <a>
                  <FaUser className="sidebar-icon" color="white" />
                  <span className="links_name">Sub Admins</span>
                </a>
                <span className="tooltip">Sub Admins</span>
              </li>
            )}

            {/* ----------------------------------------Users */}
            {!hideForUser && (
              <li className="sidebar-text-list" onClick={usersButton}>
                <a>
                  <FaUsers className="sidebar-icon" color="white" />
                  {/* <FaChartPie className="sidebar-icon" color="white" /> */}
                  <span className="links_name">Users</span>
                </a>
                <span className="tooltip">Users</span>
              </li>
            )}

            {/* ---------------------------------------Messages */}
            <li className="sidebar-text-list">
              <a onClick={messagesButton}>
                <FaComments className="sidebar-icon" color="white" />
                <span className="links_name ">Messages </span>
                <RiArrowDropDownLine
                  color="white"
                  size={30}
                  className="dropdown-dropdown-icon"
                />
              </a>
              <span className="tooltip">Messages</span>

              {/* ---------------------------------------Dropdown */}
              {isDropdownOpen && (
                <div className="dropdown">
                  <ul className={isDropdownOpen ? "dropdown-open" : ""}>
                    <li>
                      <div className="sidebar-dropdown-div">
                        <a>
                          <FaChartPie
                            className="sidebar-dropdown-icon"
                            color="white"
                          />
                          <span className="links_name">Analytics</span>
                        </a>
                        <span className="dropdown-tooltip">Analytics</span>
                      </div>
                    </li>
                    <li>
                      <div className="sidebar-dropdown-div">
                        <a>
                          <FaChartPie
                            className="sidebar-dropdown-icon"
                            color="white"
                          />
                          <span className="links_name">Analytics</span>
                        </a>
                        <span className="dropdown-tooltip">Analytics</span>
                      </div>
                    </li>
                    <li>
                      <div className="sidebar-dropdown-div">
                        <a>
                          <FaChartPie
                            className="sidebar-dropdown-icon"
                            color="white"
                          />
                          <span className="links_name">Analytics</span>
                        </a>
                        <span className="dropdown-tooltip">Analytics</span>
                      </div>
                    </li>
                    <li className="divider"></li>
                  </ul>
                </div>
              )}
              <span className="tooltip">Messages</span>
            </li>

            {/* -----------------------------------Analytics */}
            <li className="sidebar-text-list">
              <a>
                <FaChartPie className="sidebar-icon" color="white" />
                <span className="links_name">Analytics</span>
              </a>
              <span className="tooltip">Analytics</span>
            </li>

            {/* ---------------------------------------Setting */}
            <li className="sidebar-text-list">
              <a>
                <FaCog color="white" />
                <span className="links_name">Setting</span>
              </a>
              <span className="tooltip">Setting</span>
            </li>
          </ul>
          {/* ---------------------------------------Logout */}
          <li
            className="sidebar-text-list sidebar-logout-button "
            onClick={logoutButton}
          >
            <a>
              <FaSignOutAlt color="white" />
              <span className="links_name">Logout</span>
            </a>
            <span className="tooltip">Logout</span>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

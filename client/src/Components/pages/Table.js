import React, { useState } from "react";
import DetailedProfile from "./DetailedProfile";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("stats");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w[100%] bg-custom-600 mt-4 border-none border-gray-200 ml-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="bg-custom-500 text-white text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={activeTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
          <option value="stats">Statistics</option>
          <option value="about">Services</option>
          <option value="faq">FAQ</option>
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200  sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        <li className="w-full">
          <button
            id="stats-tab"
            data-tabs-target="#stats"
            type="button"
            role="tab"
            aria-controls="stats"
            aria-selected={activeTab === "stats"}
            className={`inline-block w-full p-4 text-white rounded-ss-lg bg-custom-500 hover:bg-custom-900 hover:shadow-lg focus:outline-none ${
              activeTab === "stats"
                ? "dark:bg-gray-700 dark:hover:bg-gray-600"
                : ""
            }`}
            onClick={() => handleTabClick("stats")}
          >
            Profile
          </button>
        </li>
        <li className="w-full">
          <button
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected={activeTab === "about"}
            className={`inline-block w-full text-white p-4 bg-custom-500 hover:bg-custom-900 focus:outline-none ${
              activeTab === "about"
                ? "dark:bg-gray-700 dark:hover:bg-gray-600"
                : ""
            }`}
            onClick={() => handleTabClick("about")}
          >
            Update Profile
          </button>
        </li>
        <li className="w-full">
          <button
            id="faq-tab"
            data-tabs-target="#faq"
            type="button"
            role="tab"
            aria-controls="faq"
            aria-selected={activeTab === "faq"}
            className={`inline-block w-full text-white p-4 rounded-se-lg bg-custom-500 hover:bg-custom-900 focus:outline-none ${
              activeTab === "faq"
                ? "dark:bg-gray-700 dark:hover:bg-gray-600"
                : ""
            }`}
            onClick={() => handleTabClick("faq")}
          >
            Update Permissions
          </button>
        </li>
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className={`${
            activeTab === "stats" ? "" : "hidden"
          } p-4 bg-white  md:p-8 dark:bg-gray-800`}
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <DetailedProfile />
        </div>
        <div
          className={`${
            activeTab === "about" ? "" : "hidden"
          } p-4 bg-white md:p-8 dark:bg-gray-800`}
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          {/* Services content */}
          <p>Services tab content</p>
        </div>
        <div
          className={`${
            activeTab === "faq" ? "" : "hidden"
          } p-4 bg-white dark:bg-gray-800`}
          id="faq"
          role="tabpanel"
          aria-labelledby="faq-tab"
        >
          {/* FAQ content */}
          <p>FAQ tab content</p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

import { React, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useAuth } from "../../context/AuthContext";
import DashboardChart from "../chart/DashboardChart";

const Dashboard = () => {
  return (
    <>
      <div className=" pr-4">
        {/* <div>
          {" "}
          <CountUp
            start={0}
            end={totalSubAdmins}
            duration={2.75}
            separator=" "
          />
        </div> */}

        {/* <Table /> */}
        <DashboardChart />
      </div>
    </>
  );
};

export default Dashboard;

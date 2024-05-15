import { React, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useAuth } from "../../context/AuthContext";
import DashboardChart from "../chart/DashboardChart";

const Dashboard = () => {
  const [hideForUser, setHideForUser] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    if (role === "admin") {
      setHideForUser(true);
    }
  }, [role]);
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
        {hideForUser && <DashboardChart />}
      </div>
    </>
  );
};

export default Dashboard;

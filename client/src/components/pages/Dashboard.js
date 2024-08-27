import { React, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useAuth } from "../../context/AuthContext";
import DashboardChart from "../chart/DashboardChart";
import GradientBackground from "../../lib/neatGradients";

const Dashboard = () => {
  const [hideForUser, setHideForUser] = useState(false);
  const [hideForAdmin, setHideForAdmin] = useState(false);

  const { role } = useAuth();

  useEffect(() => {
    if (role === "admin" || role === "subAdmin") {
      // console.log("admin admin", role);

      setHideForUser(true);
    }
    if (role === "user") {
      console.log("user user", role);
      setHideForAdmin(true);
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
        {/* {hideForUser && <DashboardChart />} */}

        {hideForAdmin && (
          <GradientBackground text="We're launching soon...">
            <div className="p-4 text-center "></div>
          </GradientBackground>
        )}

        {hideForUser && (
          <GradientBackground text="Pie Chart">
            <div className="p-4 text-center ">
              <DashboardChart />
            </div>
          </GradientBackground>
        )}
      </div>
    </>
  );
};

export default Dashboard;

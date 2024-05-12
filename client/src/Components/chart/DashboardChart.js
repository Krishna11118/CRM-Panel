import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAdminApiHook } from "../../hooks/adminApiHooks";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import config from "../../Config/Config";

const BasicPie = () => {
  // const { chartData, data } = useAdminApiHook();
  const [totalSubAdmins, setTotalSubAdmins] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const chartData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${config.endpoint}/admin/subAdmin/data`, {
          headers: {
            authorization: token,
          },
        });
        console.log(res.data);
        setTotalSubAdmins(res.data.length);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    const userChartData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${config.endpoint}/admin/user/data`, {
          headers: {
            authorization: token,
          },
        });
        console.log(res.data);
        setTotalUsers(res.data.length);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    userChartData();
    chartData();
  }, [token]);

  const data = [
    { id: 0, value: totalSubAdmins, label: "Total Sub Admin" },
    { id: 1, value: totalUsers, label: "Total Users" },
  ];

  return (
    <div className="flex justify-center items-center pt-8 text-white">
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 360,
            // cx: 150,
            // cy: 150,
          },
        ]}
        height={500}
        width={500}
        textColor="white"
      />
    </div>
  );
};

export default BasicPie;

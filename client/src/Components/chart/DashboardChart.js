import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../Config/Config";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const BasicPie = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, role } = useAuth();

  //---------------------------user & subAdmin chart data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let totalSubAdmins = 0;
        let totalUsers = 0;
        if (role === "admin") {
          const subAdminRes = await axios.get(
            `${config.endpoint}/admin/subAdmin/data`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          totalSubAdmins = subAdminRes.data.length;
        }
        const userRes = await axios.get(
          `${config.endpoint}/${role}/user/data`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        totalUsers = userRes.data.length;

        const chartData =
          role === "admin"
            ? [
                { id: 0, value: totalSubAdmins, label: "Total Sub Admin" },
                { id: 1, value: totalUsers, label: "Total Users" },
              ]
            : [{ id: 0, value: totalUsers, label: "Total Users" }];

        setData(chartData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [token, role]);

  return (
    <div className="flex justify-center items-center pt-8 text-white">
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <PieChart
          className="custom-chart"
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
      )}
    </div>
  );
};

export default BasicPie;

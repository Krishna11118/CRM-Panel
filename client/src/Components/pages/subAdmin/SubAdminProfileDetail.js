import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../Config/Config";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { IoPersonCircle } from "react-icons/io5";
import ProfileDetails from "../../common/Profile/ProfileDetails";

const SubAdminProfileDetail = () => {

  const [loading, setLoading] = useState(true);
  const { getFromLocalStorage } = useLocalStorage();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const { subAdminId } = useParams();
  const [resRole, setResRole] = useState("");

  // -----------------------------------------Fetch Single SubAdmin Details----------------------------------
  useEffect(() => {
    const token = getFromLocalStorage("token");
    const fetchSubAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${config.endpoint}/admin/subAdmin/single/${subAdminId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setName(response.data.fname);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        setResRole(response.data.role[0]);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching car details:", error);
        setLoading(false);
      }
    };
    fetchSubAdminDetails();
  }, [subAdminId]);

  return <ProfileDetails name={name} resRole={resRole} mobile={mobile} email={email} />;

};

export default SubAdminProfileDetail;

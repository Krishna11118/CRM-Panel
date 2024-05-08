import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../Config/Config";
import { useLocalStorage } from "../../../utils/LocalStorage";
import ProfileDetails from "../../common/Profile/ProfileDetails";

const UserProfileDetail = () => {
  const [loading, setLoading] = useState(true);
  const { getFromLocalStorage } = useLocalStorage();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const { userId } = useParams();
  const [resRole, setResRole] = useState("");

  // -----------------------------------------Fetch Single SubAdmin Details----------------------------------
  useEffect(() => {
    const token = getFromLocalStorage("token");
    const fetchSubAdminDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${config.endpoint}/admin/user/single/${userId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        console.log("response", response.data);
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
  }, [userId]);

  return <ProfileDetails name={name} resRole={resRole} mobile={mobile} email={email} />;

};

export default UserProfileDetail;

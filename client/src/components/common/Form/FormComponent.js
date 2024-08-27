import React, { useState } from "react";
import CustomButton from "../../common/buttons/CustomButton";
import Button from "@mui/material/Button";

const FormComponent = ({ onSubmit, buttonText }) => {
  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    onSubmit(fname, mobile, email, password);
  };

  return (
    <div>
      <div className="gap-7 flex justify-center items-center">
        <div>
          <div className="py-4">
            <input
              className=" bg-custom-600 rounded-lg py-2 px-4 text-white  "
              type="text"
              id="name"
              placeholder="Update Name"
              value={fname}
              onChange={(event) => setfName(event.target.value)}
              required
            />
          </div>

          <div className="py-4">
            <input
              className=" bg-custom-600 rounded-lg py-2 px-4 text-white  "
              type="number"
              id="mobile"
              placeholder="Update Mobile No"
              value={mobile}
              onChange={(event) => setmobile(event.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <div className="py-4">
            <input
              className=" bg-custom-600 rounded-lg py-2 px-4 text-white  "
              type="email"
              placeholder="Update Email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="py-4">
            <input
              className=" bg-custom-600 rounded-lg py-2 px-4 text-white   "
              id="password"
              type="password"
              placeholder="Update Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>
      </div>
{/* //--------------------------------Button */}
      <div className="w-full">
        <div className="flex justify-center items-center  font-medium ">
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="bg-custom-400 hover:shadow  hover:bg-blue-700 rounded"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;

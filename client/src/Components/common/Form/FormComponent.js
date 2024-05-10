import React, { useState } from "react";
import CustomButton from "../../common/buttons/CustomButton";
import { TextInput } from "flowbite-react";

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
            <input className=" bg-custom-600 rounded-lg py-2 px-4 text-white  "
              type="text"
              id="name"
              placeholder="Update Name"
              value={fname}
              onChange={(event) => setfName(event.target.value)}
              required
            />
          </div>

          <div className="py-4">
          <input className=" bg-custom-600 rounded-lg py-2 px-4 text-white  "
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
          <input className=" bg-custom-600 rounded-lg py-2 px-4 text-white  "
              type="email"
              placeholder="Update Email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="py-4">
          <input className=" bg-custom-600 rounded-lg py-2 px-4 text-white   "
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
      <div>
        <div onClick={handleSubmit}>
          <CustomButton
            text={buttonText}
            customClass="bg-blue-600 hover:bg-blue-700 hover:shadow-lg rounded-lg text-white font-semibold cursor-pointer py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default FormComponent;

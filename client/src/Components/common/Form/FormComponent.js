import { TextInput } from "flowbite-react";
import { useState } from "react";
import CustomButton from "../../common/buttons/CustomButton";

const FormComponent = ({ onSubmit, buttonText }) => {
  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    onSubmit(fname, mobile, email, password);
  };

  return (
    <div className="">
      <div className="space-y-2">
        <div>
          <TextInput
            id="name"
            placeholder="Full Name"
            value={fname}
            onChange={(event) => setfName(event.target.value)}
            required
          />
        </div>

        <div>
          <TextInput
            id="mobile"
            placeholder="Mobile No"
            value={mobile}
            onChange={(event) => setmobile(event.target.value)}
            required
          />
        </div>

        <div>
          <TextInput
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <TextInput
            id="password"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

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

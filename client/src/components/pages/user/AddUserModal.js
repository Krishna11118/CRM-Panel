import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import CustomButton from "../../common/buttons/CustomButton";
import { useUserApiHooks } from "../../../hooks/userApiHooks";
import { Validation } from "../../../utils/Validations";
import { FaStarOfLife } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import { useAuth } from "../../../context/AuthContext";

const AddUserModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const { handleCreatUser } = useAdminApiHook();

  function onCloseModal() {
    setOpenModal(false);
  }
  const { registerUserValidation } = Validation();

  //--------------------------------------Create SubUsers
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerUserValidation(fname, email, mobile, password)) {
      return;
    } else {
      handleCreatUser(fname, mobile, email, password);
    }
    setOpenModal(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        variant="contained"
        color="primary"
        starticon={<AiOutlineUserAdd />}
        style={{ margin: "10px" }}
        className=" bg-custom-600 ml-6 hover:shadow-lg text-white font-bold py-1 px-2 "
      >
        <AiOutlineUserAdd className="mr-2" size={20} /> Add User
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className="bg-black bg-opacity-70 "
      >
        <Modal.Header className="bg-custom-500 shadow-lg" />
        <Modal.Body className="bg-custom-600">
          <div className="space-y-2 ">
            <h3 className="text-xl font-medium text-white " color="primary">
              Create user
            </h3>

            <div>
              <div className="mb-2 block flex pt-2">
                <FaStarOfLife color="red" size={8} />
                <Label
                  htmlFor="name"
                className="text-white font-light"
                  value=" Name"
                />{" "}
              </div>
              <input
                className=" bg-custom-700 rounded-lg py-2 px-4 text-white w-full py-2 "
                type="text"
                id="name"
                placeholder="Full Name"
                value={fname}
                onChange={(event) => setfName(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block flex pt-2">
                <FaStarOfLife color="red" size={8} />

                <Label
                  htmlFor="mobile"
                  value="Mobile No"
                  className="text-white font-light"
                />
              </div>
              <input
                className=" bg-custom-700 rounded-lg py-2 px-4 text-white w-full py-2 "
                type="number"
                id="mobile"
                placeholder="Mobile No"
                value={mobile}
                onChange={(event) => setmobile(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block flex pt-2">
                <FaStarOfLife color="red" size={8} />
                <Label
                  htmlFor="email"
                  value="E-mail"
                  className="text-white font-light"
                />
              </div>

              <input
                className=" bg-custom-700 rounded-lg py-2 px-4 text-white w-full py-2 "
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mb-2 block flex pt-2">
              <FaStarOfLife color="red" size={8} />
              <Label
                htmlFor="password"
                value=" Password"
                className="text-white font-light"
              />
            </div>
            <input
              className=" bg-custom-700 rounded-lg py-2 px-4 text-white w-full py-2 "
              id="password"
              type="Password"
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className="w-full pt-4">
              <div className="flex justify-center items-center  font-medium ">
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  className="bg-blue-700 hover:shadow uppercase shadow-md hover:bg-blue-600 rounded"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUserModal;

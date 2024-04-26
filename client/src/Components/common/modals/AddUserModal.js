import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import CustomButton from "../buttons/CustomButton";
import { useApiHooks } from "../../../hooks/useApiHooks";
import { Validation } from "../../validation/Validation";
import { FaStarOfLife } from "react-icons/fa";
import { Dropdown } from "flowbite-react";

const AddUserModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");
  // const [subAdminRole, setSubAdminRole] = useState("");
  // const [userdRole, setUserRole] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }
  const { handleSubmit , handleSubmitSubAdmin} = useApiHooks();
  const { registerUserValidation } = Validation();

  //--------------------------------------Create SubUsers
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerUserValidation(fname, email, mobile, password, role)) {
      return;
    } else {
      if (role === "user") {
        handleSubmit(fname, mobile, email, password, role);
      } else {
        handleSubmitSubAdmin(fname, mobile, email, password, role);
      }
    }
    setOpenModal(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        variant="contained"
        color="primary"
        startIcon={<AiOutlineUserAdd />}
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
                  className="text-white"
                  value=" Name"
                />{" "}
              </div>
              <TextInput
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
                  className="text-white"
                />
              </div>
              <TextInput
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
                <Label htmlFor="email" value="E-mail" className="text-white" />
              </div>
              <TextInput
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block flex pt-2">
                <FaStarOfLife color="red" size={8} />
                <Label
                  htmlFor="password"
                  value=" Password"
                  className="text-white"
                />
              </div>
              <TextInput
                className="py-2"
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <div className="mb-2 block flex pt-2">
                <FaStarOfLife color="red" size={8} />
                <Label htmlFor="password" value="Role" className="text-white" />
              </div>

              <div className="bg-custom-800 w-[37%] rounded-md">
                <Dropdown
                  label="Select role"
                  className="bg-custom-500 shadow-md border-0"
                >
                  <Dropdown.Item
                    className="text-white hover:text-black"
                    value={role}
                    onClick={() => setRole("subAdmin")}
                  >
                    Sub Admin
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-white hover:text-black"
                    value={role}
                    onClick={() => setRole("user")}
                  >
                    User
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div onClick={handleRegister}>
              <CustomButton
                text="Create User"
                customClass="bg-blue-600 hover:bg-blue-700 hover:shadow-lg rounded-lg text-white font-semibold cursor-pointer py-2 px-4"
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUserModal;

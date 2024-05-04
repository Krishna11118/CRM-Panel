import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import CustomButton from "../buttons/CustomButton";
import { Validation } from "../../../utils/Validations";
import { FaStarOfLife } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import { useAuth } from "../../../context/AuthContext";
import { TableRow, TableCell, Avatar } from "@mui/material";

const AddUserModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const { handleCreateSubAdmin } = useAdminApiHook();

  function onCloseModal() {
    setOpenModal(false);
  }
  //--------------------------------------validate inputs
  const { registerUserValidation } = Validation();

  //--------------------------------------Create SubUsers
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerUserValidation(fname, email, mobile, password)) {
      return;
    } else {
      handleCreateSubAdmin(fname, mobile, email, password);
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
        <AiOutlineUserAdd className="mr-2" size={20} /> Add Sub Admin
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className="bg-black bg-opacity-70   "
      >
        <div className="w-[36rem]">
          <Modal.Header className="bg-custom-500 shadow-lg   " />
          <div className="flex ">
          {/* -------------------------------------Create SubAdmin */}
            <div>
              <Modal.Body className="bg-custom-600">
                <div className="space-y-2 pt-4">
                  <h3
                    className="text-xl font-medium text-white "
                    color="primary"
                  >
                    Create Sub Admin
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
                      <Label
                        htmlFor="email"
                        value="E-mail"
                        className="text-white"
                      />
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

                    {/* <div className="mb-2 block flex pt-2">
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
              </div> */}
                  </div>
                  <div onClick={handleRegister}>
                    <CustomButton
                      text="Create User"
                      customClass="bg-blue-600 hover:bg-blue-700 hover:shadow-lg rounded-lg text-white font-semibold cursor-pointer py-2 px-4"
                    />
                  </div>
                </div>
              </Modal.Body>
            </div>
            <div>
              {/*----------------------------------------Permissions */}
              <Modal.Body className="bg-custom-600 h-[100%]" >
                <div className="space-y-2 pt-4">
                  <h3
                    className="text-xl font-medium text-white "
                    color="primary"
                  >
                    Permissions
                  </h3>

                  <TableCell className="text-white flex justify-between items-center ">
                    <div className="text-blue-400 pr-4 text-base ">
                      {" "}
                      Create User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        // checked={user.isActive}
                        checked="false"
                        // onChange={() => handleStatus(user._id)}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-gray-400"
                      ></div>
                    </label>
                  </TableCell>

                  <TableCell className="text-white flex justify-between items-center">
                    <div className="text-blue-400 pr-4 text-base ">
                      {" "}
                      Read User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        // checked={user.isActive}
                        checked="false"
                        // onChange={() => handleStatus(user._id)}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-gray-400"
                      ></div>
                    </label>
                  </TableCell>

                  <TableCell className="text-white flex justify-between items-center">
                    <div className="text-blue-400 pr-4 text-base ">
                      {" "}
                      Update User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        // checked={user.isActive}
                        checked="false"
                        // onChange={() => handleStatus(user._id)}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-gray-400"
                      ></div>
                    </label>
                  </TableCell>

                  <TableCell className="text-white flex justify-between items-center">
                    <div className="text-blue-400 pr-4 text-base ">
                      {" "}
                      Change Status
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        // checked={user.isActive}
                        checked="false"
                        // onChange={() => handleStatus(user._id)}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-gray-400"
                      ></div>
                    </label>
                  </TableCell>

                  <TableCell className="text-white flex justify-between items-center">
                    <div className="text-blue-400 pr-4 text-base ">
                      {" "}
                      Delete User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        // checked={user.isActive}
                        checked="false"
                        // onChange={() => handleStatus(user._id)}
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 rounded-full
                                    peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                 after:h-5 after:w-5 after:transition-all dark:border-green-400 peer-checked:bg-gray-400"
                      ></div>
                    </label>
                  </TableCell>
                </div>
              </Modal.Body>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModal;

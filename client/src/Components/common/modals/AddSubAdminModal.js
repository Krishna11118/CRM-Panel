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
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

const AddUserModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fname, setfName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const { handleCreateSubAdmin } = useAdminApiHook();
  const [createUserPermission, setCreateUserPermission] = useState(true);
  const [readUserPermission, setReadUserPermission] = useState(true);
  const [updateUserPermission, setUpdateUserPermission] = useState(true);
  const [changeStatusPermission, setChangeStatusPermission] = useState(true);
  const [deleteUserPermission, setDeleteUserPermission] = useState(true);

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
      handleCreateSubAdmin(fname, mobile, email, password, {
        createUser: createUserPermission,
        readUser: readUserPermission,
        updateUser: updateUserPermission,
        changeStatus: changeStatusPermission,
        deleteUser: deleteUserPermission,
      });
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
        <AiOutlineUserAdd className="mr-2" size={20} /> Create Sub Admin
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        className="bg-black bg-opacity-70   "
      >
        {/* --------------------------------------Modal Header */}
        <div className="w-[119.3%]">
          <Modal.Header className="bg-custom-500 shadow-lg   " />
          <div className="flex ">
            {/* -------------------------------------Create SubAdmin */}
            <div>
              <Modal.Body className="bg-custom-600">
                <div className="space-y-2 pt-4">
                  <div className="flex justify-around items-center">
                    <IoIosCreate color="white" size={20} />
                    <h3
                      className="text-xl font-medium text-white "
                      color="primary"
                    >
                      Create Sub Admin
                    </h3>
                  </div>

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
                  </div>
                  <div onClick={handleRegister}>
                    <CustomButton
                      text="Create"
                      customClass="bg-blue-600 hover:bg-blue-700 hover:shadow-lg rounded-lg text-white font-semibold cursor-pointer py-2 px-4"
                    />
                  </div>
                </div>
              </Modal.Body>
            </div>
            <div className="border-l-2 border-gray-600"></div>
            <div>
              {/*----------------------------------------Permissions */}
              <Modal.Body className="bg-custom-600 h-[100%]">
                <div className="space-y-2 pt-4 ">
                  <div className="flex justify-around items-center pb-4">
                    <MdOutlineSecurity color="white" size={20} />
                    <h3
                      className="text-xl font-medium text-white "
                      color="primary"
                    >
                      Permissions
                    </h3>
                  </div>

                  <TableCell className="text-white flex justify-between items-center border-none ">
                    <div className="text-blue-400 pr-4  text-sm ">
                      Create User
                    </div>
                    <label className="inline-flex items-center cursor-pointer border-none">
                      <input
                        type="checkbox"
                        checked={createUserPermission}
                        onChange={() =>
                          setCreateUserPermission(!createUserPermission)
                        }
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

                  <TableCell className="text-white flex justify-between items-center border-none">
                    <div className="text-blue-400 pr-4 text-sm ">
                      {" "}
                      Read User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        checked={readUserPermission}
                        onChange={() =>
                          setReadUserPermission(!readUserPermission)
                        }
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

                  <TableCell className="text-white flex justify-between items-center border-none">
                    <div className="text-blue-400 pr-4 text-sm ">
                      {" "}
                      Update User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        checked={updateUserPermission}
                        onChange={() =>
                          setUpdateUserPermission(!updateUserPermission)
                        }
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

                  <TableCell className="text-white flex justify-between items-center border-none">
                    <div className="text-blue-400 pr-4 text-sm ">
                      {" "}
                      Change Status
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={changeStatusPermission}
                        onChange={() =>
                          setChangeStatusPermission(!changeStatusPermission)
                        }
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

                  <TableCell className="text-white flex justify-between items-center border-none">
                    <div className="text-blue-400 pr-4 text-sm ">
                      {" "}
                      Delete User
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        checked={deleteUserPermission}
                        onChange={() =>
                          setDeleteUserPermission(!deleteUserPermission)
                        }
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

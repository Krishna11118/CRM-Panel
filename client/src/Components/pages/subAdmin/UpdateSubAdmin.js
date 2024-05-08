import FormComponent from "../../common/Form/FormComponent";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";

const UpdateSubAdmin = () => {
  const { handleUpdateSubAdmin } = useAdminApiHook();

  //--------------------------------------Create SubUsers
  const handleRegister = async (fname, mobile, email, password) => {
    await handleUpdateSubAdmin(fname, mobile, email, password);
  };

  return (
    <>
      <FormComponent onSubmit={handleRegister} buttonText="Create User" />
    </>
  );
};

export default UpdateSubAdmin;

import React from "react";
import FormComponent from "../../common/Form/FormComponent";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import { Validation } from "../../../utils/Validations";
import { useParams } from "react-router-dom";

const UserUpdate = () => {
  
  const { handleUpdateUser } = useAdminApiHook();
  const { profileUpdateValidation } = Validation();
  const { userId } = useParams();

  //--------------------------------------Update SubAdmin
  const handleUpdate = async (fname, mobile, email, password) => {
    if (!profileUpdateValidation(fname, email, mobile, password)) {
      return;
    }
    await handleUpdateUser(userId, fname, mobile, email, password );
  };

  return (
    <>
      <FormComponent onSubmit={handleUpdate} buttonText="Update " />
    </>
  );
};

export default UserUpdate;

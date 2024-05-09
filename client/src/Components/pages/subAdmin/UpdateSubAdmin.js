import React from "react";
import FormComponent from "../../common/Form/FormComponent";
import { useAdminApiHook } from "../../../hooks/adminApiHooks";
import { Validation } from "../../../utils/Validations";
import { useParams } from "react-router-dom";

const UpdateSubAdmin = () => {
  const { handleUpdateSubAdmin } = useAdminApiHook();
  const { profileUpdateValidation } = Validation();
  const { subAdminId } = useParams();

  //--------------------------------------Update SubAdmin
  const handleUpdate = async (fname, mobile, email, password) => {
    if (!profileUpdateValidation(fname, email, mobile, password)) {
      return;
    }
    await handleUpdateSubAdmin(subAdminId, fname, mobile, email, password );
  };

  return (
    <>
      <FormComponent onSubmit={handleUpdate} buttonText="Update User" />
    </>
  );
};

export default UpdateSubAdmin;

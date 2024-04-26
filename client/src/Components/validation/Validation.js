import { toast } from "react-hot-toast";

export const Validation = () => {
  const registerUserValidation = (
    fname,
    email,
    mobile,
    password,
    role
  ) => {
    let isValid = true;

    if (!fname.trim()) {
      isValid = false;
      toast.error("Please enter your full name");
    } else if (!email.trim()) {
      isValid = false;
      toast.error("Please enter your email address");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      toast.error("Please enter a valid email address");
    } else if (!mobile.trim()) {
      isValid = false;
      toast.error("Please enter your mobile number");
    } else if (!/^\d{10}$/.test(mobile)) {
      isValid = false;
      toast.error("Please enter a valid 10-digit mobile number");
    } else if (!password.trim()) {
      isValid = false;
      toast.error("Please enter your password");
    } else if (password.trim().length < 6) {
      isValid = false;
      toast.error("Password must be at least 6 characters long");
    } else if (!role.trim()) {
      isValid = false;
      toast.error("Please select a Role");
    }

    return isValid;
  };

  return { registerUserValidation };
};

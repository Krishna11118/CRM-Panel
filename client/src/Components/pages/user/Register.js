import React, { useState } from "react";
import { Image, Form, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../../Styles/style.css";
import Img from "../../../Assets/wave.png";
import { FaUser } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { AiFillMobile } from "react-icons/ai";
import { useApiHooks } from "../../../hooks/useApiHooks";

const Register = () => {
  const { data, error, loading, handleSubmit } = useApiHooks();

  const [formData, setFormData] = useState({
    fname: "",
    mobile: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // ------------------------------------Set form data------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ------------------------------------Update user-------------------------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    handleSubmit(
      formData.fname,
      formData.mobile,
      formData.email,
      formData.password
    );
    data &&
      loading === false &&
      navigate("/login") &&
      toast.success(data.message);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <Link to="/login">
          <div className="signInButton">
            <Form.Group>
              <Button variant="info">LOGIN</Button>
            </Form.Group>
          </div>
          <div className="box-img">
            <Image src={Img} fluid />
          </div>
        </Link>
        <div className="user-main-icon">
          <FaRegCircleUser color="#c3c5c7" size="100" />
        </div>

        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formFullName">
            <InputGroup className="mb-3">

              <Form.Control className="w-[100%]"
                type="text"
                name="fname"
                placeholder="Full name"
                value={formData.fname}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="mobileNo">
            <InputGroup className="mb-3">
             
              <Form.Control className="w-[100%]"
                type="tel"
                name="mobile"
                placeholder="Mobile no"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <InputGroup className="mb-3">
             
              <Form.Control className="w-[100%]"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formPswd">
            <InputGroup className="mb-3">
             
              <Form.Control className="w-[100%]"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Button
              disabled={loading}
              className="loginButton w-100 my-2"
              variant="info"
              type="submit"
            >
              {loading ? "Signing Up..." : "SIGN UP"}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;

// login
import React, { useState } from "react";
import { Image, Form, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../../Styles/style.css";
import Img from "../../../Assets/wave.png";
import { IconContext } from "react-icons";
import { useAuth } from "../../../context/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from "axios";
import config from "../../../Config/Config";
import { validateInput } from "../../../utils/Validations";
import { useLocalStorage } from "../../../utils/LocalStorage";

const Login = () => {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveToLocalStorage } = useLocalStorage();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //--------------------------------------------- Validate Input ---------------------------------------------
    if (!validateInput({ email, password })) {
      return;
    }
    //--------------------------------------------- Login User ---------------------------------------------
    try {
      setLoading(true);
      const response = await axios.post(`${config.endpoint}/user/login`, {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        setUser(response.data.user);
        toast.success("Login Successful");
        setTimeout(() => {
          window.location.reload();
        });

        // -----------------------------------------------save to local storage
        saveToLocalStorage("name", response.data.user.fname);
        saveToLocalStorage("token", response.data.token);
        saveToLocalStorage("role", response.data.user.role[0]);
        saveToLocalStorage("email", response.data.user.email);
        saveToLocalStorage("mobile", response.data.user.mobile);
        navigate("/");
      } else {
        setLoading(false);
        toast.error("Login Failed");
      }
    } catch (err) {
      setLoading(false);
      if (err?.response?.status === 401) {
        toast.error(err.response.data.error);
      } else if (err?.response?.status === 400) {
        toast.error(err.response.data.error);
      } else {
        setLoading(false);
        toast.error("Login Failed");
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <Link to="/register">
            <div className="signInButton ">
              <Form.Group>
                <Button variant="info">SIGN IN</Button>
              </Form.Group>
            </div>
            <div className="box-img">
              <Image src={Img} fluid />
            </div>
          </Link>
          <div className="user-main-icon">
            <IconContext.Provider value={{ color: "#c3c5c7", size: "100" }}>
              <div>
                <FaRegCircleUser />
              </div>
            </IconContext.Provider>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <InputGroup className="mb-3">
                <InputGroup.Text id="email-id"></InputGroup.Text>
                <Form.Control
                  className="w-[100%]"
                  style={{ color: "#c3c5c7" }}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                  required
                  aria-describedby="email-id"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="pswd">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                <Form.Control
                  style={{ color: "#c3c5c7" }}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                  required
                  aria-describedby="basic-addon1"
                  className="pswd w-[100%]"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Button
                disabled={loading}
                className="loginButton w-100 my-4"
                variant="info"
                type="submit"
              >
                LOGIN
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;

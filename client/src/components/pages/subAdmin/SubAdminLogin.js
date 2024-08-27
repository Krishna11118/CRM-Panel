import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config/config";
import CircularProgress from "@mui/material/CircularProgress";
import { validateInput } from "../../../utils/Validations";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { useAuth } from "../../../context/AuthContext";
import { setCookie } from "../../../utils/Cookie";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

const defaultTheme = createTheme();
//---------------------------------------Handle submit function-------------------------------------

export default function SignInSide() {
  const { fetchData, setUpdateUseEffect } = useAuth();

  const [email, setEmail] = useState("subAdmin@test.com");
  const [password, setPassword] = useState("subAdmin123#");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---------------------------------------Validation-------------------------------------
    if (!validateInput({ email, password })) {
      return;
    }

    // ---------------------------------------API call---------------------------------------
    try {
      const token = getFromLocalStorage("token");
      setLoading(true);
      const response = await axios.post(`${config.endpoint}/subAdmin/login`, {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        setLoading(false);

        // ---------------------------------------Save data to local storage--------------------
        saveToLocalStorage("name", response.data.user.fname);
        saveToLocalStorage("role", response.data.user.role[0]);
        saveToLocalStorage("email", response.data.user.email);
        saveToLocalStorage("token", response.data.token);

        //------------------------------------------------save to cookie----------------------
        setCookie("token", response.data.token);
        setCookie("role", response.data.user.role[0]);

        // --------- trigger useEffect in AuthContext
        setUpdateUseEffect((prev) => !prev);

        navigate("/");
        toast.success("Login Successful");
      } else {
        setLoading(false);
        toast.error("Login Failed");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        toast.error(err.response.data.error);
        return;
      }
      if (err?.response?.status === 400) {
        toast.error(err.response.data.error);
      } else {
        setLoading(false);
        toast.error("Login Failed");
      }
    }
  };

  useEffect(() => {
    // ----------- fetch data when component mounts
    fetchData();
  }, [setUpdateUseEffect]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url(https://images.unsplash.com/photo-1695807216937-fddfaa1f63ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
        `,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="bg-custom-600 "
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "white",
            }}
            className="bg-custom-200 "
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#003366",
                transition: "transform 0.3s, background-color 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                  bgcolor: "#004080",
                },
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ height: "50px", fontFamily: "Roboto, sans-serif" }}
            >
              Sign in
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{
                mt: 2,
                mb: 2,
                color: "#003366", // Dark blue color for text
                fontSize: "1rem",
                textTransform: "uppercase",
              }}
            >
              Use the following credentials
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{
                mt: 1,
                fontSize: "1rem",
                color: "#003366", // Dark blue color for text
              }}
            >
              <span style={{ color: "#004080" }}>
                <strong>Email:</strong>
              </span>{" "}
              subAdmin@test.com
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{
                mt: 1,
                fontSize: "1rem",
                color: "#003366", // Dark blue color for text
              }}
            >
              <span style={{ color: "#004080" }}>
                <strong>Password:</strong>
              </span>{" "}
              subAdmin123#
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={handleEmail}
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={handlePassword}
                margin="normal"
                required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: "50px",
                    borderRadius: "30px",
                    background:
                      "linear-gradient(45deg, #003366 30%, #004080 90%)",
                    boxShadow: "0px 3px 5px 2px rgba(0, 51, 102, 0.3)",
                  }}
                >
                  <CircularProgress color="inherit" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    height: "50px",
                    borderRadius: "30px",
                    background:
                      "linear-gradient(45deg, #003366 30%, #004080 90%)",
                    boxShadow: "0px 3px 5px 2px rgba(0, 51, 102, 0.3)",
                  }}
                >
                  Sign In
                </Button>
              )}

              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 5 }}
              >
                {"© "} Krishna {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

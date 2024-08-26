import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import config from "../../../Config/Config";
import { useAuth } from "../../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { validateInput } from "../../../utils/Validations";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { setCookie } from "../../../utils/Cookie";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       {/* <Link color="inherit" src="www.ganeshcars.com">
//       Ganesh Cars
//       </Link>{" "} */}
//       {new Date().getFullYear()}
//     </Typography>
//   );
// }

const defaultTheme = createTheme();

//---------------------------------------Handle submit function-------------------------------------

export default function SignInSide() {
  const { fetchData, setUpdateUseEffect } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await axios.post(`${config.endpoint}/admin/login`, {
        email: email,
        password: password,
        headers: {
          authorization: `${token}`,
        },
      });

      if (response.status === 201) {
        setLoading(false);

        // ---------------------------------------save data to local storage--------------------
        saveToLocalStorage("name", response.data.user.fname);
        saveToLocalStorage("email", response.data.user.email);
        saveToLocalStorage("token", response.data.token);
        saveToLocalStorage("role", response.data.user.role[0]);

        //------------------------------------------------save to cookie-------------------------
        setCookie("token", response.data.token);
        setCookie("role", response.data.user.role[0]);

        // --------- trigger useEffect in AuthContext
        setUpdateUseEffect((prev) => !prev);

        navigate("/");
        toast.success("Login Successful");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setLoading(false);
        toast.error(err.response.data.error);
      } else if (err?.response?.status === 400) {
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
            backgroundImage:
              "url(https://images.unsplash.com/photo-1695807216937-fddfaa1f63ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              className="h-10"
              style={{ height: "50px" }}
            >
              Sign in
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
              />

              {loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 5 }}
                  style={{ height: "50px", borderRadius: "30px" }}
                >
                  <CircularProgress color="inherit" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 5 }}
                  style={{ height: "50px", borderRadius: "30px" }}
                >
                  Sign In
                </Button>
              )}
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

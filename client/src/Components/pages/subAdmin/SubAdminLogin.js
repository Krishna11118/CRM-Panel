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
import { useState } from "react";
import axios from "axios";
import config from "../../../Config/Config";
import CircularProgress from "@mui/material/CircularProgress";
import { validateInput } from "../../../utils/Validations";
import { useLocalStorage } from "../../../utils/LocalStorage";
import { useAuth } from "../../../context/AuthContext";

const defaultTheme = createTheme();
//---------------------------------------Handle submit function-------------------------------------

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
  const { setUser } = useAuth();

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
        setUser(response.data.user);
        toast.success("Login Successful");
        // ---------------------------------------Save data to local storage--------------------
        saveToLocalStorage("name", response.data.user.fname);
        saveToLocalStorage("role", response.data.user.role[0]);
        saveToLocalStorage("email", response.data.user.email);
        saveToLocalStorage("token", response.data.token);

        navigate("/");
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
              "url(https://source.unsplash.com/random?wallpapers)",
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

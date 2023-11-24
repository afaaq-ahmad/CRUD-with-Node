import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(userData));
    setIsSubmit(true);
  };

  useEffect(() => {
    const auth = localStorage.getItem("loggedIn");
    if (!!auth) {
      navigate("/home");
    }
  }, []);
  const validate = (formData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(formData.email)) {
      errors.email = "Email format is invalid!";
    }
    if (!formData.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const verifyUserData = async () => {
    try {
      const data = await axios.post(
        `http://localhost:3005/loginverify`,
        userData
      );
      if (data.status === 200) {
        toast.success("Success!", { position: toast.POSITION.TOP_RIGHT });
        localStorage.setItem("loggedIn", JSON.stringify(data));
        navigate("/home");
      }
    } catch (error) {
      if (error?.response?.statusText) {
        toast.error(error?.response?.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Server Error", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && !!isSubmit) {
      verifyUserData();
    }
  }, [handleSubmit]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={userData.email}
              onChange={handleChange}
              name="email"
            />
            <p style={{ color: "red", marginTop: "5px" }}>{formErrors.email}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              id="password"
            />
            <p style={{ color: "red", marginTop: "5px" }}>
              {formErrors.password}
            </p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ marginLeft: "100px" }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

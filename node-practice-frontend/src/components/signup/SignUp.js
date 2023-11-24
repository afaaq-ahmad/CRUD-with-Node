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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
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

  const validate = (formData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.firstName) {
      errors.firstName = "First name is required!";
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required!";
    }
    if (!formData.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(formData.email)) {
      errors.email = "Email format is invalid!";
    }
    if (!formData.password) {
      errors.password = "Password is required!";
    } else if (formData?.password.length < 4) {
      errors.password = "Password should be greater than 4 digits";
    } else if (formData.password.length > 20) {
      errors.password = "Password should be less than 10 digits";
    }
    return errors;
  };

  const postUserData = async () => {
    console.log("Start of post request function", userData);
    try {
      const data = await axios.post(`http://localhost:3005/userdata`, userData);
      if (data.status === 201) {
        toast.success("Success!", { position: toast.POSITION.TOP_RIGHT });

        navigate("/signin");
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error?.code === "ERR_NETWORK") {
        toast.error(error?.message);
      }
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && !!isSubmit) {
      postUserData();
    }
  }, [handleSubmit]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={userData.firstName}
                  autoFocus
                  onChange={handleChange}
                />
                <p style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.firstName}
                </p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userData.lastName}
                  onChange={handleChange}
                />
                <p style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.lastName}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <p style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.email}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <p style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.password}
                </p>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

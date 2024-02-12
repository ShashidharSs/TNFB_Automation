import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginCredentials } from "./LoginCredentials";
import FullScreenLoader from "./fullScreenLoader";
import { useDispatch } from "react-redux";
import { addUserData } from '../.../../Services/placeholderData';
import { containerStyles, boxStyles, textFieldStyles, buttonStyles } from '../Styles/Styles'

const Login = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  const storeDataInLocalStorage = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        await LoginCredentials({ values });
        storeDataInLocalStorage(values);
        setAuthenticated(true);
        setSubmitting(false);
        dispatch(addUserData(values));
        history("/tnfb/dashboard");
      } catch (error) {
        setErrors({ email: "Invalid email", password: "Invalid password" });
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    },
  });

  if (authenticated) {
    return null;
  }

  return (
    <Box sx={containerStyles}>
      {loading && <FullScreenLoader />}
      <Box sx={{ ...boxStyles }}>
        <Typography variant="h5" mb={2} className="title">
          Login
        </Typography>
        <Typography variant="body1" mb={3}>
          Login to your account to continue.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            id="email"
            name="email"
            type="text"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Password"
            id="password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={textFieldStyles}
          />

          <Typography variant="body2" mt={2} textAlign="right">
            <Link to="forgot-password">Forgot Password?</Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ ...buttonStyles }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;

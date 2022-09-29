import React from "react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/users/usersSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is requried"),
  lastName: Yup.string().required("Last Name is requried"),
  email: Yup.string().required("Email is requried"),
  password: Yup.string().required("Password is requried"),
});

function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(register(values));
    },
    validationSchema: formSchema,
  });

  const storeData = useSelector((state) => state?.user);
  const { appErr, serverErr, registerd } = storeData;

  useEffect(() => {
    serverErr && appErr && toast.error(serverErr) && toast.error(appErr);
  }, [serverErr, appErr]);

  if (registerd) {
    toast.success("Registered Successfully");
    navigate("/login");
  }

  return (
    <>
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
            sx={{ mt: 3 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                <Typography sx={{ color: "error.main" }}>
                  {formik.touched.firstName && formik.errors.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                <Typography sx={{ color: "error.main" }}>
                  {formik.touched.firstName && formik.errors.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Typography sx={{ color: "error.main" }}>
                  {formik.touched.firstName && formik.errors.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Typography sx={{ color: "error.main" }}>
                  {formik.touched.firstName && formik.errors.firstName}
                </Typography>
              </Grid>
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
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Register;

import React, { useEffect, useState } from "react";
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

import { login } from "../redux/slices/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login(props) {
  const initialState = {
    email: "",
    password: "",
  };

  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeData = useSelector((state) => state.user);
  const { appErr, serverErr } = storeData;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ formValue, toast, navigate }));
  };

  useEffect(() => {
    appErr && serverErr && toast.error(`${serverErr}-${appErr} `);
  }, [appErr, serverErr]);
  return (
    <div>
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              onChange={onInputChange}
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              onChange={onInputChange}
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
                <br />
              </Grid>
              <Grid item xs>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;

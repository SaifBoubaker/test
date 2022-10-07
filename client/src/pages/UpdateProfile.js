import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import FileBase from "react-file-base64";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import { updateProfile } from "../redux/slices/users/usersSlice";

function UpdateProfile(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
  };
  const user = useSelector((state) => state.user);

  const { loading } = user;
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName } = formValue;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((firstName, lastName)) {
      dispatch(updateProfile({ formValue, id, navigate, toast }));
    } else {
      toast.error("firstName and lastName are missing");
    }
  };

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
          <Typography component="h1" variant="h5">
            Update your Profile
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={onInputChange}
                  value={firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="FirstName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onInputChange}
                  value={lastName}
                  autoComplete="given-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="LastName"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <Typography>Avatar Image</Typography>
                <FileBase
                  multiple={false}
                  type="file"
                  onDone={({ base64 }) => {
                    setFormValue({ ...formValue, image: base64 });
                  }}
                />
              </Grid>
            </Grid>
            <br />
            {loading === true ? (
              <LinearProgress />
            ) : (
              <Button
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f2709c, #ff9472)",
                }}
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UpdateProfile;

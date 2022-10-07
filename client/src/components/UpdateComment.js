import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleComment,
  updateComment,
} from "../redux/slices/comments/commentSlice";

function UpdateComment(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector((state) => state.comment);
  const { singleComment } = comment;
  const initialState = {
    description: singleComment?.description,
  };
  useEffect(() => {
    dispatch(getSingleComment(id));
  }, [dispatch, id]);

  const postId = singleComment?.post;

  const [formValue, setFormValue] = useState(initialState);
  const { description } = formValue;
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateComment({ id, toast, navigate, description, postId }));
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
            Update Comment
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
                  value={description}
                  autoComplete="given-name"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Update Comment"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UpdateComment;

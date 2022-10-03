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
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../redux/slices/category/categorySlice";

function UpdateCategory(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  const { getCategory } = category;

  const initialState = {
    title: getCategory?.title,
  };

  const [formValue, setFormValue] = useState(initialState);
  const { title } = formValue;
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ title, id, toast, navigate }));
  };
  useEffect(() => {
    dispatch(getSingleCategory(id));
  }, [dispatch, id]);
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
            Update Category
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
                  value={title}
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Update Category"
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
            <Button
              onClick={() => {
                dispatch(deleteCategory(id));
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 1, mb: 2 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UpdateCategory;

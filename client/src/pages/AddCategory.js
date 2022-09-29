import React, { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../redux/slices/category/categorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddCategory(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      dispatch(createCategory(values));
    },
    validationSchema: formSchema,
  });

  const state = useSelector((state) => state.category);
  console.log(state);
  const { category, appErr, serverErr } = state;
  console.log(category);
  if (category) {
    toast.success("Category added succussefully");
    navigate("/category-list");
  }

  useEffect(() => {
    appErr && serverErr && toast.error(`${serverErr}-${appErr} `);
  }, [appErr, serverErr]);
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
            Add New Category
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  autoComplete="given-name"
                  name="newCategory"
                  required
                  fullWidth
                  id="newCategory"
                  label="New Category"
                  autoFocus
                />
                <Typography sx={{ color: "error.main" }}>
                  {formik.touched.title && formik.errors.title}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default AddCategory;

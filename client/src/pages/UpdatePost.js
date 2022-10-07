import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputLabel,
  NativeSelect,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../redux/slices/category/categorySlice";
import { toast } from "react-toastify";
import { getsinglePost, updatePost } from "../redux/slices/posts/postSlice";

function UpdatePost(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getsinglePost(id));
  }, [dispatch, id]);
  const allCategory = useSelector((state) => state.category);
  const { categoryList } = allCategory;
  const post = useSelector((state) => state.post);
  const { singlePost } = post;

  const initialState = {
    title: singlePost?.title,
    category: "",
    description: singlePost?.description,
  };
  const [formValue, setFormValue] = useState(initialState);
  const { title, category, description } = formValue;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  console.log(formValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ formValue, navigate, toast, id }));
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
            Update Your Post
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
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="demo-customized-select-native">
                    Category
                  </InputLabel>
                  <NativeSelect
                    name="category"
                    id="demo-customized-select-native"
                    onChange={onInputChange}
                    value={category}
                  >
                    <option></option>
                    {categoryList?.map((item) => (
                      <option> {item.title} </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onInputChange}
                  value={description}
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  multiline
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>

            <Button
              style={{
                backgroundImage: "linear-gradient(to right, #f2709c, #ff9472)",
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Post
            </Button>
            {/* )} */}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UpdatePost;

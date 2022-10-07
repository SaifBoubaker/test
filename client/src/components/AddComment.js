import { Grid, Button, TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createComment } from "../redux/slices/comments/commentSlice";
import { getsinglePost } from "../redux/slices/posts/postSlice";
function AddComment({ postId }) {
  const dispatch = useDispatch();

  const initialState = {
    description: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const { description } = formValue;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId, description }));
  };
  return (
    <Grid
      style={{ marginTop: "50px", width: "300px" }}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          onChange={onInputChange}
          value={description}
          name="description"
          required
          fullWidth
          id="description"
          label="Comment"
          multiline
          autoFocus
        />
        <Button variant="contained" style={{ marginTop: "12px" }} type="submit">
          Add Comment
        </Button>
      </Box>
    </Grid>
  );
}

export default AddComment;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "post/create",
  async (
    { formValue, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const user = getState()?.user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/posts/",
        formValue,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.postCreated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default postSlice.reducer;

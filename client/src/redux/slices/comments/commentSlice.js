import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const createComment = createAsyncThunk(
  "comment/create",
  async ({ description, postId }, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.user;
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/comment",
        { description, postId },
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
export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.user;
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:5000/api/comment/${id}`,

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
export const updateComment = createAsyncThunk(
  "comment/update",
  async (
    { id, toast, navigate, description, postId },
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

      const { data } = await axios.put(
        `http://localhost:5000/api/comment/${id}`,
        { description },
        config
      );
      toast.success("Comment updated");
      navigate(`/posts/${postId}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getSingleComment = createAsyncThunk(
  "comment/getSingleComment",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.user;
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/comment/${id}`,

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

const commentSlice = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: {
    [createComment.pending]: (state, action) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.commentCreated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [createComment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ////////////////////////////////////////////////
    [deleteComment.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.deletedComment = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [deleteComment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ///////////////////////////////////////
    [updateComment.pending]: (state, action) => {
      state.loading = true;
    },
    [updateComment.fulfilled]: (state, action) => {
      state.updatedComment = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [updateComment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    //////////////////////////////////////////////////////////
    [getSingleComment.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleComment.fulfilled]: (state, action) => {
      state.singleComment = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getSingleComment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default commentSlice.reducer;

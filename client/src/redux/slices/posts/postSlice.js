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
      toast.success("Post created successfully");
      navigate("/posts");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAll",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/posts?category=${category}`
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

export const getsinglePost = createAsyncThunk(
  "post/getSingle",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (
    { formValue, navigate, toast, id },
    { rejectWithValue, getState, dispatch }
  ) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        formValue,
        config
      );
      toast.success("Post updated successfully");
      navigate(`/posts/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ navigate, toast, id }, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        config
      );
      toast.success("Post deleted successfully");
      navigate(`/posts`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const toogleLikePost = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/posts/do/likes",
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      rejectWithValue(error?.response?.data);
    }
  }
);

export const toogleDislikePost = createAsyncThunk(
  "post/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/posts/do/dislikes",
        { postId },
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      rejectWithValue(error?.response?.data);
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
    //////////////////////////////////
    [getAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.postList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ////////////////////////////////////
    [toogleLikePost.pending]: (state, action) => {
      state.loading = true;
    },
    [toogleLikePost.fulfilled]: (state, action) => {
      state.liked = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [toogleLikePost.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ////////////////////////////////////////
    [toogleDislikePost.pending]: (state, action) => {
      state.loading = true;
    },
    [toogleDislikePost.fulfilled]: (state, action) => {
      state.disliked = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [toogleDislikePost.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    /////////////////////////////////////////////////
    [getsinglePost.pending]: (state, action) => {
      state.loading = true;
    },
    [getsinglePost.fulfilled]: (state, action) => {
      state.singlePost = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getsinglePost.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    /////////////////////////////////////////////
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.postUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    //////////////////////////////////////////////////
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postDeleted = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default postSlice.reducer;

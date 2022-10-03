import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const createCategory = createAsyncThunk(
  "category/create",
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
        "http://localhost:5000/api/category",
        {
          title: formValue?.title,
        },
        config
      );
      toast.success("Category added successfully");
      navigate("/category-list");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/get",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.user;
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/category",
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

export const updateCategory = createAsyncThunk(
  "category/update",
  async (
    { title, id, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const user = getState().user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/category/${id}`,
        { title },
        config
      );
      toast.success("Category updated");
      navigate("/category-list");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState().user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:5000/api/category/${id}`,
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
export const getSingleCategory = createAsyncThunk(
  "category/get",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState().user;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/category/${id}`,
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

const categorySlice = createSlice({
  name: "category",
  initialState: {},
  extraReducers: {
    [createCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ////////////////////////////
    [getCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ////////////////////////////////////////////
    [updateCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.updateCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    //////////////////////////////////
    [deleteCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.deleteCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    //////////////////////////////////////
    [getSingleCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleCategory.fulfilled]: (state, action) => {
      state.getCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getSingleCategory.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default categorySlice.reducer;

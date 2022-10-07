import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// register action
export const register = createAsyncThunk(
  "/user/register",
  async (
    { formValue, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        formValue,
        config
      );
      toast.success("Registred Successfully");
      navigate("/login");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "/user/login",
  async (
    { formValue, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login/",
        formValue,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login Successfully");
      navigate("/");

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/user/updateProfile",
  async (
    { formValue, id, toast, navigate },
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
        `http://localhost:5000/api/users/${id}`,
        {
          firstName: formValue?.firstName,
          lastName: formValue?.lastName,
          image: formValue?.image,
        },
        config
      );
      toast.success("Updated Successfully");
      localStorage.removeItem("userInfo");
      navigate("/login");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  "/user/changePassword",
  async (
    { password, id, toast, navigate },
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
        `http://localhost:5000/api/users/change-password/${id}`,
        {
          password,
        },
        config
      );
      toast.success("Updated Successfully");
      localStorage.removeItem("userInfo");
      navigate("/login");
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.registerd = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ///logiin////
    [login.pending]: (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    //logout
    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAuth = undefined;

      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    ///////////////////////////////////////
    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profileUpdated = action?.payload;
      state.loading = false;
      state.userAuth = undefined;

      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    /////////////////////////////////////////////////////
    [changePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.passwordUpdated = action?.payload;
      state.loading = false;
      state.userAuth = undefined;

      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default userSlice.reducer;

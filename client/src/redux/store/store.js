import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice";
import categoryReducer from "../slices/category/categorySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice";
import categoryReducer from "../slices/category/categorySlice";
import postReducer from "../slices/posts/postSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
  },
});

export default store;

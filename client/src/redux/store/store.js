import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlice";
import categoryReducer from "../slices/category/categorySlice";
import postReducer from "../slices/posts/postSlice";
import commentReducer from "../slices/comments/commentSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
    comment: commentReducer,
  },
});

export default store;

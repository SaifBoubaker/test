import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navigation/Navbar";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./pages/CategoryList";
import UpdateCategory from "./pages/UpdateCategory";
import AddPost from "./pages/AddPost";
import PostList from "./pages/PostList";
import PostDetails from "./pages/PostDetails";
import UpdatePost from "./pages/UpdatePost";
import UpdateComment from "./components/UpdateComment";
import { useSelector } from "react-redux";

import LoginUserRoutes from "./LoginUserRoutes";
import UpdateProfile from "./pages/UpdateProfile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const user = useSelector((state) => state.user);
  const { userAuth } = user;
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        <Route element={<LoginUserRoutes />}>
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/update-comment/:id" element={<UpdateComment />} />
          <Route path="/change-password/:id" element={<ChangePassword />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />

          {userAuth?.isAdmin === true && (
            <Route>
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/update-category/:id" element={<UpdateCategory />} />
              <Route path="/category-list" element={<CategoryList />} />
            </Route>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navigation/Navbar";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./pages/CategoryList";
import UpdateCategory from "./pages/UpdateCategory";
import ProtectedRoutes from "./ProtectedRoutes";
import AddPost from "./pages/AddPost";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

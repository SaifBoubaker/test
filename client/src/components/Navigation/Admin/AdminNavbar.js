import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/users/usersSlice";

const styles = {
  largeIcon: {
    width: 55,
    height: 55,
  },
  background: "linear-gradient(to right, #00395d, #8f8f8c)",
};

const AdminNavbar = () => {
  const dispatch = useDispatch();

  let pages = [
    <Link to="/" style={{ textDecoration: "none", color: "currentColor" }}>
      Home
    </Link>,
    <Link to="/posts" style={{ textDecoration: "none", color: "currentColor" }}>
      POSTS
    </Link>,
    <Link to="/users" style={{ textDecoration: "none", color: "currentColor" }}>
      Authors
    </Link>,
    <Link
      to="/add-category"
      style={{ textDecoration: "none", color: "currentColor" }}
    >
      Add Category
    </Link>,
    <Link
      to="/category-list"
      style={{ textDecoration: "none", color: "currentColor" }}
    >
      Category List
    </Link>,
  ];
  let settings = [
    <Link
      to="/profile"
      style={{ textDecoration: "none", color: "currentColor" }}
    >
      My Profile
    </Link>,
    <Link
      to="/update-password"
      style={{ textDecoration: "none", color: "currentColor" }}
    >
      Change Password
    </Link>,
    <Link
      to="/"
      onClick={() => {
        dispatch(logout());
      }}
      style={{ textDecoration: "none", color: "currentColor" }}
    >
      Logout
    </Link>,
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={styles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ImportContactsOutlinedIcon
            style={styles.largeIcon}
            sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CODING Genuis
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography
            className="newpost"
            component="a"
            href="/create-post"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Add Post
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AdminNavbar;

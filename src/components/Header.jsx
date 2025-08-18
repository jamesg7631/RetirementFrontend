import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
import LearnMoreModal from "./LearnMoreModal.jsx";
import { logoutUser } from "../api/apiService.js";

export default function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    navigate("/settings");
  };

  const handleSignOut = () => {
    handleMenuClose();
    console.log("User signed out");
    logoutUser();
    navigate("/");
  };


  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate("/dashboard")}
            sx={{
              flexGrow: 1,
              cursor: "pointer"
            }}
          >
            Retirement Planner
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" onClick={() => navigate("/portfolios")}>Portfolios</Button>
            <Button color="inherit" onClick={() => navigate("/dc-pensions")}>My Pensions</Button>
            <Button color="inherit">My snapshots</Button>
            <Button color="inherit">My scenarios</Button>
            <Button color="inherit" onClick={handleOpenModal}>Learn more ?</Button>
          </Box>
          <IconButton size="large" edge="end" color="inherit" aria-label="account" onClick={handleProfileMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LearnMoreModal open={isModalOpen} onClose={handleCloseModal} />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
}

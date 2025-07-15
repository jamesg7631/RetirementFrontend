import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Header() {
  return (<AppBar position="static" sx={{ bgcolor: "primary.main" }}>
    {" "}
    {/* Use common.black for pure black */}
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Retirement Planner
      </Typography>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {" "}
        {/* Hide on small screens if desired */}
        <Button color="inherit">My snapshots</Button>
        <Button color="inherit">My scenarios</Button>
        <Button color="inherit">Learn more ?</Button>
      </Box>
      <IconButton size="large" edge="end" color="inherit" aria-label="account">
        <AccountCircleIcon />
      </IconButton>
    </Toolbar>
  </AppBar>);
}

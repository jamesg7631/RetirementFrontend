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
import {useNavigate, Link} from "react-router";
export default function Header() {
  const navigate = useNavigate();

  return (
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <Typography
              variant="h6"
              onClick={() => navigate("/dashboard")}
              sx={{
                flexGrow: 1,
                cursor: 'pointer'
              }}
          >
            Retirement Planner
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" onClick={() => navigate("/portfolios")}>Portfolios</Button>
            <Button color="inherit" onClick={() => navigate("/dc-pensions")}>My Pensions</Button>
            <Button color="inherit">My snapshots</Button>
            <Button color="inherit">My scenarios</Button>
            <Button color="inherit">Learn more ?</Button>
          </Box>
          <IconButton size="large" edge="end" color="inherit" aria-label="account">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
}


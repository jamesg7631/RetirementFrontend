import React, {useState} from "react";
import {Typography, Toolbar, AppBar} from "@mui/material";

export default function Login() {
    const [username, setUsername] = useState("");

    return <div>
        <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Retirement Planner
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
}
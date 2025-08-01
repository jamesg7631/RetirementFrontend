import React, {useEffect, useState} from "react";
import {Typography, Toolbar, AppBar, Box, Button, Container, Card, CardContent, TextField, Link} from "@mui/material";
// import { SignInPage } from '@toolpad/core/SignInPage';
import axios from 'axios';
import styles from "../components/text.module.css"
import {loginUser} from "../api/apiService.js";
import {useNavigate} from "react-router";

export default function Login() {
    const [userLogin, setUserLogin] = useState({username:'', password:''})
    const navigate= useNavigate();

    function updateLoginInformation(e) {
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        // setUserLogin(...userLogin, [name]: value);
        setUserLogin({...userLogin, [name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await loginUser(userLogin);
            console.log("Am I registered: " + response.registered);
            if (response.registered === "notRegistered") {
                navigate('/register-user')
            } else {
                console.log("User login: " + response)
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }


    useEffect(() => {
        console.log("Userlogin is", userLogin)
    }, [userLogin])
    return <div>
        <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Retirement Planner
                </Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                    {/* Login Header */}
                    <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
                        Login
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
                        Please sign in to continue
                    </Typography>

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleSubmit}
                         sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField onChange={updateLoginInformation}
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            type="text"
                        />
                        <TextField
                            onChange={updateLoginInformation}
                            name="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                        />
                        <Button
                            name="sign-in"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            sx={{ mt: 2 }}
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Link href="/create-account" sx={{p:5}}>Create Account</Link>
                        <Link href="/reset-password" sx={{p:5}}>Reset Password</Link>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    </div>
}
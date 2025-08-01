import React, { useState } from "react";
import {
    Typography,
    Toolbar,
    AppBar,
    Box,
    Button,
    Container,
    Card,
    CardContent,
    TextField,
    Link,
    Divider
} from "@mui/material";
import { useNavigate } from "react-router";
import GoogleIcon from '@mui/icons-material/Google'

export default function CreateAccount() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const PASSWORD_REGEX = {
        minLength: /.{8,}/,
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasNumber: /\d/,
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
    };


    const handleGoogleLogin = () => {
        // Redirect to the backend OAuth2 endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!userDetails.username) {
            newErrors.username = 'Username is required';
        }

        if (!userDetails.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!userDetails.password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordErrors = [];

            if (!PASSWORD_REGEX.minLength.test(userDetails.password)) {
                passwordErrors.push('at least 8 characters');
            }
            if (!PASSWORD_REGEX.hasUpperCase.test(userDetails.password)) {
                passwordErrors.push('one uppercase letter');
            }
            if (!PASSWORD_REGEX.hasLowerCase.test(userDetails.password)) {
                passwordErrors.push('one lowercase letter');
            }
            if (!PASSWORD_REGEX.hasNumber.test(userDetails.password)) {
                passwordErrors.push('one number');
            }
            if (!PASSWORD_REGEX.hasSpecialChar.test(userDetails.password)) {
                passwordErrors.push('one special character');
            }

            if (passwordErrors.length > 0) {
                newErrors.password = `Password must contain ${passwordErrors.join(', ')}`;
            }

        }

        if (!userDetails.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (userDetails.password !== userDetails.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Add your API call here to create the account
                // const response = await createUser(userDetails);
                navigate('/'); // Redirect to login page after successful account creation
            } catch (error) {
                console.error('Account creation failed:', error);
            }
        }
    };

    return (
        <div>
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
                        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
                            Create Account
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
                            Please fill in the details to create your account
                        </Typography>

                        {/* Google Sign In Button */}
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<GoogleIcon />}
                            onClick={handleGoogleLogin}
                            sx={{ mb: 3 }}
                        >
                            Continue with Google
                        </Button>

                        <Divider sx={{ mb: 3 }}>OR</Divider>

                        {/* Regular Sign Up Form */}
                        <Box component="form" onSubmit={handleSubmit}
                             sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                name="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={userDetails.username}
                                onChange={handleInputChange}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                value={userDetails.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={userDetails.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <TextField
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={userDetails.confirmPassword}
                                onChange={handleInputChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{ mt: 2 }}
                                type="submit"
                            >
                                Create Account
                            </Button>
                        </Box>

                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Link href="/" sx={{ p: 5 }}>Already have an account? Sign in</Link>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );

}
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { useNavigate } from "react-router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {registerUser} from "../api/apiService.js";

export default function RegisterUser() {
    const [userDetails, setUserDetails] = useState({
        name: '',
        dateOfBirth: null,
        plannedRetirementAge: '',
        postcode: '',
        taxResidencyEngland: '',
        numberOfDependants: '',
        sexMale: '',
        grossSalary: '',
        monthlyLivingExpenses: '',
        married: '',
        armedForcesService: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setUserDetails({
            ...userDetails,
            dateOfBirth: date
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!userDetails.name) newErrors.name = 'Name is required';
        if (!userDetails.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!userDetails.plannedRetirementAge) newErrors.plannedRetirementAge = 'Planned retirement age is required';
        if (!userDetails.postcode) newErrors.postcode = 'Postcode is required';
        if (!userDetails.taxResidencyEngland) newErrors.taxResidencyEngland = 'Tax residency is required';
        if (!userDetails.sexMale) newErrors.sexMale = 'Gender is required';
        if (!userDetails.grossSalary) newErrors.grossSalary = 'Gross salary is required';
        if (!userDetails.monthlyLivingExpenses) newErrors.monthlyLivingExpenses = 'Monthly living expenses is required';
        if (!userDetails.married) newErrors.married = 'Marital status is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await registerUser(userDetails);
                navigate('/dashboard');
            } catch (error) {
                const errorMessage = error.response.data;
                if (errorMessage === "User already registered") {
                    console.error("User has already been registered. Redirecting to dashboard!")
                    navigate("/dashboard")
                }
                console.error('Registration failed:', error);
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
            <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
                <Card elevation={3}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
                            Complete Registration
                        </Typography>
                        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
                            Please provide your details to complete the registration
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}
                             sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                name="name"
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                value={userDetails.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={userDetails.dateOfBirth}
                                    onChange={handleDateChange}
                                    format="DD/MM/YYYY"
                                    slotProps={{
                                        textField: {
                                            variant: "outlined",
                                            fullWidth: true,
                                            error: !!errors.dateOfBirth,
                                            helperText: errors.dateOfBirth
                                        }
                                    }}
                                />
                            </LocalizationProvider>

                            <TextField
                                name="plannedRetirementAge"
                                label="Planned Retirement Age"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={userDetails.plannedRetirementAge}
                                onChange={handleInputChange}
                                error={!!errors.plannedRetirementAge}
                                helperText={errors.plannedRetirementAge}
                            />

                            <TextField
                                name="postcode"
                                label="Postcode"
                                variant="outlined"
                                fullWidth
                                value={userDetails.postcode}
                                onChange={handleInputChange}
                                error={!!errors.postcode}
                                helperText={errors.postcode}
                            />

                            <FormControl fullWidth error={!!errors.taxResidencyEngland}>
                                <InputLabel>Tax Residency</InputLabel>
                                <Select
                                    name="taxResidencyEngland"
                                    value={userDetails.taxResidencyEngland}
                                    label="Tax Residency"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="england">England</MenuItem>
                                    <MenuItem value="scotland">Scotland</MenuItem>
                                    <MenuItem value="wales">Wales</MenuItem>
                                    <MenuItem value="northern-ireland">Northern Ireland</MenuItem>
                                </Select>
                                {errors.taxResidencyEngland && <FormHelperText>{errors.taxResidencyEngland}</FormHelperText>}
                            </FormControl>

                            <TextField
                                name="numberOfDependants"
                                label="Number of Dependants"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={userDetails.numberOfDependants}
                                onChange={handleInputChange}
                            />

                            <FormControl fullWidth error={!!errors.sexMale}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="sexMale"
                                    value={userDetails.sexMale}
                                    label="Gender"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                                {errors.sexMale && <FormHelperText>{errors.sexMale}</FormHelperText>}
                            </FormControl>

                            <TextField
                                name="grossSalary"
                                label="Gross Annual Salary (£)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={userDetails.grossSalary}
                                onChange={handleInputChange}
                                error={!!errors.grossSalary}
                                helperText={errors.grossSalary}
                            />

                            <TextField
                                name="monthlyLivingExpenses"
                                label="Monthly Living Expenses (£)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={userDetails.monthlyLivingExpenses}
                                onChange={handleInputChange}
                                error={!!errors.monthlyLivingExpenses}
                                helperText={errors.monthlyLivingExpenses}
                            />

                            <FormControl fullWidth error={!!errors.married}>
                                <InputLabel>Marital Status</InputLabel>
                                <Select
                                    name="married"
                                    value={userDetails.married}
                                    label="Marital Status"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="married">Married</MenuItem>
                                    <MenuItem value="divorced">Divorced</MenuItem>
                                    <MenuItem value="widowed">Widowed</MenuItem>
                                </Select>
                                {errors.married && <FormHelperText>{errors.married}</FormHelperText>}
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Armed Forces Service</InputLabel>
                                <Select
                                    name="armedForcesService"
                                    value={userDetails.armedForcesService}
                                    label="Armed Forces Service"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{ mt: 2 }}
                                type="submit"
                            >
                                Complete Registration
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
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
import { modifyUserDetails, registerUser } from "../api/apiService.js";
import { getRegisteredUser } from "../api/apiService.js";
import dayjs from "dayjs";

export default function RegisterUser({ mode }) {
  console.log("On Registe User page")
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
    armedForces: ''
  });


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validRetirementAge = 57;

  useEffect(() => {
    const registeredUser = async () => {
      if (mode === "edit") {
        try {
          const response = await getRegisteredUser();
          const dateOfBirth = response.dateOfBirth ? dayjs(response.dateOfBirth) : null;
          setUserDetails({
            ...response,
            dateOfBirth: dateOfBirth
          });
        } catch (error) {
          console.error(`Error: Failed to retrieve user`);
        }
      } else {
        setUserDetails({
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
          armedForces: ''
        });

      }

    }
    registeredUser();
  }, [mode]);

  const isNameValid = (name) => {
    // Corrected name validation logic
    if (!name) return false;
    return /^[a-zA-Z\s]+$/.test(name); // Allows letters and spaces
  };

  const isPostcodeValid = (postcode) => {
    return postcode.length >= 6 && postcode.length <= 8;
  };

  const isSalaryValid = (salary) => {
    return parseFloat(salary) > 0 && parseFloat(salary) < 1000000;
  };

  const isMonthlyExpensesValid = (expenses) => {
    return parseFloat(expenses) >= 0 && parseFloat(expenses) < 100000;
  };

  const isRetirementAgeValid = (age) => {
    return parseInt(age, 10) >= validRetirementAge;
  }

  const handleInputChange = (e) => {
    console.log(`Mode can be accessed ${mode}`);
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      dateOfBirth: date
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userDetails.name) {
      newErrors.name = "Name is required";
    } else if (!isNameValid(userDetails.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    if (!userDetails.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!userDetails.plannedRetirementAge) {
      newErrors.plannedRetirementAge = 'Planned retirement age is required';
    } else if (!isRetirementAgeValid(userDetails.plannedRetirementAge)) {
      newErrors.plannedRetirementAge = "Retirement age must be greater than or equal to age " + validRetirementAge;
    }

    if (!userDetails.postcode) {
      newErrors.postcode = 'Postcode is required';
    } else if (!isPostcodeValid(userDetails.postcode)) {
      newErrors.postcode = "Please enter a valid UK postcode."
    }

    if (!userDetails.taxResidencyEngland) newErrors.taxResidencyEngland = 'Tax residency is required';
    if (!userDetails.sexMale) newErrors.sexMale = 'Gender is required';
    if (!userDetails.grossSalary === '' || userDetails.grossSalary === null) { // Check for empty string or null
      newErrors.grossSalary = 'Gross salary is required';
    } else if (!isSalaryValid(userDetails.grossSalary)) {
      newErrors.grossSalary = "Please enter a gross salary between £1 and £999,999";
    }
    if (userDetails.monthlyLivingExpenses === '' || userDetails.monthlyLivingExpenses === null) {
      newErrors.monthlyLivingExpenses = 'Monthly living expenses is required';
    } else if (!isMonthlyExpensesValid(userDetails.monthlyLivingExpenses)) {
      newErrors.monthlyLivingExpenses = 'Please enter monthly living expenses between £0 and £99,999';
    }
    if (!userDetails.married) newErrors.married = 'Marital status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (mode === "edit") {
          const response = await modifyUserDetails(userDetails);
          navigate('/dashboard');
        } else {
          const response = await registerUser(userDetails);
          navigate('/dc-pensions')
        }
      } catch (error) {
        const errorMessage = error.response?.data;
        if (errorMessage === "User already registered") {
          console.error("User has already been registered. Redirecting to dashboard!");
          navigate("/dashboard");
        } else {
          console.error('Registration failed:', error);
        }
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
              {mode === 'edit' ? 'Edit User Details' : 'Complete Registration'}
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              {mode === 'edit' ? 'Update your personal details' : 'Please provide your details to complete the registration'}
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
                  name="armedForces"
                  value={userDetails.armedForces}
                  label="Armed Forces Service"
                  onChange={handleInputChange}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
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
                {mode === 'edit' ? 'Update Details' : 'Complete Registration'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

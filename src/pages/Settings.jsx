import React, {useState} from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    Stack,
    Divider,
} from '@mui/material';

export default function Settings() {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        postcode:'',
        monthlyLivingExpenses:'',
        plannedRetirementAge:''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Form submitted:", formData);
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Account Settings
                </Typography>
                <Paper sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Personal Information</Typography>
                            <Divider />

                            <TextField
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Postcode"
                                name="postcode"
                                value={formData.postcode}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Monthly Living Expenses"
                                name="monthlyLivingExpenses"
                                type="number"
                                value={formData.monthlyLivingExpenses}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Planned Retirement Age"
                                name="plannedRetirementAge"
                                type="number"
                                value={formData.plannedRetirementAge}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ mt: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}
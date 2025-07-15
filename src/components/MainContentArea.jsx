import React, {useState} from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select, TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';

export default function MainContentArea() {
    const [graphType, setGraphType] = useState('income');

    const handleGraphTypeChange = (event, newGraphType) => {
        if (newGraphType !== null) {
            setGraphType(newGraphType);
        }
    };

    const [valueType, setValueType] = useState('present'); // Default to 'present'

    const handleValueTypeChange = (event) => {
        setValueType(event.target.value);
    };

    const [spousePercentage, setSpousePercentage] = useState('50'); // Default value

    const handleSpousePercentageChange = (event) => {
        // Basic validation: ensure it's a number and within a reasonable range (0-100)
        const value = event.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100)) {
            setSpousePercentage(value);
        }
    };

    return (
        <Paper
            sx={{
                flexGrow: 1, // Allows it to take up remaining horizontal space
                p: 2, // Padding inside the Paper component
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Pushes graph up, text down
                boxShadow: 3, // Material-UI shadow level
            }}
        >
            {/* Top Controls Area */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 3 }}>
                {/* Income Forecast / Savings Forecast Toggle */}
                <ToggleButtonGroup
                    value={graphType}
                    exclusive
                    onChange={handleGraphTypeChange}
                    aria-label="graph type"
                    size="small"
                >
                    <ToggleButton value="income" aria-label="income forecast">
                        <Typography variant="caption" sx={{fontWeight: 'bold'}}>Income Forecast</Typography>
                    </ToggleButton>
                    <ToggleButton value="savings" aria-label="savings forecast">
                        <Typography variant="caption" sx={{fontWeight: 'bold'}}>Savings Forecast</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* Present Value / Future Value Dropdown */}
                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel id="value-type-label">Value Type</InputLabel>
                    <Select
                        labelId="value-type-label"
                        id="value-type-select"
                        value={valueType}
                        label="Value Type"
                        onChange={handleValueTypeChange}
                    >
                        <MenuItem value="present">Present Value</MenuItem>
                        <MenuItem value="future">Future Value</MenuItem>
                    </Select>
                </FormControl>

                {/* % Spouse Input */}
                <TextField
                    label="% Spouse"
                    variant="outlined"
                    size="small"
                    value={spousePercentage}
                    onChange={handleSpousePercentageChange}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*', // Suggests numeric input for mobile keyboards
                    }}
                    sx={{ width: 100 }} // Adjust width as needed
                    InputProps={{
                        endAdornment: <Typography sx={{mr: 0.5}}>%</Typography>, // Add percentage sign at the end
                    }}
                />
            </Box>

            {/* Graph Area */}
            <Box
                sx={{
                    border: '2px dashed',
                    borderColor: 'grey.400',
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 3,
                    minHeight: '250px',
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    {`Graph: Showing ${graphType === 'income' ? 'Income' : 'Savings'} Forecast in ${valueType === 'present' ? 'Present' : 'Future'} Value (Spouse: ${spousePercentage}%)`}
                </Typography>
            </Box>

            {/* Outcome Probability Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'grey.200',
                    p: 2,
                    borderRadius: 1,
                }}
            >
                <Typography variant="body1" sx={{ mb: 2 }}>
                    According to forecasts, there is a 50% chance of achieving less than this outcome
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: 2,
                    }}
                />
            </Box>
        </Paper>
    );
}
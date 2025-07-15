import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const generateMockData = (graphType, valueType) => {
    const data = [];
    const startAge = 25;
    const endAge = 95;

    for (let age = startAge; age <= endAge; age++) {
        let item = { age: age };

        // Simulate different cash flow sources
        if (graphType === 'income') {
            // Example income cash flows
            item.pensionIncome = age >= 67 ? Math.max(0, (age - 67) * 500 + 10000 + Math.random() * 2000) : 0;
            item.investmentIncome = age >= 60 ? Math.max(0, (age - 60) * 300 + 5000 + Math.random() * 1000) : 0;
            item.otherIncome = age >= 65 && age <= 75 ? Math.max(0, (75 - age) * 200 + 1000 + Math.random() * 500) : 0;
        } else { // savings
            // Example savings cash flows (accumulating)
            item.pensionSavings = 100000 + (age - startAge) * 2000 + Math.random() * 5000;
            item.investmentSavings = 50000 + (age - startAge) * 1500 + Math.random() * 3000;
            item.cashSavings = 10000 + (age - startAge) * 500 + Math.random() * 1000;
        }

        // Apply a simple "value type" transformation for demonstration
        // In a real scenario, present/future value calculations are complex
        // and would involve discount rates, inflation, etc., typically done on the backend.
        if (valueType === 'future') {
            const futureFactor = Math.pow(1.02, (age - startAge)); // Simple growth factor
            for (const key in item) {
                if (key !== 'age') {
                    item[key] = item[key] * futureFactor;
                }
            }
        }

        data.push(item);
    }
    return data;
};

const CASHFLOW_COLORS = {
    pensionIncome: '#8884d8', // Purple
    investmentIncome: '#82ca9d', // Green
    otherIncome: '#ffc658', // Yellow
    pensionSavings: '#0088FE', // Blue
    investmentSavings: '#00C49F', // Teal
    cashSavings: '#FFBB28', // Orange
};

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

    // State to hold the data for the chart
    const [chartData, setChartData] = useState([]);

    // useEffect to update chart data whenever graphType or valueType changes
    useEffect(() => {
        setChartData(generateMockData(graphType, valueType));
    }, [graphType, valueType]); // Re-run when these dependencies change

    // Determine which cash flow keys to display in the chart based on graphType
    const cashflowKeys = graphType === 'income'
        ? ['pensionIncome', 'investmentIncome', 'otherIncome']
        : ['pensionSavings', 'investmentSavings', 'cashSavings'];

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
                    overflow: 'hidden', // Ensure graph doesn't overflow
                }}
            >
                {/* ResponsiveContainer makes the chart responsive to its parent's size */}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" /> {/* Dashed grid lines */}
                        <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: `${graphType === 'income' ? 'Income' : 'Savings'} (${valueType === 'present' ? 'Present' : 'Future'} Value)`, angle: -90, position: 'insideLeft' }} />
                        <Tooltip /> {/* Shows data on hover */}
                        <Legend /> {/* Displays the key for different colored bars */}

                        {/* Render a Bar for each cash flow type */}
                        {cashflowKeys.map((key) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                stackId="a" // 'a' makes all bars stack on top of each other
                                fill={CASHFLOW_COLORS[key]} // Use predefined colors
                                name={key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim().replace(/^\w/, c => c.toUpperCase())} // Nicer name for legend
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
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
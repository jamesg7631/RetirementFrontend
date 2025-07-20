import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {getInvestmentChartIncomeData} from "../api/apiService.js";

const CASHFLOW_COLORS = [
    '#8884d8', // Purple
    '#82ca9d', // Green
    '#ffc658', // Yellow
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FFBB28', // Orange
];

export default function MainContentArea({outcomeValue, retirementAge, percentageLumpsum, incomeStrategy}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [graphType, setGraphType] = useState('income');
    const [valueType, setValueType] = useState('present'); // Default to 'present'
    const [spousePercentage, setSpousePercentage] = useState(50);
    const [cashflowKeys, setCashflowKeys] = useState([]);

    const handleGraphTypeChange = (event, newGraphType) => {
        if (newGraphType !== null) {
            setGraphType(newGraphType);
        }
    };

    const handleValueTypeChange = (event) => {
        setValueType(event.target.value);
    };

    const handleSpousePercentageChange = (event) => {
        // Basic validation: ensure it's a number and within a reasonable range (0-100)
        const value = event.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100)) {
            setSpousePercentage(Number(value));
        }
    };

    // useEffect to update chart data whenever graphType or valueType changes
    useEffect(() => {
        // const mockData = generateMockData(graphType, valueType);
        // data below is real but kept variable name as mock to make it easier to change to other mode which I only have mock data for
        const mockData = async () => {
            console.log("Graph type or value type has changed!")
            try {
                setLoading(true);
                const response = await getInvestmentChartIncomeData(graphType, valueType, spousePercentage,
                    outcomeValue, retirementAge, percentageLumpsum, incomeStrategy);
                console.log("Graph Data in dashboard", response);
                setChartData(response);
                const unfilteredCashflowKeys = Object.keys(response[0]);
                const filteredCashflowKeys = unfilteredCashflowKeys.filter(key => key!== "age");
                console.log("Filtered cashflow keys", filteredCashflowKeys);
                setCashflowKeys(filteredCashflowKeys)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        console.log("Chart data", mockData);
        mockData();
    }, [graphType, valueType, spousePercentage, outcomeValue, retirementAge, percentageLumpsum, incomeStrategy]); // Re-run when these dependencies change

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
                        {cashflowKeys.map((key, i) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                stackId="a" // 'a' makes all bars stack on top of each other
                                fill={CASHFLOW_COLORS[i % (CASHFLOW_COLORS.length)]} // Use predefined colors
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
                    According to forecasts, there is a {outcomeValue} % chance of achieving less than this outcome
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
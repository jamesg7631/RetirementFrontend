import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Paper, Typography, ToggleButton, ToggleButtonGroup,
    FormControl, InputLabel, Select, MenuItem, TextField,
    CircularProgress
} from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { getInvestmentChartIncomeData } from "../api/apiService.js";

const CASHFLOW_COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#0088FE', '#00C49F', '#FFBB28',
];

export default function MainContentArea({
                                            outcomeValue, retirementAge, percentageLumpsum, incomeStrategy,
                                            withdrawalType, initialAmount, increaseRate,
                                            annuityType, annuityIncreaseRate, statePensionAge, statePensionValue,
                                            setStatePensionAge, setStatePensionValue,
                                            graphType, setGraphType, desiredAnnualIncome,
                                            currentScenario, isExploredView
                                        }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [valueType, setValueType] = useState('present');
    const [spousePercentage, setSpousePercentage] = useState(50);
    const [cashflowKeys, setCashflowKeys] = useState([]);
    const fetchInProgress = useRef(false);

    const handleGraphTypeChange = (event, newGraphType) => {
        if (newGraphType !== null) {
            setGraphType(newGraphType);
        }
    };

    const handleSpousePercentageChange = (event) => {
        const value = event.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100)) {
            setSpousePercentage(Number(value));
        }
    };

    useEffect(() => {
        if (fetchInProgress.current) return;
        if (retirementAge < 57) return;

        const fetchData = async () => {
            try {
                fetchInProgress.current = true;
                setLoading(true);

                const strategyParameters = incomeStrategy === 'Withdrawal'
                    ? {
                        withdrawalType,
                        initialAmount: parseFloat(initialAmount),
                        increaseRate: parseFloat(increaseRate)
                    }
                    : {
                        annuityType,
                        increaseRate: annuityType === 'escalating'
                            ? parseFloat(annuityIncreaseRate)
                            : 0
                    };

                const response = await getInvestmentChartIncomeData(
                    graphType,
                    valueType,
                    spousePercentage,
                    outcomeValue,
                    retirementAge,
                    percentageLumpsum,
                    incomeStrategy,
                    strategyParameters
                );

                setChartData(response.investmentChartDTO);

                if (response.investmentChartDTO?.[0]) {
                    setCashflowKeys(Object.keys(response.investmentChartDTO[0]).filter(key => key !== "age"));
                }
            } catch (err) {
                console.error('Error fetching chart data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
                fetchInProgress.current = false;
            }
        };

        const timeoutId = setTimeout(fetchData, 500);
        return () => clearTimeout(timeoutId);
    }, [
        graphType, valueType, spousePercentage, outcomeValue,
        retirementAge, percentageLumpsum, incomeStrategy,
        withdrawalType, initialAmount, increaseRate,
        annuityType, annuityIncreaseRate
    ]);

    return (
        <Paper sx={{
            flexGrow: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 3,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 3 }}>
                <ToggleButtonGroup
                    value={graphType}
                    exclusive
                    onChange={handleGraphTypeChange}
                    aria-label="graph type"
                    size="small"
                >
                    <ToggleButton value="income" aria-label="income forecast">
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Income Forecast</Typography>
                    </ToggleButton>
                    <ToggleButton value="savings" aria-label="savings forecast">
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Savings Forecast</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Value Type</InputLabel>
                    <Select
                        value={valueType}
                        label="Value Type"
                        onChange={(e) => setValueType(e.target.value)}
                    >
                        <MenuItem value="present">Present Value</MenuItem>
                        <MenuItem value="future">Future Value</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="% Spouse"
                    variant="outlined"
                    size="small"
                    value={spousePercentage}
                    onChange={handleSpousePercentageChange}
                    sx={{ width: 100 }}
                    InputProps={{
                        endAdornment: <Typography sx={{ mr: 0.5 }}>%</Typography>,
                    }}
                />
            </Box>

            {graphType === "income" && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    mb: 1,
                    mr: 8
                }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            display: 'inline-block',
                            width: '40px',
                            height: '1px',
                            borderTop: '1px dashed #ff0000',
                            marginRight: '8px'
                        }}/>
                        Desired Annual Income: £{desiredAnnualIncome?.toLocaleString()}
                    </Typography>
                </Box>
            )}

            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 3,
                minHeight: '400px',
                height: '500px'
            }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 60, left: 80, bottom: 50 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="age"
                                label={{ value: 'Age', position: 'insideBottom', offset: -40 }}
                            />
                            <YAxis
                                label={{
                                    value: `${graphType === 'income' ? 'Income' : 'Savings'} (${valueType === 'present' ? 'Present' : 'Future'} Value)`,
                                    angle: -90,
                                    position: 'insideLeft',
                                    offset: -40
                                }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />

                            {graphType === "income" && (
                                <ReferenceLine y={desiredAnnualIncome} stroke="#ff0000" strokeDasharray="3 3" />
                            )}

                            {cashflowKeys.map((key, i) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    stackId="a"
                                    fill={CASHFLOW_COLORS[i % CASHFLOW_COLORS.length]}
                                    name={key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Box>

            <Box sx={{
                textAlign: 'center',
                bgcolor: 'grey.200',
                p: 2,
                borderRadius: 1,
            }}>
                <Typography variant="body1">
                    According to forecasts, there is a {outcomeValue}% chance of achieving less than this outcome
                </Typography>
            </Box>
        </Paper>
    );
}

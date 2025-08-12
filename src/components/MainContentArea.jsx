import React, { useState, useEffect, useRef, useMemo } from 'react';
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

// Helper function to format the names for the legend
const formatLegendName = (key) => {
    return key
        .replace(/^(current_|explored_)/, '') // Remove prefix
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .trim();
};


export default function MainContentArea({
                                            // Props for the active scenario (current or explored)
                                            outcomeValue, retirementAge, percentageLumpsum, incomeStrategy,
                                            withdrawalType, initialAmount, increaseRate,
                                            annuityType, annuityIncreaseRate, statePensionAge, statePensionValue,
                                            graphType, setGraphType, desiredAnnualIncome,

                                            // Props specific to the explored view
                                            currentScenario, // This will contain the state of the "Current Scenario" tab
                                            isExploredView   // This boolean tells us if we are on the "Explored Scenario" tab
                                        }) {
    // State for the active scenario's data (this will be the explored data in explored view)
    const [activeChartData, setActiveChartData] = useState([]);
    // State specifically for the current scenario's data when in explored view
    const [currentScenarioChartData, setCurrentScenarioChartData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [valueType, setValueType] = useState('present');
    const [spousePercentage, setSpousePercentage] = useState(50);

    // Using a ref to prevent multiple fetches on rapid state changes
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

    // This useEffect fetches data for the ACTIVE scenario (either current or explored)
    useEffect(() => {
        if (fetchInProgress.current) return;
        if (retirementAge < 57) return;

        const fetchData = async (scenarioProps) => {
            const strategyParameters = scenarioProps.incomeStrategy === 'Withdrawal'
                ? {
                    withdrawalType: scenarioProps.withdrawalType,
                    initialAmount: parseFloat(scenarioProps.initialAmount),
                    increaseRate: parseFloat(scenarioProps.increaseRate)
                }
                : {
                    annuityType: scenarioProps.annuityType,
                    increaseRate: scenarioProps.annuityType === 'escalating'
                        ? parseFloat(scenarioProps.annuityIncreaseRate)
                        : 0
                };

            return getInvestmentChartIncomeData(
                scenarioProps.graphType,
                valueType,
                spousePercentage,
                scenarioProps.outcomeValue,
                scenarioProps.retirementAge,
                scenarioProps.percentageLumpsum,
                scenarioProps.incomeStrategy,
                strategyParameters
            );
        };

        const executeFetch = async () => {
            try {
                fetchInProgress.current = true;
                setLoading(true);
                setError(null);

                // Fetch data for the currently active scenario
                const activeScenarioProps = {
                    outcomeValue, retirementAge, percentageLumpsum, incomeStrategy, withdrawalType,
                    initialAmount, increaseRate, annuityType, annuityIncreaseRate, graphType
                };
                const response = await fetchData(activeScenarioProps);
                setActiveChartData(response.investmentChartDTO || []);

                // If in explored view, also fetch data for the current scenario for comparison
                if (isExploredView && currentScenario) {
                    const currentResponse = await fetchData(currentScenario);
                    setCurrentScenarioChartData(currentResponse.investmentChartDTO || []);
                }

            } catch (err) {
                console.error('Error fetching chart data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
                fetchInProgress.current = false;
            }
        };

        const timeoutId = setTimeout(executeFetch, 500);
        return () => clearTimeout(timeoutId);
    }, [
        // Dependencies for the active scenario
        graphType, valueType, spousePercentage, outcomeValue,
        retirementAge, percentageLumpsum, incomeStrategy,
        withdrawalType, initialAmount, increaseRate,
        annuityType, annuityIncreaseRate,
        // Dependencies for the comparison view
        isExploredView, currentScenario
    ]);

    // This useMemo hook merges the two datasets when in explored view
    const combinedChartData = useMemo(() => {
        if (!isExploredView || !currentScenarioChartData.length || !activeChartData.length) {
            return activeChartData;
        }

        const mergedDataMap = new Map();

        // Process current scenario data first
        currentScenarioChartData.forEach(item => {
            const entry = { age: item.age };
            Object.keys(item).forEach(key => {
                if (key !== 'age') {
                    entry[`current_${key}`] = item[key];
                }
            });
            mergedDataMap.set(item.age, entry);
        });

        // Merge explored scenario data
        activeChartData.forEach(item => {
            const entry = mergedDataMap.get(item.age) || { age: item.age };
            Object.keys(item).forEach(key => {
                if (key !== 'age') {
                    entry[`explored_${key}`] = item[key];
                }
            });
            mergedDataMap.set(item.age, entry);
        });

        return Array.from(mergedDataMap.values()).sort((a, b) => a.age - b.age);
    }, [isExploredView, activeChartData, currentScenarioChartData]);

    // Determine the keys for rendering the bars
    const { cashflowKeys, currentKeys, exploredKeys } = useMemo(() => {
        const data = isExploredView ? combinedChartData : activeChartData;
        if (!data || data.length === 0) {
            return { cashflowKeys: [], currentKeys: [], exploredKeys: [] };
        }

        const allKeys = Object.keys(data[0]).filter(key => key !== 'age');

        if (isExploredView) {
            return {
                cashflowKeys: [],
                currentKeys: allKeys.filter(k => k.startsWith('current_')),
                exploredKeys: allKeys.filter(k => k.startsWith('explored_')),
            };
        } else {
            return {
                cashflowKeys: allKeys,
                currentKeys: [],
                exploredKeys: [],
            };
        }
    }, [isExploredView, combinedChartData, activeChartData]);


    const chartDataToDisplay = isExploredView ? combinedChartData : activeChartData;

    return (
        <Paper sx={{
            flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', boxShadow: 3,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 3 }}>
                {/* Controls remain the same */}
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
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                    mb: 1, mr: 8
                }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            display: 'inline-block', width: '40px', height: '1px',
                            borderTop: '1px dashed #ff0000', marginRight: '8px'
                        }} />
                        Desired Annual Income: £{desiredAnnualIncome?.toLocaleString()}
                    </Typography>
                </Box>
            )}

            <Box sx={{
                flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
                mb: 3, minHeight: '400px', height: '500px'
            }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartDataToDisplay}
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
                                    angle: -90, position: 'insideLeft', offset: -40
                                }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />

                            {graphType === "income" && (
                                <ReferenceLine y={desiredAnnualIncome} stroke="#ff0000" strokeDasharray="3 3" />
                            )}

                            {/* CONDITIONAL RENDERING FOR BARS */}
                            {isExploredView ? (
                                <>
                                    {/* Render bars for CURRENT scenario */}
                                    {currentKeys.map((key, i) => (
                                        <Bar
                                            key={key}
                                            dataKey={key}
                                            stackId="current" // Grouped by this ID
                                            fill={CASHFLOW_COLORS[i % CASHFLOW_COLORS.length]}
                                            name={`Current - ${formatLegendName(key)}`}
                                        />
                                    ))}
                                    {/* Render bars for EXPLORED scenario */}
                                    {exploredKeys.map((key, i) => (
                                        <Bar
                                            key={key}
                                            dataKey={key}
                                            stackId="explored" // Grouped by this ID
                                            fill={CASHFLOW_COLORS[i % CASHFLOW_COLORS.length]}
                                            name={`Explored - ${formatLegendName(key)}`}
                                        />
                                    ))}
                                </>
                            ) : (
                                // Original rendering for single view
                                cashflowKeys.map((key, i) => (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        stackId="a" // All stacked together
                                        fill={CASHFLOW_COLORS[i % CASHFLOW_COLORS.length]}
                                        name={formatLegendName(key)}
                                    />
                                ))
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Box>

            <Box sx={{
                textAlign: 'center', bgcolor: 'grey.200', p: 2, borderRadius: 1,
            }}>
                <Typography variant="body1">
                    According to forecasts, there is a {outcomeValue}% chance of achieving less than this outcome
                </Typography>
            </Box>
        </Paper>
    );
}
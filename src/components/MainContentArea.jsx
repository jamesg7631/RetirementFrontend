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

const formatLegendName = (key) => {
    return key
        .replace(/^(current_|explored_)/, '')
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .trim();
};

// ✅ --- ENHANCED CUSTOM LEGEND COMPONENT --- ✅
// This component now handles the layout for BOTH the Current and Explored scenarios.
const CustomLegend = ({ payload, isExploredView }) => {
    // Don't render anything if there's no data
    if (!payload || payload.length === 0) {
        return null;
    }

    // A. Logic for the "Explored Scenario" two-column layout
    if (isExploredView) {
        const currentItems = payload.filter(entry => entry.value.startsWith('Current'));
        const exploredItems = payload.filter(entry => entry.value.startsWith('Explored'));

        const renderLegendList = (title, items) => (
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>{title}</Typography>
                {items.map((entry, index) => (
                    <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Box component="span" sx={{ width: 12, height: 12, bgcolor: entry.color, mr: 1.5, display: 'inline-block', flexShrink: 0 }} />
                        <Typography variant="body2">{entry.value.replace(/^(Current - |Explored - )/, '')}</Typography>
                    </Box>
                ))}
            </Box>
        );

        return (
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>Age</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                    {currentItems.length > 0 && renderLegendList('Current Scenario', currentItems)}
                    {exploredItems.length > 0 && renderLegendList('Explored Scenario', exploredItems)}
                </Box>
            </Box>
        );
    }

    // B. Logic for the "Current Scenario" single-row layout
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>Age</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}>
                {payload.map((entry, index) => (
                    <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ width: 12, height: 12, bgcolor: entry.color, mr: 1 }} />
                        <Typography variant="body2">{entry.value}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};


export default function MainContentArea({
                                            // ... Props are unchanged
                                            outcomeValue, retirementAge, percentageLumpsum, incomeStrategy,
                                            withdrawalType, initialAmount, increaseRate,
                                            annuityType, annuityIncreaseRate, statePensionAge, statePensionValue,
                                            graphType, setGraphType, desiredAnnualIncome,
                                            currentScenario,
                                            isExploredView
                                        }) {
    // ... All state and hooks remain the same
    const [activeChartData, setActiveChartData] = useState([]);
    const [currentScenarioChartData, setCurrentScenarioChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [valueType, setValueType] = useState('present');
    const [spousePercentage, setSpousePercentage] = useState(50);
    const fetchInProgress = useRef(false);

    // ... All handlers and useEffect hooks remain the same
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
                scenarioProps.graphType, valueType, spousePercentage,
                scenarioProps.outcomeValue, scenarioProps.retirementAge,
                scenarioProps.percentageLumpsum, scenarioProps.incomeStrategy,
                strategyParameters
            );
        };

        const executeFetch = async () => {
            try {
                fetchInProgress.current = true;
                setLoading(true);
                setError(null);

                const activeScenarioProps = {
                    outcomeValue, retirementAge, percentageLumpsum, incomeStrategy, withdrawalType,
                    initialAmount, increaseRate, annuityType, annuityIncreaseRate, graphType
                };
                const response = await fetchData(activeScenarioProps);
                setActiveChartData(response.investmentChartDTO || []);

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
        graphType, valueType, spousePercentage, outcomeValue,
        retirementAge, percentageLumpsum, incomeStrategy,
        withdrawalType, initialAmount, increaseRate,
        annuityType, annuityIncreaseRate,
        isExploredView, currentScenario
    ]);

    const combinedChartData = useMemo(() => {
        if (!isExploredView || !currentScenarioChartData.length || !activeChartData.length) {
            return activeChartData;
        }
        const mergedDataMap = new Map();
        currentScenarioChartData.forEach(item => {
            const entry = { age: item.age };
            Object.keys(item).forEach(key => {
                if (key !== 'age') {
                    entry[`current_${key}`] = item[key];
                }
            });
            mergedDataMap.set(item.age, entry);
        });
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
            { /* ... Top controls are unchanged ... */ }
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
                mb: 3, minHeight: '650px', height: '750px'
            }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartDataToDisplay}
                            // ✅ FIXED: Using a single, generous margin for both views.
                            margin={{ top: 20, right: 60, left: 80, bottom: 120 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            {/* ✅ FIXED: XAxis is now simple. The label is in the custom legend. */}
                            <XAxis dataKey="age" />

                            <YAxis
                                label={{
                                    value: `${graphType === 'income' ? 'Income' : 'Savings'} (${valueType === 'present' ? 'Present' : 'Future'} Value)`,
                                    angle: -90, position: 'insideLeft', offset: -40
                                }}
                            />
                            <Tooltip />

                            {/* ✅ FIXED: Unconditionally render the enhanced custom legend */}
                            <Legend content={<CustomLegend payload={undefined} isExploredView={isExploredView} />} />

                            {graphType === "income" && (
                                <ReferenceLine y={desiredAnnualIncome} stroke="#ff0000" strokeDasharray="3 3" />
                            )}

                            {isExploredView ? (
                                <>
                                    {currentKeys.map((key, i) => (
                                        <Bar
                                            key={key} dataKey={key} stackId="current"
                                            fill={CASHFLOW_COLORS[i % CASHFLOW_COLORS.length]}
                                            name={`Current - ${formatLegendName(key)}`}
                                        />
                                    ))}
                                    {exploredKeys.map((key, i) => (
                                        <Bar
                                            key={key} dataKey={key} stackId="explored"
                                            fill={CASHFLOW_COLORS[i % CASHFLOW_COLORS.length]}
                                            name={`Explored - ${formatLegendName(key)}`}
                                        />
                                    ))}
                                </>
                            ) : (
                                cashflowKeys.map((key, i) => (
                                    <Bar
                                        key={key} dataKey={key} stackId="a"
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
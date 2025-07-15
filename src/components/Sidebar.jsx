import React, { useState } from 'react';
import { Paper, Tabs, Tab, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Stack } from '@mui/system'; // For vertical stacking

function Sidebar() {
    // Default active tab
    const [activeTab, setActiveTab] = useState(0); // 0 for My savings, 1 for My options

    // My Savings State
    const [savingsItems, setSavingsItems] = useState([
        { id: 1, name: 'Aon Pension Account', value: '£100 000' },
        { id: 2, name: 'DB Pension 1', value: '£5 000' },
        { id: 3, name: 'DC Pension 2', value: '£75 000' },
        { id: 4, name: 'State Pension Age', value: '67' },
    ]);
    // My Options State
    const [retirementAge, setRetirementAge] = useState('67');
    const [incomeStrategy, setIncomeStrategy] = useState('Annuity');
    const [lumpSum, setLumpSum] = useState('25 %');
    const [desiredIncome, setDesiredIncome] = useState('£ 30000');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Paper sx={{ width: 280, p: 2, display: 'flex', flexDirection: 'column' }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 2, bgcolor: 'background.default', borderRadius: 1 }}
            >
                <Tab label="My savings" sx={{
                    bgcolor: activeTab === 0 ? 'secondary.light' : 'transparent', // Light blue background for active
                    color: activeTab === 0 ? 'primary.contrastText' : 'text.primary',
                    border: '1px solid',
                    borderColor: activeTab === 0 ? 'secondary.main' : 'grey.300',
                    borderRight: activeTab === 0 ? 'none' : '1px solid grey.300',
                    borderTopLeftRadius: 'inherit',
                    borderBottomLeftRadius: 'inherit',
                }} />
                <Tab label="My options" sx={{
                    bgcolor: activeTab === 1 ? 'secondary.light' : 'transparent',
                    color: activeTab === 1 ? 'primary.contrastText' : 'text.primary',
                    border: '1px solid',
                    borderColor: activeTab === 1 ? 'secondary.main' : 'grey.300',
                    borderLeft: activeTab === 1 ? 'none' : '1px solid grey.300',
                    borderTopRightRadius: 'inherit',
                    borderBottomRightRadius: 'inherit',
                }} />
            </Tabs>

            <Box sx={{ flexGrow: 1 }}>
                {activeTab === 0 && (
                    <Stack spacing={2}>
                        {savingsItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    pb: 1,
                                    borderBottom: '1px solid',
                                    borderColor: 'grey.300',
                                }}
                            >
                                <Typography variant="body1" fontWeight="bold" color="text.secondary">
                                    {item.name}
                                </Typography>
                                <Typography variant="body1">
                                    {item.value}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                )}
                {activeTab === 1 && (
                    <Stack spacing={2}> {/* Stack components vertically with spacing */}
                        <TextField
                            label="Retirement Age"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Income strategy</InputLabel>
                            <Select
                                value={incomeStrategy}
                                label="Income strategy"
                                onChange={(e) => setIncomeStrategy(e.target.value)}
                            >
                                <MenuItem value="Annuity">Annuity</MenuItem>
                                <MenuItem value="Withdrawal">Withdrawal</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Lump sum at retirement"
                            value={lumpSum}
                            onChange={(e) => setLumpSum(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="Desired Annual Income"
                            value={desiredIncome}
                            onChange={(e) => setDesiredIncome(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: <Typography sx={{mr: 0.5}}>£</Typography>,
                            }}
                        />
                    </Stack>
                )}
            </Box>
        </Paper>
    );
}

export default Sidebar;
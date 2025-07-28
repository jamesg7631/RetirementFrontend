import {
    FormControl,
    FormControlLabel,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
    Box,
    Tooltip,
} from '@mui/material';
import { useState } from 'react';

export default function WithdrawalStrategy({ incomeStrategy, setIncomeStrategy }) {
    const [withdrawalType, setWithdrawalType] = useState('fixed');
    const [initialAmount, setInitialAmount] = useState('1000');
    const [increaseRate, setIncreaseRate] = useState('3');

    const handleIncomeStrategyChange = (event) => {
        setIncomeStrategy(event.target.value);
    };

    const handleWithdrawalTypeChange = (event) => {
        setWithdrawalType(event.target.value);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Income Strategy
                </Typography>
                <Select
                    value={incomeStrategy}
                    onChange={handleIncomeStrategyChange}
                    size="small"
                >
                    <MenuItem value="Annuity">Annuity</MenuItem>
                    <MenuItem value="Withdrawal">Withdrawal</MenuItem>
                </Select>
            </FormControl>

            {incomeStrategy === 'Withdrawal' && (
                <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Withdrawal Type
                        </Typography>
                        <RadioGroup
                            value={withdrawalType}
                            onChange={handleWithdrawalTypeChange}
                        >
                            <Tooltip title="Fixed amount withdrawn each year">
                                <FormControlLabel
                                    value="fixed"
                                    control={<Radio />}
                                    label="Fixed Amount"
                                />
                            </Tooltip>
                            <Tooltip title="Amount increases with inflation">
                                <FormControlLabel
                                    value="inflation"
                                    control={<Radio />}
                                    label="Inflation-Adjusted"
                                />
                            </Tooltip>
                            <Tooltip title="Amount increases by a percentage each year">
                                <FormControlLabel
                                    value="percentage"
                                    control={<Radio />}
                                    label="Percentage Increase"
                                />
                            </Tooltip>
                            <Tooltip title="Amount increases by a fixed amount each year">
                                <FormControlLabel
                                    value="fixed-increase"
                                    control={<Radio />}
                                    label="Fixed Pound Increase"
                                />
                            </Tooltip>
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Initial Withdrawal Amount
                        </Typography>
                        <TextField
                            value={initialAmount}
                            onChange={(e) => setInitialAmount(e.target.value)}
                            type="number"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">£</InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>

                    {(withdrawalType === 'percentage' || withdrawalType === 'fixed-increase') && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                {withdrawalType === 'percentage' ? 'Annual Increase (%)' : 'Annual Increase (£)'}
                            </Typography>
                            <TextField
                                value={increaseRate}
                                onChange={(e) => setIncreaseRate(e.target.value)}
                                type="number"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {withdrawalType === 'percentage' ? '%' : '£'}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    )}
                </>
            )}
        </Box>
    );
}

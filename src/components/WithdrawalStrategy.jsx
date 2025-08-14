import {
    FormControl,
    FormControlLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Box,
    Tooltip,
} from '@mui/material';

export default function WithdrawalStrategy({
                                               withdrawalType,
                                               initialAmount,
                                               increaseRate,
                                               onUpdate
                                           }) {

    const handleWithdrawalTypeChange = (newType) => {
        onUpdate({ withdrawalType: newType });
    };

    const handleInitialAmountChange = (newAmount) => {
        onUpdate({ initialAmount: newAmount });
    };

    const handleIncreaseRateChange = (newRate) => {
        onUpdate({ increaseRate: newRate });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Withdrawal Type
                </Typography>
                <RadioGroup
                    value={withdrawalType}
                    onChange={(e) => handleWithdrawalTypeChange(e.target.value)}
                >
                    <Tooltip title="Fixed amount withdrawn each year">
                        <FormControlLabel
                            value="fixed"
                            control={<Radio/>}
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
                            control={<Radio/>}
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
                    onChange={(e) => handleInitialAmountChange(e.target.value)}
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
                        onChange={(e) => handleIncreaseRateChange(e.target.value)}
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
        </Box>
    );
}
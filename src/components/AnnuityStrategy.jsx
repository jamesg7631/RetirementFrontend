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

export default function AnnuityStrategy({
                                            annuityType,
                                            setAnnuityType,
                                            annuityIncreaseRate,
                                            setAnnuityIncreaseRate
                                        }) {
    const handleAnnuityTypeChange = (event) => {
        setAnnuityType(event.target.value);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Annuity Type
                </Typography>
                <RadioGroup
                    value={annuityType}
                    onChange={handleAnnuityTypeChange}
                >
                    <Tooltip title="Fixed amount paid each year">
                        <FormControlLabel
                            value="level"
                            control={<Radio />}
                            label="Level Annuity"
                        />
                    </Tooltip>
                    <Tooltip title="Amount increases each year">
                        <FormControlLabel
                            value="escalating"
                            control={<Radio />}
                            label="Escalating Annuity"
                        />
                    </Tooltip>
                </RadioGroup>
            </FormControl>

            {annuityType === 'escalating' && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Annual Increase Rate
                    </Typography>
                    <TextField
                        value={annuityIncreaseRate}
                        onChange={(e) => setAnnuityIncreaseRate(e.target.value)}
                        type="number"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">%</InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
            )}
        </Box>
    );
}
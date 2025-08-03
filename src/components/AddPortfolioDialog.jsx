import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
} from '@mui/material';

export default function AddPortfolioDialog({ open, onClose }) {
    const [portfolioName, setPortfolioName] = useState('');
    const [allocations, setAllocations] = useState({
        'Commodities': '',
        'Developed Market Equities': '',
        'Global Emerging Market Equities': '',
        'Global Bonds': '',
        'Global High Yield Corporate Bonds': '',
        'Global Infrastructure Equities': '',
        'International Property': '',
        'Moneymarket': '',
        'Precious Metals': '',
        'UK Property': '',
        'US Corporate Bonds': ''
    });

    const handleNameChange = (event) => {
        setPortfolioName(event.target.value);
    };

    const handleAllocationChange = (type, value) => {
        setAllocations(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleSubmit = () => {

        onClose();
    };

    const handleClose = () => {
        setPortfolioName('');
        setAllocations({
            'Commodities': '',
            'Developed Market Equities': '',
            'Global Emerging Market Equities': '',
            'Global Bonds': '',
            'Global High Yield Corporate Bonds': '',
            'Global Infrastructure Equities': '',
            'International Property': '',
            'Moneymarket': '',
            'Precious Metals': '',
            'UK Property': '',
            'US Corporate Bonds': ''
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Create New Portfolio</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Portfolio Name"
                        value={portfolioName}
                        onChange={handleNameChange}
                        fullWidth
                        required
                    />
                    {Object.entries(allocations).map(([type, value]) => (
                        <TextField
                            key={type}
                            label={`${type} Allocation (%)`}
                            type="number"
                            value={value}
                            onChange={(e) => handleAllocationChange(type, e.target.value)}
                            fullWidth
                            required
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

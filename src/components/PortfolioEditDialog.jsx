import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box
} from '@mui/material';

export default function PortfolioEditDialog({ open, onClose, portfolio }) {
    const [allocations, setAllocations] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (portfolio) {
            setAllocations(portfolio.allocations || {});
            calculateTotal(portfolio.allocations || {});
        }
    }, [portfolio]);

    const calculateTotal = (allocs) => {
        const sum = Object.values(allocs).reduce((acc, val) => acc + Number(val), 0);
        setTotal(sum);
    };

    const handleAllocationChange = (assetClass, value) => {
        const newAllocations = {
            ...allocations,
            [assetClass]: value
        };
        setAllocations(newAllocations);
        calculateTotal(newAllocations);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { bgcolor: 'background.paper' }
            }}
        >
            <DialogTitle>Edit Portfolio: {portfolio?.name}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    {Object.entries(allocations).map(([assetClass, value]) => (
                        <TextField
                            key={assetClass}
                            label={assetClass}
                            type="number"
                            value={value}
                            onChange={(e) => handleAllocationChange(assetClass, e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                    ))}
                    <Typography
                        sx={{
                            mt: 2,
                            color: total === 100 ? 'text.primary' : 'error.main',
                            fontWeight: 'medium'
                        }}
                    >
                        Total Allocation: {total}%
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button
                    onClick={() => {/* Save handler */}}
                    disabled={total !== 100}
                    color="primary"
                    variant="contained"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

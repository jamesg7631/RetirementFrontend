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
        console.log("Portfolio Dialog useEffect")
        const assetClasses = {...portfolio}
        delete assetClasses.portfolioName;
        delete assetClasses.id;
        console.log(assetClasses)
        setAllocations(assetClasses || {});
        calculateTotal(assetClasses || {});
    }, [portfolio]);

    const calculateTotal = (assetClasses) => {
        let sum = 0;
        for (const [key,value] of Object.entries(assetClasses)) {
            const holding = value.holdings * 100;
            sum += holding;
        }

        setTotal(sum);
    };

    const handleAllocationChange = (assetClass, value) => {
        console.log("Check what is passed when asset allocations change!")
        const key = Object.entries(assetClass)[0][0];
        allocations[key].holdings = Number(value);
        const newAllocations = {
            ...allocations,
            // assetClass
        };
        setAllocations(newAllocations);
        calculateTotal(newAllocations);
    };

    const renderAllocationFields = () => {
        const fields = [];
        for (const [key,value] of Object.entries(allocations)) {
            console.log("Key: " + key);
            console.log("Value: " + value);
            const assetClass = {};
            assetClass[key] = value;
            fields.push(
                <TextField
                    key={value.name}
                    label={value.name}
                    type="number"
                    value={value.holdings * 100}
                    onChange={(e) => handleAllocationChange(assetClass, e.target.value / 100)}
                    fullWidth
                    variant="outlined"
                />
            );
        }
        return fields;
    }

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
                    {renderAllocationFields()}
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

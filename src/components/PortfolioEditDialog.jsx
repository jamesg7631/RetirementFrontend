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
import {createNewPortfolio, editPortfolio} from "../api/apiService.js";
import {useNavigate} from "react-router";

export default function PortfolioEditDialog({ open, onClose, portfolio }) {
    const [allocations, setAllocations] = useState({});
    const [total, setTotal] = useState(0);
    const [portfolioName, setPortfolioName] = useState({}) // was portfolio.portfolioName then realised portfolio value was null on web page load. Could make async or {} originally?
    const [id, setId] = useState(0); // Same logic as above for portfolio.id

    useEffect(() => {
        const assetClasses = {...portfolio};
        setPortfolioName(assetClasses.portfolioName || {});
        setId(assetClasses.id || {});
        delete assetClasses.portfolioName;
        delete assetClasses.id;
        setAllocations(assetClasses || {});
        calculateTotal(assetClasses || {});


    }, [portfolio]);

    const calculateTotal = (assetClasses) => {
        const sum = Object.values(assetClasses).reduce((acc, value) => {
            return acc + (value.holdings * 100 || 0);
        }, 0);
        setTotal(sum);
    };

    const handleAllocationChange = (assetClass, value) => {
        const key = Object.entries(assetClass)[0][0];
        const numericValue = value === '' ? 0 : parseFloat(value) / 100;

        const newAllocations = {
            ...allocations,
            [key]: {
                ...allocations[key],
                holdings: numericValue
            }
        };
        setAllocations(newAllocations);
        calculateTotal(newAllocations);
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (total === 100) {
            try {
                portfolio = {...allocations}
                portfolio.portfolioName = portfolioName;
                portfolio.id = id;
                const response = await editPortfolio(portfolio);
                navigate('/portfolios')
            } catch (error) {
                console.log("Error: Failure to add Portfolio " + error)
                navigate('/portfolios')
            }
        }
    }

    const renderAllocationFields = () => {
        return Object.entries(allocations).map(([key, value]) => {
            const assetClass = { [key]: value };
            const displayValue = (value.holdings * 100).toFixed(2);

            return (
                <TextField
                    key={value.name}
                    label={value.name}
                    type="number"
                    value={displayValue === '0.00' ? '' : displayValue}
                    onChange={(e) => handleAllocationChange(assetClass, e.target.value)}
                    fullWidth
                    variant="outlined"
                    inputProps={{
                        step: "0.01",
                        min: "0",
                        max: "100"
                    }}
                />
            );
        });
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
                    onClick={handleSubmit}
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

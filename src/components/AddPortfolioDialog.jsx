import React, {useEffect, useState} from 'react';
import {initialAllocations} from "../utils/config.js";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box, Typography
} from '@mui/material';
import {createNewPortfolio} from "../api/apiService.js";
import {useNavigate} from "react-router";

export default function AddPortfolioDialog({ open, onClose }) {
    const [portfolioName, setPortfolioName] = useState('');
    const [allocations, setAllocations] = useState(initialAllocations);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getTotalHoldings = () => {
            let sum = 0;
            for (const [assetClassKey, assetClassO] of Object.entries(allocations)) {
                sum += assetClassO.holdings;
            }
            sum *= 100;
            setTotal(sum);
        }
        getTotalHoldings();
    }, [allocations])

    const handleNameChange = (event) => {
        setPortfolioName(event.target.value);
    };

    const handleAllocationChange = (type, fieldEntry) => {
        console.log("Asset allocation change!");
        const holdingValue = fieldEntry / 100;
        const newAllocations = {...allocations};
        Object.entries(type).map(([key, value]) => {
            newAllocations[key] = value;
            newAllocations[key].holdings = holdingValue;
        });
        setAllocations((newAllocations));
    };

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const portfolio = {...allocations};
            portfolio.portfolioName = portfolioName;
            const response = await createNewPortfolio(portfolio);
            if (response === "success") {
                navigate("/portfolios")
                window.location.reload();
            }
            console.log("Successfully added portfolio");

        } catch (error) {
            console.error("Error: Failure to add portfolio " + error);
        }
        onClose();
    };

    const handleClose = () => {
        setPortfolioName('');
        setAllocations(initialAllocations);
        onClose();
    };

    const renderAllocationFields = () => {
        return Object.entries(allocations).map(([key, value]) => {
            const assetClass = {[key]: value};
            const displayValue = (value.holdings * 100).toFixed(2);

            return (
                <TextField
                    key={value.name}
                    label={`${value.name} Allocation (%)`}
                    type="number"
                    value={displayValue === '0.00' ? '' : displayValue}
                    onChange={(e) => handleAllocationChange(assetClass, e.target.value)}
                    fullWidth
                    variant="outlined"
                    inputProps={{
                        step: "0.00",
                        min: "0",
                        max: "100"
                    }}
                />
            );
        });
    }

    const forgottenFieldMessage = () => {
        if (portfolioName === "") {
            return (
                <Typography
                    sx={{
                        mt: 2,
                        color: 'error.main',
                        fontWeight: 'medium'
                    }}
                >
                    Total Allocation: {total}%
                    Please enter a portfolio name !
                </Typography>
            );
        } else {
            return (
                <Typography
                    sx={{
                        mt: 2,
                        color: total === 100 ? 'text.primary' : 'error.main',
                        fontWeight: 'medium'
                    }}
                >
                    Total Allocation: {total}%
                </Typography>
            );
        }
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
                    { renderAllocationFields()}
                    {forgottenFieldMessage()}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={total !== 100 || portfolioName === "" || portfolioName == null}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

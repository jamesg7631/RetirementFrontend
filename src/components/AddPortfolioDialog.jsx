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
    // const [allocations, setAllocations] = useState({
    //     'Commodities': '',
    //     'Developed Market Equities': '',
    //     'Global Emerging Market Equities': '',
    //     'Global Bonds': '',
    //     'Global High Yield Corporate Bonds': '',
    //     'Global Infrastructure Equities': '',
    //     'International Property': '',
    //     'Moneymarket': '',
    //     'Precious Metals': '',
    //     'UK Property': '',
    //     'US Corporate Bonds': ''
    // });
    // const initialAllocations = [
    //     {"commodities": {"name": "Commodities", "holdings": 0}},
    //     {"developedMarketEquities": [{"name": "Developed Market Equities"}, {"holdings": 0}]},
    //     {"globalBonds": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"emergingMarketEquities": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"globalHighYieldCorporateBonds": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"globalInfrastructureEquities": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"internationalProperty": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"moneymarket": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"preciousMetals": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"ukProperty": [{"name": "Commodities"}, {"holdings": 0}]},
    //     {"usCorporateBonds": [{"name": "Commodities"}, {"holdings": 0}]},
    // ];

    const initialAllocations = {
        "commodities": {"name": "Commodities", "holdings": 0},
        "developedMarketEquities": {"name": "Developed Market Equities", "holdings": 0},
        "globalBonds":{"name": "Global Bonds","holdings": 0},
        "emergingMarketEquities": {"name": "Global Emerging Market Equities","holdings": 0},
        "globalHighYieldCorporateBonds": {"name": "Global High Yield Corporate Bonds","holdings": 0},
        "globalInfrastructureEquities": {"name": "Global Infrastructure Equities","holdings": 0},
        "internationalProperty": {"name": "International Property","holdings": 0},
        "moneymarket": {"name": "Moneymarket","holdings": 0},
        "preciousMetals": {"name": "Precious Metals","holdings": 0},
        "ukProperty": {"name": "UK Property","holdings": 0},
        "usCorporateBonds": {"name": "US Corporate Bonds","holdings": 0},





    }
    const [allocations, setAllocations] = useState(initialAllocations);

    const handleNameChange = (event) => {
        setPortfolioName(event.target.value);
    };

    const handleAllocationChange = (type, value) => {
        console.log("Asset allocation change!")
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
                        step: "0.01",
                        min: "0",
                        max: "100"
                    }}
                />
            );
        });
    }

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
                    {/*{Object.entries(allocations).map(([type, value]) => (*/}
                    {/*    <TextField*/}
                    {/*        key={type}*/}
                    {/*        label={`${type} Allocation (%)`}*/}
                    {/*        type="number"*/}
                    {/*        value={value}*/}
                    {/*        onChange={(e) => handleAllocationChange(type, e.target.value)}*/}
                    {/*        fullWidth*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*))}*/}
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

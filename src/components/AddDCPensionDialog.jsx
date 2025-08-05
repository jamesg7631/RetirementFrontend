import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Tab,
    Tabs,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper
} from '@mui/material';
import { getAllPortfolios } from '../api/apiService';
import { initialAllocations} from "../utils/config.js";

export default function AddDCPensionDialog({ open, onClose }) {
    const [activeTab, setActiveTab] = useState(0);
    const [existingPortfolios, setExistingPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [pensionData, setPensionData] = useState({
        name: '',
        currentValue: '',
        contributionRate: '',
        employerContributionRate: '',
    });

    const [newPortfolio, setNewPortfolio] = useState(initialAllocations);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const portfolios = await getAllPortfolios();
                setExistingPortfolios(portfolios);
            } catch (error) {
                console.error('Error fetching portfolios:', error);
            }
        };
        if (open) {
            fetchPortfolios();
        }
    }, [open]);

    const handleChange = (field) => (event) => {
        setPensionData({
            ...pensionData,
            [field]: event.target.value
        });
    };

    const handlePortfolioChange = (event) => {
        setSelectedPortfolio(event.target.value);
    };

    const handleNewPortfolioChange = (field) => (event) => {
        const value = parseFloat(event.target.value) || 0;
        setNewPortfolio(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const getTotalAllocation = () => {
        const values = Object.values(newPortfolio).filter(value => typeof value === 'number');
        return values.reduce((sum, value) => sum + value, 0);
    };

    const renderBasicDetails = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Basic Details</Typography>
            <TextField
                label="Pension Name"
                value={pensionData.name}
                onChange={handleChange('name')}
                fullWidth
                required
            />
            {/*<TextField*/}
            {/*    label="Provider"*/}
            {/*    value={pensionData.provider}*/}
            {/*    onChange={handleChange('provider')}*/}
            {/*    fullWidth*/}
            {/*    required*/}
            {/*/>*/}
            <TextField
                label="Current Value"
                type="number"
                value={pensionData.currentValue}
                onChange={handleChange('currentValue')}
                fullWidth
                required
                InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>£</Typography>,
                }}
            />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Your Contribution Rate (%)"
                        type="number"
                        value={pensionData.contributionRate}
                        onChange={handleChange('contributionRate')}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Employer Rate (%)"
                        type="number"
                        value={pensionData.employerContributionRate}
                        onChange={handleChange('employerContributionRate')}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Add DC Pension</DialogTitle>
            <DialogContent>
                {renderBasicDetails()}

                <Paper sx={{ mt: 3 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Select Existing Portfolio" />
                        <Tab label="Create New Portfolio" />
                    </Tabs>

                    <Box sx={{ p: 2 }}>
                        {activeTab === 0 ? (
                            <FormControl fullWidth>
                                <InputLabel>Select Portfolio</InputLabel>
                                <Select
                                    value={selectedPortfolio}
                                    onChange={handlePortfolioChange}
                                    label="Select Portfolio"
                                >
                                    {existingPortfolios.map((portfolio) => (
                                        <MenuItem key={portfolio.id} value={portfolio.id}>
                                            {portfolio.portfolioName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Portfolio Name"
                                    value={newPortfolio.portfolioName}
                                    onChange={handleNewPortfolioChange('portfolioName')}
                                    fullWidth
                                    required
                                />
                                <Grid container spacing={2}>
                                    {/* Asset allocation fields */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}

                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Commodities (%)"
                                            type="number"
                                            value={newPortfolio.commodities}
                                            onChange={handleNewPortfolioChange('commodities')}
                                            fullWidth
                                        />
                                    </Grid>
                                    {/* Add other asset class fields similarly */}
                                </Grid>
                                <Typography
                                    color={getTotalAllocation() === 100 ? 'success.main' : 'error.main'}
                                    sx={{ mt: 2 }}
                                >
                                    Total Allocation: {getTotalAllocation()}%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        !pensionData.name ||
                        // !pensionData.provider ||
                        !pensionData.currentValue ||
                        (activeTab === 0 && !selectedPortfolio) ||
                        (activeTab === 1 && getTotalAllocation() !== 100)
                    }
                >
                    Add Pension
                </Button>
            </DialogActions>
        </Dialog>
    );
}

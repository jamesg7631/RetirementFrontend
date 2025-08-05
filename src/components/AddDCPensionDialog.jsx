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

    const handleNewPortfolioChange = (key, value, e)=> {
        if (e == null) {
            return;
        }
        console.log("Change new portfolio!");
        const replacementPortfolio = {...newPortfolio};
        const valueN = (parseFloat(e.target.value) / 100) || 0;
        value.holdings = valueN;
        // replacementPortfolio.key = value;
        setNewPortfolio(replacementPortfolio);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const getTotalAllocation = () => {
        const values = Object.values(newPortfolio).filter(value => typeof value === 'number');
        return values.reduce((sum, value) => sum + value, 0);
    };

    function getAllocationsPaper(key, value, displayValue) {
        return <Paper
            key={key}
            elevation={0}
            sx={{
                p: 1,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <TextField
                label={value.name}
                type="number"
                value={displayValue || 0}
                onChange={(e) => handleNewPortfolioChange(key, value, e)}
                fullWidth
                size="small"
                InputProps={{
                    endAdornment: <Typography sx={{ml: 1}}>%</Typography>,
                    inputProps: {
                        min: 0,
                        max: 100,
                        step: 0.01
                    }
                }}
            />
        </Paper>;
    }

    const allocationsProcessing = () => {
        const results = (
            Object.entries(newPortfolio).map(([key, value]) => {
            const assetClass = {[key]: value};
            const displayValue = (value.holdings * 100).toFixed(2);

            return getAllocationsPaper(key, value, displayValue);
        }));
        console.log("Results")
        return results;
    }
    const renderNewPortfolioSection = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Portfolio Name"
                value={newPortfolio.portfolioName}
                onChange={handleNewPortfolioChange('portfolioName')}
                fullWidth
                required
            />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 2,
                maxHeight: '400px',
                overflowY: 'auto',
                padding: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
            }}>
                {allocationsProcessing()}
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                p: 2,
                backgroundColor: getTotalAllocation() === 100 ? 'success.light' : 'warning.light',
                borderRadius: 1,
            }}>
                <Typography variant="subtitle1" fontWeight="medium">
                    Total Allocation
                </Typography>
                <Typography
                    variant="h6"
                    color={getTotalAllocation() === 100 ? 'success.dark' : 'warning.dark'}
                >
                    {getTotalAllocation()}%
                </Typography>
            </Box>
        </Box>
    );


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
                        ) : renderNewPortfolioSection()}
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

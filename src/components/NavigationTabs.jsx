import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

function NavigationTabs() {
    const [value, setValue] = useState(0); // 0 for "Current scenario"

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'primary.main', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit" // Makes tab text inherit color
                indicatorColor="secondary" // Blue underline from theme.secondary.main
                aria-label="navigation tabs"
                centered // Center the tabs if desired
                sx={{
                    '.MuiTabs-indicator': {
                        backgroundColor: 'white', // White underline for orange tabs
                    },
                    '.MuiTab-root': {
                        color: 'white', // White text for tabs
                        fontWeight: 'bold',
                        fontSize: '1.1em',
                    },
                    '.Mui-selected': {
                        color: 'white !important', // Ensure selected tab text is white
                    }
                }}
            >
                <Tab label="Current scenario" />
                <Tab label="Explored scenario" />
                <Tab label="Summary of Changes" />
            </Tabs>
        </Box>
    );
}

export default NavigationTabs;

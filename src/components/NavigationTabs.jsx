import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import SummaryOfChanges from './SummaryOfChanges';

function NavigationTabs({ currentTab, onTabChange }) {
  return (
    <Box sx={{ bgcolor: 'primary.main', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={currentTab}
        onChange={(event, newValue) => onTabChange(newValue)}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="navigation tabs"
        centered
        sx={{
          '.MuiTabs-indicator': {
            backgroundColor: 'white',
          },
          '.MuiTab-root': {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1em',
          },
          '.Mui-selected': {
            color: 'white !important',
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

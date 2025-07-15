import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function MainContentArea() {
    return (
        <Paper
            sx={{
                flexGrow: 1, // Allows it to take up remaining horizontal space
                p: 2, // Padding inside the Paper component
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Pushes graph up, text down
                boxShadow: 3, // Material-UI shadow level
            }}
        >
            {/* Graph Area */}
            <Box
                sx={{
                    border: '2px dashed',
                    borderColor: 'grey.400', // A light grey color
                    flexGrow: 1, // Allows it to expand vertically
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 3, // Margin bottom for spacing from the text below
                    minHeight: '250px', // Minimum height for the graph placeholder
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    Graph will be displayed here
                </Typography>
            </Box>

            {/* Outcome Probability Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'grey.200', // Slightly darker grey background for this section
                    p: 2, // Padding inside this box
                    borderRadius: 1, // Slight rounded corners
                }}
            >
                <Typography variant="body1" sx={{ mb: 2 }}>
                    According to forecasts, there is a 50% chance of achieving less than this outcome
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: 2, // Space between the black boxes
                    }}
                >
                    <Box
                        sx={{
                            width: 80, // Fixed width for the boxes
                            height: 40, // Fixed height for the boxes
                            bgcolor: 'common.black', // Black background
                            borderRadius: 1, // Slight rounded corners
                        }}
                    />
                    <Box
                        sx={{
                            width: 80,
                            height: 40,
                            bgcolor: 'common.black',
                            borderRadius: 1,
                        }}
                    />
                    <Box
                        sx={{
                            width: 80,
                            height: 40,
                            bgcolor: 'common.black',
                            borderRadius: 1,
                        }}
                    />
                </Box>
            </Box>
        </Paper>
    );
}
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer" // Semantically indicates it's a footer
            sx={{
                bgcolor: 'grey.100', // Light grey background for the footer
                p: 2, // Padding
                borderTop: '1px solid',
                borderColor: 'grey.300', // Light grey border at the top
                display: 'flex',
                justifyContent: 'space-between', // Puts space between the left and right sections
                alignItems: 'center', // Vertically centers content
                fontSize: '0.9em', // Slightly smaller font size
                color: 'text.secondary', // Muted text color
            }}
        >
            {/* Left section: Navigation Links */}
            <Box sx={{ display: 'flex', gap: 2 }}> {/* Use gap for spacing between buttons */}
                <Button color="inherit" sx={{ textTransform: 'none' }}> {/* textTransform: 'none' keeps text as is, not uppercase */}
                    FAQs
                </Button>
                <Button color="inherit" sx={{ textTransform: 'none' }}>
                    Privacy Policy
                </Button>
                <Button color="inherit" sx={{ textTransform: 'none' }}>
                    Terms & Conditions
                </Button>
            </Box>

            {/* Right section: Specific Text */}
            <Typography variant="body2"> {/* body2 is slightly smaller than body1 */}
                Original Plan vs Outcome graph for the Snapshots. Would like to have
            </Typography>
        </Box>
    );
}
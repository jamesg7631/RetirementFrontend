import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box
} from '@mui/material';

export default function LongevityAgeModal({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <Typography variant="h6" component="div">
                    Longevity Age Information
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" paragraph>
                        Longevity age represents the estimated maximum age used in retirement planning calculations. This age is used to ensure your retirement savings and income strategy can support you throughout your lifetime.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The current longevity age is set to 91 years, which is based on:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                Current life expectancy statistics
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Planning for a conservative retirement timeframe
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Ensuring adequate financial coverage for later life
                            </Typography>
                        </li>
                    </ul>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

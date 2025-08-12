import React, { useState } from 'react';
import { Box, Paper, Typography, Slider, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; // Import the Info icon
import LongevityAgeModal from "./LongevityAgeModal.jsx";
import OutcomeModal from "./OutcomeModal.jsx";

function RightSidebar({outcomeValue, setOutcomeValue, handleOutcomeChange, incomeStrategy}) {
    // State for the Outcome slider, you might want this to be driven by actual data later
    console.log(`Received props: outcomeValue:${outcomeValue}, setOutcomeValue:${setOutcomeValue}, handleOutcomeChange:${setOutcomeValue}`)
    const [isLongevityModalOpen, setIsLongevityModalOpen] = useState(false);
    const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
    const [longevityAge, setLongevityAge] = useState(91);
    const [savingsDepletionAge, setSavingsDepletionAge] = useState(81);

    const handleOpenLongevityModal = () => {
        setIsLongevityModalOpen(true);
    };

    const handleCloseLongevityModal = () => {
        setIsLongevityModalOpen(false);
    };

    const handleOpenOutcomeModal = () => {
        setIsOutcomeModalOpen(true);
    }

    const handleCloseOutcomeModal = () => {
        setIsOutcomeModalOpen(false);
    }





    return (
        <Paper
            sx={{
                width: 250, // Fixed width for the right sidebar, adjust as needed
                p: 2, // Padding inside the Paper component
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3, // Material-UI shadow level
            }}
        >
            {/* Longevity age */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'grey.300' }}>
                <Typography variant="body1" fontWeight="bold" color="text.secondary">
                    Longevity age
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 0.5 }}>
                        {longevityAge}
                    </Typography>
                    <IconButton onClick={handleOpenLongevityModal} size="small" sx={{ p: 0.5, bgcolor: 'grey.500', color: 'white' }}>
                        <InfoIcon sx={{ fontSize: '1rem' }} /> {/* Smaller icon */}
                    </IconButton>
                </Box>
            </Box>

            {incomeStrategy !== "Annuity" && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'grey.300' }}>
                    <Typography variant="body1" fontWeight="bold" color="text.secondary">
                        Savings depletion age
                    </Typography>
                    <Typography variant="body1">
                        81
                    </Typography>
                </Box>
            )}

            {/* Target Income Age */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}> {/* No bottom border for the last fixed text item */}
                <Typography variant="body1" fontWeight="bold" color="text.secondary">
                    Target Income Age
                </Typography>
                {/* Placeholder for actual value, if it were to come from calculation/input */}
                <Typography variant="body1">
                    {/* Add a value here if known, or leave empty */}
                </Typography>
            </Box>

            {/* Outcome Slider */}
            <Box sx={{ mt: 'auto', textAlign: 'center', pt: 2, borderTop: '1px solid', borderColor: 'grey.300' }}> {/* mt: 'auto' pushes it to the bottom */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
                        Outcome
                    </Typography>
                    <IconButton onClick={handleOpenOutcomeModal} size="small" sx={{ p: 0.5, bgcolor: 'grey.500', color: 'white' }}>
                        <InfoIcon sx={{ fontSize: '1rem' }} /> {/* Smaller icon */}
                    </IconButton>
                </Box>
                <Slider
                    value={outcomeValue}
                    onChange={(event, value) => {setOutcomeValue(value)
                    console.log("Slider changed value to ", value)}}
                    aria-labelledby="outcome-slider"
                    valueLabelDisplay="auto" // Shows value on hover/drag
                    min={10}
                    max={90}
                    step={10}
                    sx={{
                        width: '90%', // Adjust width of the slider
                        color: 'primary.main', // Uses the orange primary color from your theme
                    }}
                />
                {/* Optional: display the current value of the slider */}
                {/* <Typography variant="caption" display="block" mt={1}>
            Current Value: {outcomeValue}
        </Typography> */}
            </Box>
            <LongevityAgeModal
                open={isLongevityModalOpen}
                handleClose={handleCloseLongevityModal}
            />
            <OutcomeModal
                open={isOutcomeModalOpen}
                handleClose={handleCloseOutcomeModal}
                />
        </Paper>
    );
}

export default RightSidebar;
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function OutcomeModal({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="outcome-modal-title"
            aria-describedby="outcome-modal-description"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id="outcome-modal-title">About Outcome Probability</DialogTitle>
            <DialogContent>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography fontWeight="bold">How Our Forecasts Work</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            Our application's forecast graphs—for both your total savings and your retirement income—are built using thousands of simulated scenarios. The slider at the bottom of the graph allows you to explore these different possible outcomes, from pessimistic (lower percentiles) to optimistic (higher percentiles).
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography fontWeight="bold">Understanding the Slider</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            When you move the slider, you are not viewing a single, pre-determined scenario from start to finish. Instead, at each age, we have calculated thousands of possible values for your total retirement pot (or your income). We then sort these thousands of values from the lowest to the highest.
                        </Typography>
                        <Typography paragraph>
                            When you select a specific position on the slider—for example, the middle value (the 50th percentile)—you are seeing the value that is exactly in the middle of all the possible outcomes at that specific age.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography fontWeight="bold">Important Considerations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            This approach is powerful because it always shows you the most likely combined outcome. However, it can sometimes lead to results that might seem unusual at first. This is because the overall graph is focused on your total financial position, which is the sum of all your different savings and income sources.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4-content"
                        id="panel4-header"
                    >
                        <Typography fontWeight="bold">Example Scenario</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            Imagine you are viewing the forecast for your total retirement savings at the 50th percentile. Now, you slide the forecast to the 70th percentile, which shows a more optimistic outcome. While your overall savings are increasing, it's possible that the value of one of your individual pension pots might appear to decrease.
                        </Typography>
                        <Typography>
                            This is not an error; it is an intentional and expected part of our model. It happens because the increase in your total savings at the 70th percentile is driven by very strong growth in your other pension pots, which more than compensates for the decrease in the one pot. The model's primary goal is to show you the best possible combined outcome at that percentile, even if it means the individual components of that outcome come from different simulated scenarios.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

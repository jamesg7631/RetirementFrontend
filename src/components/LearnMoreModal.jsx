import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Tabs,
    Tab,
    Box,
    Typography,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    ListItemIcon
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalculateIcon from '@mui/icons-material/Calculate';


function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function LearnMoreModal({ open, onClose }) {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: '80vh',
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.main', color: 'white' }}>
                Learn More About Retirement Planner
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': { textTransform: 'none' }
                    }}
                >
                    <Tab label="Overview" />
                    <Tab label="State Pension" />
                    <Tab label="Retirement Age" />
                    <Tab label="Lump sum" />
                    <Tab label="Investment Forecasting" />
                    <Tab label="Stochastic vs Deterministic" />
                    <Tab label="Inflation" />
                </Tabs>
            </Box>
            <DialogContent>
                <TabPanel value={tabValue} index={0}>
                    <Typography variant="body1" paragraph>
                        Welcome to Retirement Planner! This tool helps you visualise and plan your retirement journey.
                        Make informed decisions about your future by exploring different retirement scenarios.
                    </Typography>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" gutterBottom>Understanding Your UK State Pension</Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Basic Eligibility and Payments</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                The State Pension is a regular payment from the government that you can claim once you
                                reach a specific age. It is a fundamental part of retirement income for most people,
                                but the rules surrounding it can be complex. The amount you receive and the age you can
                                claim it are determined by a few key factors.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">National Insurance Record</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                First, your eligibility and the amount you receive are primarily based on your National
                                Insurance (NI) record. You generally need at least 10 "qualifying years" to receive any
                                State Pension and 35 qualifying years to receive the full amount. A qualifying year is one
                                in which you have paid or been credited with National Insurance contributions, for example,
                                through working, being a carer, or claiming certain benefits.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">State Pension Age</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                Second, your State Pension age—the earliest you can claim your pension—is currently 66
                                for both men and women. This age is not fixed, however. It is scheduled to increase to 67
                                between 2026 and 2028, and a further increase to 68 is planned for between 2044 and 2046.
                                The specific date you become eligible can be influenced by your exact date of birth, as
                                these changes are often phased in gradually. The government regularly reviews the State
                                Pension age, at least once every five years, to ensure the system's long-term sustainability,
                                primarily considering factors like life expectancy and the fiscal health of the country.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Triple Lock</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                Finally, a very important part of the State Pension is the triple lock.
                                This is a government commitment to increase the State Pension each year by the highest of
                                three measures: inflation (measured by the Consumer Price Index), average earnings growth,
                                or 2.5%. The triple lock is designed to protect the purchasing power of your pension and
                                ensure that pensioners can share in the country's economic prosperity. While it is not a
                                statutory requirement and can be modified or suspended by the government, it has been a
                                significant factor in increasing the value of the State Pension over the years.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6" gutterBottom>Retirement Age: When can I retire?</Typography>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Private Pension Access Age</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                In the UK, the age at which you can access your private pension is different from the
                                State Pension age. Currently, the Normal Minimum Pension Age (NMPA) is 55, but this
                                will increase to 57 from April 6, 2028.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Changes Coming in 2028</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Born after April 5, 1973"
                                        secondary="Must wait until age 57 to access pension funds"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Born between April 6, 1971, and April 5, 1973"
                                        secondary="Special window of opportunity between age 55 and April 5, 2028"
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Exceptions to the Rules</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color='warning'>Check with your pension provider for specific rules that may apply to your circumstances</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Serious ill health retirement"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Protected pension age in older schemes"
                                    />
                                </ListItem>
                            </List>

                        </AccordionDetails>
                    </Accordion>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Basic Overview</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                The most common approach is to take up to 25% of a pension pot as a tax-free lump sum.
                                This is often referred to as a Pension Commencement Lump Sum. The remaining 75% stays
                                invested and can be used to provide a retirement income, such as through an annuity or drawdown.
                            </Typography>
                            <Typography paragraph>
                                There are limits on the total tax-free cash you can take from all your pensions, known as the
                                Lump Sum Allowance (LSA). This allowance is currently £268,275, meaning you can take up to
                                25% of your total pension savings tax-free, as long as that amount does not exceed the LSA.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Available Approaches</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Taking all tax-free cash upfront with Drawdown"
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            Take the full 25% tax-free lump sum immediately. The remaining 75% moves to a drawdown
                                            account, staying invested while allowing flexible withdrawals. Offers maximum flexibility
                                            but keeps your remaining funds subject to market risk.
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Ad-hoc lump sums (UFPLS)"
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            Take smaller, flexible lump sums as needed. Each withdrawal is 25% tax-free, with the
                                            remaining 75% taxed as income. Can help manage your tax position but triggers the Money
                                            Purchase Annual Allowance (MPAA), limiting future pension contributions.
                                        </Typography>
                                    }
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemText
                                    primary="Full pot withdrawal"
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            Cash in your entire pension at once. Only the first 25% is tax-free, with the remaining
                                            75% added to your annual income for tax purposes. Usually not tax-efficient and risks
                                            depleting retirement savings too quickly.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Important Considerations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            Your choice has significant implications for:
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="• Tax situation" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Future investment growth potential" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Long-term financial security" />
                            </ListItem>
                        </List>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Consider these options carefully and understand the specific rules that apply to your situation.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    <Typography variant="h6" gutterBottom>
                        Investment Forecasting: A Historical Bootstrapping Approach
                    </Typography>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Our Forecasting Method</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph>
                                To model the future performance of your investments, we use an investment forecasting engine
                                built on a historical bootstrapping approach. This method is designed to capture the complex,
                                real-world correlations between different types of investments.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">How It Works</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Historical Data Sampling"
                                        secondary="Instead of predicting the return of each individual asset class in isolation, our model samples
                        full months of historical data. For each simulation, the engine randomly selects a month from the
                        past and uses the returns from that single month for all asset classes simultaneously."
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        primary="Preserved Asset Relationships"
                                        secondary="This preserves the relationships between different asset classes—for example, when equities
                        perform poorly, bonds might perform well—and ensures that the simulated scenarios are realistic."
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        primary="Portfolio Mapping"
                                        secondary="By using asset class proxies, we can map your pension fund's specific holdings to these historical
                        correlations, providing a more accurate representation of your portfolio's potential behavior over time."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" gutterBottom>How We Plan Your Future: Stochastic vs. Deterministic Modelling</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>
                            To model the future performance of your investments, we use an investment forecasting engine
                            built on a historical bootstrapping approach. This method is designed to capture the complex,
                            real-world correlations between different types of investments.
                        </Typography>
                        <Typography paragraph>Traditional retirement planning tools often use a deterministic model. This method relies on
                            a single, fixed set of assumptions for things like investment growth and inflation. The
                            result is a single projected outcome for your retirement savings, which can give a false
                            sense of certainty. It tells you what will happen, but it ignores the inherent randomness
                            and volatility of the financial markets.</Typography>
                        <Typography paragraph>Our application utilizes a more sophisticated method known as stochastic modelling.
                            Instead of one fixed forecast, this approach runs thousands of simulations, each with a
                            different randomly generated economic scenario. By doing this, we create a wide distribution
                            of potential outcomes, allowing you to see the full range of possibilities—from a pessimistic
                            scenario to an optimistic one. This methodology provides a much more realistic and
                            comprehensive view of your retirement journey, enabling you to make more informed decisions
                            based on a spectrum of potential risks and rewards.</Typography>
                    </AccordionDetails>
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                    <Typography variant="h6" gutterBottom>
                        Inflation and Gilt Yields: Key Variables for a Realistic Forecast
                    </Typography>

                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="body1" paragraph>
                                Two critical variables that profoundly impact the value of your retirement are inflation and the yields on UK government bonds.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Inflation Modeling</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" paragraph>
                                To account for the erosion of purchasing power, we model inflation by using historical Consumer Price Index (CPI) data within our
                                bootstrapping framework. This allows our simulations to show you the real value of your savings in future pounds, rather than just
                                their nominal value.
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <TrendingUpIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Uses historical CPI data"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ShowChartIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Shows real future value"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Gilt Yields Impact</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" paragraph>
                                We also incorporate historical gilt yields, specifically from 30-year government bonds. These yields are a foundational element
                                in actuarial science and are used to determine the cost of purchasing a guaranteed income stream in retirement, known as an annuity.
                            </Typography>

                            <Typography variant="body1" paragraph>
                                By including 30-year gilt yields, our application can provide a more precise calculation of how much of your retirement pot would be
                                required to secure a specific level of lifetime income, which is an essential part of a comprehensive retirement plan.
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <AccountBalanceIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="30-year government bonds"
                                            secondary="Foundation for actuarial calculations"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CalculateIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Precise income calculations"
                                            secondary="For lifetime income planning"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </TabPanel>
            </DialogContent>
        </Dialog>
    );
}
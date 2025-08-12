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
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                    <h2>Lump sum: What are my options?</h2>
                    <p>The most common approach is to take up to 25% of a pension pot as a tax-free lump sum.
                        This is often referred to as a Pension Commencement Lump Sum. The remaining 75% stays
                        invested and can be used to provide a retirement income, such as through an annuity or drawdown.
                        There are limits on the total tax-free cash you can take from all your pensions, known as the
                        Lump Sum Allowance (LSA). This allowance is currently £268,275, meaning you can take up to
                        25% of your total pension savings tax-free, as long as that amount does not exceed the LSA.</p>
                    <p>However, taking a lump sum doesn't always mean you take the full 25% upfront. There are a few
                        different approaches people can take depending on their circumstances and needs:</p>
                    <ol>
                        <li><strong>Taking all the tax-free cash at once and putting the rest into Drawdown:</strong>
                            This is a popular option where you "crystallise" your pension pot.
                            You take the 25% tax-free lump sum in one go, and the remaining 75% is moved into a drawdown
                            account. This remaining money stays invested, and you can withdraw taxable income from it as
                            and when you need it. This gives you maximum flexibility to manage your retirement income,
                            but it also means your remaining funds are still subject to market risk.</li>
                        <li><strong>Taking ad-hoc lump sums:</strong>
                            This approach is known as an Uncrystallised Funds Pension Lump Sum (UFPLS).
                            Instead of taking the 25% tax-free lump sum all at once, you take smaller, flexible
                            lump sums as and when you need them. With each withdrawal, 25% of the amount is tax-free
                            and the remaining 75% is treated as taxable income. This can be a useful way to manage
                            your tax bill, as spreading withdrawals over different tax years can help keep you in a
                            lower tax bracket. However, it's important to remember that taking money this way will
                            trigger the Money Purchase Annual Allowance (MPAA), which reduces the amount you can
                            contribute to a pension in the future.
                        </li>
                        <li>
                            <strong>Taking the entire pension pot as a single lump sum: </strong>
                            While you have the option to cash in your entire pension, this is rarely the most
                            tax-efficient choice. In this scenario, only the first 25% of the total amount would be
                            tax-free. The remaining 75% is added to your income for that tax year and could push you
                            into a much higher income tax bracket, resulting in a large tax bill. This approach also
                            leaves you with the full responsibility of managing a significant amount of money and the
                            risk of it running out before the end of your life.
                        </li>
                    </ol>
                    <p>The approach you choose has significant implications for your tax situation, your future
                        investment growth, and your long-term financial security. It is therefore crucial to consider
                        these options carefully and understand the specific rules that apply to your situation.</p>
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    <h2>
                        Investment Forecasting: A Historical Bootstrapping Approach
                    </h2>
                        To model the future performance of your investments, we use an investment forecasting engine
                        built on a historical bootstrapping approach. This method is designed to capture the complex,
                        real-world correlations between different types of investments.
                    <ul>
                        <li>Instead of predicting the return of each individual asset class in isolation, our model samples
                            full months of historical data. For each simulation, the engine randomly selects a month from the
                            past and uses the returns from that single month for all asset classes simultaneously. </li>
                        <li>This preserves the relationships between different asset classes—for example, when equities
                            perform poorly, bonds might perform well—and ensures that the simulated scenarios are realistic.</li>
                        <li>
                            By using asset class proxies, we can map your pension fund's specific holdings to these historical
                            correlations, providing a more accurate representation of your portfolio's potential behavior over time.
                        </li>
                    </ul>
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                    <h2>How We Plan Your Future: Stochastic vs. Deterministic Modelling</h2>
                    <ul>
                        <li>Traditional retirement planning tools often use a deterministic model. This method relies on
                            a single, fixed set of assumptions for things like investment growth and inflation. The
                            result is a single projected outcome for your retirement savings, which can give a false
                            sense of certainty. It tells you what will happen, but it ignores the inherent randomness
                            and volatility of the financial markets.</li>
                        <li>Our application utilizes a more sophisticated method known as stochastic modelling.
                            Instead of one fixed forecast, this approach runs thousands of simulations, each with a
                            different randomly generated economic scenario. By doing this, we create a wide distribution
                            of potential outcomes, allowing you to see the full range of possibilities—from a pessimistic
                            scenario to an optimistic one. This methodology provides a much more realistic and
                            comprehensive view of your retirement journey, enabling you to make more informed decisions
                            based on a spectrum of potential risks and rewards.</li>
                    </ul>
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                    <h2>
                        Inflation and Gilt Yields: Key Variables for a Realistic Forecast
                    </h2>
                    <ul>
                        <li>Two critical variables that profoundly impact the value of your retirement are inflation and the yields on UK government bonds.</li>
                        <li>To account for the erosion of purchasing power, we model inflation by using historical Consumer Price Index (CPI) data within our
                            bootstrapping framework. This allows our simulations to show you the real value of your savings in future pounds, rather than just
                            their nominal value.</li>
                        <li>We also incorporate historical gilt yields, specifically from 30-year government bonds. These yields are a foundational element
                            in actuarial science and are used to determine the cost of purchasing a guaranteed income stream in retirement, known as an annuity.
                            By including 30-year gilt yields, our application can provide a more precise calculation of how much of your retirement pot would be
                            required to secure a specific level of lifetime income, which is an essential part of a comprehensive retirement plan.</li>
                    </ul>
                </TabPanel>
            </DialogContent>
        </Dialog>
    );
}
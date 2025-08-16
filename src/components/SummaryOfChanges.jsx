import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

export default function SummaryOfChanges({ currentScenario, exploredScenario }) {
    if (!exploredScenario) {
        return (
            <Paper sx={{ p: 3, m: 2 }}>
                <Typography variant="h6" align="center">
                    Please create an explored scenario to see the comparison
                </Typography>
            </Paper>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getIncomeStrategyDescription = (scenario) => {
        if (scenario.incomeStrategy === 'Annuity') {
            return `${scenario.annuityType === 'level' ? 'Level' : 'Escalating'} Annuity which gives a guaranteed income for life of ${formatCurrency(parseFloat(scenario.initialAmount))}${
                scenario.annuityType !== 'level' ? ` (increasing by ${scenario.annuityIncreaseRate}% per year)` : ''
            }`;
        } else {
            const withdrawalText = `Yearly withdrawal which gives an income of ${formatCurrency(parseFloat(scenario.initialAmount))}${
                scenario.withdrawalType !== 'fixed' ? ` (increasing by ${scenario.increaseRate}% per year)` : ''
            }`;
            return scenario.savingsRunOutAge
                ? `${withdrawalText} and savings will run out at age ${scenario.savingsRunOutAge}`
                : withdrawalText;
        }
    };

    return (
        <Paper
            sx={{
                p: 5,
                m: 2,
                maxWidth: '90%',
                mx: 'auto',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" gutterBottom align="center"
                        sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                Summary of Changes from Current Scenario to Explored Scenario
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Retirement Age
                </Typography>
                <Typography>
                    Changed from age {currentScenario.retirementAge} to age {exploredScenario.retirementAge}
                </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Income Strategy
                </Typography>
                <Typography sx={{ mb: 1 }}>
                    Current: {getIncomeStrategyDescription(currentScenario)}
                </Typography>
                <Typography>
                    Explored: {getIncomeStrategyDescription(exploredScenario)}
                </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Lump Sum at Retirement
                </Typography>
                <Typography>
                    Changed from {currentScenario.percentageLumpsum}% to {exploredScenario.percentageLumpsum}%
                    {currentScenario.lumpSumAmount && exploredScenario.lumpSumAmount &&
                        ` (${formatCurrency(currentScenario.lumpSumAmount)} to ${formatCurrency(exploredScenario.lumpSumAmount)})`
                    }
                </Typography>
            </Box>
        </Paper>
    );
}
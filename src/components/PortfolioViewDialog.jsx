import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#0088fe', '#88fe00', '#fef500', '#ffa275', '#4263ff', '#ff42c1'];

export default function PortfolioViewDialog ({ open, onClose, portfolio }) {
    const [portfolioName, usePortfolioName] = useState("")

    const prepareChartData = () => {
        if (portfolio == null) return [];
        const allocations = {...portfolio};
        delete allocations.id;
        const pName = allocations.portfolioName;
        delete allocations.portfolioName;
        console.log("Portfolio: ", allocations)
        const chartEntries = [];
        for (const [key,value] of Object.entries(allocations)) {
            const chartEntry = {};
            console.log("Key: ", key);
            console.log("Value: ", value);
            if (value.holdings === 0) {
                continue;
            }
            chartEntry["name"] = value.name;
            chartEntry["value"] = (value.holdings * 100);
            chartEntries.push(chartEntry);
        }
        console.log("Chart entries" + chartEntries);
        return chartEntries;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Portfolio Allocation: {portfolio?.name}</DialogTitle>
            <DialogContent>
                <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={prepareChartData()}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                label={({name, value}) => `${name}: ${value}%`}
                            >
                                {prepareChartData().map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
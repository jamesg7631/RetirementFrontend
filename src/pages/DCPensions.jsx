import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Container
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddDCPensionDialog from '../components/AddDCPensionDialog';

export default function DCPensions() {
    const [userDCPensions, setUserDCPensions] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedPension, setSelectedPension] = useState(null);

    const handleEditOpen = (pension) => {
        setSelectedPension(pension);
        setOpenEditDialog(true);
    };

    const handleDelete = async (pensionId) => {
        // Implementation for delete functionality
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Header />
            <Container
                sx={{
                    flexGrow: 1,
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    mt: 2
                }}>
                    <Typography variant="h4">
                        My DC Pensions
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Add DC Pension
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Pension Name</TableCell>
                                <TableCell>Current Value</TableCell>
                                <TableCell>Contribution Rate (%)</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userDCPensions.map((pension) => (
                                <TableRow key={pension.id}>
                                    <TableCell>{pension.name}</TableCell>
                                    <TableCell>£{pension.currentValue}</TableCell>
                                    <TableCell>{pension.employeeContributionRate}%</TableCell>
                                    <TableCell>{pension.employerContributionRate}%</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            startIcon={<Edit />}
                                            onClick={() => handleEditOpen(pension)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            startIcon={<Delete />}
                                            color="error"
                                            onClick={() => handleDelete(pension.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AddDCPensionDialog
                    open={openAddDialog}
                    onClose={() => setOpenAddDialog(false)}
                />

            </Container>
            <Footer />
        </Box>
    );
}

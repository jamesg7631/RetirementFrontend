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
import { Edit, Delete, Visibility } from '@mui/icons-material';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortfolioEditDialog from '../components/PortfolioEditDialog';
import PortfolioViewDialog from '../components/PortfolioViewDialog';
import AddPortfolioDialog from "../components/AddPortfolioDialog.jsx";

export default function Portfolio() {
    const [userPortfolios, setUserPortfolios] = useState([]);
    const [allPortfolios, setAllPortfolios] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);


    const handleEditOpen = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setOpenEditDialog(true);
    };

    const handleViewOpen = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setOpenViewDialog(true);
    };

    const handleDelete = (portfolioId) => {
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
                        My Portfolios
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Create Portfolio
                    </Button>
                </Box>


                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Portfolio Name</TableCell>
                                <TableCell align="right">Average Return</TableCell>
                                <TableCell align="right">View</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userPortfolios.map((portfolio) => (
                                <TableRow key={portfolio.id}>
                                    <TableCell>{portfolio.name}</TableCell>
                                    <TableCell align="right">{portfolio.average}%</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            startIcon={<Visibility />}
                                            onClick={() => handleViewOpen(portfolio)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            startIcon={<Edit />}
                                            onClick={() => handleEditOpen(portfolio)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            startIcon={<Delete />}
                                            color="error"
                                            onClick={() => handleDelete(portfolio.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AddPortfolioDialog
                    open={openAddDialog}
                    onClose={() => setOpenAddDialog(false)}
                />


                <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>
                    All Portfolios
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Portfolio Name</TableCell>
                                <TableCell align="right">Average Return</TableCell>
                                <TableCell align="right">View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allPortfolios.map((portfolio) => (
                                <TableRow key={portfolio.id}>
                                    <TableCell>{portfolio.name}</TableCell>
                                    <TableCell align="right">{portfolio.average}%</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            startIcon={<Visibility />}
                                            onClick={() => handleViewOpen(portfolio)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <PortfolioEditDialog
                    open={openEditDialog}
                    onClose={() => setOpenEditDialog(false)}
                    portfolio={selectedPortfolio}
                />

                <PortfolioViewDialog
                    open={openViewDialog}
                    onClose={() => setOpenViewDialog(false)}
                    portfolio={selectedPortfolio}
                />
            </Container>
            <Footer />
        </Box>
    );
}



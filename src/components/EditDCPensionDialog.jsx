import React, {useState, useEffect} from "react";
import { initialAllocations} from "../utils/config.js";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Tab,
    Tabs,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper
} from '@mui/material';
import {getAllPortfolios} from "../api/apiService.js";


export default function EditDCPensionDialog({open, onClose, selectedPorfolio, pensionData}) {
    const [activeTab, setActiveTab] = useState(0);
    const [existingPortfolios, setExistingPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('')
    const [pensionData, setPensionData] = useState()
    const getInitialAllocations = () => {
        const serialised = JSON.stringify(initialAllocations);
        const deepCopy = JSON.parse(serialised);
        return deepCopy;
    }
    const [newPortfolio, setNewPortfolio] = useState(getInitialAllocations());

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const portfolios = await getAllPortfolios();
                setExistingPortfolios(portfolios);
            } catch (error) {
                console.error('Error fetching portfolios:', error);
            }
        };
        if (open) {
            fetchPortfolios();
            const initAllocations = getInitialAllocations();
            setNewPortfolio((initAllocations));
        }
    }, [open]);


}
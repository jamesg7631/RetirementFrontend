import React, { useEffect, useState } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container, CircularProgress, Button
} from '@mui/material';
import { Stack } from '@mui/system'; // For vertical stacking
import {getMyInvestmentHeaders } from "../api/apiService.js";
import WithdrawalStrategy from "./WithdrawalStrategy.jsx";
import AnnuityStrategy from "./AnnuityStrategy.jsx";
import AddDCPensionDialog from './AddDCPensionDialog';


function Sidebar({retirementAge,
                   percentageLumpsum,
                   incomeStrategy,
                   withdrawalType,
                   initialAmount,
                   increaseRate,
                   annuityType,
                   annuityIncreaseRate,
                   statePensionAge,
                   statePensionValue,
                   graphType,
                   onUpdate,
                   exploredTab

                 }) {
  // Default active tab
  const [activeTab, setActiveTab] = useState(0); // 0 for My savings, 1 for My options
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [desiredIncome, setDesiredIncome] = useState(30000);
  const [openAddDCPensionDialog, setOpenAddDCPensionDialog] = useState(false);

  const handleOpenAddDCPension = () => {
    setOpenAddDCPensionDialog(true);
  };

  const handleCloseAddDCPension = () => {
    setOpenAddDCPensionDialog(false);
    window.location.reload();
  };



  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const getInvestmentHeaders = async () => {
      // console.log("Investment Headers is called!")
      try {
        setLoading(true);
        const pathVariable = activeTab === 1 ? "explored" : "current";
        const response = await getMyInvestmentHeaders(pathVariable);
        // console.log(response);
        setInvestments(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getInvestmentHeaders();
  }, []);


  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        {/*I might just instead remove this and have an error page when things go wrong. While developping that would be annoying so change that later.*/}
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
      <>
    <Paper sx={{ width: 280, p: 2, display: 'flex', flexDirection: 'column' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 2, bgcolor: 'background.default', borderRadius: 1 }}
      >
        <Tab label="My savings" sx={{
          bgcolor: activeTab === 0 ? 'secondary.light' : 'transparent', // Light blue background for active
          color: activeTab === 0 ? 'primary.contrastText' : 'text.primary',
          border: '1px solid',
          borderColor: activeTab === 0 ? 'secondary.main' : 'grey.300',
          borderRight: activeTab === 0 ? 'none' : '1px solid grey.300',
          borderTopLeftRadius: 'inherit',
          borderBottomLeftRadius: 'inherit',
        }} />
        <Tab label="My options" sx={{
          bgcolor: activeTab === 1 ? 'secondary.light' : 'transparent',
          color: activeTab === 1 ? 'primary.contrastText' : 'text.primary',
          border: '1px solid',
          borderColor: activeTab === 1 ? 'secondary.main' : 'grey.300',
          borderLeft: activeTab === 1 ? 'none' : '1px solid grey.300',
          borderTopRightRadius: 'inherit',
          borderBottomRightRadius: 'inherit',
        }} />
      </Tabs>

      <Box sx={{ flexGrow: 1 }}>
        {activeTab === 0 && (
          <Stack spacing={2}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenAddDCPension}
                sx={{ mb: 2 }}
            >
              Add DC Pension
            </Button>
            {investments.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pb: 1,
                  borderBottom: '1px solid',
                  borderColor: 'grey.300',
                }}
              >
                <Typography variant="body1" fontWeight="bold" color="text.secondary">
                  {item.name}
                </Typography>
                <Typography variant="body1">
                  £ {item.value}
                </Typography>
              </Box>
            ))}
            {graphType === "income" && (
                <Stack>
                  <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: 1,
                        // borderBottom: '1px solid',
                        borderColor: 'grey.300',
                      }}
                  >
                    <Typography variant="body1" fontWeight="bold" color="text.secondary">
                      State pension income is
                    </Typography>
                    <Typography variant="body1">
                      £ {Math.floor(Number(statePensionValue)).toLocaleString()}

                    </Typography>
                  </Box>
                  <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: 1,
                        borderBottom: '1px solid',
                        borderColor: 'grey.300',
                      }}
                  >
                    <Typography variant="body1" fontWeight="bold" color="text.secondary">
                      from age
                    </Typography>
                    <Typography variant="body1">
                      {statePensionAge}
                    </Typography>
                  </Box>
                </Stack>
            )}
          </Stack>
        )}
        {activeTab === 1 && (
          <Stack spacing={2}> {/* Stack components vertically with spacing */}
            <TextField
              label="Retirement Age"
              value={retirementAge}
              // onChange={(e) => setRetirementAge(Number(e.target.value))}
                onChange={(e) => onUpdate({retirementAge: Number(e.target.value)})}
              fullWidth
              variant="outlined"
              size="small"
              error={retirementAge < 57 || retirementAge > 120}
              helperText={retirementAge < 57 || retirementAge > 120 ? "Normal pension retirement age is at least 57" : ""}
            />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Income strategy</InputLabel>
              <Select
                value={incomeStrategy}
                label="Income strategy"
                onChange={(e) => onUpdate({incomeStrategy: e.target.value})}
              >
                <MenuItem value="Annuity">Annuity</MenuItem>
                <MenuItem value="Withdrawal">Withdrawal</MenuItem>
              </Select>
            </FormControl>

            {incomeStrategy === 'Withdrawal' ? (
              <WithdrawalStrategy
                withdrawalType={withdrawalType}
                initialAmount={initialAmount}
                increaseRate={increaseRate}
                onUpdate={onUpdate}
              />
            ) : (
              <AnnuityStrategy
                annuityType={annuityType}
                annuityIncreaseRate={annuityIncreaseRate}
                onUpdate={onUpdate}
              />
            )}


            <TextField
              label="Lump sum at retirement"
              value={percentageLumpsum}
              // onChange={(e) => setPercentageLumpsum(Number(e.target.value))}
                onChange={(e) => onUpdate({percentageLumpsum: Number(e.target.value)})}
              fullWidth
              variant="outlined"
              size="small"
            />
            {graphType === "income" && (
                <TextField
                    label="Desired Annual Income"
                    value={desiredIncome}
                    // onChange={(e) => setDesiredIncome(Number(e.target.value))}
                    onChange={(e) => onUpdate({desiredIncome: Number(e.target.value)})}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 0.5 }}>£</Typography>,
                    }}
                />
            )}
          </Stack>
        )}
      </Box>
    </Paper>
  <AddDCPensionDialog
      open={openAddDCPensionDialog}
      onClose={handleCloseAddDCPension}
      selectedPension={null}
      mode="add"
  />
        </>
  );
}

export default Sidebar;

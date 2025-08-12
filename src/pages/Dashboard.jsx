import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainContentArea from "../components/MainContentArea.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import { Box } from "@mui/material";
import Footer from "../components/Footer.jsx";
import { useState } from "react";


export default function Dashboard() {
  console.log("Dashboard page 3");
  const [outcomeValue, setOutcomeValue] = useState(50);
  const [retirementAge, setRetirementAge] = useState(57);
  const [percentageLumpsum, setPercentageLumpsum] = useState(25);
  const [incomeStrategy, setIncomeStrategy] = useState('Annuity');

  const [withdrawalType, setWithdrawalType] = useState('fixed');
  const [initialAmount, setInitialAmount] = useState('1000');
  const [increaseRate, setIncreaseRate] = useState('3');

  const [annuityType, setAnnuityType] = useState('level');
  const [annuityIncreaseRate, setAnnuityIncreaseRate] = useState('2');
  const [statePensionAge, setStatePensionAge] = useState('67');
  const [statePensionValue, setStatePensionValue] = useState('11973');
  const [graphType, setGraphType] = useState('income');



  const handleOutcomeChange = (event, newValue) => {
    setOutcomeValue(newValue);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 1.5, // Padding around the main content (1 unit = 8px by default)
        }}
      >
        <NavigationTabs />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            gap: 1.5, // Space between columns
            mt: 1.5, // Margin top from tabs
          }}
        >
          <Sidebar
            retirementAge={retirementAge}
            setRetirementAge={setRetirementAge}
            percentageLumpsum={percentageLumpsum}
            setPercentageLumpsum={setPercentageLumpsum}
            incomeStrategy={incomeStrategy}
            setIncomeStrategy={setIncomeStrategy}
            withdrawalType={withdrawalType}
            setWithdrawalType={setWithdrawalType}
            initialAmount={initialAmount}
            setInitialAmount={setInitialAmount}
            increaseRate={increaseRate}
            setIncreaseRate={setIncreaseRate}
            annuityType={annuityType}
            setAnnuityType={setAnnuityType}
            annuityIncreaseRate={annuityIncreaseRate}
            setAnnuityIncreaseRate={setAnnuityIncreaseRate}
            statePensionAge={statePensionAge}
            statePensionValue={statePensionValue}
            graphType={graphType}/>

          <MainContentArea outcomeValue={outcomeValue} retirementAge={retirementAge}
            percentageLumpsum={percentageLumpsum}
            incomeStrategy={incomeStrategy}
            withdrawalType={withdrawalType}
            initialAmount={initialAmount}
            increaseRate={increaseRate}
            annuityType={annuityType}
            annuityIncreaseRate={annuityIncreaseRate}
            statePensionAge={statePensionAge}
            statePensionValue={statePensionValue}
            setStatePensionAge={setStatePensionAge}
            setStatePensionValue={setStatePensionValue}
            graphType={graphType}
            setGraphType={setGraphType}/>
          <RightSidebar
            outcomeValue={outcomeValue}
            setOutcomeValue={setOutcomeValue}
            handleOutcomeChange={handleOutcomeChange}
            incomeStrategy={incomeStrategy}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

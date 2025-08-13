import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainContentArea from "../components/MainContentArea.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import { Box } from "@mui/material";
import { useState } from "react";
import Footer from "../components/Footer.jsx"; // ✅ FIXED: Add this import statement

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState(0);

    const initialState = {
        outcomeValue: 50,
        retirementAge: 57,
        percentageLumpsum: 25,
        incomeStrategy: "Annuity",
        withdrawalType: 'fixed',
        initialAmount: '1000',
        increaseRate: '3',
        annuityType: 'level',
        annuityIncreaseRate: '2',
        statePensionAge: '67',
        statePensionValue: '11973',
        graphType: 'income',
        desiredAnnualIncome: 150000
    };

    const [currentScenarioState, setCurrentScenarioState] = useState(initialState);
    const [exploredScenarioState, setExploredScenarioState] = useState(null); // Reverted to original state

    const handleTabChange = (newTab) => {
        if (newTab === 1 && !exploredScenarioState) {
            setExploredScenarioState({ ...currentScenarioState });
        }
        setCurrentTab(newTab);
    };

    const getActiveScenario = () => {
        // If we are on tab 1 and explored state exists, use it. Otherwise, use current state.
        return currentTab === 1 && exploredScenarioState ? exploredScenarioState : currentScenarioState;
    };

    const updateActiveScenario = (updates) => {
        if (currentTab === 0) {
            console.log(`Before current situation update: ${currentScenarioState}`);
            setCurrentScenarioState(prev => ({ ...prev, ...updates }));
            console.log(`After current situation update: ${currentScenarioState}`);
            // console.log(`Before Current Scenario Update: ${currentScenarioState}`);
            // const newScenario = {...currentScenarioState};
            // newScenario["parameters"] = updates["parameters"];
            // newScenario["strategy"] = updates["strategy"];
            // console.log(`New Scenario: ${newScenario}`);
            // setCurrentScenarioState(newScenario);
        } else {
            // Ensure explored state is initialized before trying to update it
            console.log(`Before Explored Scenario Update: ${exploredScenarioState}`);
            setExploredScenarioState(prev => (prev ? { ...prev, ...updates } : { ...initialState, ...updates }));
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
        }}>
            <Header />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                p: 1.5,
            }}>
                <NavigationTabs
                    currentTab={currentTab}
                    onTabChange={handleTabChange} // Corrected handler from previous step
                />
                <Box sx={{
                    display: "flex",
                    flexGrow: 1,
                    gap: 1.5,
                    mt: 1.5,
                }}>
                    <Sidebar
                        sx={{ width: 280, flexShrink: 0 }}
                        {...getActiveScenario()}
                        onUpdate={updateActiveScenario}
                    />
                    <MainContentArea
                        sx={{ flexGrow: 4, minWidth: 800 }}
                        {...getActiveScenario()}
                        currentScenario={currentTab === 1 ? currentScenarioState : null}
                        isExploredView={currentTab === 1}
                        setGraphType={(value) => updateActiveScenario({ graphType: value })}
                        setStatePensionAge={(value) => updateActiveScenario({ statePensionAge: value })}
                        setStatePensionValue={(value) => updateActiveScenario({ statePensionValue: value })}
                    />
                    <RightSidebar
                        sx={{ width: 250, flexShrink: 0 }}
                        outcomeValue={getActiveScenario().outcomeValue}
                        setOutcomeValue={(value) => updateActiveScenario({ outcomeValue: value })}
                        incomeStrategy={getActiveScenario().incomeStrategy}
                    />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}
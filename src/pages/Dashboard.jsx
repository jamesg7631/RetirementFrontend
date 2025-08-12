import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainContentArea from "../components/MainContentArea.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import { Box } from "@mui/material";
import Footer from "../components/Footer.jsx";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState(0);

    const [currentScenarioState, setCurrentScenarioState] = useState({
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
    });

    const [exploredScenarioState, setExploredScenarioState] = useState(null);

    useEffect(() => {
        if (currentTab === 1 && !exploredScenarioState) {
            setExploredScenarioState(JSON.parse(JSON.stringify(currentScenarioState)));
        }
    }, [currentTab, currentScenarioState]);

    const getActiveScenario = () => {
        return currentTab === 0 ? currentScenarioState : exploredScenarioState;
    };

    const updateActiveScenario = (updates) => {
        if (currentTab === 0) {
            setCurrentScenarioState(prev => ({ ...prev, ...updates }));
        } else {
            setExploredScenarioState(prev => ({ ...prev, ...updates }));
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
                <NavigationTabs currentTab={currentTab} onTabChange={setCurrentTab} />
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
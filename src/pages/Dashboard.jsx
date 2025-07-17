import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MainContentArea from "../components/MainContentArea.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import {Box} from "@mui/material";
import Footer from "../components/Footer.jsx";
import {useState} from "react";


export default function Dashboard() {
    console.log("Dashboard page 3");
    const [outcomeValue, setOutcomeValue] = useState(50);
    const [retirementAge, setRetirementAge] = useState(53);
    const [percentageLumpsum, setPercentageLumpsum] = useState(25);

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
                    <Sidebar retirementAge={retirementAge} setRetirementAge={setRetirementAge}
                             percentageLumpsum={percentageLumpsum} setPercentageLumpsum={setPercentageLumpsum}/>
                    <MainContentArea outcomeValue={outcomeValue} retirementAge={retirementAge}
                                     percentageLumpsum={percentageLumpsum}/>
                    <RightSidebar
                        outcomeValue={outcomeValue}
                        setOutcomeValue={setOutcomeValue}
                        handleOutcomeChange={handleOutcomeChange}
                    />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}
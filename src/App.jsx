import { useState } from "react";
import Header from "./components/Header";
import NavigationTabs from "./components/NavigationTabs.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainContentArea from "./components/MainContentArea.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import Footer from "./components/Footer.jsx";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9800", // A shade of orange for primary
    },
    secondary: {
      main: "#2196F3", // A shade of blue for secondary (e.g., for sidebar tabs)
    },
    background: {
      default: "#f0f0f0", // Light grey background
      paper: "#ffffff", // White for paper components
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
    console.log('Theme common colors:', theme.palette.common);

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets CSS, provides consistent baseline */}
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
            <Sidebar />
            <MainContentArea />
            <RightSidebar />
          </Box>
        </Box>
         <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;

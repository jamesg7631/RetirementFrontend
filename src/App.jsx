import { Box, CssBaseline, ThemeProvider, createTheme} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import {ResetPassword} from "./pages/ResetPassword.jsx";

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
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;

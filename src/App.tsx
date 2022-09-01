import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "styles/theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/system";
import Start from "core/Start";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountManagement from "features/user/views/AccountManagement";
import Register from "features/auth/views/Register";
import Login from "features/auth/views/Login";
import PrivateRoute from "routes/PrivateRoute";
import { Suspense } from "react";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import AddPatient from "features/patients/views/AddPatient";
import AllPatients from "features/patients/views/AllPatients";
import NotFoundPage from "core/NotFoundPage";
import EditPatient from "features/patients/views/EditPatient";

function App() {
  return (
    <Suspense
      fallback={
        <Box minHeight={"100vh"} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      }
    >
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/start" element={<Start />} />
                <Route path="/accountManagement" element={<AccountManagement />} />
                <Route path="/addPatient" element={<AddPatient />} />
                <Route path="/allPatients" element={<AllPatients />} />
                <Route path="/allPatients/editPatient/:patientId" element={<EditPatient />} />
              </Route>
              <Route path="/" element={<Navigate to="/start" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer position="top-center" />
        </ThemeProvider>
      </MuiThemeProvider>
    </Suspense>
  );
}

export default App;

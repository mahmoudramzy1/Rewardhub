import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import SuperAdminDashboard from './Companents/SuperAdmin'
import { ToastContainer } from 'react-toastify';
import Register from "./Companents/Register"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Companents/Login";
import ProtectedRoute from "./Companents/ProtectedRoute";
import Dashboard from "./Companents/Dashboard";
import OffersDashboard from "./Companents/OffersDashboard";
import MarketDashboard from "./Companents/MarketDashBoard";
import Toolbar from "./Companents/Toolbar";
import { ConfirmDialog } from 'primereact/confirmdialog'; // Import ConfirmDialog
// import Logo from "./Companents/Logo";
function App() {

  return (
      <>
<div className="min-h-screen bg-white font-[Inter, sans-serif]">
      <ToastContainer />

      <BrowserRouter>
        {/* Toolbar visible only on certain routes */}
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Toolbar />
                  <div className="pt-16">
                    <Dashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/offerDashBoard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Toolbar />
                  <div className="pt-16">
                    <OffersDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketDashBoard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Toolbar />
                  <div className="pt-16">
                    <MarketDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <div className="min-h-screen">
                  <Toolbar />
                  <div className="pt-16">
                    <Register />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ConfirmDialog 
      style={{
        width: '50%', // Set consistent width
        borderRadius: '8px', // Rounded corners
    }}
    className="custom-confirm-dialog"/>
    </div>
    </>
  )
}

export default App

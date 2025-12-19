import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Public pages
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { HealthInfo } from "@/pages/HealthInfo";

// Patient pages
import { PatientDashboard } from "@/pages/patient/PatientDashboard";
import { PatientAppointments } from "@/pages/patient/PatientAppointments";
import { PatientGoals } from "@/pages/patient/PatientGoals";
import { PatientProfile } from "@/pages/patient/PatientProfile";

// Doctor pages
import { DoctorDashboard } from "@/pages/doctor/DoctorDashboard";
import { DoctorPatients } from "@/pages/doctor/DoctorPatients";

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={
                user.role === "patient"
                  ? "/patient/dashboard"
                  : "/doctor/dashboard"
              }
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/signup"
        element={
          user ? (
            <Navigate
              to={
                user.role === "patient"
                  ? "/patient/dashboard"
                  : "/doctor/dashboard"
              }
              replace
            />
          ) : (
            <Signup />
          )
        }
      />
      <Route
        path="/health-info"
        element={
          <MainLayout>
            <HealthInfo />
          </MainLayout>
        }
      />

      {/* Patient Routes */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute requiredRole="patient">
            <DashboardLayout>
              <PatientDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <ProtectedRoute requiredRole="patient">
            <DashboardLayout>
              <PatientAppointments />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/goals"
        element={
          <ProtectedRoute requiredRole="patient">
            <DashboardLayout>
              <PatientGoals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute requiredRole="patient">
            <DashboardLayout>
              <PatientProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DashboardLayout>
              <DoctorDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DashboardLayout>
              <DoctorPatients />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DashboardLayout>
              <PatientAppointments />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute requiredRole="doctor">
            <DashboardLayout>
              <PatientProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import ToDoPage from "./pages/ToDo";
import SleepTrackerPage from "./pages/SleepTracker";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import GuestRoute from "./components/routing/GuestRoute";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    // ✅ Wrap your entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <GuestRoute>
                  <Outlet />
                </GuestRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route path="/todo" element={<ToDoPage />} />
              <Route path="/sleep" element={<SleepTrackerPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

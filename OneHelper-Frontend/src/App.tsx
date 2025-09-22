import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/Home";
import ToDoPage from "./pages/ToDo";
import SleepTrackerPage from "./pages/SleepTracker";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="/sleep" element={<SleepTrackerPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

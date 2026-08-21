import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Layouts
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DashboardLayout from '../components/layout/DashboardLayout';

// Pages
import Landing from '../pages/Landing';
import Features from '../pages/Features';
import HowItWorks from '../pages/HowItWorks';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Upload from '../pages/Upload';
import Materials from '../pages/Materials';
import Summary from '../pages/Summary';
import MindMap from '../pages/MindMap';
import Flashcards from '../pages/Flashcards';
import Quiz from '../pages/Quiz';
import QuizResult from '../pages/QuizResult';
import ImportantTopics from '../pages/ImportantTopics';
import RevisionPlan from '../pages/RevisionPlan';
import Progress from '../pages/Progress';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

// Public Layout Wrapper (adds top Navbar and Footer)
function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

// Dashboard Layout Wrapper (adds left Sidebar + Header)
function AuthLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Auth Standalone Form Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Dashboard Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/mind-map" element={<MindMap />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-result" element={<QuizResult />} />
        <Route path="/important-topics" element={<ImportantTopics />} />
        <Route path="/revision-plan" element={<RevisionPlan />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

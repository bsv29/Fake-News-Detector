import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AnalyticsPage from "../pages/analytics-page/AnalyticsPage.jsx";
import HistoryPage from "../pages/history-page/HistoryPage.jsx";
import ResultPage from "../pages/results-page/ResultsPage.jsx";
import HomePage from "../landing-page/HomePage.jsx";
import FeaturesPage from "../landing-page/FeaturesPage.jsx";
import HowItWorks from "../landing-page/HowItWorks.jsx";
import About from "../landing-page/About.jsx";
import FAQPage from "../landing-page/FAQPage.jsx";
import Contact from "../landing-page/Contact.jsx";
import PageLayout from "../components/page-layout/PageLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/auth/login/Login.jsx";
import Signup from "../pages/auth/signup/Signup.jsx";

const RootNavigation = () => {
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "transparent" }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/das board" element={<Protec edRoute><PageLayout><DashboardPage /></PageLayout></ProtectedRoute>} /> */}
        <Route path="/analytics-page" element={<ProtectedRoute><PageLayout><AnalyticsPage /></PageLayout></ProtectedRoute>} />
        <Route path="/history-page" element={<ProtectedRoute><PageLayout><HistoryPage /></PageLayout></ProtectedRoute>} />
        <Route path="/results-page" element={<ProtectedRoute><PageLayout><ResultPage /></PageLayout></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default RootNavigation;
                                                                        
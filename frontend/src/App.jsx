import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';


const App = () => {

  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />

  return (
    <div className=" h-screen text-5xl" data-theme="night">
      <Routes>

        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px", // slightly bigger
            padding: "12px 18px",
            borderRadius: "10px",
            background: "#1f2937", // dark gray (Tailwind gray-800)
            color: "#f9fafb", // almost white
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // Tailwind green-500
              secondary: "#f9fafb",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // Tailwind red-500
              secondary: "#f9fafb",
            },
          },
        }}
      />

    </div>
  )
}

export default App
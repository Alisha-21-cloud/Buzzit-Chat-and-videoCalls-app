import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';


const App = () => {

  const {data:authData} = useQuery({
    queryKey:["authUser"],

    queryFn: async() => {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/me");
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user

  return (
    <div className=" h-screen text-5xl" data-theme="night">
      <Routes>

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to ="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to ="/" /> } />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" /> } />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />

      </Routes>
    </div>
  )
}

export default App
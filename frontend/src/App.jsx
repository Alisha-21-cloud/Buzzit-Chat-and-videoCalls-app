import React from 'react'
import { Routes, Route } from 'react-router'

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

  const {data} = useQuery({
    queryKey:["todos"],

    queryFn: async() => {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/me");
      return res.data;
    },
    retry: false,
  });

  console.log(data);

  return (
    <div className=" h-screen text-5xl" data-theme="night">
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

      </Routes>
    </div>
  )
}

export default App
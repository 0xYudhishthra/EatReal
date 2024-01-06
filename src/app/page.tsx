"use client";

import React, { useState } from "react";
import MainPage from "./components/MainPage";
import ExpendCard from "./components/ExpendCard";
import EventExtendCard from "./components/EventExtendCard";
import LandingPage from "./components/LandingPage";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "MainPage" | "ExpendCard" | "CardTwo" | "EventExtendCard" | "ETHDenverCard" | 'LandingPage' |"ETHCC" | 'ETHLondon' | 'ETHSydney' |'ETHTaipei'
  >("LandingPage");

  const onNavigate = (
    page: "MainPage" | "ExpendCard" | "CardTwo" | "EventExtendCard" | "ETHDenverCard" | 'LandingPage' |"ETHCC" | 'ETHLondon' | 'ETHSydney' |'ETHTaipei'
  ) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main>
        {currentPage === "LandingPage" && <LandingPage onNavigate={onNavigate} />}
        {currentPage === "MainPage" && <MainPage onNavigate={onNavigate} />}
        {currentPage === "ExpendCard" && <ExpendCard onNavigate={onNavigate} />}
        {currentPage === "EventExtendCard" && <EventExtendCard onNavigate={onNavigate} />}
      </main>
    </div>
  );
};

export default Home;

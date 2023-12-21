// Home Component
"use client"
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';
import ETHSingaporeCard from './components/CardOne-2023/ETHSingaporeCard';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard'>('MainPage');

  const onNavigate = (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard') => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main>
      
        {currentPage === 'MainPage' && (
          <MainPage onNavigate={onNavigate} />
        )}
        {currentPage === 'CardOne' && (
          <CardOne onNavigate={() => onNavigate('MainPage')} />
        )}
        {currentPage === 'CardTwo' && (
          <CardTwo onNavigate={() => onNavigate('MainPage')} />
        )}
        {currentPage === 'ETHSingaporeCard' && (
          <ETHSingaporeCard onNavigate={() => onNavigate('MainPage')} />
        )}
      </main>
    </div>
  );
};

export default Home;

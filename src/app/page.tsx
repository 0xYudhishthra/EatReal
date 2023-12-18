// Home Component
"use client"
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'MainPage' | 'CardOne' | 'CardTwo'>('MainPage');

  const onNavigate = (page: 'MainPage' | 'CardOne' | 'CardTwo') => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main>
      <img src='/hello' alt='sss'/>
        {currentPage === 'MainPage' && (
          <MainPage onNavigate={onNavigate} />
        )}
        {currentPage === 'CardOne' && (
          <CardOne onNavigate={() => onNavigate('MainPage')} />
        )}
        {currentPage === 'CardTwo' && (
          <CardTwo onNavigate={() => onNavigate('MainPage')} />
        )}
      </main>
    </div>
  );
};

export default Home;

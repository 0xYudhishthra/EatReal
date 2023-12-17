"use client"
import React, { useState } from 'react';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'first' | 'second'>('first');

  const onNavigate = (page: 'first' | 'second') => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main>
        {currentPage === 'first' ? (
          <FirstPage onNavigate={() => onNavigate('second')} />
        ) : (
          <SecondPage onNavigate={() => onNavigate('first')} />
        )}
      </main>
    </div>
  );
};

export default Home;

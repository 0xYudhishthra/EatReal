"use client"
import React, { useState } from 'react';
import Cards from '../components/Cards';


// Create the card component


// Main App component where you use the card component
const CardOne: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo') => void }> = ({ onNavigate }) => {
  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to get see what's AFI is in your NFT</p>
      </header>
      <div className="cards-container">
      <Cards 
          year={2023} 
          eventsCount={32} 
          title="The 'Degen'" 
          poweredBy="powered by ERC-6551" 
          onNavigate={() => onNavigate("CardOne")}
          image="/hello.jpg" // Update with the path to your first image
        />
      </div>
    </div>
  );
};

export default CardOne;

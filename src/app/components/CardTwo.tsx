"use client"
import React, { useState } from 'react';
import Cards from '../components/Cards';



// Main App component where you use the card component
const CardTwo: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo') => void }> = ({ onNavigate }) => {
  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to get see what's AFI is in your NFT</p>
      </header>
      <div className="cards-container">
      <Cards 
          year={2024} 
          eventsCount={32} 
          title="The 'Degen'" 
          poweredBy="powered by ERC-6551" 
          onNavigate={() => onNavigate("CardTwo")}
          image="/Untitled.png" // Update with the path to your second image
        />
      </div>
    </div>
  );
};

export default CardTwo;

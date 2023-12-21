"use client"
import React, { useState } from 'react';
import Cards from '../Cards';

const ETHSingaporeCard: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard' ) => void }> = ({ onNavigate }) => {
    return (
        <div >
        <Cards 
            year={2023} 
            eventsCount={0} 
            title="ETH Singapore" 
            poweredBy="powered by ERC-6551" 
            onNavigate={() => onNavigate("MainPage")}
            image="/hello.jpg" // Update with the path to your first image
          />
        </div>

    );
  };
  
  export default ETHSingaporeCard;
  
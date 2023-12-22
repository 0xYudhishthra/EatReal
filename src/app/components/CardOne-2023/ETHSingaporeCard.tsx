"use client"
import React, { useState } from 'react';
import Cards from '../Cards';
import PersonCard from '../PersonCard';

const ETHSingaporeCard: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard' ) => void }> = ({ onNavigate }) => {
    return (
        <div >
          <div>
            <button></button>
          </div>
          <div className="flex items-center justify-center">
            <Cards 
              year={2023} 
              eventsCount={0} 
              title="ETH Singapore" 
              poweredBy="powered by ERC-6551" 
              onNavigate={() => onNavigate("CardOne")}
              image="/hello.jpg" // Update with the path to your first image
            />
          </div>
          <div className='flex justify-between mt-28 mx-40'>
          <PersonCard 
              name={"Cody"} 
              score={0} 
              title="ETH Singapore" 
              image="/hello.jpg" // Update with the path to your first image
            />
            <PersonCard 
              name={"Cody"} 
              score={0} 
              title="ETH Singapore" 
              image="/hello.jpg" // Update with the path to your first image
            />
          </div>
          <div className="flex items-center justify-center h-screen">
  <div className="relative">
    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white">Center</span>
      </div>
    </div>
  </div>
</div>
        </div>
    
    );
  };
  
  export default ETHSingaporeCard;
  
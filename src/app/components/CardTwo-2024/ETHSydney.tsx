"use client"
import React, { useState } from 'react';
import Cards from '../Cards';
import PersonCard from '../PersonCard';

const ETHSydney: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSydney' ) => void }> = ({ onNavigate }) => {
    return (
        <div >
          <div>
            <button></button>
          </div>
          <div className="flex items-center justify-center">
            <Cards 
              year={2024} 
              eventsCount={59} 
              title="ETH Sydney"
              poweredBy="powered by ERC-6551" 
              onNavigate={() => onNavigate("CardTwo")}
              image="/hello.jpg" // Update with the path to your first image
            />
          </div>
          <div className='flex justify-between mt-28 mx-40'>
          <PersonCard 
              name={"Kokona Matata"} 
              score="Score: 80"
              title="ETH Sydney" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met Koko at the Viction event. He's the Project Manager of the Viction team."
            />
            <PersonCard 
              name={"Michael Scott"} 
              score="Score: 92"
              title="ETH Sydney" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met Michael at the Viction event. He's the Project Manager of the Viction team."
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
  
  export default ETHSydney;
  
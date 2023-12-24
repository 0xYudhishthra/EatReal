"use client"
import React, { useState } from 'react';
import Cards from '../Cards';
import PersonCard from '../PersonCard';

const ETHLondon: React.FC<{ onNavigate: (page: 'LandingPage' | 'CardOne' | 'CardTwo' | 'ETHLondon' ) => void }> = ({ onNavigate }) => {
    return (
        <div >
          <div>
            <button></button>
          </div>
          <div className="flex items-center justify-center">
            <Cards 
              year={2024} 
              eventsCount={46} 
              title="ETH London" 
              poweredBy="powered by ERC-6551" 
              onNavigate={() => onNavigate("CardTwo")}
              image="/hello.jpg" // Update with the path to your first image
            />
          </div>
          <div className='flex items-center justify-center mt-36 '>
            <div className='text-3xl text-white font-bold'>Connections</div>
          </div>
          <div className='flex justify-between mx-24 '>
          <div className='absolute top-3/4 left-80 z-10'>
          <PersonCard 
          name={"Alexander Ginorrel"} 
          title="ETH London" 
          image="/hello.jpg" // Update with the path to your image
          notes="Notes: I met Alexander at the Viction event. He's the Project Manager of the Viction team."
          /></div>
          <div></div>
          <PersonCard 
            name={"Picioso Wazowski"} 
            title="ETH London" 
            image="/hello.jpg" // Update with the path to your first image
            notes="Notes: I met Picioso at the Viction event. He's the Project Manager of the Viction team."
          />
          </div>
          <div className="flex items-center justify-center h-screen">
  <div className="relative">

  <div className="flex justify-center items-center h-screen bg-black">
    <div className="absolute border-2 border-white rounded-full w-[1000px] h-[1000px] flex items-center justify-center">
      {/* Outermost Circle */}
      <div className="absolute border-2 border-white rounded-full w-[800px] h-[800px] flex items-center justify-center">
        {/* Middle Circle */}
        <div className="absolute border-2 border-white rounded-full w-[600px] h-[600px] flex items-center justify-center">
          {/* Innermost Circle */}
          <div className="border-2 border-white rounded-full w-[400px] h-[400px] flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <span className="text-white text-lg">My Connections</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</div>
    
    );
  };
  
  export default ETHLondon;
  
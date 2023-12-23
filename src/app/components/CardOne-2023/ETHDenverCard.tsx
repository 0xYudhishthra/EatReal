"use client"
import React, { useState } from 'react';
import Cards from '../Cards';
import PersonCard from '../PersonCard';

const ETHDenverCard: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHDenverCard' ) => void }> = ({ onNavigate }) => {
    return (
        <div >
          <div>
            <button></button>
          </div>
          <div className="flex items-center justify-center">
            <Cards 
              year={2023} 
              eventsCount={59} 
              title="ETH Denver"
              poweredBy="powered by ERC-6551" 
              onNavigate={() => onNavigate("CardOne")}
              image="/hello.jpg" // Update with the path to your first image
            />
          </div>
          <div className='flex justify-between mt-28 mx-40'>
            <PersonCard 
              name={"Kokona Matata"} 
              score="Score: 80"
              title="ETH Denver" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met Koko at the Viction event. He's the Project Manager of the Viction team."
            />
            <PersonCard 
              name={"Michael Scott"} 
              score="Score: 92"
              title="ETH Denver" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met Michael at the Viction event. He's the Project Manager of the Viction team."
            />
          </div>
          <div className="flex items-center justify-center h-screen">
            <div className="flex justify-center items-center h-screen bg-black z-0">
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
    );
  };
  
  export default ETHDenverCard;
  
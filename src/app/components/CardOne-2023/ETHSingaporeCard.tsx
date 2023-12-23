"use client"
import React, { useState } from 'react';
import Cards from '../Cards';
import PersonCard from '../PersonCard';

const ETHSingaporeCard: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard' ) => void }> = ({ onNavigate }) => {
    return (
      <div className='flex'>
        <div>
          <div>
            <button>Back</button>
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
          <div className="flex items-center justify-center mt-20">
          <div className="relative">
            <div className="w-[300px] h-[200px] bg-gray-300 rounded-[50%] flex items-center justify-center">
              <button className="w-[225px] h-[150px] bg-blue-500 rounded-[50%] flex items-center justify-center">
                <span className="text-white justify-center">Connections Made</span>
              </button>
            </div>
          </div>
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
          <div className='mt-20 flex justify-center font-semibold text-2xl'>
            Create Your Memories
          </div>
{/* end of the div */}
        </div>
        <div className='w-auto'>
          test
        </div>
      </div>
        
    );
  };
  
  export default ETHSingaporeCard;
  
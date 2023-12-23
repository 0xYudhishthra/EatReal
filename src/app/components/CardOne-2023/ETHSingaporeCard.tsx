"use client"
import React, { useState } from 'react';
import Cards from '../Cards';
import PersonCard from '../PersonCard';

const ETHSingaporeCard: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard' ) => void }> = ({ onNavigate }) => {
    return (
      <div>
        <div>
          <button className='bg-[#4681f4] p-1 pr-3 rounded-2xl mt-5 ml-5 flex items-center hover:bg-[#5659ff] ease-in-out duration-300' onClick={() => onNavigate("CardOne")}>
            <img src="/back.png" alt="Back" className="h-10 w-10" />
            Back
          </button>
        </div>
        <div className="flex items-center justify-center mt-10 z-1">
          <Cards 
            year={2023} 
            eventsCount={0} 
            title="ETH Singapore" 
            poweredBy="powered by ERC-6551" 
            onNavigate={() => onNavigate("CardOne")}
            image="/hello.jpg" // Update with the path to your first image
          />
        </div>
        <div className='flex justify-between mt-28 mx-40 z-20'>
          <PersonCard 
              name={"Cody"} 
              score="Score: 80" 
              title="ETH Singapore" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met him at the Viction event. He's the Project Manager of the Viction team."
            />
            <PersonCard 
              name={"Victoria Mitchell"} 
              score="Score: 56" 
              title="ETH Singapore" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met Victoria at the Viction event. He's the Project Manager of the Viction team."
            />
        </div>
        <div className="flex justify-center items-center h-screen bg-black z-10">
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
        <div className='flex justify-between mx-40'>
        <PersonCard 
              name={"Cody"} 
              score="Score: 80" 
              title="ETH Singapore" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met him at the Viction event. He's the Project Manager of the Viction team."
            />
            <PersonCard 
              name={"Victoria Mitchell"} 
              score="Score: 56" 
              title="ETH Singapore" 
              image="/hello.jpg" // Update with the path to your first image
              notes="Notes: I met Victoria at the Viction event. He's the Project Manager of the Viction team."
            />
        </div>
        <div className='mt-20 flex justify-center font-semibold text-2xl'>
          Momentos
        </div>
        <div className='grid grid-cols-5 gap-10 mx-20 mt-10'>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
          <div className='flex flex-col items-center'>
            <img src="/hello.jpg" alt="Back" className="h-40 w-40 rounded-full" />
            <div className='text-white font-semibold mt-2'>Viction Event</div>
          </div>
        </div>
        
      </div>
        
    );
  };
  
  export default ETHSingaporeCard;
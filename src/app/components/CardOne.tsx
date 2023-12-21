import React from 'react';
import Cards from '../components/Cards';
import EventCard from './EventCard';

const CardOne: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo' | 'ETHSingaporeCard') => void }> = ({ onNavigate }) => {
  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to see what's AFI is in your NFT</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
          <Cards
            year={2023}
            eventsCount={32}
            title="The 'Degen'"
            poweredBy="powered by ERC-6551"
            onNavigate={() => onNavigate("MainPage")}
            image="/hello.jpg"
          />
        </div>
        <div className="relative pl-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
            {/* First card */}
            <div className="md:col-span-3 md:col-start-1 relative z-72">
              <EventCard
                title="ETH Sinagpore"
                connection='Connetions: 5'
                onNavigate={() => onNavigate("ETHSingaporeCard")}
                image="/1.jpeg"
              />
            </div>

            {/* Second card */}
            <div className="md:col-span-3 md:col-start-1 absolute z-20 left-80">
              <EventCard
                title="ETH Denver"
                connection='Connetions: 5'
                onNavigate={() => onNavigate("ETHSingaporeCard")}
                image="/2.jpeg"
              />
            </div>

            {/* Third card */}
            <div className="md:col-span-3 md:col-start-1 absolute z-10 left-44">
              <EventCard
                title="ETH CC"
                connection='Connetions: 5'
                onNavigate={() => onNavigate("ETHSingaporeCard")}
                image="/3.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;

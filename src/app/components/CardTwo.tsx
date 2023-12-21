import React from 'react';
import Cards from '../components/Cards';

// Main App component where you use the card component
const CardTwo: React.FC<{ onNavigate: (page: 'MainPage' | 'CardOne' | 'CardTwo') => void }> = ({ onNavigate }) => {
  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to see what's AFI is in your NFT</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
          <Cards
            year={2024}
            eventsCount={32}
            title="The 'Degen'"
            poweredBy="powered by ERC-6551"
            onNavigate={() => onNavigate("CardTwo")}
            image="/3.jpeg" // Update with the path to your second image
          />
        </div>
        <div className="relative p-4">
          {/* Grid container to hold the cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
            {/* First card */}
            <div className="md:col-span-3 md:col-start-1 relative z-30">
              <Cards
                year={2023}
                eventsCount={4}
                title="The 'Degen'"
                poweredBy="powered by ERC-6551"
                onNavigate={() => onNavigate("CardTwo")}
                image="/1.jpeg"
              />
            </div>

            {/* Second card */}
            <div className="md:col-span-3 md:col-start-1 absolute z-20 left-20">
              <Cards
                year={2023}
                eventsCount={4}
                title="The 'Degen'"
                poweredBy="powered by ERC-6551"
                onNavigate={() => onNavigate("CardTwo")}
                image="/2.jpeg"
              />
            </div>

            {/* Third card */}
            <div className="md:col-span-3 md:col-start-1 absolute z-10 left-40">
              <Cards
                year={2023}
                eventsCount={4}
                title="The 'Degen'"
                poweredBy="powered by ERC-6551"
                onNavigate={() => onNavigate("CardTwo")}
                image="/4.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;


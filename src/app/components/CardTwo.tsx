import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import EventCard from "../components/EventCard";

// Main App component where you use the card component
const CardTwo: React.FC<{
  onNavigate: (
    page:
      | "LandingPage"
      | "CardOne"
      | "CardTwo"
      | "ETHLondon"
      | "ETHTaipei"
      | "ETHSydney"
  ) => void;
}> = ({ onNavigate }) => {
  const [isAnimationEnabled, setAnimationEnabled] = useState(false);

  useEffect(() => {
    // Enable animation after component is mounted
    setAnimationEnabled(true);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to see what&apos;s AFI is in your NFT</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
          <Cards
            year={"2024"}
            eventsCount={32}
            title="The 'Degen'"
            poweredBy="powered by ERC-6551"
            onNavigate={() => onNavigate("LandingPage")}
            image="/3.jpeg" // Update with the path to your second image
          />
        </div>
        <div className="relative p-4">
          {/* Grid container to hold the cards */}
          <div className="relative pl-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
              {/* First card */}
              <div
                className={`md:col-span-3 md:col-start-1 relative z-0 right-0 transform hover:right-20 duration-500 ease-in-out ${
                  isAnimationEnabled ? "opacity-100" : "opacity-0"
                }`}
              >
                <EventCard
                  title="ETH London"
                  connection="Connetions: 5"
                  onNavigate={() => onNavigate("ETHLondon")}
                  image="/1.jpeg"
                />
              </div>

              {/* Second card */}
              <div
                className={`md:col-span-3 md:col-start-1 absolute z-10 left-44 transform hover:left-24 duration-500 ease-in-out ${
                  isAnimationEnabled ? "opacity-100" : "opacity-0"
                }`}
              >
                <EventCard
                  title="ETH Taipei"
                  connection="Connetions: 5"
                  onNavigate={() => onNavigate("ETHTaipei")}
                  image="/2.jpeg"
                />
              </div>

              {/* Third card */}
              <div
                className={`md:col-span-3 md:col-start-1 absolute z-20 left-80 transform hover:left-60 duration-500 ease-in-out ${
                  isAnimationEnabled ? "opacity-100" : "opacity-0"
                }`}
              >
                <EventCard
                  title="ETH Sydney"
                  connection="Connetions: 5"
                  onNavigate={() => onNavigate("ETHSydney")}
                  image="/3.jpeg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;

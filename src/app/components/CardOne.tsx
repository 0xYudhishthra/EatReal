import React, { useState, useEffect, useRef } from "react";
import Cards from "../components/Cards";
import EventCard from "./EventCard";

const CardOne: React.FC<{
  onNavigate: (
    page:
      | "LandingPage"
      | "CardOne"
      | "CardTwo"
      | "ETHSingaporeCard"
      | "ETHDenverCard"
      | "ETHCC"
  ) => void;
}> = ({ onNavigate }) => {
  const [isAnimationEnabled, setAnimationEnabled] = useState(false);

  useEffect(() => {
    // Enable animation after component is mounted
    setAnimationEnabled(true);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; 
    }
  }, []);

  return (
    <div className="app">
      <video ref={videoRef} autoPlay loop muted style={{ 
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: "-1"
        }}>
          <source src="/Background.mp4" type="video/mp4" />
        </video>
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to see what&apos;s AFI is in your NFT</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <div className="md:col-span-4 md:col-start-3 lg:col-start-3 xl:col-start-3">
          <Cards
            year={"2023"}
            eventsCount={32}
            title="The 'Degen'"
            poweredBy="powered by ERC-6551"
            onNavigate={() => onNavigate("LandingPage")}
            image="/hello.jpg"
          />
        </div>
        <div className="relative pl-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
            {/* First card */}
            <div
              className={`md:col-span-3 md:col-start-1 relative z-0 right-0 transform hover:right-20 duration-500 ease-in-out ${
                isAnimationEnabled ? "opacity-100" : "opacity-0"
              }`}
            >
              <EventCard
                title="ETH Singapore"
                connection="Connetions: 5"
                onNavigate={() => onNavigate("ETHSingaporeCard")}
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
                title="ETH CC"
                connection="Connetions: 5"
                onNavigate={() => onNavigate("ETHCC")}
                image="/3.jpeg"
              />
            </div>
            x{/* Third card */}
            <div
              className={`md:col-span-3 md:col-start-1 absolute z-20 left-80 transform hover:left-60 duration-500 ease-in-out ${
                isAnimationEnabled ? "opacity-100" : "opacity-0"
              }`}
            >
              <EventCard
                title="ETH Denver"
                connection="Connetions: 5"
                onNavigate={() => onNavigate("ETHDenverCard")}
                image="/2.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardOne;

import React, { useState, useEffect, useRef } from "react";
import Cards from "./Cards";
import EventCard from "./EventCard";

const ExpendCard: React.FC<{
  onNavigate: (
    page:
      | "LandingPage"
      | "ExpendCard"

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
            image="/PlaceA.jpg"
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
                onNavigate={() => onNavigate("EventExtendCard")}
                image="/1.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpendCard;

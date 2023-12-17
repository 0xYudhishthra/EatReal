import React from 'react';
import './App.css'; // Make sure to create an App.css file for styling

// Define TypeScript interfaces for the card properties
interface CardProps {
  year: number;
  eventsCount: number;
  title: string;
  poweredBy: string;
}

// Create the card component
const Card: React.FC<CardProps> = ({ year, eventsCount, title, poweredBy }) => {
  return (
    <div className="card">
      <div className="card-year">{year}</div>
      <div className="card-events">{eventsCount} Events</div>
      <div className="card-title">{title}</div>
      <div className="card-powered">{poweredBy}</div>
    </div>
  );
};

// Main App component where you use the card component
const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to get see what's AFI is in your NFT</p>
      </header>
      <div className="cards-container">
        <Card year={2023} eventsCount={32} title="The 'Degen'" poweredBy="powered by ERC-6551" />
        <Card year={2024} eventsCount={32} title="The 'Degen'" poweredBy="powered by ERC-6551" />
      </div>
    </div>
  );
};

export default App;

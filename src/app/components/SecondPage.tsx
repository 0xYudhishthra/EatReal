"use client"
import React, { useState } from 'react';

// Define TypeScript interfaces for the card properties
interface CardProps {
  year: number;
  eventsCount: number;
  title: string;
  poweredBy: string;
  onNavigate: () => void;
}

// Create the card component
const Card: React.FC<CardProps> = ({ year, eventsCount, title, poweredBy, onNavigate}) => {
  return (
    <div className="card" onClick={onNavigate}>
      <div className="card-year">{year}</div>
      <div className="card-events">{eventsCount} Events</div>
      <div className="card-title">{title}</div>
      <div className="card-powered">{poweredBy}</div>
    </div>
  );
};

// Main App component where you use the card component
const SecondPage: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  return (
    <div className="app">
      <header className="header">
        <h1>Nomad3</h1>
        <p>Click here to get see what's AFI is in your NFT</p>
      </header>
      <div className="cards-container">
        <Card year={2021} eventsCount={32} title="The 'Degen'" poweredBy="powered by ERC-6551" onNavigate={onNavigate}/>
        <Card year={2021} eventsCount={32} title="The 'Degen'" poweredBy="powered by ERC-6551" onNavigate={onNavigate}/>
      </div>
    </div>
  );
};

export default SecondPage;

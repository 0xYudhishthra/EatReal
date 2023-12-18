import React from 'react';

interface CardProps {
  year: number;
  eventsCount: number;
  title: string;
  poweredBy: string;
  onNavigate: () => void;
  image: string;
}

const Cards: React.FC<CardProps> = ({ year, eventsCount, title, poweredBy, onNavigate, image }) => {
  return (
    <div className='flex flex-col items-center justify-center p-6 border-2 border-black rounded-lg bg-blue-500 text-white w-96 h-auto' onClick={onNavigate}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="text-lg font-bold mt-4">{year}</div>
        <div className="mb-2">{eventsCount} Events</div>
        <div className="mb-2">{title}</div>
        <div className="text-sm">{poweredBy}</div>
    </div>
  );
};

export default Cards;

import React from 'react';

interface CardProps {
  title: string;
  connection: string;
  onNavigate: () => void;
  image: string;
}

const EventCard: React.FC<CardProps> = ({ title, connection, onNavigate, image }) => {
  return (
    <div className="flex justify-center border-2 border-black rounded-lg bg-blue-500 text-white w-80 h-96 shadow-inner hover:cursor-pointer hover:bg-blue-700 ease-in duration-300" onClick={onNavigate}>

      <div className="flex-grow flex items-center border-2 rounded-lg">
      <div className="flex flex-col justify-center items-center w-16 h-full ">
        <div className="text-lg whitespace-nowrap grid  place-content-center -rotate-90 pt-12">{connection}</div>
        <div className="text-lg whitespace-nowrap grid  place-content-center pl-24 -rotate-90">{title}</div>
      </div>
        <img src={image} alt={title} className="w-72 h-52 object-cover -rotate-90" />
      </div>
     

    </div>
  );
};

export default EventCard;


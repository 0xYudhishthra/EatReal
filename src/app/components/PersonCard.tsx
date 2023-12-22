import React from 'react';

interface PersonalCardProps {
  name: string;
  score: number;
  image: string;
  title: string;
}

const PersonCards: React.FC<PersonalCardProps> = ({ name,score, image, title }) => {
  return (
    <div className='flex flex-col items-center justify-center p-6 border-2 border-black rounded-lg bg-blue-500 text-white w-96 h-auto'>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className='flex justify-between w-60 space-x-4'>
            <div className="text-lg font-bold">{name}</div>
            <div className="mb-2">{score}</div>
        </div>
        {/* <div className="mb-2">{title}</div> */}
    </div>
  );
};

export default PersonCards;

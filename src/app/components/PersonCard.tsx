import React from 'react';

interface PersonalCardProps {
  name: string;
  image: string;
  title: string;
  notes: string;
}

const PersonCards: React.FC<PersonalCardProps> = ({ name, image, title, notes }) => {
  return (
    <div className='flex flex-col items-center justify-center p-6 border-2 border-black rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 w-96 h-auto'>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className='flex justify-between'>
        <div className="text-lg font-bold ">{name}</div>
      </div>
      <div className='text-md mt-8'>{notes}</div>
    </div>
  );
};

export default PersonCards;

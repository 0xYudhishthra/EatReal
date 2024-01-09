import React from "react";
import Image from "next/image";

interface PersonalCardProps {
  name: string;
  image: string;
  walletAddress: string;
}

const PersonCards: React.FC<PersonalCardProps> = ({
  name,
  image,
  walletAddress,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-96 h-auto">
      <Image
        src={image}
        alt="Descriptive Text"
        className=" object-cover"
        width={500}
        height={300}
      />
      <div className="flex justify-between">
        <div className="text-lg font-bold ">{name}</div>
      </div>
      <div className="text-m mt-8">{walletAddress}</div>
    </div>
  );
};

export default PersonCards;

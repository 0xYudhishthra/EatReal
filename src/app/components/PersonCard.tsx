import React from "react";
import Image from "next/image";
import {
  MediaRenderer,
} from "@thirdweb-dev/react";

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
      

      <MediaRenderer 
      src={image}
      />
      <div className="flex justify-between">
        <div className="text-lg font-bold ">{name}</div>
      </div>
      <div className="text-m mt-8">{walletAddress}</div>
    </div>
  );
};

export default PersonCards;

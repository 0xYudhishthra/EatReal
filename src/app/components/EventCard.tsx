import React from "react";

interface CardProps {
  EventName: string;
  EventDate: string;
  TokenboundAccount: string;
  onNavigate: () => void;
}

const EventCard: React.FC<CardProps> = ({
  EventName,
  EventDate,
  TokenboundAccount,
  onNavigate,
}) => {
  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={onNavigate}
    >
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {EventName}
        </h5>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
          {EventDate}
        </p>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
          <a href="google.com" className="text-blue-500 hover:underline">
            {TokenboundAccount}
          </a>
        </p>
      </div>
    </a>
  );
};

export default EventCard;

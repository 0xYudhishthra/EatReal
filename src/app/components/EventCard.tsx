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
          {/* a mini button with the tba where on click it will go to the block explorer link */}
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              window.open(
                "https://testnet.vicscan.xyz/address/" + TokenboundAccount,
                "_blank"
              )
            }
          >
            {TokenboundAccount}
          </button>
        </p>
      </div>
    </a>
  );
};

export default EventCard;

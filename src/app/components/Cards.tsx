import React from "react";

interface CardProps {
  year: string;
  eventsCount: number;
  title: string;
  poweredBy: string;
  onNavigate: () => void;
  image: string;
}

const Cards: React.FC<CardProps> = ({
  year,
  eventsCount,
  title,
  poweredBy,
  onNavigate,
  image,
}) => {
  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 container"
      onClick={onNavigate}
    >
      <div>
        <img className="rounded-t-lg" src={image} alt={title} />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {eventsCount} events
        </p>
        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {poweredBy}
        </div>
      </div>
    </div>
  );
};

export default Cards;

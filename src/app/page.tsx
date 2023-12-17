import React from 'react';
import EventCard from './components/EventCard'; 


  export default function Home() {
    return (
      <div className="flex min-h-screen flex-col ">
          <main>
          <EventCard />
          </main>
          
      </div>
    );
  }

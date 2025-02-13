
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./components/EventCard";
import { FaSpinner } from "react-icons/fa";
import BarsChart from "./components/BarsChart"

const App = () => {
    
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/events/participants-count"
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los datos");
        setLoading(false);
      }
    };

    

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex-col">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Dashboard de Participantes
      </h1>
      <div className="max-w-4xl mx-auto text-black mb-2">
        {events.map((event) => (

          <EventCard key={event.event_id} event={event} />
        ))}
      </div>
      <div className="flex-1 bg-gray-100 p-8">
        <BarsChart />
      </div>
    </div>
  );
  
};

export default App; 

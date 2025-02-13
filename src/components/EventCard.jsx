
import React from "react";
import { FaUser } from "react-icons/fa";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg"><strong style={{ color: "#6eacde" }}>Nombre del evento:</strong> {event.event_name}</h3>
        <div className="flex items-center gap-2">
            <FaUser className="text-4xs text-black" style={{ color: "#6eacde" }}/>
            <p className="text-gray-700">Participantes: {event.participant_count}</p>
        </div>

    </div>
  );
};
export default EventCard;
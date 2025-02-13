import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EventChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/events/participants-count"
        );
        const data = await response.json();

        setChartData({
          labels: data.map((event) => event.event_name),
          datasets: [
            {
              label: "Número de participantes",
              data: data.map((event) => event.participant_count),
              backgroundColor: "#6eacde",
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-black text-center">Participantes por Evento</h2>
      <Bar data={chartData} />
    </div>
  );
};



export default EventChart;

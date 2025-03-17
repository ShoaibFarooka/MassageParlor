import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TotalRevenue = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2024",
        data: [10000, 15000, 12000, 18000, 25000, 38753, 22000, 19000, 20000, 21000, 22000, 23000],
        borderColor: "#6D28D9", // Purple color
        backgroundColor: "rgba(109, 40, 217, 0.1)", // Light fill color
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointBackgroundColor: "#6D28D9",
        pointBorderColor: "#6D28D9",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#6D28D9",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `R ${tooltipItem.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10000,
          color: "#000",
          callback: (value) => `R${value / 1000}k`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-[9.35px] shadow p-5 w-full mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Total Revenue</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TotalRevenue;

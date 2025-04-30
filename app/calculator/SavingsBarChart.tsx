"use client";

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

type SavingsBarChartProps = {
  totalRent: number;
  totalOwnership: number;
  equityBuilt: number;
  netSavings: number;
};

export default function SavingsBarChart({
  totalRent,
  totalOwnership,
  equityBuilt,
  netSavings,
}: SavingsBarChartProps) {
  const data = {
    labels: ["Total Rent", "Total Ownership", "Equity Built", "Net Savings"],
    datasets: [
      {
        label: "5-Year Comparison ($)",
        data: [totalRent, totalOwnership, equityBuilt, netSavings],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",   // Rent
          "rgba(54, 162, 235, 0.7)",   // Ownership
          "rgba(75, 192, 192, 0.7)",   // Equity
          "rgba(255, 206, 86, 0.7)",   // Net Savings
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Savings Breakdown",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8">
      <Bar data={data} options={options} />
    </div>
  );
}

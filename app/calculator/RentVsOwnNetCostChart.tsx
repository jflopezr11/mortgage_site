"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { YearPoint } from "./rentVsOwnMath";
import type { Locale } from "@/lib/i18n/config";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  yearlySeries: YearPoint[];
  locale?: Locale;
};

// Plots the exact cumulative net-cost figures from the calculation results —
// no separate recalculation — and stays stable when a value is $0.
export default function RentVsOwnNetCostChart({ yearlySeries, locale = "en" }: Props) {
  const data = {
    labels: yearlySeries.map((point) => `${locale === "es" ? "Año" : "Year"} ${point.year}`),
    datasets: [
      {
        label: locale === "es" ? "Alquilar — costo neto" : "Renting — Net Cost",
        data: yearlySeries.map((point) => Math.round(point.cumulativeRentingNetCost)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.15)",
        fill: true,
        tension: 0.2,
      },
      {
        label: locale === "es" ? "Comprar — costo neto" : "Owning — Net Cost",
        data: yearlySeries.map((point) => Math.round(point.cumulativeOwningNetCost)),
        borderColor: "rgba(37, 99, 235, 1)",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: {
        display: true,
        text: locale === "es" ? "Costo neto estimado por año" : "Year-by-Year Estimated Net Housing Cost",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            const num = typeof value === "string" ? parseFloat(value) : value;
            return `$${num.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-6 h-64 sm:h-80">
      <Line data={data} options={options} />
    </div>
  );
}

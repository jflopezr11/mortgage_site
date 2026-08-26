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
import type { Locale } from "@/lib/i18n/config";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  fhaMonthlyPayment: number;
  convMonthlyPayment: number;
  fhaUpfrontCash: number;
  convUpfrontCash: number;
  locale?: Locale;
};

// Renders the exact figures shown in the written results above it — no
// separate recalculation — and stays stable when a value is $0 (Chart.js
// renders a zero-height bar rather than breaking).
export default function FhaVsConventionalChart({
  fhaMonthlyPayment,
  convMonthlyPayment,
  fhaUpfrontCash,
  convUpfrontCash,
  locale = "en",
}: Props) {
  const data = {
    labels: locale === "es" ? ["Pago mensual total estimado", "Efectivo inicial estimado"] : ["Est. Total Monthly Payment", "Est. Upfront Cash Required"],
    datasets: [
      {
        label: "FHA",
        data: [fhaMonthlyPayment, fhaUpfrontCash],
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
      {
        label: locale === "es" ? "Convencional" : "Conventional",
        data: [convMonthlyPayment, convUpfrontCash],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: {
        display: true,
        text: locale === "es" ? "FHA vs. convencional — pago y efectivo inicial" : "FHA vs. Conventional — Payment and Upfront Cash",
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
    <div className="mt-6">
      <Bar data={data} options={options} />
    </div>
  );
}

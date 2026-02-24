"use client";

import "@/lib/utils/chart";
import dynamic from "next/dynamic";

const Line = dynamic(() => import("react-chartjs-2").then((m) => m.Line), {
  ssr: false,
});

interface Props {
  period: "30days" | "7days" | "24hours";
}

export default function TrafficChart({ period }: Props) {
  const chartDataMap = {
    "30days": {
      labels: ["Jun 1", "Jun 6", "Jun 12", "Jun 18", "Jun 24", "Jun 30"],
      data: [3200, 4200, 6100, 5400, 6800, 7400],
    },
    "7days": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [900, 1100, 1500, 1300, 1700, 1600, 1800],
    },
    "24hours": {
      labels: ["0h", "4h", "8h", "12h", "16h", "20h", "24h"],
      data: [120, 280, 460, 720, 610, 480, 350],
    },
  };

  const { labels, data } = chartDataMap[period];

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Visitors",
            data,
            borderColor: "#137fec",
            backgroundColor: "rgba(19,127,236,0.15)",
            tension: 0.45,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: "#137fec",
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#020617",
            borderColor: "#1e293b",
            borderWidth: 1,
            titleColor: "#fff",
            bodyColor: "#e5e7eb",
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#92adc9" },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#92adc9" },
          },
        },
      }}
    />
  );
}

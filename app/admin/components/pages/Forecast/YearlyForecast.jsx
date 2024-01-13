"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "react-day-picker/dist/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// NOT COMPLETED
const YearlyForecast = () => {
  const [yearlySales, setYearlySales] = useState([]);
  const [year, setYear] = useState(2027);

  const yearArray = [
    {
      id: 1,
      year: 2023,
    },
    {
      id: 2,
      year: 2024,
    },
    {
      id: 3,
      year: 2025,
    },
    {
      id: 4,
      year: 2026,
    },
    {
      id: 5,
      year: 2027,
    },
  ];

  const getYearlySales = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/forecast/yearly`, {
      cache: "no-store",
    });

    const data = await res.json();

    const lastYear = data[data.length - 1].yearOrdered + 1;
    let rawData = [...data];

    for (let i = lastYear; i <= year; i++) {
      rawData = [...rawData, { yearOrdered: i }];
    }

    setYearlySales(rawData);
  };

  const a = 0.9;
  let dataWithFD = [...yearlySales];
  dataWithFD?.forEach((i, index) => {
    let { totalSales: At, Ft } = i;
    At = Number(At);

    const nextData = dataWithFD[index + 1];
    const prevData = index > 0 ? dataWithFD[index - 1] : undefined;

    if (!Ft) {
      i.Ft = At;
      Ft = At;
    }

    if (!At) {
      i.At = prevData.Ft;
      At = prevData.Ft;
    }

    const nextFt = a * At + (1 - a) * Ft;
    if (!!nextData) {
      nextData.Ft = nextFt;
    }
    dataWithFD[index] =
      index > 2
        ? {
            ...i,
            At: undefined,
            Ft,
          }
        : {
            ...i,
            At,
            Ft,
          };
  });

  useEffect(() => {
    getYearlySales();
  }, [year]);

  useEffect(() => {
    getYearlySales();
  }, []);

  return (
    <div className="h-full w-full bg-white rounded-sm border-[1px] border-zinc-200">
      <div className="flex flex-col gap-2 ps-8 pt-5">
        <Label>Select year to forecast:</Label>
        <Select asChild value={year} onValueChange={setYear}>
          <SelectTrigger className="w-36">
            <div>{year}</div>
          </SelectTrigger>
          <SelectContent>
            {yearArray.map((i) => {
              return (
                <SelectItem key={i.id} value={i.year}>
                  {i.year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-full p-5">
        <Line
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Year ${year} Forecast`,
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Year",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sales",
                },
              },
            },
          }}
          data={{
            labels: dataWithFD.map((i) => i.yearOrdered),
            datasets: [
              {
                label: "Actual Demand",
                data: dataWithFD.map((i) => i.At),
                borderColor: "rgba(75, 192, 192, 0.6)",
                tension: 0.1,
              },
              {
                label: "Forecast Demand",
                data: dataWithFD.map((i) => i.Ft),
                borderColor: "rgba(186,1,0, 0.6)",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
export default YearlyForecast;

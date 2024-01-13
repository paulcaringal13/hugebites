"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "react-day-picker/dist/style.css";

// NOT COMPLETED
const YearlyForecastDashboard = ({ userData }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [yearlySales, setYearlySales] = useState([]);

  const getYearlySales = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/forecast/yearly`, {
      cache: "no-store",
    });

    const data = await res.json();

    const rawData = [...data, { yearOrdered: 2023 }];

    setYearlySales(rawData);
  };

  const a = 0.7;
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
  }, [loggedInUser]);

  useEffect(() => {
    setLoggedInUser(userData);
  }, []);

  return (
    <div className="h-full w-full bg-white rounded-sm border-[1px] border-zinc-200">
      <div className="w-full h-full p-5">
        <Line
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Forecast",
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
export default YearlyForecastDashboard;

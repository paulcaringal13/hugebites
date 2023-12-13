"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const EmployeeTotalEarnings = ({ reportType }) => {
  const [orderDatas, setOrderDatas] = useState([]);

  const [year, setYear] = useState(2022);
  const [type, setType] = useState("Monthly");

  const [startDate, setStartDate] = useState(dayjs("01-01-2020").year());
  const [endDate, setEndDate] = useState(dayjs("03-30-2022").year());

  const yearArray = [
    {
      id: 1,
      year: 2020,
    },
    {
      id: 2,
      year: 2021,
    },
    {
      id: 3,
      year: 2022,
    },
  ];

  const typeArray = [
    {
      id: 1,
      value: "Yearly",
    },
    {
      id: 2,
      value: "Monthly",
    },
  ];

  const getMonthlySales = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/reports/totalEarnings/monthly?` +
        new URLSearchParams({
          year: year,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setOrderDatas(data);
  };

  const getYearlySales = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/reports/totalEarnings/yearly?` +
        new URLSearchParams({
          reportType: reportType,
          startDate: startDate,
          endDate: endDate,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setOrderDatas(data);
  };

  useEffect(() => {
    type == "Monthly" ? getMonthlySales() : getYearlySales();
  }, [type, startDate, endDate, year]);

  useEffect(() => {
    getMonthlySales();
  }, []);

  return (
    <div className="h-full w-full mx-10 my-5 bg-white rounded-sm border-[1px] border-zinc-200">
      <div className="flex flex-row gap-4 ps-8 pt-5">
        <div className="flex flex-col gap-1">
          <Label>Report:</Label>
          <Select asChild value={type} onValueChange={setType}>
            <SelectTrigger className="w-36">
              <div>{type}</div>
            </SelectTrigger>
            <SelectContent>
              {typeArray.map((i) => {
                return (
                  <SelectItem key={i.id} value={i.value}>
                    {i.value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {type == "Monthly" ? (
          <div className="flex flex-col gap-1">
            <Label>Select year:</Label>
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
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <Label>Select start year:</Label>
              <Select asChild value={startDate} onValueChange={setStartDate}>
                <SelectTrigger className="w-36">
                  <div>{startDate}</div>
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
            <div className="flex flex-col gap-1">
              <Label>Select end year:</Label>
              <Select asChild value={endDate} onValueChange={setEndDate}>
                <SelectTrigger className="w-36">
                  <div>{endDate}</div>
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
          </>
        )}
      </div>
      <div className="w-full h-full p-5">
        {type === "Monthly" ? (
          <Bar
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `Total Sales per Month on Year ${year}`,
                },
                legend: {
                  display: false,
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
                    text: "Month",
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
              labels: orderDatas.map((i) => i.monthOrdered),
              datasets: [
                {
                  // label: "Sales",
                  data: orderDatas.map((i) => i.totalSales),
                  backgroundColor: [
                    "rgba(75, 192, 192)",
                    "rgba(255, 205, 86)",
                    "rgba(131,116,124)",
                    "rgba(209,230,231)",
                    "rgba(29,220,0)",
                    "rgba(255,224,131)",
                    "rgba(204,119,221)",
                    "rgba(4,116,116)",
                    "rgba(26,254,255)",
                    "rgba(204,85,0)",
                    "#ff3945",
                    "rgba(97,255,118)",
                  ],
                  tension: 0.1,
                },
              ],
            }}
          />
        ) : (
          <Bar
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `Total Earnings`,
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
              labels: orderDatas.map((i) => i.yearOrdered),
              datasets: [
                {
                  label: "Sales",
                  data: orderDatas.map((i) => i.totalSales),
                  backgroundColor: [
                    "rgba(75, 192, 192)",
                    "rgba(255, 205, 86)",
                    "#ff3945",
                  ],
                  tension: 0.1,
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
};
export default EmployeeTotalEarnings;

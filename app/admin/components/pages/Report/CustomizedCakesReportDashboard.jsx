"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "react-day-picker/dist/style.css";
import { Label } from "@/components/ui/label";
// NOT COMPLETED

const CustomizedCakesReportDashboard = ({ userData, reportType }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [reportDatas, setReportDatas] = useState([]);

  const [dateRange, setDateRange] = useState(dayjs(""));
  const [startDate, setStartDate] = useState(dayjs("01-01-2020"));
  const [endDate, setEndDate] = useState(dayjs("12-30-2022"));

  const getReportsData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/reports?` +
        new URLSearchParams({
          reportType: reportType,
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const doughnutData = data.map((i) => {
      const x = i.isCakeCustomized == 0 ? "Customized Cake" : "Signature Cake";

      return { ...i, cakeType: x };
    });

    setReportDatas(doughnutData);
  };

  useEffect(() => {
    getReportsData();
  }, [loggedInUser]);

  useEffect(() => {
    dateRange?.from && setStartDate(dateRange?.from);
    dateRange?.to && setEndDate(dateRange?.to);
  }, [dateRange]);

  useEffect(() => {
    setLoggedInUser(userData);
  }, []);

  return (
    <div className="h-auto w-auto mx-10 bg-white rounded-sm border-[1px] border-zinc-200">
      <div className="w-full h-full p-5 mx-auto">
        {reportDatas.length ? (
          <Doughnut
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: `Cake comparison`,
                },
                legend: {
                  display: true,
                },
              },
            }}
            data={{
              labels: reportDatas.map((i) => i.cakeType), // ['prod1', 'prod2']
              datasets: [
                {
                  label: "Cakes Ordered",
                  data: reportDatas.map((i) => i.rowCount), // ['80', '70']
                  backgroundColor: ["#ff3945", "rgba(2,138,136, 0.6)"],
                },
              ],
            }}
          />
        ) : (
          <div className="h-[600px] w-full border-[1px]">
            <Label className="h-fit w-fit flex text-center mx-auto mt-52 font-extrabold text-2xl">
              No data
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomizedCakesReportDashboard;

"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoClose } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ProductsReport = () => {
  const [reportDatas, setReportDatas] = useState([]);

  const [openSetDateRange, setOpenSetDateRange] = useState(false);

  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState({
    id: 1,
    month: "January",
    value: "01",
  });
  const [reportType, setReportType] = useState({
    id: 1,
    name: "All Cakes",
    value: "all",
  });
  const [type, setType] = useState("Yearly");

  const [dateRange, setDateRange] = useState();
  const [startDate, setStartDate] = useState(
    dayjs("01-01-2020").format("MMMM DD YYYY")
  );
  const [endDate, setEndDate] = useState(
    dayjs("12-31-2022").format("MMMM DD YYYY")
  );

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

  const monthArray = [
    {
      id: 1,
      month: "January",
      value: "01",
    },
    {
      id: 2,
      month: "February",
      value: "02",
    },
    {
      id: 3,
      month: "March",
      value: "03",
    },
    {
      id: 4,
      month: "April",
      value: "04",
    },
    {
      id: 5,
      month: "May",
      value: "05",
    },
    {
      id: 6,
      month: "June",
      value: "06",
    },
    {
      id: 7,
      month: "July",
      value: "07",
    },
    {
      id: 8,
      month: "August",
      value: "08",
    },
    {
      id: 9,
      month: "September",
      value: "09",
    },
    {
      id: 10,
      month: "October",
      value: "10",
    },
    {
      id: 11,
      month: "November",
      value: "11",
    },
    {
      id: 12,
      month: "December",
      value: "12",
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

  const reportTypeArray = [
    {
      id: 1,
      name: "All Cakes",
      value: "all",
    },
    {
      id: 2,
      name: "Common Cake",
      value: "common",
    },
    {
      id: 3,
      name: "Special Cake",
      value: "special",
    },
  ];

  const getMonthlySales = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/reports/products/monthly?` +
        new URLSearchParams({
          reportType: reportType.value,
          month: month.value,
          year: year,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setReportDatas(data);
  };

  const getYearlySales = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/reports/products/yearly?` +
        new URLSearchParams({
          reportType: reportType.value,
          startDate: dayjs(startDate).format("YYYY-MM-DD"),
          endDate: dayjs(endDate).format("YYYY-MM-DD"),
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setReportDatas(data);
  };

  useEffect(() => {
    type == "Monthly" ? getMonthlySales() : getYearlySales();
  }, [reportType, type, startDate, month, endDate, year]);

  useEffect(() => {
    dateRange?.from && setStartDate(dateRange?.from);
    dateRange?.to && setEndDate(dateRange?.to);
  }, [dateRange]);
  console.log(reportType.name == "All cake");
  useEffect(() => {
    getYearlySales();
  }, []);
  return (
    <div className="h-full w-full mx-10 my-5 bg-white rounded-sm border-[1px] border-zinc-200">
      <div className="flex flex-row gap-4 ps-8 pt-5">
        <div className="flex flex-col gap-1">
          <Label>Report:</Label>
          <Select asChild value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-36">
              <div>{reportType.name}</div>
            </SelectTrigger>
            <SelectContent>
              {reportTypeArray.map((i) => {
                return (
                  <SelectItem key={i.id} value={i}>
                    {i.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-auto">
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
          <div className="flex flex-row w-fit gap-4">
            <div className="flex flex-col gap-1">
              <Label>Select month:</Label>
              <Select asChild value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-36">
                  <div>{month.month}</div>
                </SelectTrigger>
                <SelectContent>
                  {monthArray.map((i) => {
                    return (
                      <SelectItem key={i.id} value={i}>
                        {i.month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
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
          </div>
        ) : (
          <div className="flex flex-col gap-1 w-full h-fit ml-3">
            <Label>Select Date Range:</Label>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                className="h-fit w-fit active:bg-white"
                onClick={() => setOpenSetDateRange(true)}
              >
                Date Range
              </Button>
              <Label className="font-extrabold text-xs mt-3">From: </Label>
              <Label className="font-bold text-xs  mt-3">
                {dayjs(startDate).format("MMMM DD YYYY")}{" "}
              </Label>
              <Label className="font-extrabold text-xs mx-4  mt-3">-</Label>
              <Label className="font-extrabold text-xs  mt-3">To: </Label>
              <Label className="font-bold text-xs  mt-3">
                {dayjs(endDate).format("MMMM DD YYYY")}{" "}
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-full p-5">
        {reportDatas.length == 0 ? (
          <div className="h-[600px] w-full border-[1px]">
            <Label className="h-fit w-fit flex text-center mx-auto mt-52 font-extrabold text-2xl">
              No data
            </Label>
          </div>
        ) : (
          <>
            {type == "Monthly" ? (
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: `Top ${
                        reportType.name == "All Cakes"
                          ? "Cake"
                          : `${reportType.name}`
                      } on ${month.month} ${year}`,
                    },
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  indexAxis: "y",
                }}
                data={{
                  labels: reportDatas.map((i) => i.name),
                  datasets: [
                    {
                      label: "Sales",
                      data: reportDatas.map((i) => i.totalSales),
                      backgroundColor: [
                        "#5FBDFF",
                        "rgba(2,138,136, 0.6)",
                        "rgba(255, 205, 86, 0.6)",
                        "rgba(222,223,182, 0.6)",
                        "rgba(255,151,192, 0.6)",
                        "rgba(174,210,93, 0.6)",
                        "rgba(210,106,255, 0.6)",
                      ],
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
                      text: `Top ${
                        reportType.name == "All Cakes"
                          ? "Cakes"
                          : `${reportType.name}`
                      } ${dayjs(startDate).format("MMM YYYY")} - ${dayjs(
                        endDate
                      ).format("MMM YYYY")}`,
                    },
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  indexAxis: "y",
                }}
                data={{
                  labels: reportDatas.map((i) => i.name),
                  datasets: [
                    {
                      data: reportDatas.map((i) => i.totalSales),
                      backgroundColor: [
                        "#5FBDFF",
                        "rgba(2,138,136, 0.6)",
                        "rgba(255, 205, 86, 0.6)",
                        "rgba(222,223,182, 0.6)",
                        "rgba(255,151,192, 0.6)",
                        "rgba(174,210,93, 0.6)",
                        "rgba(210,106,255, 0.6)",
                      ],
                    },
                  ],
                }}
              />
            )}
          </>
        )}
      </div>

      {!openSetDateRange ? null : (
        <Dialog
          open={openSetDateRange}
          onOpenChange={setOpenSetDateRange}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="h-auto w-full px-4 py-6">
              <div className="flex flex-row">
                <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                  SET DATE RANGE:
                </Label>
                <Button
                  className="h-fit w-fit ml-auto bg-transparent text-gray-600 hover:text-black"
                  onClick={() => {
                    setOpenSetDateRange(false);
                    setStartDate(dayjs("01-01-2020"));
                    setEndDate(dayjs());
                    setDateRange(dayjs(""));
                  }}
                >
                  <IoClose />
                </Button>
              </div>

              <DayPicker
                className="flex mx-auto"
                mode="range"
                captionLayout="dropdown"
                fromYear={2020}
                toYear={2022}
                selected={dateRange}
                onSelect={(x) => {
                  setDateRange(x);
                  if (!x?.to) {
                    null;
                  }
                }}
              />

              <div className="flex flex-col gap-1 w-full h-fit mt-5">
                <Label className="font-extrabold text-sm  my-auto">
                  From: {dayjs(startDate).format("MMMM DD YYYY")}
                </Label>
                <Label className="font-extrabold text-sm  my-auto">
                  To: {dayjs(endDate).format("MMMM DD YYYY")}
                </Label>
              </div>
              <Separator className="h-[1px] bg-black mt-4" />
              <Button
                className="flex w-20 bg-ring hover:bg-ring text-white active:bg-primary mt-3 ml-auto "
                onClick={async () => {
                  setDateRange(dateRange);
                  setOpenSetDateRange(false);
                }}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default ProductsReport;

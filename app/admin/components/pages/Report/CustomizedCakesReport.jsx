"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { IoClose } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";

const CustomizedCakeReport = ({ userData, reportType }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [reportDatas, setReportDatas] = useState([]);

  const [dateRange, setDateRange] = useState(dayjs(""));
  const [startDate, setStartDate] = useState(dayjs("01-01-2020"));
  const [endDate, setEndDate] = useState(dayjs());

  const [openSetDateRange, setOpenSetDateRange] = useState(false);

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
    <div className="h-full w-full mx-10 my-5 bg-white rounded-sm border-[1px] border-zinc-200">
      <div className="flex flex-row gap-2 w-full h-fit ml-5 mt-5">
        <Label className="font-extrabold text-lg  my-auto">From: </Label>
        <Label className="font-bold text-lg  my-auto">
          {dayjs(startDate).format("MMMM DD YYYY")}{" "}
        </Label>
        <Label className="font-extrabold text-lg mx-4  my-auto">-</Label>
        <Label className="font-extrabold text-lg  my-auto">To: </Label>
        <Label className="font-bold text-lg  my-auto">
          {dayjs(endDate).format("MMMM DD YYYY")}{" "}
        </Label>
        <Button
          variant="outline"
          className="h-fit w-fit ml-3 active:bg-white"
          onClick={() => setOpenSetDateRange(true)}
        >
          Change Date Range
        </Button>
      </div>

      <div className="w-[50%] h-[50%] p-5 mx-auto">
        {reportDatas.length ? (
          <Doughnut
            data={{
              labels: reportDatas.map((i) => i.cakeType),
              datasets: [
                {
                  label: "Cakes Ordered",
                  data: reportDatas.map((i) => i.rowCount),
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
                toYear={2023}
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
                    const x =
                      i.isCakeCustomized == 0
                        ? "Customized Cake"
                        : "Signature Cake";

                    return { ...i, cakeType: x };
                  });

                  // return data;
                  setReportDatas(doughnutData);
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
export default CustomizedCakeReport;

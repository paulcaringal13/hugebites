"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "react-day-picker/dist/style.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { FaPesoSign } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { PiBagBold } from "react-icons/pi";
import dayjs from "dayjs";
import YearlyForecastDashboard from "../Forecast/YearlyForecastDashboard";
import CustomizedCakesReportDashboard from "../Report/CustomizedCakesReportDashboard";

// NOT COMPLETED
const Dashboard = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const [loggedInUser, setLoggedInUser] = useState({});
  const [totalEarnings, setTotalEarnings] = useState([]);
  const [percentageEarnings, setPercentageEarnings] = useState(0);
  const [totalOrders, setTotalOrders] = useState([]);
  const [percentageOrders, setPercentageOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // FOR GREETINGS
  const getUserInfo = async () => {
    const userId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("employeeId")
        : "";

    const adminRes = await fetch(
      `http://localhost:3000/api/admin/account/employee/loggedInUser?` +
        new URLSearchParams(
          {
            accountId: userId,
          },
          {
            cache: "no-store",
          }
        )
    );

    const response = await adminRes.json();
    setLoggedInUser(response[0][0]);
  };

  const getTotalEarnings = async (yearSelected) => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/dashboard/totalSales?` +
        new URLSearchParams(
          {
            year: yearSelected,
          },
          {
            cache: "no-store",
          }
        )
    );

    const response = await adminRes.json();
    setTotalEarnings(response);
    getPercentageEarnings(response);
  };

  const getTotalOrders = async (yearSelected) => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/dashboard/totalOrders?` +
        new URLSearchParams(
          {
            year: yearSelected,
          },
          {
            cache: "no-store",
          }
        )
    );

    const response = await adminRes.json();

    setTotalOrders(response);
    getPercentageOrders(response);
  };

  const getTopCustomers = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/dashboard/topCustomers`,
      {
        cache: "no-store",
      }
    );

    const response = await adminRes.json();

    setTopCustomers(response);
  };

  const getTopProducts = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/dashboard/topProducts`,
      {
        cache: "no-store",
      }
    );

    const response = await adminRes.json();

    setTopProducts(response);
  };

  const getTotalCustomers = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/dashboard/totalCustomers`,
      {
        cache: "no-store",
      }
    );

    const response = await adminRes.json();

    setTotalCustomers(response[0].totalCustomers);
  };

  const getPercentageOrders = (totalOrders) => {
    const currentYearOrders = Number(totalOrders[0]?.totalOrders);
    const lastYearOrders = Number(totalOrders[1]?.totalOrders);
    const difference = currentYearOrders - lastYearOrders;
    const average = currentYearOrders + lastYearOrders / 2;
    const dividedAvg = difference / average;
    const percentage = dividedAvg * 100;

    setPercentageOrders(parseFloat(percentage.toFixed(2)));
  };

  const getPercentageEarnings = (totalEarnings) => {
    const currentYearSales = Number(totalEarnings[0]?.totalSales);
    const lastYearSales = Number(totalEarnings[1]?.totalSales);
    const difference = currentYearSales - lastYearSales;
    const average = currentYearSales + lastYearSales / 2;
    const dividedAvg = difference / average;
    const percentage = dividedAvg * 100;

    setPercentageEarnings(parseFloat(percentage.toFixed(2)));
  };

  useEffect(() => {
    getUserInfo();
    getTotalEarnings(dayjs().year() - 1);
    getTotalOrders(dayjs().year() - 1);
    getTotalCustomers();
    getTopCustomers();
    getTopProducts();
  }, []);

  return (
    <div className="h-full w-full ">
      <div className="w-full h-fit flex flex-col gap-1">
        <Label className="w-fit h-fit font-extrabold text-lg">
          Good Day, {loggedInUser?.firstName}!
        </Label>
        <Label className="w-fit h-fit text-gray-400">
          Here&apos;s what&apos;s happening with your store today.
        </Label>
      </div>

      <div className="w-full h-fit flex flex-row gap-4 mt-4">
        <div className="flex flex-col gap-1 w-[33%] h-[fit] p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm transform transition-all  hover:scale-105 hover:drop-shadow-lg duration-700">
          <div className="flex flex-row">
            <Label className="font-extrabold text-sm text-slate-500 mb-3">
              TOTAL EARNINGS
            </Label>
            <div className="h-fit w-fit mt-1 ml-auto">
              {percentageEarnings > 0 ? (
                <FiArrowUpRight className="w-4 h-4 text-green-400 font-bold" />
              ) : (
                <FiArrowDownRight className="w-4 h-4 text-red-500 font-bold" />
              )}
            </div>
            <Label
              className={`text-md ${
                percentageEarnings > 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              {percentageEarnings > 0
                ? `+${percentageEarnings}%`
                : `${percentageEarnings}%`}
            </Label>
          </div>
          <Label className="font-extrabold text-2xl">
            {formatter.format(totalEarnings[0]?.totalSales)}
          </Label>
          <div className="flex flex-row justify-between">
            <a
              className="font-extrabold text-xs mt-auto h-fit hover:text-ring text-slate-800"
              href="/admin/reports/totalEarnings"
            >
              View Total Earnings
            </a>
            <div className="h-fit w-fit p-3 rounded-md bg-ring text-white">
              <FaPesoSign className="w-4 h-4 font-extrabold" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-[33%] h-[fit] p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm transform transition-all  hover:scale-105 hover:drop-shadow-lg duration-700">
          <div className="flex flex-row">
            <Label className="font-extrabold text-sm text-slate-500 mb-3">
              TOTAL ORDERS
            </Label>
            <div className="h-fit w-fit mt-1 ml-auto">
              {percentageOrders > 0 ? (
                <FiArrowUpRight className="w-4 h-4 text-green-400 font-bold" />
              ) : (
                <FiArrowDownRight className="w-4 h-4 text-red-500 font-bold" />
              )}
            </div>
            <Label
              className={`text-md ${
                percentageOrders > 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              {percentageOrders > 0
                ? `+${percentageOrders}%`
                : `${percentageOrders}%`}
            </Label>
          </div>
          <Label className="font-extrabold text-2xl">
            {totalOrders[0]?.totalOrders} Orders
          </Label>
          <div className="flex flex-row justify-between">
            <a
              className="font-extrabold text-xs mt-auto h-fit hover:text-ring text-slate-800"
              href="/admin/reports/orders"
            >
              View Orders Reports
            </a>
            <div className="h-fit w-fit p-3 rounded-md bg-ring text-white">
              <PiBagBold className="w-5 h-5 font-extrabold" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-[33%] h-[fit] p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm transform transition-all  hover:scale-105 hover:drop-shadow-lg duration-700">
          <Label className="font-extrabold text-sm text-slate-500 mb-3">
            NO. OF CUSTOMERS
          </Label>
          <Label className="font-extrabold text-2xl">
            {totalCustomers} CUSTOMERS
          </Label>
          <div className="flex flex-row justify-between">
            <a
              className="font-extrabold text-xs mt-auto h-fit hover:text-ring text-slate-800"
              href="/admin/accounts"
            >
              View Customers Table
            </a>
            <div className="h-fit w-fit p-3 rounded-md bg-ring text-white">
              <FaRegUserCircle className="w-5 h-5 font-extrabold" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-fit w-full flex flex-row gap-4">
        <div className="h-[30%] w-[70%] mt-4 flex flex-col gap-1 p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm">
          <div className="w-full h-fit flex flex-row justify-between mb-4">
            <Label className="h-fit font-extrabold text-md flex my-auto text-slate-500">
              ESTIMATED SALES
            </Label>
            <a
              className="font-extrabold text-sm flex my-auto hover:text-ring text-slate-800"
              href="/admin/forecast"
            >
              View Forecasting
            </a>
          </div>
          <YearlyForecastDashboard userId={loggedInUser?.accountId} />
        </div>

        <div className="h-auto w-[30%] mt-4 flex flex-col gap-1 p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm">
          <div className="w-full h-fit flex flex-row justify-between mb-4">
            <Label className="h-fit font-extrabold text-md flex my-auto text-slate-500">
              Top Customers
            </Label>
            <a
              className="font-extrabold text-xs flex my-auto hover:text-ring text-slate-800"
              href="/admin/accounts"
            >
              View Customers Table
            </a>
          </div>
          <Separator />
          {topCustomers.map((i) => {
            return (
              <div
                key={i.customerId}
                className="flex flex-row w-full h-full my-2 border-[1px] p-[11px] rounded-md shadow-sm"
              >
                <Avatar className="ml-5">
                  <AvatarImage src={i.avatar} alt="profile-picture" />
                  <AvatarFallback className="bg-transparent border-[1px] border-slate-900 text-slate-800">
                    {Array.from(i.firstName)[0]}
                    {Array.from(i.lastName)[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col h-full w-[40%] ml-5 mr-auto">
                  <Label className="text-slate-800 text-md font-extrabold">
                    {i.customerId}
                  </Label>
                  <Label className="text-slate-500 text-sm">{i.fullName}</Label>
                </div>
                <div className="flex flex-col h-full w-[30%]">
                  <Label className=" text-slate-500 mb-2"> Total Spent:</Label>
                  <Label className="text-ring font-extrabold">
                    {formatter.format(i.totalSpent)}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-fit w-full flex flex-row gap-4">
        <div className="h-auto w-[40%] mt-4 flex flex-col gap-1 p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm">
          <div className="w-full h-fit flex flex-row justify-between mb-2">
            <Label className="h-fit font-extrabold text-md flex my-auto text-slate-500">
              BEST SELLER CAKES
            </Label>
            <a
              className="font-extrabold text-sm flex my-auto hover:text-ring text-slate-800"
              href="/admin/reports/customizedCake"
            >
              View Reports
            </a>
          </div>
          <Separator className="mb-2" />
          <CustomizedCakesReportDashboard reportType={"customizedCake"} />
        </div>
        <div className="h-[30%] w-[fit] mt-4 flex flex-col gap-1 p-4 bg-white rounded-md border-[1px] border-zinc-200 drop-shadow-sm">
          <div className="w-full h-fit flex flex-row justify-between mb-2">
            <Label className="h-fit font-extrabold text-md flex my-auto text-slate-500">
              BEST SELLER CAKES
            </Label>
            <a
              className="font-extrabold text-sm flex my-auto hover:text-ring text-slate-800"
              href="/admin/reports/products"
            >
              View Reports
            </a>
          </div>
          <Separator className="mb-2" />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cake Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((i) => {
                  return (
                    <tr
                      key={i.productId}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Avatar className="ml-5">
                          <AvatarImage src={i.image} alt="product_image" />
                          <AvatarFallback className="bg-transparent border-[1px] border-slate-900 text-slate-800">
                            UNK
                          </AvatarFallback>
                        </Avatar>
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {i.productName}
                      </th>
                      <td className="px-6 py-4">{i.categoryName}</td>
                      <td className="px-6 py-4">{i.cakeTypeName}</td>
                      <td className="px-6 py-4 text-slate-800 font-extrabold">
                        {formatter.format(i.totalSales)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

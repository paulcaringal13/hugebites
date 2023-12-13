"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../../components/MiniAdminSidebar";
import ProductsReport from "../../components/pages/Report/ProductsReport";
import CustomizationReport from "../../components/pages/Report/CustomizationReport";
import CustomizedCakeReport from "../../components/pages/Report/CustomizedCakesReport";
import TotalEarnings from "../../components/pages/Report/TotalEarnings";
import MonthlyOrders from "../../components/pages/Report/MonthlyOrders";

export default function AdminRequest(path) {
  const { params } = path;
  const { reportType } = params;

  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    const userId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("accountId")
        : "";
    const userName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("userName")
        : "";

    {
      userId && setLoggedInUserId(userId);
    }
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      {reportType == "products" && <ProductsReport />}

      {reportType == "customization" && <CustomizationReport />}

      {reportType == "customizedCake" && (
        <CustomizedCakeReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "totalEarnings" && (
        <TotalEarnings userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "orders" && <MonthlyOrders userId={loggedInUserId} />}
    </div>
  );
}

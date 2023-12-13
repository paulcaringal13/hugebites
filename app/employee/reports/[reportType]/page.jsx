"use client";
import { useState, useEffect } from "react";
import EmployeeMiniAdminSidebar from "../../components/EmployeeMiniAdminSidebar";
import EmployeeProductsReport from "../../components/pages/Report/EmployeeProductsReport";
import EmployeeCustomizationReport from "../../components/pages/Report/EmployeeCustomizationReport";
import EmployeeCustomizedCakesReport from "../../components/pages/Report/EmployeeCustomizedCakesReport";
import EmployeeTotalEarnings from "../../components/pages/Report/EmployeeTotalEarnings";
import EmployeeMonthlyOrders from "../../components/pages/Report/EmployeeMonthlyOrders";

export default function EmployeeReports(path) {
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
        <EmployeeMiniAdminSidebar />
      </div>
      {reportType == "products" && <EmployeeProductsReport />}

      {reportType == "customization" && <EmployeeCustomizationReport />}

      {reportType == "customizedCake" && (
        <EmployeeCustomizedCakesReport
          userId={loggedInUserId}
          reportType={reportType}
        />
      )}

      {reportType == "totalEarnings" && (
        <EmployeeTotalEarnings
          userId={loggedInUserId}
          reportType={reportType}
        />
      )}

      {reportType == "orders" && (
        <EmployeeMonthlyOrders userId={loggedInUserId} />
      )}
    </div>
  );
}

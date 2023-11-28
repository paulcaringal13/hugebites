"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../../components/MiniAdminSidebar";
import AllProductsReport from "../../components/pages/Report/AllProductsReport";
import CommonCakesReport from "../../components/pages/Report/CommonCakesReport";
import SpecialCakesReport from "../../components/pages/Report/SpecialCakesReport";
import AddOnsReport from "../../components/pages/Report/AddOnsReport";
import ShapeReport from "../../components/pages/Report/ShapeReport";
import FlavorReport from "../../components/pages/Report/FlavorReport";
import ColorReport from "../../components/pages/Report/ColorReport";
import PackagingReport from "../../components/pages/Report/PackagingReport";

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
      {reportType == "all" && (
        <AllProductsReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "common" && (
        <CommonCakesReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "special" && (
        <SpecialCakesReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "addons" && (
        <AddOnsReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "shape" && (
        <ShapeReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "flavor" && (
        <FlavorReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "color" && (
        <ColorReport userId={loggedInUserId} reportType={reportType} />
      )}

      {reportType == "packaging" && (
        <PackagingReport userId={loggedInUserId} reportType={reportType} />
      )}
    </div>
  );
}

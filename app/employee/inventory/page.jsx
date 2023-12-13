import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import EmployeeInventoryTableTabs from "../components/pages/Inventory/EmployeeInventoryTableTabs";
import * as React from "react";

const EmployeeInventory = async () => {
  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <EmployeeInventoryTableTabs />
    </div>
  );
};

export default EmployeeInventory;

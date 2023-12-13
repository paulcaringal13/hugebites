import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import EmployeeVoucherTableTabs from "../components/pages/Vouchers/EmployeeVoucherTableTabs";
import * as React from "react";

const EmployeeVouchers = async () => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <EmployeeVoucherTableTabs />
    </div>
  );
};

export default EmployeeVouchers;

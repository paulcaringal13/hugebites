import MiniAdminSidebar from "../components/MiniAdminSidebar";
import VoucherTableTabs from "../components/pages/Vouchers/VoucherTableTabs";
import * as React from "react";
// NOT COMPLETED
const Vouchers = async () => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <VoucherTableTabs />
    </div>
  );
};

export default Vouchers;

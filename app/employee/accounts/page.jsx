import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";
import AccountsTableTabs from "../../admin/components/pages/Accounts/AccountsTableTabs";
import * as React from "react";

const AdminAccounts = async () => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <AccountsTableTabs />
    </div>
  );
};

export default AdminAccounts;

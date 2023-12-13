import MiniAdminSidebar from "../components/MiniAdminSidebar";
import AccountsTableTabs from "../components/pages/Accounts/AccountsTableTabs";
import * as React from "react";

const AdminAccounts = async () => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <AccountsTableTabs />
    </div>
  );
};

export default AdminAccounts;

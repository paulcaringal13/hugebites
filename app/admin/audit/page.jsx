import MiniAdminSidebar from "../components/MiniAdminSidebar";
import AuditTableTabs from "../components/pages/Audit/AuditTableTabs";
import * as React from "react";

const AdminAccounts = async () => {
  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <AuditTableTabs />
    </div>
  );
};

export default AdminAccounts;

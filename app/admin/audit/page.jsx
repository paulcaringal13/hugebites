import MiniAdminSidebar from "../components/MiniAdminSidebar";
import AuditTableTabs from "../components/pages/Audit/AuditTableTabs";
import * as React from "react";

const AdminAudit = async () => {
  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <AuditTableTabs />
    </div>
  );
};

export default AdminAudit;

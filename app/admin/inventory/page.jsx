import MiniAdminSidebar from "../components/MiniAdminSidebar";
import InventoryTableTabs from "../components/pages/Inventory/InventoryTableTabs";
import * as React from "react";

const AdminInventory = async () => {
  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <InventoryTableTabs />
    </div>
  );
};

export default AdminInventory;
// NOT COMPLETED

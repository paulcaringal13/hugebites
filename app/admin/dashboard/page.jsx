import { Box } from "@mui/material";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import AdminNavbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <div>
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
    </div>
  );
};

export default AdminDashboard;

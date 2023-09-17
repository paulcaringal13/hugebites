import { Box } from "@mui/material";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import AdminNavbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "88px",
        }}
      >
        <MiniAdminSidebar />
      </Box>
    </Box>
  );
};

export default AdminDashboard;

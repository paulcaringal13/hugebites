import AdminSidebar from "./components/AdminSidebar";
import { Box } from "@mui/material";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <Box
        sx={{
          // border: "1px solid red",
          marginLeft: "288px",
          marginTop: "72px",
          width: "calc(100vw - 288px)",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

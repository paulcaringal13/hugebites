import AdminSidebar from "./components/AdminSidebar";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <Box
        sx={{
          // border: "1px solid red",
          marginLeft: "288px",
          marginTop: "72px",
          width: "calc(100vw - 288px)",
          paddingTop: "16px",
        }}
      >
        {children}
      </Box>
      {/* <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        {children}
      </div> */}
    </div>
  );
}

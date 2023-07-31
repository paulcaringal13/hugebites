import CustomerSidebar from "./components/CustomerSidebar";
import { Box } from "@mui/material";

export default function CustomerLayout({ children }) {
  return (
    <div className="flex">
      <CustomerSidebar />
      <Box
        sx={{
          // border: "1px solid red",
          marginLeft: "288px",
          height: "calc(100vh - 88px)",
          marginTop: "90px",
          width: "calc(100vw - 288px)",
          // zIndex: "100",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

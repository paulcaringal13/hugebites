import { Inter } from "next/font/google";
import HomePageNavbar from "@/components/HomePageNavbar";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function CustomerLayout({ children }) {
  return (
    <html lang="en">
      <title>Huge Bites</title>

      <body className={inter.className}>
        <HomePageNavbar />
        <Box sx={{ marginTop: "124px" }}>{children}</Box>
      </body>
    </html>
    // <div className="flex">

    //   <body className={inter.className}>{children}</body>

    //   {/* <CustomerSidebar />
    //   <Box
    //     sx={{
    //       // border: "1px solid red",
    //       marginLeft: "288px",
    //       height: "calc(100vh - 88px)",
    //       marginTop: "90px",
    //       width: "calc(100vw - 288px)",
    //       // zIndex: "100",
    //     }}
    //   > */}
    //   {children}
    //   {/* </Box> */}
    // </div>
  );
}

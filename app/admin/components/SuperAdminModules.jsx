// "use client";
// import Link from "next/link";
// import "../../styles/globals.css";
// import {
//   Box,
//   Button,
//   InputLabel,
//   List,
//   ListItem,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import dayjs from "dayjs";

// const SuperAdminModules = () => {
//   const SuperAdminModules = [
//     {
//       moduelId: 1,
//       moduleName: "Account",
//       route: "admin/accounts",
//     },
//     {
//       moduelId: 2,
//       moduleName: "Menu",
//       route: "admin/menu",
//     },
//     {
//       moduelId: 3,
//       moduleName: "Orders",
//       route: "admin/orders",
//     },
//     {
//       moduelId: 4,
//       moduleName: "Customization",
//       route: "admin/customization",
//     },
//     {
//       moduelId: 5,
//       moduleName: "Audit",
//       route: "admin/audit",
//     },
//     {
//       moduelId: 6,
//       moduleName: "Inventory",
//       route: "admin/inventory ",
//     },
//     {
//       moduelId: 7,
//       moduleName: "Reports",
//       route: "admin/reports",
//     },
//     {
//       moduelId: 8,
//       moduleName: "Request",
//       route: "admin/request",
//     },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <List
//         sx={{
//           width: "100%",
//           maxWidth: 360,
//           bgcolor: "background.paper",
//           position: "relative",
//           overflow: "auto",
//           maxHeight: 300,
//           "& ul": { padding: 0 },
//         }}
//       >
//         Modules
//         {SuperAdminModules.map((module) => (
//           <ListItem>{module.moduleName}</ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default SuperAdminModules;

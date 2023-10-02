"use client";
import {
  Box,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import ControlPointDuplicateRoundedIcon from "@mui/icons-material/ControlPointDuplicateRounded";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";

import { FiUsers } from "react-icons/fi";
import { LuShoppingBasket } from "react-icons/lu";
import { RiCakeLine } from "react-icons/ri";
import { BiBookAdd } from "react-icons/bi";
import { AiOutlineAudit } from "react-icons/ai";

import { MdOutlineInventory } from "react-icons/md";

import { GrNotes } from "react-icons/gr";
import { AiOutlineUserSwitch } from "react-icons/ai";

import { ScrollArea } from "../../../components/ui/scroll-area";
import { Separator } from "../../../components/ui/separator";
import { Button } from "../../../components/ui/button";
import { Toggle } from "../../../components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const MiniAdminSidebar = ({ props }) => {
  const router = useRouter();

  // const [openDraw, setOpenDraw] = useState(drawerState);

  const routes = [
    {
      id: 1,
      name: "Account",
      icon: <FiUsers className="text-lg font-extrabold mx-auto" />,
      route: "accounts",
    },
    {
      id: 2,
      name: "Menu",
      icon: <RiCakeLine className="text-xl mx-auto" />,
      route: "menu",
    },

    {
      id: 3,
      name: "Orders",
      icon: <LuShoppingBasket className="text-xl mx-auto" />,
      route: "orders",
    },
    {
      id: 4,
      name: "Customization",
      icon: <BiBookAdd className="text-xl mx-auto" />,
      route: "customization",
    },
    {
      id: 5,
      name: "Audit",
      icon: <AiOutlineAudit className="text-xl mx-auto" />,
      route: "audit",
    },
    {
      id: 6,
      name: "Inventory",
      icon: <MdOutlineInventory className="text-xl mx-auto" />,
      route: "inventory ",
    },
    {
      id: 7,
      name: "Reports",
      icon: <GrNotes className="text-lg mx-auto" />,
      route: "reports",
    },
    {
      id: 8,
      name: "Request",
      icon: <AiOutlineUserSwitch className="text-xl mx-auto" />,
      route: "request",
    },
  ];

  return (
    <ScrollArea className="h-screen w-16 bg-white" style={{ zIndex: "1" }}>
      <div className="mx-auto text-center">
        {routes.map((route) => (
          <div
            key={route.id}
            className="hover:bg-accent hover:shadow-lg hover:border-e-2"
            style={{ borderColor: "#EE7376" }}
          >
            <TooltipProvider delayDuration>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="bg-transparent p-0 m-0 "
                    onClick={() => router.push(route.route)}
                    style={{ color: "black" }}
                  >
                    {route.icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="ms-7"
                  style={{ color: "#EE7376" }}
                >
                  <p>{route.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>

    // <List
    //   sx={{
    //     width: "88px",
    //   }}
    // >
    //   {routes.map((items) => (
    //     <ListItem
    //       button
    //       key={items.id}
    //       onClick={() => router.push(items.route)}
    //       sx={{
    //         "&:hover": {
    //           backgroundColor: "#e6e6e6",
    //           transitionDuration: "0.3s",
    //           boxShadow: "3",
    //         },
    //       }}
    //     >
    //       <ListItemIcon sx={{ color: "black", marginLeft: "15px" }}>
    //         {items.icon}
    //       </ListItemIcon>
    //       {/* <ListItemButton
    //           sx={{
    //             "&:hover": {
    //               background: "transparent",
    //             },
    //           }}
    //         >
    //           <Link
    //             sx={{ color: "white", textDecoration: "none" }}
    //             href={`/${items.route}`}
    //           >
    //             <ListItemText
    //               primary={items.name}
    //               sx={{
    //                 "& span": {
    //                   fontSize: "20px",
    //                 },
    //               }}
    //             />
    //           </Link>
    //         </ListItemButton> */}
    //     </ListItem>
    //   ))}
    // </List>
  );
};

export default MiniAdminSidebar;

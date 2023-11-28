"use client";
import { useRouter } from "next/navigation";
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
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";
const MiniAdminSidebar = ({ props }) => {
  const router = useRouter();

  // const [openDraw, setOpenDraw] = useState(drawerState);
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      id: 1,
      name: "Menu",
      icon: <RiCakeLine className="text-xl mx-auto" />,
      route: "menu",
    },
    {
      id: 2,
      name: "Orders",
      icon: <LuShoppingBasket className="text-xl mx-auto" />,
      route: "orders",
    },
    {
      id: 3,
      name: "Customization",
      icon: <BiBookAdd className="text-xl mx-auto" />,
      route: "customization",
    },
    {
      id: 4,
      name: "Audit",
      icon: <AiOutlineAudit className="text-xl mx-auto" />,
      route: "audit",
    },
    {
      id: 5,
      name: "Inventory",
      icon: <MdOutlineInventory className="text-xl mx-auto" />,
      route: "inventory ",
    },
    {
      id: 6,
      name: "Reports",
      icon: <GrNotes className="text-lg mx-auto" />,
      route: "reports",
    },
    {
      id: 7,
      name: "Request",
      icon: <AiOutlineUserSwitch className="text-xl mx-auto" />,
      route: "request",
    },

    {
      id: 8,
      name: "Account",
      icon: <FiUsers className="text-lg font-extrabold mx-auto" />,
      route: "accounts",
    },
  ];

  const reportRoutes = [
    {
      id: 1,
      name: "All Products",
      reportType: "all",
    },
    {
      id: 2,
      name: "Common Cake",
      reportType: "common",
    },
    {
      id: 3,
      name: "Special Cake",
      reportType: "special",
    },
    {
      id: 4,
      name: "Add Ons",
      reportType: "addons",
    },
    {
      id: 5,
      name: "Shape",
      reportType: "shape ",
    },
    {
      id: 6,
      name: "Flavor",
      reportType: "flavor",
    },
    {
      id: 7,
      name: "Color",
      reportType: "color",
    },

    {
      id: 8,
      name: "Packaging",
      reportType: "packaging",
    },
  ];

  return (
    <ScrollArea
      className="h-full w-fit bg-white border-e-[1px] border-zinc-200"
      style={{ zIndex: "1" }}
    >
      <div className="mr-auto">
        {routes.map((route) => (
          <div
            key={route.id}
            className={`border-b-[1px] border-zinc-200 ${
              !isOpen ? "hover:bg-accent" : "hover:bg-white"
            }`}
          >
            <TooltipProvider delayDuration>
              <Tooltip>
                <TooltipTrigger asChild>
                  {route.name == "Reports" ? (
                    <Collapsible
                      open={isOpen}
                      onOpenChange={setIsOpen}
                      className="bg-transparent m-0 "
                    >
                      <div className="flex items-center justify-between space-x-4 border-zinc-200 border-b-[1px] w-full">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="py-8 px-6 my-0 ml-0 w-full mr-auto flex"
                          >
                            <h1 className="w-fit h-fit flex mr-auto">
                              <span className="mr-4">{route.icon}</span>
                              {route.name}
                            </h1>
                            {!isOpen ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="m-0 p-0 shadow-inner">
                        {reportRoutes.map((i) => {
                          return (
                            <Button
                              variant="ghost"
                              className="mx-auto flex text-xs text-muted-foreground font-extralight rounded-none border-zinc-200 border-b-[1px] w-full py-6 px-2"
                              key={i.id}
                              onClick={() =>
                                router.replace(`/admin/reports/${i.reportType}`)
                              }
                            >
                              {i.name}
                            </Button>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Button
                      className="bg-transparent py-8 px-6 m-0 w-full"
                      onClick={() => router.replace(`/admin/${route.route}`)}
                      style={{ color: "black" }}
                    >
                      <h1 className="w-fit h-fit flex mr-auto">
                        <span className="mr-4">{route.icon}</span>
                        {route.name}
                      </h1>
                    </Button>
                  )}
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

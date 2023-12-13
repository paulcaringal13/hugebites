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
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LuTicket } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BsGraphUp } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";

const MiniAdminSidebar = ({ props }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      id: 1,
      name: "Dashboard",
      icon: <MdOutlineDashboard className="text-xl mx-auto" />,
      route: "dashboard",
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
      name: "Forecast Sales",
      icon: <BsGraphUp className="text-lg mx-auto" />,
      route: "forecast",
    },
    {
      id: 9,
      name: "Refund Requests",
      icon: <AiOutlineUserSwitch className="text-xl flex mx-auto mt-3" />,
      route: "request",
    },
    {
      id: 10,
      name: "Vouchers",
      icon: <LuTicket className="text-lg font-extrabold mx-auto" />,
      route: "vouchers",
    },
    {
      id: 11,
      name: "Account",
      icon: <FiUsers className="text-lg font-extrabold mx-auto" />,
      route: "accounts",
    },
  ];

  const reportRoutes = [
    {
      id: 1,
      name: "Sales",
      reportType: "totalEarnings",
    },
    {
      id: 2,
      name: "Products",
      reportType: "products",
    },
    {
      id: 3,
      name: "Orders",
      reportType: "orders",
    },
    {
      id: 4,
      name: "Customization",
      reportType: "customization",
    },
    {
      id: 5,
      name: "Cake Type",
      reportType: "customizedCake",
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
                    <>
                      {route.name == "Reports" && (
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
                                    router.replace(
                                      `/admin/reports/${i.reportType}`
                                    )
                                  }
                                >
                                  {i.name}
                                </Button>
                              );
                            })}
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </>
                  ) : (
                    <Button
                      className="bg-transparent py-8 px-6 m-0 w-full"
                      onClick={() => router.replace(`/admin/${route.route}`)}
                      style={{ color: "black" }}
                    >
                      <h1 className="w-fit h-fit flex mr-auto text-start">
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
  );
};

export default MiniAdminSidebar;

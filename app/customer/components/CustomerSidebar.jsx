"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { RiCakeLine } from "react-icons/ri";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { LayoutDashboard, LayoutDashboardIcon, UserCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ROUTES
export const routes = [
  {
    id: 1,
    name: "Account",
    route: "customer/edit-profile",
  },
  {
    id: 2,
    name: "Menu",
    route: "customer/menu",
  },
  {
    id: 3,
    name: "Orders",
    route: "customer/orders",
  },
  {
    id: 4,
    name: "Requests",
    route: "customer/request",
  },
];

// const SidebarContext = createContext()
export default function CustomerSidebar({ children, account }) {
  const router = useRouter();

  const [expanded, setExpanded] = useState(true);
  console.log(expanded);

  const handleClick = () => {
    location.href = `www.test.com/?a=${queryA}&b=${queryB}`;
  };
  return (
    //
    <aside className={`h-full transition-all ${expanded ? "w-52" : "w-16"}`}>
      <nav className="h-full flex flex-col bg-white border-r-2 shadow-xl drop-shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center rounded-md">
          <img
            src="/images/Logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-11 h-w-11" : "w-0"
            }`}
            alt="logo"
          />
          <h1 className={`${expanded ? "font-extrabold" : "hidden"}`}>
            Huge<span className="text-primary">Bites</span>
          </h1>
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <BsChevronLeft /> : <BsChevronRight />}
          </button>
        </div>
        <ul className="flex-1 px-3 bg-white text-black pt-3">
          {/* {children} */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <li
                  className={`relative w-full items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-primary-foreground hover:text-white ${
                    expanded ? "flex flex-row" : ""
                  }`}
                  onClick={() =>
                    router.push(`/customer/menu/${account.accountId}`)
                  }
                  // ${
                  //   active
                  //     ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  //     : "hover:bg-primary-foreground "
                  // }`
                >
                  <RiCakeLine className="me-2 text-xl" />
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-11" : "hidden"
                    }`}
                  >
                    Menu
                  </span>
                </li>
              </TooltipTrigger>
              {!expanded ? (
                <TooltipContent side="right" className="ms-3 text-primary">
                  Menu
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <li
                  className={`relative items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-primary-foreground hover:text-white ${
                    expanded ? "flex " : ""
                  }`}
                  // ${
                  //   active
                  //     ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  //     : "hover:bg-primary-foreground "
                  // }`
                >
                  <LuShoppingBasket size={20} className="me-2" />{" "}
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-11" : "hidden"
                    }`}
                  >
                    Orders
                  </span>
                </li>
              </TooltipTrigger>
              {!expanded ? (
                <TooltipContent side="right" className="ms-3 text-primary">
                  Orders
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <li
                  className={`relative items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-primary-foreground hover:text-white ${
                    expanded ? "flex " : ""
                  }`}
                  // ${
                  //   active
                  //     ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  //     : "hover:bg-primary-foreground "
                  // }`
                >
                  <AiOutlineUserSwitch size={20} className="me-2" />
                  <span
                    className={`overflow-hidden transition-all ${
                      expanded ? "w-fit" : "hidden"
                    }`}
                  >
                    Requests
                  </span>
                </li>
              </TooltipTrigger>
              {!expanded ? (
                <TooltipContent side="right" className="ms-3 text-primary">
                  Requests
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
        </ul>

        {/* <div className=" flex p-3 bg-primary text-white">
          <img src="/images/Bordered.JPG" className="w-10 h-10 rounded-full" />
          <div className={`flex justify-between items-center w-52 ml-3`}>
            <div className="leading-4">
              <h4 className="font-semibold">Paul Caringal</h4>
              <span className="text-xs text-primary"></span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div> */}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  return (
    <li>
      {icon}
      <span>{text}</span>
    </li>
  );
}

{
  /* <Box
sx={{
  overflowY: "auto",
  height: "calc(100vh - 88px)",
  marginTop: "16px",
  width: "271.2px",
  position: "fixed",
  top: 72,
  bgcolor: "#EE7376",
}}
>
<List>
  {routes.map((items) => (
    <ListItem
      key={items.id}
      sx={{
        "&:hover": {
          backgroundColor: "#ea5054",
          transitionDuration: "0.8s",
          boxShadow: "3",
        },
      }}
    >
      <ListItemButton
        sx={{
          "&:hover": {
            background: "transparent",
          },
        }}
      >
        <Link
          sx={{ color: "white", textDecoration: "none" }}
          href={`/${items.route}`}
        >
          <ListItemText
            primary={items.name}
            sx={{
              "& span": {
                fontSize: "20px",
              },
            }}
          />
        </Link>
      </ListItemButton>
    </ListItem>
  ))}
</List>
</Box> */
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { RiCakeLine } from "react-icons/ri";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { LuTicket } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RxHome } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// ROUTES
export const routes = [
  {
    id: 1,
    name: "Home",
    route: "customer/home",
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
  {
    id: 5,
    name: "Vouchers",
    route: "customer/vouchers",
  },
];

export default function CustomerSidebar({ account }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const [customerId, setCustomerId] = useState(account.customerId);

  const [voucherArray, setVoucherArray] = useState([]);

  const getVouchers = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/voucher?` +
        new URLSearchParams({
          customerId: customerId,
        }),
      {
        cache: "no-store",
      }
    );
    const data = await res.json();

    setVoucherArray(data[0]);
  };

  useEffect(() => {
    setCustomerId(account.customerId);
  }, [account]);

  useEffect(() => {
    !customerId ? null : getVouchers();
  }, [customerId]);

  return (
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <li
                  className={`relative w-full items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-primary-foreground hover:text-white ${
                    expanded ? "flex flex-row" : ""
                  }`}
                  onClick={() =>
                    router.replace(`/customer/home/${account.customerId}`)
                  }
                >
                  <RxHome className="me-2 text-xl" />
                  <span
                    className={`overflow-hidden transition-all duration-0 ${
                      expanded ? "w-fit" : "hidden"
                    }`}
                  >
                    Home
                  </span>
                </li>
              </TooltipTrigger>
              {!expanded ? (
                <TooltipContent side="right" className="ms-3 text-primary">
                  Home
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <li
                  className={`relative w-full items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-primary-foreground hover:text-white ${
                    expanded ? "flex flex-row" : ""
                  }`}
                  onClick={() =>
                    router.replace(`/customer/menu/${account.customerId}`)
                  }
                >
                  <RiCakeLine className="me-2 text-xl" />
                  <span
                    className={`overflow-hidden transition-all duration-0 ${
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
                  onClick={() =>
                    router.replace(`/customer/orders/${account.customerId}`)
                  }
                >
                  <LuShoppingBasket size={20} className="me-2" />{" "}
                  <span
                    className={`overflow-hidden transition-all duration-0  ${
                      expanded ? "w-fit" : "hidden"
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
                  onClick={() =>
                    router.replace(`/customer/requests/${account.customerId}`)
                  }
                >
                  <AiOutlineUserSwitch size={20} className="me-2" />
                  <span
                    className={`overflow-hidden transition-all duration-0 text-start  ${
                      expanded ? "w-fit" : "hidden"
                    }`}
                  >
                    Refund Requests
                  </span>
                </li>
              </TooltipTrigger>
              {!expanded ? (
                <TooltipContent side="right" className="ms-3 text-primary">
                  Refund Requests
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
          <Sheet>
            <SheetTrigger asChild>
              <li
                className={`relative items-center text-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-primary-foreground hover:text-white ${
                  expanded ? "flex " : ""
                }`}
                // onClick={() =>
                //   router.replace(`/customer/orders/${account.customerId}`)
                // }
              >
                <LuTicket size={20} className="me-2" />{" "}
                <span
                  className={`overflow-hidden transition-all duration-0  ${
                    expanded ? "w-fit" : "hidden"
                  }`}
                >
                  Vouchers
                </span>
              </li>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-scroll">
              <SheetHeader>
                <SheetTitle className="text-3xl font-extrabold">
                  Your Vouchers
                </SheetTitle>
              </SheetHeader>
              {voucherArray.length == 0 ? (
                <h1 className="w-full text-center p-8">
                  No voucher available.
                </h1>
              ) : (
                <div className="flex flex-col gap-3 h-auto w-full mb-5 mt-5">
                  {voucherArray.map((i) => {
                    return (
                      <div
                        key={i.customerVoucherId}
                        className="border-[1px] border-zinc-200 flex flex-col w-full p-3 rounded-sm shadow-sm"
                      >
                        <h1 className="text-lg font-extrabold">
                          {i.voucherName}
                        </h1>
                        <Separator />
                        <h1 className="text-sm font-light indent-4 mt-2">
                          Get a {i.discount}% discount for your next order!
                        </h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </ul>
      </nav>
    </aside>
  );
}

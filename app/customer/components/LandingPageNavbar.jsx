"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import bgWaveHeader from "../../../public/images/bgWaveHeader.png";

import React from "react";

const LandingPageNavbar = () => {
  const router = useRouter();

  return (
    <nav
      className="bg-white w-screen pt-5 pb-5"
      style={{ zIndex: "50", position: "absolute" }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-black">
            <div
              className="flex flex-shrink-0 items-center cursor-pointer"
              onClick={() => router.replace("/customer")}
            >
              <img
                // className="h-15 w-auto"
                style={{ height: "100px", width: "auto" }}
                src="/images/Logo.png"
              />
            </div>
            {/* <div className="hidden sm:ml-6 sm:block md:ml-auto my-auto">
              <div className="flex space-x-4 ">
                <Button
                  href="#"
                  className="bg-transparent text-black hover:bg-primary hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Category
                </Button>
                <Button
                  href="#"
                  className="bg-transparent text-black hover:bg-primary hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Menu
                </Button>
                <Button
                  href="#"
                  className="bg-transparent text-black hover:bg-primary hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  About us
                </Button>
              </div>
            </div> */}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 bg-transparent">
              <DropdownMenu className="bg-transparent">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="bg-primary text-white hover:bg-ring hover:text-white rounded-full"
                  >
                    <FaUserAlt />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    className="hover:bg-primary-foreground"
                    onClick={() => router.push(`/customer/sign-in`)}
                  >
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="hover:bg-primary-foreground"
                    onClick={() => router.push(`/customer/sign-up`)}
                  >
                    Sign Up
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "15px",
          width: "100%",
          backgroundImage: `url('${bgWaveHeader.src}')`,
          bottom: "-9px",
          zIndex: "1",
          position: "absolute",
          backgroundColor: "transparent",
        }}
      ></div>
    </nav>
  );
};

export default LandingPageNavbar;

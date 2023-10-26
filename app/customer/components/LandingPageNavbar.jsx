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
import { FaUserAlt } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import bgWaveHeader from "../../../public/images/bgWaveHeader.png";

import React from "react";

const LandingPageNavbar = () => {
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

              {/* <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg> */}

              {/* <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> */}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-black">
            <div className="flex flex-shrink-0 items-center">
              <img
                // className="h-15 w-auto"
                style={{ height: "100px", width: "auto" }}
                src="/images/Logo.png"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block md:ml-auto my-auto">
              <div className="flex space-x-4 ">
                <Button
                  href="#"
                  className="bg-transparent text-black hover:bg-primary hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Order Now
                </Button>
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
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Button
              variant="ghost"
              className="bg-transparent text-primary hover:bg-primary hover:text-white rounded-full text-lg"
            >
              <BiCart />
            </Button>
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
                  <DropdownMenuItem className="hover:bg-primary-foreground">
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign Up</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div> */}
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

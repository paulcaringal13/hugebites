"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuShoppingBasket } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";

import { Input } from "@/components/ui/input";
import { BiSearchAlt } from "react-icons/bi";

const HomePageNavbar = () => {
  return (
    <nav className="bg-primary w-full" style={{ height: "75px" }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          {/* responsive modules */}
          {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div> 
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Calendar
                </a>
              </div>
            </div> 
          </div> */}
          {/* input search bar */}
          {/* <div className="mt-2 ms-auto me-auto w-3/6">
            <Input type="text" placeholder={`Search ${()}`} />
          </div> */}

          <div className="mt-2 ms-auto me-auto w-3/6 flex">
            <div className="input-group-prepend">
              <div
                className="input-group-text absolute mt-4 w-3/6 z-20 text-muted-foreground"
                style={{ content: "" }}
              >
                <BiSearchAlt
                  className="ml-auto text-xl mr-3"
                  style={{ content: "" }}
                />
              </div>
            </div>
            <Input
              type="text"
              placeholder="Search"
              className="relative rounded-full"
            />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mt-2">
            {/* change to cart */}
            <button
              type="button"
              className="relative rounded-full bg-primary p-3 mr-2 text-white text-xl hover:text-white hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              <IoIosNotifications />
            </button>
            <button
              type="button"
              className="relative rounded-full bg-primary p-3 text-white text-xl hover:text-white hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              <LuShoppingBasket />
            </button>

            <div className="relative ml-1 mt-1">
              <div>
                {/* change to dropdown avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="bg-transparent hover:bg-transparent border-0 hover:border-0"
                    >
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-fit me-20 mt-2"
                    side="bottom"
                  >
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile modules */}
      {/* 
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div> */}
    </nav>
  );
};

export default HomePageNavbar;

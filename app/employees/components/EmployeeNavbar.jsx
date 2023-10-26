"use client";
import * as React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { BiChevronDown } from "react-icons/bi";
import * as Avatar from "@radix-ui/react-avatar";

const EmployeeNavbar = () => {
  const router = useRouter();

  const buttonRef = useRef(null);

  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [userInitials, setUserInitials] = useState("");

  const handleLogout = async () => {
    // GET THE AUDIT ID FROM THE LOCAL STORAGE FOR FINDING THE RIGHT ROW TO EDIT
    let auditId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("auditId")
        : "";

    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeOut: dayjs().format("MMMM DD, YYYY hh:mma"),
      }),
    };

    // UPDATE THE LOGOUT COLUMN TO THE DATE AND TIME THE USER LOGGED OUT
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/audit/sign-in?` +
          new URLSearchParams({
            auditId: auditId,
          }),
        putData
      );
    } catch (error) {
      console.log(error);
    }

    // CLEAR LOCAL STORAGE
    localStorage.clear();
    // REDIRECT TO SIGN IN PAGE
    buttonRef.current.click();
  };

  useEffect(() => {
    // GET THE USER ID, FIRST AND LAST NAME.
    const userId =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("accountId")
        : "";
    const firstName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("firstName")
        : "";

    const lastName =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("lastName")
        : "";

    // SET THE STATE TO THE LOCAL STORAGE ID VALUE
    {
      userId && setLoggedInUserId(userId);
    }

    // CONCATINATE THE FIRST AND LAST NAME TO GET THE FULLNAME
    {
      firstName && lastName
        ? setLoggedInUserName(`${firstName} ${lastName}`)
        : null;
    }

    // GET THE FIRST LETTER OF THE USERS FIRST AND LAST NAME FOR AVATAR PURPOSES
    const initials = `${Array.from(firstName)[0]}${Array.from(lastName)[0]}`;

    // SET THE STATE
    {
      firstName && lastName ? setUserInitials(initials) : null;
    }
  }, []);
  return (
    <div className="w-full h-1/6 z-10 ">
      <div className="flex h-1/6 items-center bg-white border">
        <Image src="/initial-images/Logo.png" alt="bg" height={33} width={72} />
        <Label className="my-auto text-3xl ms-10">HugeBites</Label>
        <Popover>
          <PopoverTrigger className="ms-auto me-16 flex flex-row">
            <Avatar.Root className="bg-blackA3 inline-flex h-[35px] w-[35px] select-none items-center justify-center my-auto overflow-hidden rounded-full align-middle">
              <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-primary text-white text-[15px] font-medium">
                {userInitials}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col ms-2 text-sm">
              {loggedInUserName}
              <div className="flex flex-row text-sm">
                {loggedInUserId}
                <BiChevronDown className="text-lg my-auto" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-fit h-fit p-0">
            <Button
              className="my-auto bg-transparent text-black hover:bg-accent"
              // onClick={() => handleLogout()}
            >
              View Profile
            </Button>
            <Button
              className="justify-start my-auto bg-transparent text-black hover:bg-accent"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
            <a href="/employees" className="hidden" ref={buttonRef} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EmployeeNavbar;

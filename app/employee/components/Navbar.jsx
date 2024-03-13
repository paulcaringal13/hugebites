"use client";
import * as React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { BiChevronDown } from "react-icons/bi";

// COMPLETED
const CustomerNavbar = () => {
  const buttonRef = useRef();

  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [avatar, setAvatar] = useState();

  const handleLogout = async () => {
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

    localStorage.clear();
    buttonRef.current.click();
  };

  useEffect(() => {
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

    const avatar =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("avatar")
        : "";

    {
      userId && setLoggedInUserId(userId);
    }

    {
      localStorage.getItem("avatar") && setAvatar(avatar);
    }

    {
      firstName && lastName
        ? setLoggedInUserName(`${firstName} ${lastName}`)
        : null;
    }

    const initials = `${Array.from(firstName)[0]}${Array.from(lastName)[0]}`;

    {
      firstName && lastName ? setUserInitials(initials) : null;
    }
  }, []);
  return (
    <div className="w-auto h-1/6 z-10 bg-red-500">
      <div className="flex h-1/6 items-center bg-white border">
        <Image
          src="/images/Logo.png"
          alt="bg"
          height={33}
          width={72}
          className="ms-10"
        />
        <Label className="my-auto text-3xl ms-10">HugeBites</Label>
        <Popover>
          <PopoverTrigger className="ms-auto me-16 flex flex-row">
            <Avatar className="mx-auto">
              <AvatarImage src={avatar} alt="profile-picture" />
              <AvatarFallback className="bg-primary text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ms-2 text-sm">
              {loggedInUserName}
              <div className="flex flex-row text-sm">
                {loggedInUserId}
                <BiChevronDown className="text-lg my-auto" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-fit h-fit p-0">
            <Button className="my-auto bg-transparent text-black hover:bg-accent">
              View Profile
            </Button>
            <Button
              className="justify-start my-auto bg-transparent text-black hover:bg-accent"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
            <a href="/employee" className="hidden" ref={buttonRef} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomerNavbar;

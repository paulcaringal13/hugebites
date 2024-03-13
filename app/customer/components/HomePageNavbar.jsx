"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

const HomePageNavbar = ({ userId }) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [account, setAccount] = useState({});

  const getAccountInfo = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/account?` +
        new URLSearchParams({
          customerId: userId,
        }),
      {
        cache: "no-store",
      }
    );
    const results = await res.json();

    const { accountInfo } = results;
    setAccount(accountInfo);
    setAvatar(accountInfo.avatar);
  };

  useEffect(() => {
    {
      !userId ? null : getAccountInfo();
    }
  }, [userId]);

  return (
    <nav className="bg-primary w-full" style={{ height: "75px" }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
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
            <div className="relative ml-1 mt-1">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="bg-transparent hover:bg-transparent border-0 hover:border-0"
                    >
                      <Avatar>
                        {!avatar ? (
                          <AvatarImage
                            src={`/avatar/default-avatar.jpg`}
                            alt="you"
                          />
                        ) : (
                          <AvatarImage src={avatar} alt="you" />
                        )}
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-fit me-20 mt-2"
                    side="bottom"
                  >
                    <DropdownMenuItem
                      onClick={() =>
                        router.replace(
                          `/customer/edit-profile/${account.customerId}`
                        )
                      }
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.clear();

                        router.replace("/customer/sign-in");
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;

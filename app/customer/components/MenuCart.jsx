"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Item } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SmallCardImg from "../../../public/images/SmallCardImg.jpg";

const MenuCart = () => {
  const [cart, setCart] = useState([]);

  const cartArray = [
    {
      id: 1,
      name: "Bordered",
      category: "Human Cake",
      image: "/images/Bordered.JPG",
      subTotal: "300.00",
    },
    {
      id: 2,
      name: "Smudges",
      category: "Human Cake",
      image: "/images/Smudges.JPG",
      subTotal: "250.00",
    },
    {
      id: 3,
      name: "Minimalist",
      category: "Human Cake",
      image: "/images/Minimalist.JPG",
      subTotal: "625.00",
    },
  ];

  return (
    <>
      <div className="h-fit w-full ml-4">
        <Card className="w-auto h-full bg-primary-foreground/25 border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-lg">Total Spent</CardTitle>
            {/* bg-primary */}
            <Card
              className=" text-white border-0"
              style={{
                height: "160px",
                backgroundImage: `url('${SmallCardImg.src}')`,
                backgroundSize: "cover",
              }}
            >
              <CardTitle className="text-md p-4 font-bold">
                Your total spent
              </CardTitle>
              <CardContent>
                <Label className="text-4xl font-medium">₱12,070.00</Label>
              </CardContent>
            </Card>
          </CardHeader>
          <Separator className="bg-primary" />
          <CardContent>
            <div className="flex flex-row my-3 justify-between">
              <h1 className="text-ring font-bold my-auto">Your Address</h1>
              <Button
                variant="ghost"
                className="my-auto h-8 w-fit text-ring border-solid border-2 border-primary hover:bg-primary hover:text-white"
              >
                Change
              </Button>
            </div>

            <h2 className="text-stone-600 text-sm flex flex-row">
              <HiOutlineLocationMarker className="text-ring text-3xl my-auto mr-2" />
              Blk 12 Lot 19 Don Onofre Banay-Banay Cabuyao Laguna
            </h2>
            {/* <h3> Blk 12 Lot 19 Don Onofre Banay-Banay Cabuyao Laguna</h3> */}
          </CardContent>
          <Separator className="bg-primary" />
          <CardContent className="my-3 h-fit font-extrabold">
            <p className="text-lg">
              Cart <br />
            </p>

            {!cart ? (
              <div className="h-fit w-full text-center mt-3">
                <Label>Cart is empty</Label>
              </div>
            ) : (
              cartArray.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row w-full h-fit mx-2 my-2 rounded-md"
                >
                  <Image
                    src={item.image}
                    alt="bg"
                    width="60"
                    height="60"
                    className="rounded-md shadow-md drop-shadow-md mb-2"
                  />
                  <div className="ml-3 w-full">
                    <div className="text-sm font-bold mb-2  flex flex-row justify-between">
                      <h1>{item.name}</h1>
                      <span className="ml-auto text-primary">
                        ₱{item.subTotal}
                      </span>
                      <br />
                    </div>
                    <div className="text-sm font-bold mb-2  flex flex-row justify-between">
                      <h3 className="text-xs font-medium">{item.category}</h3>
                      <div className="grid grid-cols-3 h-6 w-20">
                        <button className="col-span-1 bg-transparent text-black border-solid border-primary border-2 rounded-s-md cursor-pointer hover:bg-primary hover:text-white">
                          -
                        </button>
                        <div className="h-6 col-span-1 text-xs text-center pt-1 border-solid border-y-2 border-x-0 border-primary">
                          01
                        </div>
                        <button className="col-span-1 bg-transparent text-black text-xs border-solid border-primary border-2 rounded-e-md cursor-pointer hover:bg-primary hover:text-white">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Separator className="bg-primary mt-4" />
            <div className="mt-4">
              <div className="flex flex-row justify-between text-sm">
                <h4 className="text-stone-600 font-extralight">Discount</h4>
                <span className="font-light">-5%</span>
              </div>
              <div className="flex flex-row justify-between text-md mt-6 mb-4">
                <h1 className="text-lg">Total</h1>
                <span className="font-extrabold text-2xl text-ring">
                  ₱4,350.00
                </span>
              </div>

              <Button className="w-full hover:bg-ring ">Checkout</Button>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter> */}
        </Card>
      </div>
    </>
  );
};

export default MenuCart;

"use client";
import React, { useEffect, useState } from "react";
import howToOrderImage from "../../../../public/images/howToOrderImage.svg";
import { GiMoneyStack, GiCakeSlice } from "react-icons/gi";
import { FaWalking } from "react-icons/fa";

const HowToOrder = () => {
  return (
    <div className="h-[800px] w-[95%] items-center flex flex-row">
      <div
        className="h-[800px] w-[900px] top-0 mr-5 relative"
        style={{
          backgroundImage: `url('${howToOrderImage.src}')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="w-[auto] flex flex-col gap-3 justify-center h-full">
        <h1 className="text-4xl font-extrabold text-start w-[auto] p-5 ">
          Easy Ordering Process: <br />
          How to Place Your Order
        </h1>
        <div className="flex flex-row gap-4">
          <div className="h-[95px] w-[125px] rounded-full bg-white shadow-sm">
            <GiCakeSlice className="mx-auto my-auto flex h-full w-[33px] text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold  text-lg">Choose Product</h1>
            <h1>
              Explore our selection, pick your products, and customize them to
              perfection for a uniquely tailored experience.
            </h1>
          </div>
        </div>
        <div className="w-[90px] flex flex-col gap-4">
          <div className="h-[10px] w-[10px] flex mx-auto rounded-full bg-primary"></div>
          <div className="h-[10px] w-[10px] flex mx-auto rounded-full bg-primary"></div>
          <div className="h-[10px] w-[10px] flex mx-auto rounded-full bg-primary"></div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="h-[95px] w-[125px] rounded-full bg-white shadow-sm">
            <GiMoneyStack className="mx-auto my-auto flex h-full w-[45px] text-primary" />
          </div>
          <div className="flex flex-col gap-1 ">
            <h1 className="font-bold text-lg">Place Order</h1>
            <h1>
              Place your order, await total price, and pay in-store payment or
              expedite by sharing your GCash receipt.
            </h1>
          </div>
        </div>
        <div className="w-[90px] flex flex-col gap-4">
          <div className="h-[10px] w-[10px] flex mx-auto rounded-full bg-primary"></div>
          <div className="h-[10px] w-[10px] flex mx-auto rounded-full bg-primary"></div>
          <div className="h-[10px] w-[10px] flex mx-auto rounded-full bg-primary"></div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="h-[95px] w-[125px] rounded-full bg-white shadow-sm">
            <FaWalking className="mx-auto my-auto flex h-full w-[25px] text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-lg">Pick Up</h1>
            <h1>
              Retrieve your order in-store or streamline the pickup process by
              arranging the delivery payment with your dedicated rider.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToOrder;

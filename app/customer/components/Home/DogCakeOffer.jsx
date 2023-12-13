"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import dogBday from "../../../../public/images/dogBday.svg";

const DogCakeOffer = () => {
  return (
    <div className="h-[750px] w-full mt-10">
      <div className="flex flex-row mx-auto h-full w-[90%] bg-white rounded-xl border-[1px] border-zinc-200 shadow-sm">
        <div className="h-full w-[40%] absolute">
          <h1
            className="w-[70%] h-fit flex m-auto mt-24 text-5xl font-extrabold text-start font-lilita text-slate-800"
            style={{ lineHeight: "1.5" }}
          >
            Enjoy our dog cake and delight your pup <br /> with joy at HugeBites
            where every bite is <br /> a tail wagging celebration!
          </h1>
        </div>
        <div
          className="h-[650px] w-[700px] mr-5 ml-auto relative"
          style={{
            backgroundImage: `url('${dogBday.src}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};

export default DogCakeOffer;

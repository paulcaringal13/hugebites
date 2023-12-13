"use client";
import React from "react";
import BestSellingCake from "../Home/BestSellingCake";
import HowToOrder from "../Home/HowToOrder";
import DogCakeOffer from "../Home/DogCakeOffer";

const HomePage = ({ userData }) => {
  return (
    <div className="h-fit w-full flex flex-col gap-5">
      <BestSellingCake userData={userData} />
      <DogCakeOffer />
      <HowToOrder />
      <div className="h-[100px] w-full"></div>
    </div>
  );
};

export default HomePage;

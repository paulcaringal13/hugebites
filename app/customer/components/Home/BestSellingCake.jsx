"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import bestSellerImage from "../../../../public/images/bestSellerImage.png";

// COMPLETED

const BestSellingCake = ({ userData }) => {
  const router = useRouter();
  const [bestSeller, setBestSeller] = useState([]);

  const getBestSeller = async () => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/home/bestSeller`,

      {
        cache: "no-store",
      }
    );

    const response = await addOnsRes.json();

    setBestSeller(response);
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  return (
    <div className="h-auto w-full">
      <div className="h-fit w-fit bg-ring p-2 rounded-sm mt-8 ml-5">
        <div className=" border-2 border-dashed border-white p-3 ">
          <h1 className="text-4xl font-extrabold text-white ">
            BEST SELLING CAKES
          </h1>
        </div>
      </div>
      <div className="w-full h-fit flex flex-row justify-evenly mt-5">
        {bestSeller.map((i) => {
          return (
            <div
              className="h-[450px] w-[22%] flex flex-col"
              key={i.id}
              style={{
                backgroundImage: `url('${i?.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "30px",
              }}
            >
              <div
                className="h-[145px] w-[150px] top-0 ml-auto relative"
                style={{
                  backgroundImage: `url('${bestSellerImage.src}')`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="mt-auto mb-16 flex flex-col gap-2 h-[100px] w-full">
                <h1
                  className="w-full h-fit text-center text-3xl font-extrabold text-red-600"
                  style={{ textShadow: "1px 1px 1px black" }}
                >
                  {i.productName}
                </h1>
                <h1
                  className="w-full h-fit text-center text-lg font-extrabold text-red-600"
                  style={{ textShadow: "0.5px 0.5px 0.5px black" }}
                >
                  {i.cakeTypeName}
                </h1>
                <Button
                  className={`bg-ring hover:bg-ring text-lg font-extrabold p-2 rounded-full w-[60%] mx-auto transform transition-all  hover:scale-110 hover:drop-shadow-lg duration-100`}
                  onClick={() =>
                    router.replace(
                      `/customer/menu/${userData.customerId}/product/${i.productId}`
                    )
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSellingCake;

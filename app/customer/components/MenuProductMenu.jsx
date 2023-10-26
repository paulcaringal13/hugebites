"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CategoryIconCake from "../../../public/images/CategoryIconCake.png";
import CategoryIconCupcake from "../../../public/images/CategoryIconCupcake.png";
import CategoryIconDog from "../../../public/images/CategoryIconDog.png";
import CategoryIconCustomized from "../../../public/images/CategoryIconCustomized.png";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const MenuProductMenu = ({ user, prodArray, selectProduct }) => {
  const router = useRouter();
  // const [price, setPrice] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prods = prodArray.map((i) => ({
      ...i,
      priceDisplay: i.sizes[0]?.packagingPrice || 0,
    }));
    setProducts(prods);
  }, [prodArray]);

  return (
    <>
      <div className="h-fit w-full">
        {/* <div className="h-36 flex items-center bg-transparent sticky top-0 mt-32">
          <div className="h-4 w-full flex items-center bg-transparent drop-shadow-md"> */}
        <Card className="flex flex-row w-fit justify-center gap-4 drop-shadow-md py-4 px-6 rounded-lg mx-auto">
          <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url('${CategoryIconCake.src}')`,
                backgroundSize: "cover",
              }}
            >
              <p className="w-full font-extralight text-xs text-center">Cake</p>
            </div>
          </Card>
          <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url('${CategoryIconCupcake.src}')`,
                backgroundSize: "cover",
              }}
            >
              <p className="w-full font-extralight text-xs text-center">
                Cupcake
              </p>
            </div>
          </Card>
          <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url('${CategoryIconDog.src}')`,
                backgroundSize: "cover",
              }}
            >
              <p className="w-full font-extralight text-xs text-center">
                Dog Cake
              </p>
            </div>
          </Card>
          <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url('${CategoryIconCustomized.src}')`,
                backgroundSize: "cover",
              }}
            >
              <p className="w-full font-extralight text-xs text-center">
                Customized
              </p>
            </div>
          </Card>
        </Card>
        {/* </div> */}
        {/* </div> */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-2 mt-5 h-full w-full">
          {products.map((prod) => {
            return (
              <Card
                className="col-span-1 border-stone-400 border-2"
                style={{ height: "fit", width: "270px" }}
                key={prod.productId}
              >
                <div className="h-fit overflow-hidden w-full">
                  <div
                    className="h-64 w-full rounded-t-lg"
                    // Bordered.src
                    style={{
                      backgroundImage: `url('${prod.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <CardContent className="p-3">
                  <div className="flex flex-row gap-2">
                    <Badge
                      variant="outline"
                      className="text-black bg-white mb-1"
                    >
                      {prod.categoryName}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-black bg-white mb-1"
                    >
                      {prod.isSpecial ? "Special Cake" : "Common Cake"}
                    </Badge>
                  </div>

                  <h1 className="font-bold text-lg mb-1">{prod.productName}</h1>
                  <div className="flex flex-row gap-2">
                    <p className="text-xs font-extralight text-muted-foreground my-auto">
                      Sizes:
                    </p>
                    {prod.sizes.map((i, index) => {
                      return (
                        <TooltipProvider key={i.packagingId}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-7 w-7 border-2 p-1 cursor-pointer rounded-full text-xs text-center active:bg-primary focus:outline-none focus:border-rose-400 focus:bg-rose-400 focus:text-white"
                                onClick={() => {
                                  setProducts((prev) => {
                                    // find index of product sa array
                                    const idx = prev.findIndex(
                                      (j) => j.productId === prod.productId
                                    );

                                    const newProds = [...prev];
                                    newProds[idx] = {
                                      ...newProds[idx],
                                      priceDisplay: i.packagingPrice,
                                    };

                                    return newProds;
                                  });
                                }}
                              >
                                {Array.from(`${i.size}`)[0]}
                                {Array.from(`${i.size}`)[1]}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{i.size}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-ring text-2xl font-extrabold my-2">
                      {/* ₱{prod.sizes[0]?.packagingPrice}.00 */}
                      {`₱${prod.priceDisplay}.00`}
                    </h1>
                    <Button
                      className="bg-ring pb-2 hover:bg-primary h-8 w-9 my-auto text-center active:bg-primary-foreground"
                      onClick={() => selectProduct(prod)}
                    >
                      +
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuProductMenu;

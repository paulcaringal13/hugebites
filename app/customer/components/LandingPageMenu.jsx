"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import CategoryIconCake from "../../../public/images/categories/CategoryIconCake.png";
import CategoryIconCupcake from "../../../public/images/categories/CategoryIconCupcake.png";
import CategoryIconDog from "../../../public/images/categories/CategoryIconDog.png";
import CategoryIconAll from "../../../public/images/categories/CategoryIconAll.png";

import MenuCart from "../components/MenuCart";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const LandingPageMenu = ({ prodArray, categoryArray }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const router = useRouter();
  const pathname = usePathname();
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prods = prodArray.map((i) => {
      const sizesCost = i.sizes.map((size) => Number(size.packagingPrice));

      const min = Math.min(...sizesCost);
      const max = Math.max(...sizesCost);

      return {
        ...i,
        priceDisplay: i.sizes[0]?.packagingPrice || 0,
        minPrice: min,
        maxPrice: max,
      };
    });
    // FOR ALL PRODUCTS
    setProductList(prods);
    setProducts(prods);
  }, [prodArray]);

  return (
    <>
      <div className="w-full my-8" style={{ height: "full" }}>
        <div className="h-fit w-full">
          <div className="h-fit">
            {products.length == 0 ? (
              <div className="h-[500px] w-full mt-5 text-center">
                <h1 className="font-extrabold text-2xl text-muted-foreground">
                  No Available Products in this Category.
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-x-1 gap-y-2 mt-5 h-full w-full">
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

                        <h1 className="font-bold text-lg mb-1">
                          {prod.productName}
                        </h1>
                        <div className="flex flex-row gap-2">
                          <p className="text-xs font-extralight text-muted-foreground my-auto">
                            Sizes:
                          </p>
                          {prod.sizes?.map((i, index) => {
                            return (
                              <TooltipProvider key={i.packagingId}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      className="h-7 w-7 border-2 p-1 rounded-full text-xs text-center active:bg-primary hover:outline-none hover:border-rose-400 hover:bg-rose-400 hover:text-white"
                                      // update price pag nag cliclick
                                      // onClick={() => {
                                      // setProducts((prev) => {
                                      //   // find index of product sa array
                                      //   const idx = prev.findIndex(
                                      //     (j) => j.productId === prod.productId
                                      //   );
                                      //   const newProds = [...prev];
                                      //   newProds[idx] = {
                                      //     ...newProds[idx],
                                      //     priceDisplay: i.packagingPrice,
                                      //   };
                                      //   return newProds;
                                      // });
                                      // }}
                                    >
                                      {Array.from(`${i.size}`)[0]}
                                      {Array.from(`${i.size}`)[1]}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-primary">{i.size}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        </div>
                        <div className="flex flex-row justify-between">
                          <h1 className="text-ring text-lg font-extrabold my-2">
                            {`${formatter.format(
                              prod.minPrice
                            )} ~ ${formatter.format(prod.maxPrice)}`}
                          </h1>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageMenu;

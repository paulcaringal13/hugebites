"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import CategoryIconCake from "../../../public/images/categories/CategoryIconCake.png";
import CategoryIconCupcake from "../../../public/images/categories/CategoryIconCupcake.png";
import CategoryIconDog from "../../../public/images/categories/CategoryIconDog.png";
import CategoryIconCustomized from "../../../public/images/categories/CategoryIconCustomized.png";
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
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import lodash from "lodash";

const MenuProductMenu = ({ prodArray, categoryArray }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);

  const [pageSize, setPageSize] = useState(9);

  const pagesCount = Math.ceil(products.length / pageSize);
  const pages = lodash.range(1, pagesCount + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return lodash(products).slice(startIndex).take(pageSize).value();
  };

  const paginatedList = paginate();

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
    setProductList(prods);
    setProducts(prods);
  }, [prodArray]);
  return (
    <>
      <div className="w-full h-fit my-8">
        <div
          className="h-80 w-11/12 mx-auto bg-black mb-6 shadow-md"
          style={{
            backgroundImage: `url('/images/landscapeImage.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
          }}
        ></div>
        <div className="h-fit w-full">
          <Card
            className={`flex flex-row justify-center gap-4 drop-shadow-md py-4 px-6 rounded-lg mx-auto ${
              categoryArray.length > 4 ? "overflow-x-scroll w-full" : "w-fit"
            }`}
          >
            <button
              onClick={() => {
                setProducts(productList);
              }}
            >
              <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundImage: `url('/images/categories/CategoryIconAll.png')`,
                    backgroundSize: "cover",
                  }}
                >
                  <p className="w-full font-extralight text-xs text-center">
                    All Cakes
                  </p>
                </div>
              </Card>
            </button>
            {categoryArray.map((ctg) => {
              return (
                <button
                  key={ctg.categoryId}
                  onClick={() => {
                    const listOfCakes = productList.filter(
                      (i) => i.categoryName === ctg.categoryName
                    );

                    setProducts(listOfCakes);
                  }}
                >
                  <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundImage: `url('${ctg.categoryImage}')`,
                        backgroundSize: "cover",
                      }}
                    >
                      <p className="w-full font-extralight text-xs text-center">
                        {ctg.categoryName}
                      </p>
                    </div>
                  </Card>
                </button>
              );
            })}
            {/* <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
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
            </Card> */}
          </Card>

          <div className="h-fit">
            {products.length == 0 ? (
              <div className="h-[500px] w-full mt-5 text-center">
                <h1 className="font-extrabold text-2xl text-muted-foreground">
                  No Available Products in this Category.
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-x-2 gap-y-2 mt-5 h-full w-full">
                {paginatedList.map((prod) => {
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
                            {`₱${prod.minPrice}.00 ~ ₱${prod.maxPrice}.00`}
                          </h1>
                          <Button
                            className="bg-ring pb-2 hover:bg-primary h-8 w-9 my-auto text-center active:bg-primary-foreground"
                            onClick={() =>
                              router.push(
                                `${pathname}/product/${prod.productId}`
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
          <div className="w-fit mx-auto flex my-4">
            {pagesCount === 1 ? null : (
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm h-14 w-9"
                aria-label="Pagination"
              >
                {pages.map((page) => (
                  <a
                    href="#"
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center hover:text-text-decoration-none  border-zinc-200 border-[1px] px-4 py-2 text-sm font-semibold  ${
                      currentPage === page
                        ? "bg-ring text-white "
                        : " bg-transparent text-black"
                    }`}
                    key={page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuProductMenu;

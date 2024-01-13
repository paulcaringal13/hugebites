"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import lodash from "lodash";
import { RiContactsBookLine } from "react-icons/ri";

const MenuProductMenu = ({ prodArray, categoryArray }) => {
  const router = useRouter();
  const pathname = usePathname();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [prods, setProds] = useState([]);

  const [pageSize, setPageSize] = useState(9);

  // const [averageRating, setAverageRating] = useState(2.77);

  const getCustomerFeedback = async () => {
    const feedbackRes = await fetch(`http://localhost:3000/api/feedback/all`, {
      cache: "no-store",
    });

    const products = await feedbackRes.json();

    setProducts(products);
  };

  const pagesCount = Math.ceil(products.length / pageSize);
  const pages = lodash.range(1, pagesCount + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginate = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return lodash(prods).slice(startIndex).take(pageSize).value();
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

    const x = prods.map((i) => {
      const averageRating = products.filter((j) => j.productId == i.productId);

      const avg = averageRating[0].averageRating;
      return {
        ...i,
        averageRating: avg,
      };
    });

    setProductList(x);
    setProds(x);
  }, [products]);

  useEffect(() => {
    getCustomerFeedback();
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
              <p className="w-full font-extralight text-xs text-center">
                All Cakes
              </p>
              <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundImage: `url('/images/categories/CategoryIconAll.png')`,
                    backgroundSize: "cover",
                  }}
                ></div>
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
                  <p className="w-full font-extralight text-xs text-center">
                    {ctg.categoryName}
                  </p>
                  <Card className="w-fit h-fit p-1 border-accent border-2 cursor-pointer transform transition-all hover:scale-110 duration-700">
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundImage: `url('${ctg.categoryImage}')`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </Card>
                </button>
              );
            })}
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
                <h1
                  className="col-span-3 text-5xl text-primary w-fit text-center mx-auto flex"
                  style={{ fontWeight: "950" }}
                >
                  Cake Designs
                </h1>
                <h1
                  className="col-span-3 text-md mt-1 mb-4 w-[60%] mx-auto flex text-center "
                  style={{ fontWeight: "600" }}
                >
                  OUR REGULAR OFFER PLUS VARIOUS COMBINATIONS. DON&apos;T WAIT,
                  CHOOSE YOUR HUGE BITES NOW!
                </h1>
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
                            variant="outl`ine"
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
                        {/* <div className="flex flex-row gap-2 mb-2"> */}
                        <div className="flex items-center">
                          <svg
                            className={`w-4 h-4 ${
                              prod.averageRating >= 1
                                ? "text-primary"
                                : "text-gray-300"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className={`w-4 h-4 ${
                              prod.averageRating >= 2
                                ? "text-primary"
                                : "text-gray-300"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className={`w-4 h-4 ${
                              prod.averageRating >= 3
                                ? "text-primary"
                                : "text-gray-300"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className={`w-4 h-4 ${
                              prod.averageRating >= 4
                                ? "text-primary"
                                : "text-gray-300"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className={`w-4 h-4 ${
                              prod.averageRating >= 5
                                ? "text-primary"
                                : "text-gray-300"
                            } me-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                            {prod.averageRating}
                          </p>
                          {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                          <a className="text-sm font-medium my-auto text-gray-900 underline hover:no-underline dark:text-white">
                            73 reviews
                          </a> */}
                        </div>

                        <div className="flex flex-row gap-2">
                          <p className="text-xs font-extralight text-muted-foreground my-auto">
                            Sizes:
                          </p>
                          {prod.sizes?.map((i, index) => {
                            return (
                              <TooltipProvider key={i.packagingId}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="h-7 w-7 border-2 p-1 rounded-full text-xs text-center active:bg-primary hover:outline-none hover:border-rose-400 hover:bg-rose-400 hover:text-white">
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

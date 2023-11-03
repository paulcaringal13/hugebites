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

const LandingPageOrderSection = ({ prodArray, categoryArray }) => {
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

  return <div className="h-full w-full bg-red-500"></div>;
};

export default LandingPageOrderSection;

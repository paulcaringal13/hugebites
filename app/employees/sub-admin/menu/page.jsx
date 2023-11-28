"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../../../admin/components/MiniAdminSidebar";
import MenuTableTabs from "../../../admin/components/MenuTableTabs";

const SubAdminMenu = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const getAllProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/sub-admin/menu/product`);

    const data = await res.json();

    const { results } = data;

    const products = results[0];

    setProductList(products);
  };

  const getAllCategories = async () => {
    const res = await fetch(
      `http://localhost:3000/api/sub-admin/menu/categories`
    );

    const data = await res.json();

    const { results } = data;

    const categories = results[0];

    const ctg = categories.map((category) => {
      let cakeType;
      {
        category.isSpecial == 0
          ? (cakeType = "Common Cake")
          : (cakeType = "Special Cake");
      }
      return { ...category, cakeType };
    });

    setCategoryList(ctg);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <MenuTableTabs productList={productList} categoryList={categoryList} />
    </div>
  );
};

export default SubAdminMenu;

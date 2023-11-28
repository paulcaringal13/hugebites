"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import MenuTableTabs from "../components/MenuTableTabs";

// ALL GOODS

const AdminMenu = () => {
  const [productList, setProductList] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [cakeTypes, setCakeTypes] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [sizesData, setSizesData] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [flavorsData, setFlavorsData] = useState([]);
  const [shapesData, setShapesData] = useState([]);

  // GET ALL PRODUCTS DETAILS
  const getAllProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/product`);

    const data = await res.json();

    const { results } = data;

    results[0].forEach((i) => {
      !i.cakeTypeId ? (i.cakeTypeName = "Customized Cake") : null;
      return { ...i };
    });

    setProducts(results[0]);
  };

  // GET ALL CAKE TYPES FOR SELECTION
  const getCakeTypes = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/cakeType`);

    const data = await res.json();

    setCakeTypes(data[0]);
  };

  // GET ALL DEFAULT/OFFERED/FIXED PRODUCTS
  const getDefaultProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/default-products`);

    const data = await res.json();
    setDefaultProducts(data);
  };

  // GET ALL CATEGORIES
  const getAllCategories = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/categories`);

    const data = await res.json();

    const { results } = data;

    const categories = results[0];

    setCategoryList(categories);
  };

  // COMBINE DEFAULT PRODUCTS TO WHICH PRODUCT IT BELONGS
  const handleDefaultProducts = () => {
    const finalProdList = products.map((i) => {
      const { productId } = i;

      const prodDefaultProducts = defaultProducts.filter(
        (j) => j.productId == productId
      );

      return { ...i, prodDefaultProducts };
    });

    setProductList(finalProdList);
  };

  const getFlavor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flavor`, {
      cache: "no-store",
    });

    const flavors = await res.json();

    setFlavorsData(flavors);
  };

  const getShape = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/shape`, {
      cache: "no-store",
    });

    const shape = await res.json();

    setShapesData(shape);
  };

  const getColor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/color`, {
      cache: "no-store",
    });

    const color = await res.json();

    setColorsData(color);
  };

  const getSizes = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customization/packaging`,
      {
        cache: "no-store",
      }
    );

    const sizes = await res.json();

    setSizesData(sizes);
  };

  useEffect(() => {
    getDefaultProducts();
    getAllProducts();
    getAllCategories();
    getCakeTypes();
    getSizes();
    getColor();
    getShape();
    getFlavor();
  }, []);

  useEffect(() => {
    {
      products && defaultProducts ? handleDefaultProducts() : null;
    }
  }, [products, defaultProducts]);

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <MenuTableTabs
        productList={productList}
        categoryList={categoryList}
        cakeTypes={cakeTypes}
        defaultProducts={defaultProducts}
        flavors={flavorsData}
        colors={colorsData}
        shapes={shapesData}
        sizes={sizesData}
      />
    </div>
  );
};

export default AdminMenu;

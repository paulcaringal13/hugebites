"use client";
import { useState, useEffect } from "react";
import MiniAdminSidebar from "../components/MiniAdminSidebar";
import CustomizationTableTabs from "../components/pages/Customization/CustomizationTableTabs";

const AdminCustomization = () => {
  const [sizesData, setSizesData] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [flavorsData, setFlavorsData] = useState([]);
  const [addOnsData, setAddOnsData] = useState([]);
  const [shapesData, setShapesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // HINDI FILTERED YUNG DATA (FOR SIZE ADD AND UPDATE PURPOSES)
  const getProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customization/packaging/product`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const products = data.filter((i) => i.productName != "Customized");

    console.log(products);

    setProductsData(products);
  };

  const getAllCategories = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/menu/categories`);

    const data = await res.json();

    const { results } = data;

    const categories = results[0];

    setCategoryList(categories);
  };

  const getFlavor = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/flavor`, {
      cache: "no-store",
    });

    const flavors = await res.json();

    setFlavorsData(flavors);
  };

  const getAddOns = async () => {
    const res = await fetch(`http://localhost:3000/api/customization/addOns`, {
      cache: "no-store",
    });

    const addOns = await res.json();

    setAddOnsData(addOns);
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
    getProducts();
    getSizes();
    getShape();
    getFlavor();
    getColor();
    getAddOns();
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <MiniAdminSidebar />
      </div>
      <CustomizationTableTabs
        sizesData={sizesData}
        shapesData={shapesData}
        colorsData={colorsData}
        flavorsData={flavorsData}
        addOnsData={addOnsData}
        productsData={productsData}
        categoryList={categoryList}
      />
    </div>
  );
};

export default AdminCustomization;

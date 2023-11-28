"use client";
import { useState, useEffect } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import MenuModule from "../../components/MenuModule";

export default function Menu(path) {
  const { params } = path;
  const { userId } = params;

  const [userData, setUserData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [prodArray, setProdArray] = useState([]);
  const [addOnsArray, setAddOnsArray] = useState([]);
  // DEFAULT PRODUCTS WITH OWN SIZE
  const [offeredProducts, setOfferedProducts] = useState([]);

  // FOR CUSTOMIZING. OFFERED SIZES
  const [packagingSizes, setPackagingSizes] = useState([]);
  // OFFERED FLAVORS
  const [flavors, setFlavors] = useState([]);
  // OFFERED COLORS
  const [colors, setColors] = useState([]);
  // OFFERED SHAPES
  const [shapes, setShapes] = useState([]);

  // GET ALL USER DATA NEEDED
  async function getUserData() {
    const res = await fetch(
      `http://localhost:3000/api/customer/home?` +
        new URLSearchParams({
          accountId: userId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    setUserData(data);
  }

  // GET ALL CATEGORIES
  async function getAllCategories() {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/categories`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setCategoriesData(data);
  }

  // GET ALL PRODUCTS AND FIND WHO IS REMOVED FROM THE MENU
  const getAllProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/products`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const availableProducts = data.filter((prod) => prod.isRemoved != 1);

    setProductsData(availableProducts);
  };

  // GET ALL FLAVORS
  // const getFlavor = async () => {
  //   const res = await fetch(`http://localhost:3000/api/customization/flavor`, {
  //     cache: "no-store",
  //   });

  //   const flavors = await res.json();

  //   setFlavors(flavors);
  // };

  // // GET ALL ADD ONS
  // const getAddOns = async () => {
  //   const res = await fetch(`http://localhost:3000/api/customization/addOns`, {
  //     cache: "no-store",
  //   });

  //   const addOns = await res.json();

  //   setAddOnsArray(addOns);
  // };

  // // GET ALL SHAPES
  // const getShape = async () => {
  //   const res = await fetch(`http://localhost:3000/api/customization/shape`, {
  //     cache: "no-store",
  //   });

  //   const shape = await res.json();

  //   setShapes(shape);
  // };

  // const getColor = async () => {
  //   const res = await fetch(`http://localhost:3000/api/customization/color`, {
  //     cache: "no-store",
  //   });

  //   const color = await res.json();

  //   setColors(color);
  // };

  // GET ALL SIZES TO OFFER ON CUSTOMIZED PROD
  const getSizes = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/packaging`,
      {
        cache: "no-store",
      }
    );

    const sizes = await res.json();

    setPackagingSizes(sizes);
  };

  // GET DEFAULT PRODUCTS
  const getSpecificProductOffers = async () => {
    const res = await fetch(`http://localhost:3000/api/default-products`, {
      cache: "no-store",
    });
    const data = await res.json();

    const availableOfferedProducts = data.filter(
      (prod) => prod.isDefaultProductRemoved != 1
    );

    setOfferedProducts(availableOfferedProducts);
  };

  // HANDLE AND COMBINE GET DATAS
  const handleProducts = () => {
    // GET CATEGORIES THAT ARE NOT REMOVED FROM THE MENU
    const availableCategories = categoriesData.filter((i) => i.isRemoved == 0);

    // GET PRODUCTS THAT ARE HAVE CATEGORY THAT IS AVAILABLE ON THE MENU
    const productsWithAvailableCategories = productsData.filter((prod) => {
      const { categoryId } = prod;

      const isProductCategoryNotRemoved = availableCategories.find(
        (ctg) => ctg.categoryId == categoryId
      );

      return isProductCategoryNotRemoved;
    });

    // GET OFFERED PRODUCTS WITH SIZES. PRODUCTS WITHOUT SIZES ARE NOT OFFERED ON THE MENU
    const productsWithSizes = productsWithAvailableCategories.map((prod) => {
      const { productId } = prod;

      const sizes = offeredProducts.filter(
        (size) => productId === size.productId
      );

      return { ...prod, sizes };
    });

    const prods = productsWithSizes.filter((prod) => prod.sizes.length != 0);

    setProdArray(prods);
  };

  useEffect(() => {
    getUserData();
    getAllCategories();
    // getAddOns();
    getAllProducts();
    getSizes();
    // getFlavor();
    // getColor();
    // getShape();
    getSpecificProductOffers();
  }, []);

  useEffect(() => {
    handleProducts();
  }, [productsData, categoriesData, offeredProducts]);

  return (
    <main className="Home flex flex-row h-fit w-full">
      <div className="">
        <CustomerSidebar account={userData} />
      </div>
      <div style={{ height: "auto", width: "100%" }}>
        <MenuModule
          categoryArray={categoriesData}
          prodArray={prodArray}
          user={userData}
          addOnsArray={addOnsArray}
          sizes={packagingSizes}
          flavors={flavors}
          colors={colors}
          shapes={shapes}
        />
      </div>
    </main>
  );
}

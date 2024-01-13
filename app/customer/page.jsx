"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import homebg from "../../public/images/homebg.png";
import shape from "../../public/images/shape.png";
import customizeCakeBg from "../../public/images/customizeCakeBg.jpg";
import { Button } from "@/components/ui/button";
import LandingPageNavbar from "./components/LandingPageNavbar";
import Footer from "./components/Footer";
import LandingPageMenu from "./components/LandingPageMenu";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  // PRODUCTS
  const [productsData, setProductsData] = useState([]);
  // CATEGORIES
  const [categoriesData, setCategoriesData] = useState([]);
  // SIZES / PACKAGING
  const [packagingSizes, setPackagingSizes] = useState([]);

  // FINAL PRODUCTS ARRAY
  const [prodArray, setProdArray] = useState([]);

  const getAllProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/product/landingPageProducts`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const availableProducts = data.filter((prod) => prod.isRemoved != 1);

    setProductsData(availableProducts);
  };

  const getAllCategories = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/menu/categories`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setCategoriesData(data);
  };

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

  const handleProducts = () => {
    const availableCategories = categoriesData.filter((i) => i.isRemoved == 0);

    const productsWithAvailableCategories = productsData.filter((prod) => {
      const { categoryId } = prod;

      const isProductCategoryNotRemoved = availableCategories.find(
        (ctg) => ctg.categoryId == categoryId
      );

      return isProductCategoryNotRemoved;
    });

    const productsWithSizes = productsWithAvailableCategories.map((prod) => {
      const { productId } = prod;

      const sizes = packagingSizes.filter(
        (size) => productId === size.productId
      );

      return { ...prod, sizes };
    });

    const prods = productsWithSizes.filter((prod) => prod.sizes.length != 0);

    setProdArray(prods);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getSizes();
  }, []);

  useEffect(() => {
    handleProducts();
  }, [productsData, categoriesData, packagingSizes]);

  return (
    <>
      <section id="hero">
        <div
          style={{
            position: "absolute",
            zIndex: "100",
          }}
        >
          <LandingPageNavbar />
        </div>

        <div
          style={{
            minHeight: "120vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundSize: "cover",
            backgroundImage: `url('${homebg.src}')`,
            backgroundPosition: "top center",
            position: "relative",
          }}
        >
          <div
            style={{
              content: "",
              height: "348px",
              width: "100vw",
              backgroundImage: `url('${shape.src}')`,
              top: "auto",
              left: "0",
              bottom: "0",
              position: "absolute",
            }}
          ></div>
        </div>
      </section>

      <section
        id="productsOffered"
        className="flex flex-row pt-20 bg-accent"
        style={{
          height: "auto",
          width: "100vw",
          paddingBottom: "80px",
          alignItems: "center",
        }}
      >
        <div className="h-fit w-full mx-20 border-solid border-2 border-stone-600 rounded-lg p-8 bg-accent">
          <div className="h-fit w-fit bg-primary p-2 rounded-sm">
            <div className=" border-2 border-dashed border-white p-7 ">
              <h1 className="text-5xl font-extrabold text-white">
                PRODUCTS WE OFFER
              </h1>
            </div>
          </div>
          <LandingPageMenu
            prodArray={prodArray}
            categoryArray={categoriesData}
          />
          <Button
            variant="ghost"
            className="p-6 text-4xl font-extrabold hover:bg-ring hover:text-white ml-auto flex mr-5"
            onClick={() => router.push(`/customer/sign-in`)}
          >
            See more...
          </Button>
        </div>
      </section>

      <section
        id="customize"
        className="text-center drop-shadow-xl"
        style={{
          height: "80vh",
          width: "100vw",
          backgroundImage: `url('${customizeCakeBg.src}')`,
          backgroundSize: "cover",
        }}
      >
        <div className="h-full w-3/6 mx-auto" style={{ position: "relative" }}>
          <div
            className="w-full h-4/6 rounded-3xl"
            style={{
              content: "",
              backgroundColor: "rgb(255,255,255,0.7)",
              position: "absolute",
              marginTop: "10%",
              top: "0",
              left: "0",
            }}
          >
            <div style={{ marginTop: "10%" }} className="flex flex-col">
              <Button
                className="mb-5 font-medium text-2xl hover:bg-ring w-5/12 h-16 mx-auto duration-500"
                onClick={() => router.push("/customer/sign-up")}
              >
                CREATE ACCOUNT
              </Button>
              <h1 className="font-bold text-md p-3 ps-2 pe-2 rounded-lg w-3/6 mx-auto mb-3">
                AND
              </h1>
              <h1 className="font-light text-4xl p-3 ps-2 pe-2 rounded-lg w-3/6 mx-auto mb-5 font-gluten ">
                CUSTOMIZE YOUR OWN CAKE
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section
        id="aboutUs"
        className=" flex flex-row bg-accent"
        style={{
          height: "100vh",
          width: "100vw",
          paddingTop: "25px",
          paddingBottom: "25px",
          alignItems: "center",
        }}
      >
        <div
          className="shadow-sm drop-shadow-lg"
          style={{
            width: "50%",
            marginLeft: "70px",
            backgroundColor: "white",
            paddingLeft: "70px",
            paddingRight: "70px",
            paddingTop: "50px",
            paddingBottom: "50px",
            borderRadius: "15px",
          }}
        >
          <h1 className="font-extrabold text-6xl text-primary relative">
            Huge <span className="text-black">Bites</span>
          </h1>
          <br />
          <h3 className=" text-sm font-bold text-justify">
            Huge Bites is a cake business founded by a passionate and talented
            Espallardo Family who has been creating delicious desserts over the
            years. It was established in the year 2015 with a simple but
            essential goal for any small cake business, which is to offer
            delicious and high-quality cakes that customers will love.
          </h3>
          <br />
          <div className="flex flex-row w-full">
            <Image
              className="rounded-full border-2 border-solid border-black mr-6 transform transition-all hover:scale-105 duration-700"
              src="/images/founder.jpg"
              alt="bg"
              width={180}
              height={200}
            />
            <h1 className="font-bold text-3xl text-black my-auto">
              Gwyneth Ann Espallardo <br />
              <span className="text-xl font-medium italic text-stone-500">
                FOUNDER OF HUGEBITES
              </span>
            </h1>
          </div>
        </div>
        <div style={{ width: "45%", height: "95%", position: "relative" }}>
          <Image
            src="/images/aboutUs.svg"
            alt="bg"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </section>
    </>
  );
};

export default Page;

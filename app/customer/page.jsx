import Image from "next/image";
import React from "react";
import homebg from "../../public/images/homebg.png";
import shape from "../../public/images/shape.png";
import Bordered from "../../public/images/Bordered.JPG";
import Smudges from "../../public/images/Smudges.JPG";
import Minimalist from "../../public/images/Minimalist.JPG";
import Gradient from "../../public/images/Gradient.JPG";
import Floral_Patterned from "../../public/images/Floral_Patterned.JPG";
import customizeCakeBg from "../../public/images/customizeCakeBg.jpg";
import { Button } from "@/components/ui/button";
import LandingPageNavbar from "./components/LandingPageNavbar";
import Footer from "./components/Footer";
import {
  getFlavor,
  getColor,
  getShape,
  getAddOns,
  getSizes,
} from "../customer/utils/getCustomization";
import {
  getAllProducts,
  getAllCategories,
} from "../customer/utils/getAllProductsDetails";
import LandingPageMenu from "./components/LandingPageMenu";

// RETURN ALL DATAS IN THE DATABASE

// PRODUCTS
const productsData = await getAllProducts();

// CATEGORIES
const categoriesData = await getAllCategories();

// SIZES / PACKAGING
const packagingSizes = await getSizes();

// ADD ONS (DRAGEES) AND (FLOWERS)
const addOnsArray = await getAddOns();

// FLAVORS
const flavors = await getFlavor();

// COLORS
const colors = await getColor();
// SHAPES
const shapes = await getShape();

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

    const sizes = packagingSizes.filter((size) => productId === size.productId);

    return { ...prod, sizes };
  });

  const prods = productsWithSizes.filter((prod) => prod.sizes.length != 0);

  return prods;
};
// COMBINE CATEGORIES AND PRODUCT
const prodArray = await handleProducts();
console.log(prodArray);

const page = () => {
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
          {/* <div
            style={{
              content: "",
              position: "absolute",
              left: "0",
              top: "0",
              height: " 100%",
              width: "100%",
              backgroundColor: " black",
              opacity: "0.7",
            }}
          >
            <h1 className="text-white">asdasd</h1>
          </div> */}
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
        id="directOrder"
        className="mx-20 flex flex-row"
        style={{
          height: "100vh",
          width: "100vw",
          paddingTop: "25px",
          paddingBottom: "25px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "55%", height: "95%", position: "relative" }}>
          <Image
            src="/images/directOrderImage.svg"
            alt="bg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="grid grid-cols-3 gap-y-8" style={{ width: "30%" }}>
          <h1 className="font-extrabold text-5xl col-span-3 text-primary">
            Order <span className="text-black">Now</span>
          </h1>
          <h3 className="col-span-3 text-xl font-bold">
            Unlock the Ultimate Experience Place Your Order Now and Satisfy your
            cravings!
          </h3>
          <Button className="hover:bg-ring duration-500 w-auto col-span-3">
            View Menu
          </Button>
        </div>
      </section>

      <section
        id="productCategories"
        className="flex flex-col bg-primary drop-shadow-md shadow-2xl"
        style={{
          width: "100vw",
          paddingTop: "40px",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          // backgroundImage: `url('${homebg.src}')`,
          // backgroundSize: "cover",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>PRODUCT CATEGORY</h1>
        <div
          className="flex flex-row"
          style={{
            width: "100vw",
            paddingTop: "30px",
            paddingBottom: "40px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="bg-transparent"
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "solid white 2px",
                borderRadius: "9999px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "22px",
              }}
            >
              <Image
                src="/images/categoryCake.svg"
                alt="bg"
                width={100}
                height={100}
              />
            </div>
            <h1 className="font-extrabold italic mb-3 mt-1"> Human Cake </h1>
            <h4 className="font-extralight text-xs ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis laudantium, recusandae ad nobis pariatur autem culpa
              vel, repellat dolor quisquam dolorem, sapiente error minus
              assumenda?
            </h4>
            <Button
              className="hover:bg-white hover:text-primary hover:font-bold mt-5"
              style={{ border: "solid white 2px", borderRadius: "50px" }}
            >
              View Category
            </Button>
          </div>
          <div
            className="bg-transparent"
            style={{
              width: "25%",
              textAlign: "center",
              color: "white",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "solid white 2px",
                borderRadius: "9999px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "22px",
              }}
            >
              <Image
                src="/images/dogCakeImage.svg"
                alt="bg"
                width={100}
                height={100}
              />
            </div>
            <h1 className="font-extrabold italic mb-3 mt-1"> Dog Cake </h1>
            <h4 className="font-extralight text-xs ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis laudantium, recusandae ad nobis pariatur autem culpa
              vel, repellat dolor quisquam dolorem, sapiente error minus
              assumenda?
            </h4>
            <Button
              className="hover:bg-white hover:text-primary hover:font-bold mt-5"
              style={{ border: "solid white 2px", borderRadius: "50px" }}
            >
              View Category
            </Button>
          </div>
          <div
            className="bg-transparent"
            style={{
              width: "25%",
              textAlign: "center",
              color: "white",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "solid white 2px",
                borderRadius: "9999px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "22px",
              }}
            >
              <Image
                src="/images/cupcakeCategoryIcon.svg"
                alt="bg"
                width={90}
                height={90}
              />
            </div>
            <h1 className="font-extrabold italic mb-3 mt-1"> Cupcake </h1>
            <h4 className="font-extralight text-xs ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis laudantium, recusandae ad nobis pariatur autem culpa
              vel, repellat dolor quisquam dolorem, sapiente error minus
              assumenda?
            </h4>
            <Button
              className="hover:bg-white hover:text-primary hover:font-bold mt-5"
              style={{ border: "solid white 2px", borderRadius: "50px" }}
            >
              View Category
            </Button>
          </div>
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
          {/* <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-10">
            {prodArray.map((product) => {
              <div className="bg-white h-fit w-5/6 shadow-md rounded-lg ">
                <div className="h-fit overflow-hidden">
                  <div
                    className="flex flex-col h-64 w-full rounded-t-lg transform transition-all hover:scale-110 duration-700"
                    style={{
                      backgroundImage: `url('${product.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      cursor: "pointer",
                    }}
                  ></div>
                </div>

                <div className="text-center w-full p-5 relative">
                  <div
                    className="absolute inline-block w-fit p-5 border-2 bg-white rounded-full text-center font-serif text-lg"
                    style={{
                      top: "-35px",
                      zIndex: "2",
                      transform: "transLateX(-50%)",
                    }}
                  >
                    <h1>₱350.00</h1>
                  </div>
                  <h1 className="mt-6 font-semilight text-xl">Gradient</h1>
                  <Button
                    className="mb-2 mt-3 shadow-md hover:bg-ring"
                    style={{ borderRadius: "8px" }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>;
            })}

            <div className="bg-white h-fit w-5/6 shadow-md rounded-lg ">
              <div className="h-fit overflow-hidden">
                <div
                  className="flex flex-col h-64 w-full rounded-t-lg transform transition-all hover:scale-110 duration-700"
                  style={{
                    backgroundImage: `url('${Gradient.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                ></div>
              </div>

              <div className="text-center w-full p-5 relative">
                <div
                  className="absolute inline-block w-fit p-5 border-2 bg-white rounded-full text-center font-serif text-lg"
                  style={{
                    top: "-35px",
                    zIndex: "2",
                    transform: "transLateX(-50%)",
                  }}
                >
                  <h1>₱200.00</h1>
                </div>
                <h1 className="mt-6 font-semilight text-xl">Bordered Cake</h1>
                <Button
                  className="mb-2 mt-3 shadow-md hover:bg-ring"
                  style={{ borderRadius: "8px" }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white h-fit w-5/6 shadow-md rounded-lg ">
              <div className="h-fit overflow-hidden">
                <div
                  className="flex flex-col h-64 w-full rounded-t-lg transform transition-all hover:scale-110 duration-700"
                  style={{
                    backgroundImage: `url('${Smudges.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                ></div>
              </div>

              <div className="text-center w-full p-5 relative">
                <div
                  className="absolute inline-block w-fit p-5 border-2 bg-white rounded-full text-center font-serif text-lg"
                  style={{
                    top: "-35px",
                    zIndex: "2",
                    transform: "transLateX(-50%)",
                  }}
                >
                  <h1>₱250.00</h1>
                </div>
                <h1 className="mt-6 font-semilight text-xl">Smudges</h1>
                <Button
                  className="mb-2 mt-3 shadow-md hover:bg-ring"
                  style={{ borderRadius: "8px" }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white h-fit w-5/6 shadow-md rounded-lg ">
              <div className="h-fit overflow-hidden">
                <div
                  className="flex flex-col h-64 w-full rounded-t-lg transform transition-all hover:scale-110 duration-700"
                  style={{
                    backgroundImage: `url('${Minimalist.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                ></div>
              </div>

              <div className="text-center w-full p-5 relative">
                <div
                  className="absolute inline-block w-fit p-5 border-2 bg-white rounded-full text-center font-serif text-lg"
                  style={{
                    top: "-35px",
                    zIndex: "2",
                    transform: "transLateX(-50%)",
                  }}
                >
                  <h1>₱200.00</h1>
                </div>
                <h1 className="mt-6 font-semilight text-xl">Minimalist</h1>
                <Button
                  className="mb-2 mt-3 shadow-md hover:bg-ring"
                  style={{ borderRadius: "8px" }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white h-fit w-5/6 shadow-md rounded-lg ">
              <div className="h-fit overflow-hidden">
                <div
                  className="flex flex-col h-64 w-full rounded-t-lg transform transition-all hover:scale-110 duration-700"
                  style={{
                    backgroundImage: `url('${Floral_Patterned.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                ></div>
              </div>

              <div className="text-center w-full p-5 relative">
                <div
                  className="absolute inline-block w-fit p-5 border-2 bg-white rounded-full text-center font-serif text-lg"
                  style={{
                    top: "-35px",
                    zIndex: "2",
                    transform: "transLateX(-50%)",
                  }}
                >
                  <h1>₱450.00</h1>
                </div>
                <h1 className="mt-6 font-semilight text-xl">
                  Floral Patterned
                </h1>
                <Button
                  className="mb-2 mt-3 shadow-md hover:bg-ring"
                  style={{ borderRadius: "8px" }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
       */}
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
              <Button className="mb-5 font-medium text-2xl hover:bg-ring w-5/12 h-16 mx-auto duration-500">
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
      {/* <section id="aboutUs" className="h-screen w-full bg-red-500">
        <div
          style={{
            height: "80%",
            width: "80%",
            backgroundColor: "blue",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <div style={{}}></div>
        </div>
      </section> */}

      <section
        id="aboutUs"
        className=" flex flex-row bg-accent"
        style={{
          height: "100vh",
          width: "100vw",
          paddingTop: "25px",
          paddingBottom: "25px",
          alignItems: "center",
          // marginLeft: "auto",
        }}
      >
        {/* className="grid grid-cols-3 gap-y-8" col-span-3 */}
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
      <section>
        <div style={{ height: "50vh", width: "100vw" }}>
          <Footer />
        </div>
      </section>
    </>
  );
};

export default page;

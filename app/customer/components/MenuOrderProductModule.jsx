"use client";
import { useState, useEffect, useRef } from "react";
import HomePageNavbar from "./HomePageNavbar";
import MenuSelectedProduct from "../components/MenuSelectedProduct";
import MenuCart from "./MenuCart";
import MenuEditCartProduct from "./MenuEditCartProduct";
import MenuCheckOutForm from "./MenuCheckOutForm";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";

const MenuOrderProductModule = ({
  user,
  selectedProduct,
  sizes,
  flavors,
  colors,
  sprinkles,
  flowers,
  shapes,
  addOnsArray,
}) => {
  const params = useParams();
  const { userId, prodId } = params;
  const router = useRouter();

  const [cartList, setCartList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const [feedback, setFeedback] = useState([]);
  const [cartProduct, setCartProduct] = useState({});
  const [specificProductSizes, setSpecificProductSizes] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState([]);
  const [specificProductOffers, setSpecificProductOffers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productPrices, setProductPrices] = useState([]);
  const [addOnsList, setAddOnsList] = useState([]);
  const [specialPropertyList, setSpecialPropertyList] = useState([]);
  const [openMenuCheckOut, setOpenMenuCheckOut] = useState(false);
  const [openAddToCartConfirmation, setOpenAddToCartConfirmation] =
    useState(false);
  const [openEditCartProduct, setOpenEditCartProduct] = useState(false);
  const [openRemoveCartProduct, setOpenRemoveCartProduct] = useState(false);

  const [responseSuccess, setResponseSuccess] = useState(false);
  const [responseError, setResponseError] = useState(false);

  // alert state
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
      router.replace(`/customer/menu/${user.customerId}`);
    }, 3000);
  };

  const closeRequestAlert = () => {
    setAlertMessageOpen(false);
  };

  const handleCartRemoveProduct = (prod) => {
    setCartProduct(prod);
    setOpenRemoveCartProduct(true);
  };

  const handleCartEditProduct = (prod) => {
    setCartProduct(prod);
    setOpenEditCartProduct(true);
  };

  // update quantity in the array list
  const minusQuantityToList = async (cartId) => {
    const updatedCart = cartList.map((i) => {
      const totalPriceInitialPrice = i.totalPrice / i.quantity;
      const updatedQuantity = Number(i.quantity) - 1;
      const newTotalPrice = totalPriceInitialPrice * updatedQuantity;

      const subTotalInitialPrice = i.subTotal / i.quantity;
      const newSubTotalPrice = subTotalInitialPrice * updatedQuantity;

      {
        cartId == i.cartId ? (i.quantity = Number(i.quantity) - 1) : null;
      }
      {
        cartId == i.cartId ? (i.totalPrice = newTotalPrice) : null;
      }

      {
        cartId == i.cartId ? (i.subTotal = newSubTotalPrice) : null;
      }

      return { ...i };
    });
    const filteredCart = updatedCart.filter((i) => i.quantity != 0);

    const removedItem = updatedCart.find((i) => i.quantity == 0);

    removedItem && removeProductToDatabase(removedItem);

    setCartList(filteredCart);
  };

  const removeProductToDatabase = async (removedItem) => {
    const deleteCart = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: removedItem.cartId,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart/edit/quantity`,
        deleteCart
      );
    } catch (error) {
      console.log(error);
    }
  };

  // update quantity in the array list
  const addQuantityToList = (cartId) => {
    const updatedCart = cartList.map((i) => {
      const totalPriceInitialPrice = i.totalPrice / i.quantity;
      const updatedQuantity = Number(i.quantity) + 1;
      const newTotalPrice = totalPriceInitialPrice * updatedQuantity;

      const subTotalInitialPrice = i.subTotal / i.quantity;
      const newSubTotalPrice = subTotalInitialPrice * updatedQuantity;

      {
        cartId == i.cartId ? (i.quantity = Number(i.quantity) + 1) : null;
      }
      {
        cartId == i.cartId ? (i.totalPrice = newTotalPrice) : null;
      }

      {
        cartId == i.cartId ? (i.subTotal = newSubTotalPrice) : null;
      }

      return { ...i };
    });

    setCartList(updatedCart);
  };

  // update quantity in database
  async function deductQuantity(cartId, quantity, subTotal) {
    const initialPrice = subTotal / quantity;
    const updatedQuantity = Number(quantity) - 1;
    const newSubTotal = initialPrice * updatedQuantity;

    const deductPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartId,
        quantity: updatedQuantity,
        subTotal: newSubTotal,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart/edit/quantity`,
        deductPut
      );
    } catch (error) {
      console.log(error);
    }
  }

  // update quantity in database
  async function addQuantity(cartId, quantity, subTotal) {
    const initialPrice = subTotal / quantity;
    const updatedQuantity = Number(quantity) + 1;
    const newSubTotal = initialPrice * updatedQuantity;

    const addPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartId,
        quantity: updatedQuantity,
        subTotal: newSubTotal,
      }),
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/customer/cart/edit/quantity`,
        addPut
      );
    } catch (error) {
      console.log(error);
    }
  }

  const findSpecificProductSizes = (product) => {
    const { productId } = product;

    const prodSizes = sizes.filter((i) => productId == i.productId);

    setSpecificProductSizes(prodSizes);
  };

  const getCart = async () => {
    const res = await fetch(
      `http://localhost:3000/api/customer/cart?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );
    const data = await res.json();

    const cartWithAddOnsList = data.map((i) => {
      const { cartId, subTotal, quantity } = i;

      const addOns = addOnsList.filter((addOn) => addOn.cartId == cartId);

      const specialProp = specialPropertyList.filter(
        (prop) => prop.cartId == cartId
      );

      // let sum = subTotal;
      // addOns.forEach((j) => {
      //   sum += j.addOnsTotal * quantity;
      // });

      return {
        ...i,
        addOns,
        specialProperty: specialProp,
        subTotal: subTotal,
      };
    });

    setCartList(cartWithAddOnsList);
  };

  const getAddOns = async () => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/cart/addOns?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );

    const addOns = await addOnsRes.json();

    setAddOnsList(addOns[0]);
  };

  const getCustomerFeedback = async () => {
    const feedbackRes = await fetch(
      `http://localhost:3000/api/feedback?` +
        new URLSearchParams({ prodId: params.prodId }),
      {
        cache: "no-store",
      }
    );

    const feedback = await feedbackRes.json();

    const oneStarRating = feedback.filter((i) => i.rating == 1);

    const twoStarRating = feedback.filter((i) => i.rating == 2);

    const threeStarRating = feedback.filter((i) => i.rating == 3);

    const fourStarRating = feedback.filter((i) => i.rating == 4);

    const fiveStarRating = feedback.filter((i) => i.rating == 5);

    const averageRating =
      oneStarRating.length * 1 +
      twoStarRating.length * 2 +
      threeStarRating.length * 3 +
      fourStarRating.length * 4 +
      fiveStarRating.length * 5;

    setAverageRating(averageRating / feedback.length);
    setFeedback(feedback);
  };

  const getSpecialProperty = async () => {
    const specialPropRes = await fetch(
      `http://localhost:3000/api/customer/cart/specialProperty?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );

    const specialProperties = await specialPropRes.json();

    setSpecialPropertyList(specialProperties[0]);
  };

  const getAddOnsPrices = async (cart) => {
    const addOnsRes = await fetch(
      `http://localhost:3000/api/customer/cart/edit/addOnsPrices?` +
        new URLSearchParams({ customerId: userId }),
      {
        cache: "no-store",
      }
    );

    const addOnsPrices = await addOnsRes.json();

    // ipasa nalang yung nireturn na data kesa sa state para real time
    getCartProductPrices(cart, addOnsPrices[0]);
  };

  const getCartProductPrices = async (cart, addOnsPrices) => {
    const { cartId, customerId } = cart;

    const res = await fetch(
      `http://localhost:3000/api/customer/cart/edit/prices?` +
        new URLSearchParams({
          customerId: customerId,
        }),
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    const productAddOns = addOnsPrices.filter((i) => i.cartId == cartId);

    let prices = data[0].find((i) => i.cartId == cartId);

    let sum = prices.subTotal;
    productAddOns.forEach((j) => {
      sum += j.addOnsTotal * prices.quantity;
    });

    const pricesWithAddOns = {
      ...prices,
      addOns: [...productAddOns],
      productTotalPrice: Number(sum),
    };

    setProductPrices(pricesWithAddOns);
  };

  // for sizes lang
  const getSpecificProductOffers = async () => {
    const res = await fetch(
      `http://localhost:3000/api/default-products/specificProduct/?` +
        new URLSearchParams({
          productId: prodId,
        }),
      { cache: "no-store" }
    );
    const data = await res.json();
    setSpecificProductOffers(data);
  };

  const uploadImage = async (file) => {
    const data = new FormData();

    data.set("file", file);

    const res = await fetch("/api/upload/image-reference", {
      method: "POST",
      body: data,
    });

    const results = await res.json();

    // setImage(`/response-images/${results}`);
    if (!res.ok) throw new Error(await res.text());

    return results;
  };

  const addToCart = async (
    cartProduct,
    productName,
    quantity,
    subTotal,
    selectedProductImage,
    totalPrice,
    addOnsList,
    file,
    specialProperty,
    isCakeCustomized
  ) => {
    try {
      let results = null;

      !file ? null : (results = await uploadImage(file));

      let customizedRef;
      let imageRef;

      !results ? null : (imageRef = `/image-reference/${results}`);
      isCakeCustomized == true ? (customizedRef = 1) : (customizedRef = 0);

      const cartPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: cartProduct.customerId,
          productId: cartProduct.productId,
          packagingId: cartProduct.packagingId,
          flavorId: cartProduct.flavorId,
          shapeId: cartProduct.shapeId,
          colorId: cartProduct.colorId,
          quantity: cartProduct.quantity,
          subTotal: cartProduct.subTotal,
          message: cartProduct.message,
          imageReference: imageRef,
          isCakeCustomized: customizedRef,
        }),
      };
      try {
        const res = await fetch(
          `http://localhost:3000/api/customer/cart`,
          cartPost
        );

        const results = await res.json();

        const { insertId } = results[0];
        const newCartId = insertId;

        cartProduct.cakeTypeId != 5 &&
        cartProduct.cakeTypeId != 6 &&
        cartProduct.cakeTypeId != 1 &&
        cartProduct.cakeTypeId != 7
          ? specialProperty.forEach(async (i) => {
              const specialPropertyPost = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cartId: newCartId,
                  customerId: cartProduct.customerId,
                  cartSpecialPropertyValue: i.specialPropertyValue,
                  cartSpecialPropertyName: i.specialPropertyName,
                }),
              };
              try {
                const response = await fetch(
                  `http://localhost:3000/api/customer/cart/specialProperty`,
                  specialPropertyPost
                );
              } catch (e) {
                console.log(e);
              }
            })
          : null;

        // pag 2 tiers
        cartProduct.cakeTypeId == 5 && specialProperty.length != 0
          ? specialProperty.forEach(async (i) => {
              const specialPropertyPost = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cartId: newCartId,
                  customerId: cartProduct.customerId,
                  cartSpecialPropertyValue: specialProperty[0].length,
                  cartSpecialPropertyName: "Tier 2 Add Ons",
                }),
              };
              try {
                const response = await fetch(
                  `http://localhost:3000/api/customer/cart/specialProperty`,
                  specialPropertyPost
                );

                const results = await response.json();

                const { insertId } = results[0];

                specialProperty[0].forEach(async (i) => {
                  const tier2AddOnsPost = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      cartId: newCartId,
                      cartSpecialPropertyId: insertId,
                      customerId: cartProduct.customerId,
                      addOnsId: i.addOnsId,
                      addOnsQuantity: i.addOnsQuantity,
                      addOnsTotal: i.addOnsTotal,
                    }),
                  };
                  try {
                    const response = await fetch(
                      `http://localhost:3000/api/customer/cart/addOns`,
                      tier2AddOnsPost
                    );
                  } catch (e) {
                    console.log(e);
                  }
                });
              } catch (e) {
                console.log(e);
              }
            })
          : null;

        // pag 3 tiers
        cartProduct.cakeTypeId == 6 && specialProperty.length != 0
          ? specialProperty.forEach(async (i, index) => {
              let specialPropertyName;

              i.length == 2
                ? (specialPropertyName = i[1].specialPropertyName)
                : (specialPropertyName = i[0].specialPropertyName);

              const specialPropertyPost = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cartId: newCartId,
                  customerId: cartProduct.customerId,
                  cartSpecialPropertyValue: specialProperty[index].length,
                  cartSpecialPropertyName: specialPropertyName,
                }),
              };
              try {
                const response = await fetch(
                  `http://localhost:3000/api/customer/cart/specialProperty`,
                  specialPropertyPost
                );

                const results = await response.json();

                const { insertId } = results[0];

                i.length == 2
                  ? null
                  : i.forEach(async (j) => {
                      const tieredAddOns = {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          cartId: newCartId,
                          cartSpecialPropertyId: insertId,
                          customerId: cartProduct.customerId,
                          addOnsId: j.addOnsId,
                          addOnsQuantity: j.addOnsQuantity,
                          addOnsTotal: j.addOnsTotal,
                        }),
                      };
                      try {
                        const response = await fetch(
                          `http://localhost:3000/api/customer/cart/addOns`,
                          tieredAddOns
                        );
                      } catch (e) {
                        console.log(e);
                      }
                    });
              } catch (e) {
                console.log(e);
              }
            })
          : null;

        addOnsList.forEach(async (i) => {
          const cartAddOnsPost = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cartId: newCartId,
              cartSpecialPropertyId: 0,
              customerId: cartProduct.customerId,
              addOnsId: i.addOnsId,
              addOnsQuantity: i.addOnsQuantity,
              addOnsTotal: i.addOnsTotal,
            }),
          };
          try {
            const response = await fetch(
              `http://localhost:3000/api/customer/cart/addOns`,
              cartAddOnsPost
            );
          } catch (e) {
            console.log(e);
          }
        });

        setCartList([
          ...cartList,
          {
            customerId: cartProduct.customerId,
            cartId: insertId,
            productName: productName,
            quantity: Number(quantity),
            subTotal: Number(subTotal),
            totalPrice: Number(totalPrice),
            image: selectedProductImage,
            imageReference: imageRef,
            cakeTypeId: selectedProduct.cakeTypeId,
            addOnsList: { ...addOnsList },
            specialProperty: { ...specialProperty },
          },
        ]);

        setOpenAddToCartConfirmation(false);
        setAlertMessage(
          "Order added to cart successfully. Redirecting to menu page, please wait."
        );
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
      } catch (error) {
        setResponseError(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // update total price
  const updateTotal = () => {
    let totalPrice = 0;
    cartList.forEach((i) => {
      userId == i.customerId ? (totalPrice = totalPrice + i.subTotal) : null;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    updateTotal();
  }, [cartList]);

  useEffect(() => {
    getCart();
  }, [addOnsList, specialPropertyList]);

  useEffect(() => {
    getAddOns();
    getSpecificProductOffers();
    getSpecialProperty();
    getCustomerFeedback();
    // getSpecificProduct();
  }, []);

  return (
    <div className="h-auto">
      <HomePageNavbar userId={user.customerId} />
      <div className="w-full h-fit flex flex-row px-10 py-4 gap-6">
        <div className="w-[70%] h-fit">
          <MenuSelectedProduct
            user={user}
            addToCart={addToCart}
            sizes={sizes}
            flavors={flavors}
            listOfAddOns={addOnsArray}
            colors={colors}
            shapes={shapes}
            selectedProduct={selectedProduct}
            openAddToCartConfirmation={openAddToCartConfirmation}
            setOpenAddToCartConfirmation={setOpenAddToCartConfirmation}
            responseSuccess={responseSuccess}
            responseError={responseError}
            specificProductOffers={specificProductOffers}
            feedback={feedback}
            averageRating={averageRating}
          />
        </div>
        <div className="w-[30%] mt-4">
          <MenuCart
            user={user}
            cart={cartList}
            minusQuantityToList={minusQuantityToList}
            addQuantityToList={addQuantityToList}
            deductQuantity={deductQuantity}
            addQuantity={addQuantity}
            handleCartEditProduct={handleCartEditProduct}
            handleCartRemoveProduct={handleCartRemoveProduct}
            findSpecificProductSizes={findSpecificProductSizes}
            getCartProductPrices={getCartProductPrices}
            getAddOnsPrices={getAddOnsPrices}
            totalPrice={totalPrice}
            setOpenMenuCheckOut={setOpenMenuCheckOut}
            page={"order"}
          />
        </div>
      </div>

      <Dialog
        open={openRemoveCartProduct}
        onOpenChange={setOpenRemoveCartProduct}
        onClose
      >
        <DialogContent className="flex flex-col max-w-full max-h-full md:w-[35%] md:h-fit">
          <div className="flex-1 h-fit m-0">
            <DialogTitle className="h-fit">
              Are you sure you want to remove
              <span className="text-primary font-extrabold mx-2">
                {cartProduct.productName}
              </span>
              cake?
            </DialogTitle>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-white active:bg-primary-foreground duration-300 w-fit"
              onClick={() => {
                setOpenRemoveCartProduct(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
              onClick={async () => {
                const deleteData = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    cartId: cartProduct.cartId,
                  }),
                };
                const res = await fetch(
                  `http://localhost:3000/api/customer/cart/remove`,
                  deleteData
                );

                const newCartList = cartList.filter(
                  (i) => i.cartId != cartProduct.cartId
                );

                setCartList(newCartList);
                setAlertMessage("Product removed to cart.");
                setAlertTitle("Success!");
                setAlertType("success");
                openRequestAlert();
                setOpenRemoveCartProduct(false);
              }}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {openEditCartProduct ? (
        <MenuEditCartProduct
          cartProduct={cartProduct}
          setCartProduct={setCartProduct}
          openEditCartProduct={openEditCartProduct}
          setOpenEditCartProduct={setOpenEditCartProduct}
          specificProductSizes={specificProductSizes}
          flavors={flavors}
          colors={colors}
          sprinkles={sprinkles}
          flowers={flowers}
          shapes={shapes}
          productPrices={productPrices}
          setCartList={setCartList}
          listOfAddOns={addOnsArray}
          cartList={cartList}
        />
      ) : null}

      {/* binabago kay checkout */}
      {!openMenuCheckOut ? null : (
        <MenuCheckOutForm
          cart={cartList}
          orderPrice={totalPrice}
          openMenuCheckOut={openMenuCheckOut}
          setOpenMenuCheckOut={setOpenMenuCheckOut}
        />
      )}

      {/* ALERT */}
      {alertMessageOpen ? (
        <ToastProvider swipeDirection="up" duration={3000}>
          <Toast className="w-fit h-fit mr-5" variant={alertType}>
            <div className="flex flex-row gap-2">
              <div className=" mt-2">
                {alertType == "warning" && (
                  <IoWarningOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "info" && (
                  <IoInformationCircleOutline className="w-[45px] h-[30px]" />
                )}
                {alertType == "success" && (
                  <IoCheckmarkCircleOutline className="w-[45px] h-[30px]" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <ToastTitle className="text-lg">{alertTitle}</ToastTitle>
                <ToastDescription className="text-sm font-light">
                  {alertMessage}
                </ToastDescription>
              </div>
            </div>

            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      ) : null}
    </div>
  );
};

export default MenuOrderProductModule;

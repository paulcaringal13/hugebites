"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTable from "./ProductTable";
import CategoryTable from "./CategoryTable";
import { Button } from "@/components/ui/button";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import EditProductForm from "./EditProductForm";
import ViewFeedbacks from "./ViewFeedbacks";
import AddProductForm from "./AddProductForm";
import DefaultProductsTable from "./DefaultProductsTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import { Textarea } from "@/components/ui/textarea";

const MenuTableTabs = ({
  productList,
  categoryList,
  cakeTypes,
  defaultProductsList,
  flavors,
  colors,
  shapes,
  sizes,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const [selectedRow, setSelectedRow] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedOfferedProduct, setSelectedOfferedProduct] = useState({});

  const [flavorOptions, setFlavorOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [shapeOptions, setShapeOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openAddSize, setOpenAddSize] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [newSizePrice, setNewSizePrice] = useState(0);
  const [newSizeDescription, setNewSizeDescription] = useState("");
  const [offeredProductsOpen, setOfferedProductsOpen] = useState(false);
  const [openAddOfferedProduct, setOpenAddOfferedProduct] = useState(false);
  const [openEditOfferedProduct, setOpenEditOfferedProduct] = useState(false);
  const [openRemoveOfferedProduct, setOpenRemoveOfferedProduct] =
    useState(false);
  const [openRelaunchOfferedProduct, setOpenRelaunchOfferedProduct] =
    useState(false);
  const [openManageOfferedProduct, setOpenManageOfferedProduct] =
    useState(false);

  const [newSizeValMessage, setNewSizeValMessage] = useState("");
  const [newSizePriceValMessage, setNewSizePriceValMessage] = useState("");
  const [packaging, setPackaging] = useState({
    packagingId: 0,
    size: "",
    packagingPrice: 0,
  });
  const [flavor, setFlavor] = useState({
    flavorId: 0,
    flavorName: "",
    flavorPrice: 0,
  });
  const [color, setColor] = useState({
    colorId: 0,
    colorPrice: 0,
    colorName: "",
  });
  const [shape, setShape] = useState({
    shapeId: null,
    shapePrice: 0,
    shapeName: "",
  });

  const openAddOfferedProductSize = (product) => {
    setOpenAddSize(true);
    setSelectedRow(product);
  };

  const openAddOfferedProducts = (product) => {
    setOpenAddOfferedProduct(true);
    setSelectedRow(product);
    setSelectedProduct(product);
    setNewSize("");
    setNewSizePrice("");
    setFlavor({
      flavorId: 0,
      flavorName: "",
      flavorPrice: 0,
    });
    setColor({
      colorId: 0,
      colorName: "",
      colorPrice: 0,
    });
    setShape({
      shapeId: 0,
      shapeName: "",
      shapePrice: 0,
    });
    setTotalPrice(0);
  };

  const openRemoveOfferedProducts = (offeredProduct) => {
    setOpenRemoveOfferedProduct(true);
    setSelectedOfferedProduct(offeredProduct);
  };

  const openRelaunchOfferedProducts = (offeredProduct) => {
    setOpenRelaunchOfferedProduct(true);
    setSelectedOfferedProduct(offeredProduct);
  };

  const openEditOfferedProducts = (offeredProduct) => {
    setOpenEditOfferedProduct(true);
    setSelectedOfferedProduct(offeredProduct);
    setNewSize(offeredProduct.size);
    setNewSizePrice(offeredProduct.packagingPrice);
    setFlavor({
      flavorId: offeredProduct.flavorId,
      flavorName: offeredProduct.flavorName,
      flavorPrice: offeredProduct.flavorPrice,
    });
    setColor({
      colorId: offeredProduct.colorId || 0,
      colorName: offeredProduct.colorName || "Default",
      colorPrice: offeredProduct.colorPrice || 0,
    });
    setShape({
      shapeId: offeredProduct.shapeId || 0,
      shapeName: offeredProduct.shapeName || "Default",
      shapePrice: offeredProduct.shapePrice || 0,
    });
    setTotalPrice(offeredProduct.default_total);
  };

  const openOfferedProducts = (product) => {
    setOfferedProductsOpen(true);
    setSelectedRow(product);
    setSelectedProduct(product.prodDefaultProducts[0]);
  };
  const openManageOfferedProducts = () => {
    setOpenManageOfferedProduct(true);
  };
  const releaseDefaultProduct = async () => {
    const sizePost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: selectedRow.productId,
        size: newSize,
        packagingStatus: "Available",
        packagingPrice: newSizePrice,
        sizeDescription: newSizeDescription,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/packaging`,
        sizePost
      );
      const response = await res.json();
      const { insertId } = response[0];

      const newPackagingId = insertId;

      const newReleasedPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedRow.productId,
          flavorId: flavor.flavorId,
          shapeId: shape.shapeId,
          colorId: color.colorId,
          colorId: color.colorId,
          default_total: totalPrice,
          packagingId: newPackagingId,
        }),
      };
      try {
        const releasedRes = await fetch(
          `http://localhost:3000/api/admin/menu/product/default_products`,
          newReleasedPost
        );

        const releasedResResponse = await releasedRes.json();
        const { insertId } = releasedResResponse[0];

        let shapeId;
        let shapeName;
        let shapePrice;

        {
          shape.shapeId == 0 ? (shapeId = null) : (shapeId = shape.shapeId);
        }
        {
          shape.shapeId == 0
            ? (shapeName = null)
            : (shapeName = shape.shapeName);
        }
        {
          shape.shapeId == 0
            ? (shapePrice = null)
            : (shapePrice = shape.shapePrice);
        }

        const newReleasedProduct = {
          defaultProductId: insertId,
          packagingId: newPackagingId,
          size: newSize,
          packagingPrice: newSizePrice,
          sizeDescription: newSizeDescription,
          productId: selectedRow.productId,
          productName: selectedRow.productName,
          shapeId: shapeId,
          shapeName: shapeName,
          shapePrice: shapePrice,
          colorId: color.colorId,
          colorName: color.colorName,
          colorPrice: color.colorPrice,
          flavorId: flavor.flavorId,
          flavorName: flavor.flavorName,
          flavorPrice: flavor.flavorPrice,
          categoryId: selectedRow.categoryId,
          categoryName: selectedRow.categoryName,
          cakeTypeId: selectedRow.cakeTypeId,
          default_total: totalPrice,
          image: selectedRow.image,
          isDefaultProductRemoved: 0,
        };

        productTable.filter((i) => {
          selectedRow.productId == i.productId
            ? (i.prodDefaultProducts = [
                ...i.prodDefaultProducts,
                newReleasedProduct,
              ])
            : null;
        });

        setOpenAddOfferedProduct(false);
        setAlertMessage("New product added to menu.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editDefaultProduct = async () => {
    const sizePost = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: selectedOfferedProduct.productId,
        packagingId: selectedOfferedProduct.packagingId,
        size: newSize,
        packagingStatus: "Available",
        packagingPrice: newSizePrice,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/customization/packaging`,
        sizePost
      );

      const editDefaultProdPut = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          defaultProductId: selectedOfferedProduct.defaultProductId,
          flavorId: flavor.flavorId,
          shapeId: shape.shapeId,
          colorId: color.colorId,
          default_total: totalPrice,
        }),
      };
      try {
        const releasedRes = await fetch(
          `http://localhost:3000/api/admin/menu/product/default_products`,
          editDefaultProdPut
        );

        let colorId;
        let colorName;
        let colorPrice;

        {
          color.colorId == 0 ? (colorId = null) : (colorId = color.colorId);
        }
        {
          color.colorId == 0
            ? (colorName = null)
            : (colorName = color.colorName);
        }
        {
          color.colorId == 0
            ? (colorPrice = null)
            : (colorPrice = color.colorPrice);
        }

        const editedDefaultProduct = {
          defaultProductId: selectedOfferedProduct.defaultProductId,
          packagingId: selectedOfferedProduct.packagingId,
          size: newSize,
          packagingPrice: newSizePrice,
          productId: selectedOfferedProduct.productId,
          productName: selectedOfferedProduct.productName,
          shapeId: shape.shapeId,
          shapeName: shape.shapeName,
          shapePrice: shape.shapePrice,
          colorId: colorId,
          colorName: colorName,
          colorPrice: colorPrice,
          flavorId: flavor.flavorId,
          flavorName: flavor.flavorName,
          flavorPrice: flavor.flavorPrice,
          categoryId: selectedOfferedProduct.categoryId,
          categoryName: selectedOfferedProduct.categoryName,
          cakeTypeId: selectedOfferedProduct.cakeTypeId,
          default_total: totalPrice,
          image: selectedProduct.image,
          isDefaultProductRemoved:
            selectedOfferedProduct.isDefaultProductRemoved,
        };

        const editedTable = selectedRow.prodDefaultProducts.map((i) => {
          selectedOfferedProduct.defaultProductId == i.defaultProductId
            ? (i = editedDefaultProduct)
            : null;

          return { ...i };
        });

        const prod = productTable.find(
          (i) => selectedProduct.productId == i.productId
        );

        prod.prodDefaultProducts = [...editedTable];

        setOfferedProductsOpen(false);
        setOpenEditOfferedProduct(false);
        setAlertMessage("Product edited on the menu.");
        setAlertTitle("Success!");
        setAlertType("success");
        openRequestAlert();
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeDefaultProduct = async () => {
    const removePut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultProductId: selectedOfferedProduct.defaultProductId,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/menu/product/default_products/remove`,
        removePut
      );

      const editedTable = selectedRow.prodDefaultProducts.map((i) => {
        selectedOfferedProduct.defaultProductId == i.defaultProductId
          ? (i.isDefaultProductRemoved = 1)
          : null;

        return { ...i };
      });

      const prod = productTable.find(
        (i) => selectedProduct.productId == i.productId
      );

      prod.prodDefaultProducts = editedTable;

      setOpenRemoveOfferedProduct(false);
      setAlertMessage("Product removed on the menu.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    } catch (e) {
      console.log(e);
    }
  };

  const relaunchDefaultProduct = async () => {
    const relaunchPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultProductId: selectedOfferedProduct.defaultProductId,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/menu/product/default_products/relaunch`,
        relaunchPut
      );

      const editedTable = selectedRow.prodDefaultProducts.map((i) => {
        selectedOfferedProduct.defaultProductId == i.defaultProductId
          ? (i.isDefaultProductRemoved = 0)
          : null;

        return { ...i };
      });

      const prod = productTable.find(
        (i) => selectedProduct.productId == i.productId
      );

      prod.prodDefaultProducts = editedTable;

      setOpenRelaunchOfferedProduct(false);
      setAlertMessage("Product relaunched on the menu.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    } catch (e) {
      console.log(e);
    }
  };

  const computeTotal = () => {
    let newTotal =
      shape.shapePrice +
      color.colorPrice +
      flavor.flavorPrice +
      Number(newSizePrice);

    setTotalPrice(Number(newTotal));
  };

  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [viewFeedbacksOpen, setViewFeedbacksOpen] = useState(false);
  const [removeProductOpen, setRemoveProductOpen] = useState(false);
  const [relaunchProductOpen, setRelaunchProductOpen] = useState(false);

  const [productTable, setProductTable] = useState(productList);
  const [defaultProductsTable, setDefaultProductsTable] =
    useState(defaultProductsList);

  const openAddProduct = () => {
    setAddProductOpen(true);
  };

  const closeAddProduct = () => {
    setAddProductOpen(false);
  };

  const openViewFeedbacks = (rowData) => {
    setViewFeedbacksOpen(true);
    setSelectedRow(rowData);
  };

  const closeViewFeedbacks = () => {
    setViewFeedbacksOpen(false);
  };

  const openEditProduct = (rowData) => {
    setEditProductOpen(true);
    setSelectedRow(rowData);
  };

  const closeEditProduct = () => {
    setEditProductOpen(false);
  };

  const openRemoveProduct = (rowData) => {
    setRemoveProductOpen(true);
    setSelectedRow(rowData);
  };

  const closeRemoveProduct = () => {
    setRemoveProductOpen(false);
  };

  const openRelaunchProduct = (rowData) => {
    setRelaunchProductOpen(true);
    setSelectedRow(rowData);
  };

  const closeRelaunchProduct = () => {
    setRelaunchProductOpen(false);
  };

  const updateProductTable = (data, e) => {
    console.log(data);
    const addAlert = () => {
      setAlertMessage("Product added to product list.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    };

    const editAlert = () => {
      setAlertMessage("Product updated successfully.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    };

    {
      e == "add" ? setProductTable([...productTable, data]) : null;
    }

    {
      e == "add" && data ? addAlert() : null;
    }

    {
      e == "edit" ? setProductTable(data) : null;
    }

    {
      e == "edit" && data ? editAlert() : null;
    }
  };

  const removeProduct = async (productId) => {
    try {
      const removeProd = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          status: "Unavailable",
        }),
      };

      const removeProductRes = await fetch(
        `http://localhost:3000/api/admin/menu/product/remove`,
        removeProd
      );

      const updatedTable = productTable.map((product) => {
        {
          product.productId == productId
            ? (product.status = "Unavailable")
            : null;
        }

        {
          product.productId == productId ? (product.isRemoved = 1) : null;
        }

        return { ...product };
      });

      setProductTable(updatedTable);
      setAlertMessage("Product is now unavailable.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      closeRemoveProduct();
    } catch (e) {
      console.log(e);
    }
  };

  const relaunch = async (productId) => {
    try {
      const relaunchProd = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      };

      const relaunchProductRes = await fetch(
        `http://localhost:3000/api/admin/menu/product/relaunch`,
        relaunchProd
      );

      const updatedTable = productTable.map((product) => {
        {
          product.productId == productId
            ? (product.status = "Available")
            : null;
        }

        {
          product.productId == productId ? (product.isRemoved = 0) : null;
        }

        return { ...product };
      });

      setProductTable(updatedTable);
      setAlertMessage("Product is now available.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      closeRelaunchProduct();
    } catch (e) {
      console.log(e);
    }
  };

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

  const [categoryTable, setCategoryTable] = useState(categoryList);

  const openAddCategory = () => {
    setAddCategoryOpen(true);
  };

  const closeAddCategory = () => {
    setAddCategoryOpen(false);
  };

  const openEditCategory = (rowData) => {
    setEditCategoryOpen(true);
    setSelectedRow(rowData);
  };

  const closeEditCategory = () => {
    setEditCategoryOpen(false);
  };

  const updateCategoryTable = (data, e) => {
    const addAlert = () => {
      setAlertMessage("Product added to category list.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    };

    const editAlert = () => {
      setAlertMessage("Category updated successfully.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
    };

    {
      e == "add" ? setCategoryTable([...categoryTable, data]) : null;
    }

    {
      e == "add" && data ? addAlert() : null;
    }

    {
      e == "edit" ? setCategoryTable(data) : null;
    }
    {
      e == "edit" && data ? editAlert() : null;
    }
  };

  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

  useEffect(() => {
    setProductTable(productList);
  }, [productList]);

  useEffect(() => {
    computeTotal();
  }, [shape, color, newSizePrice, flavor]);
  useEffect(() => {
    const flavorSelect = flavors.filter(
      (i) => selectedRow.categoryId == i.categoryId
    );

    const cupcakeFlavors = flavors.filter((i) => i.categoryId == 8003);
    console.log("====>", flavors);

    {
      selectedRow.categoryId == 8003
        ? setFlavorOptions(cupcakeFlavors)
        : setFlavorOptions(flavorSelect);
    }

    setColorOptions(colors);
    setShapeOptions(shapes);
  }, [selectedRow]);

  useEffect(() => {
    setDefaultProductsTable(defaultProductsList);
  }, [defaultProductsList]);

  useEffect(() => {
    setCategoryTable(categoryList);
  }, [categoryList]);

  return (
    <div className="w-full mx-10 my-5">
      <Tabs defaultValue="product">
        <TabsList className="w-3/6">
          <TabsTrigger value="product" className="w-3/6 ">
            Product
          </TabsTrigger>
          <TabsTrigger value="category" className="w-3/6 me-auto ">
            Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="product">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2">
                Product Table
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddProduct();
                  }}
                >
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <ProductTable
                data={productTable}
                productTable={productTable}
                openEditProduct={openEditProduct}
                openViewFeedbacks={openViewFeedbacks}
                updateProductTable={updateProductTable}
                openRelaunchProduct={openRelaunchProduct}
                openRemoveProduct={openRemoveProduct}
                openOfferedProducts={openOfferedProducts}
                openAddOfferedProducts={openAddOfferedProducts}
                openAddOfferedProductSize={openAddOfferedProductSize}
                sizes={sizes}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="category">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Category Table
              </CardTitle>
              <div>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddCategory();
                  }}
                >
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <CategoryTable
                data={categoryTable}
                openEditCategory={openEditCategory}
                productTable={productTable}
                categoryTable={categoryTable}
                setCategoryTable={setCategoryTable}
                setProductTable={setProductTable}
                updateCategoryTable={updateCategoryTable}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {addProductOpen && !!cakeTypes ? (
        <AddProductForm
          addProductOpen={addProductOpen}
          setAddProductOpen={setAddProductOpen}
          closeAddProduct={closeAddProduct}
          updateProductTable={updateProductTable}
          categoryTable={categoryTable}
          productTable={productTable}
          cakeTypes={cakeTypes}
        />
      ) : null}

      {editProductOpen && cakeTypes ? (
        <EditProductForm
          editProductOpen={editProductOpen}
          setEditProductOpen={setEditProductOpen}
          closeEditProduct={closeEditProduct}
          updateProductTable={updateProductTable}
          productTable={productTable}
          selectedRow={selectedRow}
          categoryTable={categoryTable}
          cakeTypes={cakeTypes}
        />
      ) : null}

      {viewFeedbacksOpen ? (
        <ViewFeedbacks
          viewFeedbacksOpen={viewFeedbacksOpen}
          setViewFeedbacksOpen={setViewFeedbacksOpen}
          selectedRow={selectedRow}
          closeViewFeedbacks={closeViewFeedbacks}
        />
      ) : null}

      {removeProductOpen ? (
        <AlertDialog
          open={removeProductOpen}
          onOpenChange={setRemoveProductOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Remove {selectedRow.productName} cake on the menu?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeProduct(selectedRow.productId)}
                className="bg-red-400 hover:bg-red-500"
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}

      {relaunchProductOpen ? (
        <AlertDialog
          open={relaunchProductOpen}
          onOpenChange={setRelaunchProductOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Relaunch {selectedRow.productName} cake?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => relaunch(selectedRow.productId)}
                className="bg-blue-400 hover:bg-blue-500"
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}

      {/* CATEGORY MODALS */}
      {addCategoryOpen ? (
        <AddCategoryForm
          addCategoryOpen={addCategoryOpen}
          setAddCategoryOpen={setAddCategoryOpen}
          closeAddCategory={closeAddCategory}
          // UPDATING FOR FRONTEND
          updateCategoryTable={updateCategoryTable}
          // FOR VALIDATING IF THE CATEGORY IS EXISTING
          categoryTable={categoryTable}
        />
      ) : null}

      {editCategoryOpen ? (
        <EditCategoryForm
          editCategoryOpen={editCategoryOpen}
          setEditCategoryOpen={setEditCategoryOpen}
          closeEditCategory={closeEditCategory}
          // UPDATE TABLE IN FRONT END
          updateCategoryTable={updateCategoryTable}
          // OLD VALUES AND UPDATING THE TABLE IN FRONT END
          categoryTable={categoryTable}
          // FOR PASSING THE ID OF THE SELECTED ROW
          selectedRow={selectedRow}
        />
      ) : null}

      {!openAddOfferedProduct ? null : (
        <Dialog
          open={openAddOfferedProduct}
          onOpenChange={setOpenAddOfferedProduct}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 pt-2">
              {/* contents mismo */}
              <div className="flex flex-row w-fit gap-4">
                <div className="flex flex-col w-fit h-fit">
                  <h1 className="text-2xl font-bold w-[90%] mx-auto text-center mt-2 border-b-4 border-ring">
                    {selectedRow.productName}
                  </h1>
                  <div
                    style={{
                      width: "370px",
                      height: "400px",
                      backgroundImage: `url('${selectedRow?.image}')`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>

                <Card className="h-auto w-full my-4 mx-2 py-2">
                  <div className="h-fit w-[30vw] grid grid-cols-4 gap-x-2 px-4 pt-4 gap-y-1">
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Packaging
                    </h1>
                    <div className="col-span-2 flex flex-col">
                      <Input
                        id="size"
                        className="w-full"
                        name="size"
                        type="text"
                        placeholder="Input size"
                        value={newSize}
                        onChange={(e) => {
                          setNewSize(e.target.value);

                          e.target.value.length < 2 ||
                          e.target.value.length > 20
                            ? setNewSizeValMessage("Please input a valid size")
                            : setNewSizeValMessage("");
                        }}
                      />
                      {!newSizeValMessage ? null : (
                        <Label className="errorMessage mb-1 col-span-2">
                          {newSizeValMessage}
                        </Label>
                      )}
                    </div>

                    <div className="col-span-2 flex flex-col">
                      <Input
                        id="packagingPrice"
                        className="col-span-2 w-full"
                        name="packagingPrice"
                        min={1}
                        type="number"
                        placeholder="Input the price"
                        value={newSizePrice}
                        onChange={(e) => {
                          setNewSizePrice(e.target.value);

                          e.target.value < 100 || e.target.value.length > 4
                            ? setNewSizePriceValMessage(
                                "Please input a valid price"
                              )
                            : setNewSizePriceValMessage("");
                        }}
                      />
                      {!newSizePriceValMessage ? null : (
                        <Label className="errorMessage mb-1 col-span-2">
                          {newSizePriceValMessage}
                        </Label>
                      )}
                    </div>

                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Description
                    </h1>
                    <Textarea
                      id="sizeDescription"
                      className="form-control w-full col-span-4"
                      name="sizeDescription"
                      min={1}
                      multiline={3}
                      type="text"
                      placeholder="Input size description"
                      onChange={(e) => {
                        setNewSizeDescription(e.target.value);
                      }}
                    />
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Flavor
                    </h1>
                    <Select asChild value={flavor} onValueChange={setFlavor}>
                      <SelectTrigger className="w-full mt-1 col-span-2">
                        {!flavor.flavorId ? (
                          <h1>Select a flavor</h1>
                        ) : (
                          <h1>{flavor.flavorName}</h1>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {flavorOptions.map((i) => {
                            return (
                              <SelectItem key={i.flavorId} value={i}>
                                {i.flavorName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto">
                      {formatter.format(flavor.flavorPrice)}
                    </h1>
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Color
                    </h1>
                    <Select asChild value={color} onValueChange={setColor}>
                      <SelectTrigger className="w-full mt-1 col-span-2">
                        {!color.colorId ? (
                          <h1>Select a color</h1>
                        ) : (
                          <h1>{color.colorName}</h1>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {colorOptions.map((i) => {
                            return (
                              <SelectItem key={i.colorId} value={i}>
                                {i.colorName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto">
                      {formatter.format(color.colorPrice)}
                    </h1>
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Shape
                    </h1>
                    <Select asChild value={shape} onValueChange={setShape}>
                      <SelectTrigger className="w-full mt-1 col-span-2">
                        {!shape.shapeId ? (
                          <h1>Select a shape</h1>
                        ) : (
                          <h1>{shape.shapeName}</h1>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {shapeOptions.map((i) => {
                            return (
                              <SelectItem key={i.shapeId} value={i}>
                                {i.shapeName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto">
                      {formatter.format(shape.shapePrice)}
                    </h1>
                    <Separator className="col-span-4 my-2" />
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto text-lg font-extrabold">
                      Total:
                    </h1>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto text-xl text-ring">
                      {formatter.format(totalPrice)}
                    </h1>
                  </div>
                </Card>
              </div>
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setOpenAddOfferedProduct();
                  setFlavor({
                    flavorId: 0,
                    flavorName: "",
                    flavorPrice: 0,
                  });
                  setColor({
                    colorId: 0,
                    colorName: "",
                    colorPrice: 0,
                  });
                  setShape({
                    shapeId: 0,
                    shapeName: "",
                    shapePrice: 0,
                  });
                  setNewSizePrice(0);
                  setNewSize("");
                  setNewSizePriceValMessage("");
                  setNewSizeValMessage("");
                  setTotalPrice(0);
                }}
              >
                Close
              </Button>
              <Button
                disabled={
                  newSizePriceValMessage ||
                  newSizeValMessage ||
                  flavor.flavorId == 0 ||
                  color.colorId == 0
                }
                className="hover:bg-ring my-2"
                onClick={() => releaseDefaultProduct()}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!openEditOfferedProduct ? null : (
        <Dialog
          open={openEditOfferedProduct}
          onOpenChange={setOpenEditOfferedProduct}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 pt-2">
              {/* contents mismo */}
              <div className="flex flex-row w-fit gap-4">
                <div className="flex flex-col w-fit h-fit">
                  <h1 className="text-2xl font-bold w-[90%] mx-auto text-center mt-2 border-b-4 border-ring">
                    {selectedRow.productName}
                  </h1>
                  <div
                    style={{
                      width: "370px",
                      height: "400px",
                      backgroundImage: `url('${selectedRow?.image}')`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>

                <Card className="h-auto w-full my-4 mx-2 py-2">
                  <div className="h-fit w-[30vw] grid grid-cols-4 gap-x-2 px-4 pt-4 gap-y-1">
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Packaging
                    </h1>
                    <div className="col-span-2 flex flex-col">
                      <Input
                        id="size"
                        className="w-full"
                        name="size"
                        type="text"
                        placeholder="Input size"
                        value={newSize}
                        onChange={(e) => {
                          setNewSize(e.target.value);

                          e.target.value.length < 2 ||
                          e.target.value.length > 20
                            ? setNewSizeValMessage("Please input a valid size")
                            : setNewSizeValMessage("");
                        }}
                      />
                      {!newSizeValMessage ? null : (
                        <Label className="errorMessage mb-1 col-span-2">
                          {newSizeValMessage}
                        </Label>
                      )}
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <Input
                        id="packagingPrice"
                        className="col-span-2 w-full"
                        name="packagingPrice"
                        min={1}
                        type="number"
                        placeholder="Input the price"
                        value={newSizePrice}
                        onChange={(e) => {
                          setNewSizePrice(e.target.value);

                          e.target.value < 100 || e.target.value.length > 4
                            ? setNewSizePriceValMessage(
                                "Please input a valid price"
                              )
                            : setNewSizePriceValMessage("");
                        }}
                      />
                      {!newSizePriceValMessage ? null : (
                        <Label className="errorMessage mb-1 col-span-2">
                          {newSizePriceValMessage}
                        </Label>
                      )}
                    </div>
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Flavor
                    </h1>
                    <Select asChild value={flavor} onValueChange={setFlavor}>
                      <SelectTrigger className="w-full mt-1 col-span-2">
                        {!flavor.flavorId ? (
                          <h1>Select a flavor</h1>
                        ) : (
                          <h1>{flavor.flavorName}</h1>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {flavorOptions.map((i) => {
                            return (
                              <SelectItem key={i.flavorId} value={i}>
                                {i.flavorName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto">
                      {formatter.format(flavor.flavorPrice)}
                    </h1>
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Color
                    </h1>
                    <Select asChild value={color} onValueChange={setColor}>
                      <SelectTrigger className="w-full mt-1 col-span-2">
                        {!color.colorId ? (
                          <h1>Select a color</h1>
                        ) : (
                          <h1>{color.colorName}</h1>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {colorOptions.map((i) => {
                            return (
                              <SelectItem key={i.colorId} value={i}>
                                {i.colorName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto">
                      {formatter.format(color.colorPrice)}
                    </h1>
                    <h1 className="col-span-4 w-[50%] border-b-4 border-ring font-bold text-lg">
                      Shape
                    </h1>
                    <Select asChild value={shape} onValueChange={setShape}>
                      <SelectTrigger className="w-full mt-1 col-span-2">
                        {!shape.shapeId ? (
                          <h1>Select a shape</h1>
                        ) : (
                          <h1>{shape.shapeName}</h1>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {shapeOptions.map((i) => {
                            return (
                              <SelectItem key={i.shapeId} value={i}>
                                {i.shapeName}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto">
                      {formatter.format(shape.shapePrice)}
                    </h1>
                    <Separator className="col-span-4 my-2" />
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto text-lg font-extrabold">
                      Total:
                    </h1>
                    <h1 className="col-span-2 h-fit w-fit mx-auto my-auto text-xl text-ring">
                      {formatter.format(totalPrice)}
                    </h1>
                  </div>
                </Card>
              </div>
            </div>

            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setOpenEditOfferedProduct();
                  setFlavor({
                    flavorId: 0,
                    flavorName: "",
                    flavorPrice: 0,
                  });
                  setColor({
                    colorId: 0,
                    colorName: "",
                    colorPrice: 0,
                  });
                  setShape({
                    shapeId: 0,
                    shapeName: "",
                    shapePrice: 0,
                  });
                  setNewSizePrice(0);
                  setNewSize("");
                  setNewSizePriceValMessage("");
                  setNewSizeValMessage("");
                  setTotalPrice(0);
                }}
              >
                Close
              </Button>
              <Button
                disabled={
                  newSizePriceValMessage ||
                  newSizeValMessage ||
                  flavor.flavorId == 0 ||
                  color.colorId == 0
                }
                className="hover:bg-ring my-2"
                onClick={() => editDefaultProduct()}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!openRemoveOfferedProduct ? null : (
        <Dialog
          open={openRemoveOfferedProduct}
          onOpenChange={setOpenRemoveOfferedProduct}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit text-slate-800">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-lg font-extrabold">
                Remove{" "}
                <span className="mr-1">{selectedOfferedProduct.size}</span>
                {selectedOfferedProduct.productName} on the menu?
              </h1>
              <div className="w-fit flex flex-row gap-2 ml-auto mt-3">
                <Button
                  variant="outline"
                  className="w-fit rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white"
                  onClick={() => {
                    setOpenRemoveOfferedProduct(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="w-fit rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white"
                  onClick={() => {
                    removeDefaultProduct();
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!openRelaunchOfferedProduct ? null : (
        <Dialog
          open={openRelaunchOfferedProduct}
          onOpenChange={setOpenRelaunchOfferedProduct}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit text-slate-800">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-lg font-extrabold">
                Relaunch{" "}
                <span className="mr-1">{selectedOfferedProduct.size}</span>
                {selectedOfferedProduct.productName} on the menu?
              </h1>
              <div className="w-fit flex flex-row gap-2 ml-auto mt-3">
                <Button
                  variant="outline"
                  className="w-fit rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white"
                  onClick={() => {
                    openRelaunchOfferedProduct(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="w-fit rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white"
                  onClick={() => {
                    relaunchDefaultProduct();
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!openManageOfferedProduct ? null : (
        <Dialog
          open={openManageOfferedProduct}
          onOpenChange={setOpenManageOfferedProduct}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit text-slate-800">
            <div className="flex flex-row w-full">
              <h1 className="w-fit h-fit text-2xl font-extrabold">
                Offered Products on the Menu
              </h1>
              <Button
                variant="ghost"
                className="ml-auto hover:bg-transparent"
                onClick={() => setOpenManageOfferedProduct(false)}
              >
                <GrFormClose />
              </Button>
            </div>
            <div className="h-full w-full">
              <DefaultProductsTable
                data={selectedRow.prodDefaultProducts}
                openEditOfferedProducts={openEditOfferedProducts}
                openRemoveOfferedProducts={openRemoveOfferedProducts}
                openRelaunchOfferedProducts={openRelaunchOfferedProducts}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!offeredProductsOpen ? null : (
        <Dialog
          open={offeredProductsOpen}
          onOpenChange={setOfferedProductsOpen}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-fit md:h-fit text-slate-800">
            <div className="flex flex-row h-full w-full">
              <div className="flex flex-col items-center relative overflow-hidden w-fit h-full drop-shadow-md">
                <div
                  style={{
                    width: "370px",
                    height: "400px",
                    backgroundImage: `url('${selectedRow?.image}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div>
                  <div className="grid grid-cols-4 gap-x-2 w-full h-fit my-2">
                    <Badge
                      variant="outline"
                      className="text-slate-800 text-center bg-white col-span-2 border-zinc-300 shadow-md"
                    >
                      <p className="w-fit mx-auto flex text-lg">
                        {selectedRow?.categoryName}
                      </p>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-slate-800 text-center bg-white col-span-2  border-zinc-300 shadow-md"
                    >
                      <p className="w-fit mx-auto flex text-lg">
                        {selectedRow?.cakeTypeName}
                      </p>
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="w-fit h-full flex flex-col">
                <div className="h-fit w-full">
                  <div className="w-[30vw] h-fit grid grid-cols-4 gap-y-2 p-4">
                    <div className="col-span-4 w-full flex flex-row">
                      <h1 className="text-xl font-extrabold ml-2 mr-auto w-[40%] border-b-4 border-ring">
                        Product Name:
                      </h1>
                      <Button
                        variant="outline"
                        className=" w-fit ml-1 rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white"
                        onClick={() => openManageOfferedProducts()}
                      >
                        Manage Menu
                      </Button>
                    </div>

                    <h1 className="text-lg font-bold ml-10 mt-1 col-span-4">
                      {selectedRow?.productName}
                    </h1>
                    <h1 className="text-xl font-extrabold ml-2 mt-1 col-span-2  w-[40%] border-b-4 border-ring">
                      Shape:
                    </h1>
                    <h1 className="text-xl font-extrabold ml-2 mt-1 col-span-2  w-[40%] border-b-4 border-ring">
                      Color:
                    </h1>
                    <h1 className="text-lg font-bold ml-10 mt-1 col-span-2">
                      {!selectedProduct?.shapeId
                        ? `Default`
                        : `${selectedProduct.shapeName}`}
                    </h1>
                    <h1 className="text-lg font-bold ml-10 mt-1 col-span-2">
                      {!selectedProduct?.colorId
                        ? `Default`
                        : `${selectedProduct.colorName}`}
                    </h1>
                    <h1 className="text-xl font-extrabold ml-2 mt-1 col-span-4  w-[40%] border-b-4 border-ring">
                      Flavor:
                    </h1>
                    <h1 className="text-lg font-bold ml-10 mt-1 col-span-4">
                      {selectedProduct?.flavorName}
                    </h1>
                    <h1 className="text-xl font-extrabold ml-2 mt-1 col-span-4 w-[40%] border-b-4 border-ring">
                      Price
                    </h1>
                    <h1 className="text-lg font-extrabold ml-10 mt-1 col-span-4">
                      {formatter.format(selectedProduct?.default_total)}
                    </h1>
                  </div>
                </div>
                <div className="h-auto w-full mb-4">
                  <h1 className="text-2xl font-extrabold ml-5 ">
                    Available Sizes:
                  </h1>
                  <div className="flex flex-row gap-3 items-start ml-16 h-fit">
                    {selectedRow.prodDefaultProducts.map((i) => {
                      return (
                        <div key={i.defaultProductId}>
                          {i.isDefaultProductRemoved == 1 ? null : (
                            <button
                              className={`px-3 py-2 my-1 rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white focus:outline-red-700 ${
                                selectedProduct?.defaultProductId ==
                                i.defaultProductId
                                  ? "bg-ring text-white"
                                  : "bg-transparent"
                              }`}
                              onClick={() => setSelectedProduct(i)}
                            >
                              {i.size}
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button
                      className="px-4 py-2 my-1 rounded-md border-zinc-200 border-[1px] hover:bg-primary hover:text-white hover:border-primary active:bg-primary-foreground cursor-pointer focus:bg-ring focus:text-white focus:outline-red-700"
                      onClick={() => setOpenAddOfferedProduct(true)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

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
export default MenuTableTabs;

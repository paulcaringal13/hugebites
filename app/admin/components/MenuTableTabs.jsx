"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import ProductTable from "../components/ProductTable";
import CategoryTable from "../components/CategoryTable";
import MenuTable from "../components/MenuTable";
import { Button } from "@/components/ui/button";
import AddMenuForm from "../components/AddMenuForm";
import EditMenuForm from "./EditMenuForm";
import AddCategoryForm from "../components/AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MenuTableTabs = ({ productList, categoryList, menuList }) => {
  // STORAGE FOR ID OF SELECTED ROW
  const [selectedRow, setSelectedRow] = useState(0);

  // PRODUCT
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [removeProductOpen, setRemoveProductOpen] = useState(false);
  const [relaunchProductOpen, setRelaunchProductOpen] = useState(false);

  // PRODUCT TABLE STATE
  const [productTable, setProductTable] = useState(productList);

  const openAddProduct = () => {
    setAddProductOpen(true);
  };

  const closeAddProduct = () => {
    setAddProductOpen(false);
  };

  const openEditProduct = (rowData) => {
    setEditProductOpen(true);
    // PASS THE SELECTED ROW FROM MENU TABLE TO THIS PAGE
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
    // IF ADD
    {
      e == "add" ? setProductTable([...productTable, data]) : null;
    }

    // IF EDIT OR DELETE
    {
      e == "edit" ? setProductTable(data) : null;
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
        }),
      };

      const removeProductRes = await fetch(
        `http://localhost:3000/api/admin/menu/product/remove`,
        removeProd
      );

      const updatedTable = productTable.map((product) => {
        // let

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

      console.log(updatedTable);

      setProductTable(updatedTable);
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
        // let

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
      closeRelaunchProduct();
    } catch (e) {
      console.log(e);
    }
  };

  // CATEGORY
  // OPEN MODAL STATE
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

  // CATEGORY TABLE STATE
  const [categoryTable, setCategoryTable] = useState(categoryList);

  // FOR OPENING AND CLOSING THE ADD MODAL
  const openAddCategory = () => {
    setAddCategoryOpen(true);
  };

  const closeAddCategory = () => {
    setAddCategoryOpen(false);
  };

  const openEditCategory = (rowData) => {
    setEditCategoryOpen(true);
    // PASS THE SELECTED ROW FROM MENU TABLE TO THIS PAGE
    setSelectedRow(rowData);
  };

  const closeEditCategory = () => {
    setEditCategoryOpen(false);
  };

  const updateCategoryTable = (data, e) => {
    // IF ADD
    {
      e == "add" ? setCategoryTable([...categoryTable, data]) : null;
    }

    // IF EDIT OR DELETE
    {
      e == "edit" ? setCategoryTable(data) : null;
    }
  };

  // MENU
  // OPEN MODAL STATE
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);

  // MENU TABLE STATE
  const [menuTable, setMenuTable] = useState(menuList);

  // FOR OPENING AND CLOSING THE ADD MODAL
  const openAddMenu = () => {
    setAddMenuOpen(true);
  };

  const closeAddMenu = () => {
    setAddMenuOpen(false);
  };

  const openEditMenu = (rowData) => {
    setEditMenuOpen(true);
    // PASS THE SELECTED ROW FROM MENU TABLE TO THIS PAGE
    setSelectedRow(rowData);
  };

  const closeEditMenu = () => {
    setEditMenuOpen(false);
  };

  // UPDATE THE TABLE ROWS FOR FRONT END
  const updateMenuTable = (data, e) => {
    // IF ADD
    {
      e == "add" ? setMenuTable([...menuTable, data]) : null;
    }

    // IF EDIT OR DELETE
    {
      e == "edit" ? setMenuTable(data) : null;
    }
  };

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
          <TabsTrigger value="menu" className="w-3/6 me-auto ">
            Menu
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
                // TABLE
                productTable={productTable}
                // OPEN EDIT FORM
                openEditProduct={openEditProduct}
                // UPDATING TABLE IN FRONT END
                updateProductTable={updateProductTable}
                // FOR GETTING SELECTED ROW VALUES
                selectedRow={selectedRow}
                relaunchProductOpen={relaunchProductOpen}
                openRelaunchProduct={openRelaunchProduct}
                removeProductOpen={removeProductOpen}
                openRemoveProduct={openRemoveProduct}
                setRemoveProductOpen={setRemoveProductOpen}
                setRelaunchProductOpen={setRelaunchProductOpen}
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
                // TO LOOK IF THE CATEGORY CONTAINS A PRODUCT
                productTable={productTable}
                // FOR UPDATING TABLE IN FRONT END
                updateCategoryTable={updateCategoryTable}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="menu">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">Menu Table</CardTitle>
              <div>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddMenu();
                  }}
                >
                  Add Menu
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <MenuTable
                // TABLE DATA FOR FRONT END
                data={menuTable}
                openEditMenu={openEditMenu}
                // TO LOOK IF THE MENU CONTAINS A CATEGORY
                categoryTable={categoryTable}
                // FOR UPDATING TABLE IN FRONT END
                updateMenuTable={updateMenuTable}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PRODUCT MODALS */}
      {addProductOpen ? (
        <AddProductForm
          addProductOpen={addProductOpen}
          setAddProductOpen={setAddProductOpen}
          closeAddProduct={closeAddProduct}
          // UPDATING FOR FRONTEND
          updateProductTable={updateProductTable}
          // FOR MENU SELECTION
          menuTable={menuTable}
          categoryTable={categoryTable}
          // FOR VALIDATION
          productTable={productTable}
        />
      ) : null}

      {editProductOpen ? (
        <EditProductForm
          editProductOpen={editProductOpen}
          setEditProductOpen={setEditProductOpen}
          closeEditProduct={closeEditProduct}
          // UPDATE TABLE IN FRONT END
          updateProductTable={updateProductTable}
          // OLD VALUES AND UPDATING THE TABLE IN FRONT END
          productTable={productTable}
          // FOR PASSING THE ID OF THE SELECTED ROW
          selectedRow={selectedRow}
          // FOR SELECT
          menuTable={menuTable}
          categoryTable={categoryTable}
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
          // FOR MENU SELECTION
          menuTable={menuTable}
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
          // FOR SELECT
          menuTable={menuTable}
        />
      ) : null}

      {/* MENU MODALS */}
      {addMenuOpen ? (
        <AddMenuForm
          addMenuOpen={addMenuOpen}
          setAddMenuOpen={setAddMenuOpen}
          // CLOSE FORM
          closeAddMenu={closeAddMenu}
          // FOR UPDATING TABLE IN FRONT END
          updateMenuTable={updateMenuTable}
          // FOR VALIDATION
          menuTable={menuTable}
        />
      ) : null}

      {editMenuOpen ? (
        <EditMenuForm
          editMenuOpen={editMenuOpen}
          setEditMenuOpen={setEditMenuOpen}
          closeEditMenu={closeEditMenu}
          // UPDATE TABLE IN FRONT END
          updateMenuTable={updateMenuTable}
          // OLD VALUES AND UPDATING THE TABLE IN FRONT END
          menuTable={menuTable}
          // FOR PASSING THE ID OF THE SELECTED ROW
          selectedRow={selectedRow}
        />
      ) : null}
    </div>
  );
};
export default MenuTableTabs;

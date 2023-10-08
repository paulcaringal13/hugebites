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

const MenuTableTabs = async ({ productList }) => {
  const getAllProducts = async () => {
    // const res = await fetch(`http://localhost:3000/api/admin/menu/product`);
    const res = await fetch(`http://localhost:3000/api/admin/menu/product`);

    const data = await res.json();

    const { results } = data;

    const products = results[0];

    return products;
  };

  const productX = await getAllProducts();
  console.log(productX);
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
              {/* <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openWasteLog();
                  }}
                >
                  Waste Log
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openIngredientList();
                  }}
                >
                  Ingredient List
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddStock();
                  }}
                >
                  Add Stock
                </Button>
              </div> */}
            </CardHeader>
            <CardContent className="px-6">
              {/* <InventoryTable
                data={ingredientStocks}
                updateStocks={updateStocks}
                openEditStock={openEditStock}
                closeEditStock={closeEditStock}
                editStockOpen={editStockOpen}
                setEditStockOpen={setEditStockOpen}
                rowSelected={rowSelected}
                ingredientList={ingredientList}
                refreshStocksTable={getAllIngredientStocks}
              /> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="category">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Category Table
              </CardTitle>
              {/* <div className="flex flex-row justify-between ms-auto">
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openWastePackagingLog();
                  }}
                >
                  Waste Log
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openPackagingList();
                  }}
                >
                  Packaging List
                </Button>
                <Button
                  className="mx-1 bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
                  onClick={() => {
                    openAddPackagingStock();
                  }}
                >
                  Add Stock
                </Button>
              </div> */}
            </CardHeader>
            <CardContent className="px-6">
              {/* <PackagingTable
                data={packagingStocks}
                updatePackagingStock={updatePackagingStock}
                openEditPackagingStock={openEditPackagingStock}
                closeEditPackagingStock={closeEditPackagingStock}
                editPackagingStockOpen={editPackagingStockOpen}
                setEditPackagingStockOpen={setEditPackagingStockOpen}
                rowSelected={rowSelected}
                packagingList={packagingList}
                refreshStocksTable={getAllPackagingStocks}
              /> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="menu">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">Menu Table</CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              {/* <CustomerTable data={customerArray} /> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default MenuTableTabs;

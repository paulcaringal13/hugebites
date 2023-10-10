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

const MenuTableTabs = ({ productList, categoryList }) => {
  console.log(categoryList);
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
              <ProductTable data={productList} />
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
              <CategoryTable data={categoryList} />
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

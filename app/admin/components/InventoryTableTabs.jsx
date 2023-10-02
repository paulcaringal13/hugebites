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
import InventoryTable from "./InventoryTable";

import { Button } from "../../../components/ui/button";

const InventoryTableTabs = () => {
  const [ingredients, setIngredients] = useState([]);

  const getAllIngredients = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients`
    );
    const data = await res.json();

    const resultIngredients = data.map((ingredient) => {
      const newPurchaseDate = new Date(ingredient.purchaseDate);
      const newExpirationDate = new Date(ingredient.expirationDate);

      const options = { month: "long" };
      const nameOfPurchaseMonth = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(newPurchaseDate);

      const nameOfExpirationMonth = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(newPurchaseDate);

      const formattedPurchaseDate =
        nameOfPurchaseMonth +
        "-" +
        newPurchaseDate.getDate() +
        "-" +
        newPurchaseDate.getFullYear();

      const formattedExpirationDate =
        nameOfExpirationMonth +
        "-" +
        newExpirationDate.getDate() +
        "-" +
        newExpirationDate.getFullYear();

      return {
        ingredientId: ingredient.ingredientId,
        ingredientName: ingredient.ingredientName,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        purchaseDate: formattedPurchaseDate,
        expirationDate: formattedExpirationDate,
        isExpired: ingredient.isExpired,
      };
    });

    setIngredients(resultIngredients);
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  //   const [employeeArray, setEmployeeArray] = useState([]);
  //   const [customerArray, setCustomerArray] = useState([]);

  //   const getAllEmployeeAccounts = async () => {
  //     const adminRes = await fetch(
  //       `http://localhost:3000/api/admin/account/employee`
  //     );
  //     const data = await adminRes.json();

  //     const { results } = data;

  //     const x = results.map((user) => {
  //       return {
  //         employeeId: `${user.employeeId}`,
  //         firstName: `${user.firstName}`,
  //         lastName: `${user.lastName}`,
  //         contact: `${user.contact}`,
  //         email: `${user.email}`,
  //         username: `${user.username}`,
  //         userRole: `${user.userRole}`,
  //         accStatus: `${user.accStatus}`,
  //         accountType: `${user.accountType}`,
  //       };
  //     });

  //     const employeeArr = x.filter((user) => user.userRole != "Customer");

  //     setEmployeeArray(employeeArr);
  //   };

  //   const getAllCustomerAccounts = async () => {
  //     const res = await fetch(`http://localhost:3000/api/admin/account/customer`);
  //     const data = await res.json();
  //     const { results } = data;

  //     // convert to string
  //     const x = results.map((user) => {
  //       return {
  //         customerId: `${user.customerId}`,
  //         firstName: `${user.firstName}`,
  //         lastName: `${user.lastName}`,
  //         contact: `${user.contact}`,
  //         email: `${user.email}`,
  //         username: `${user.username}`,
  //         address: `${user.address}`,
  //         userRole: `${user.userRole}`,
  //         accStatus: `${user.accStatus}`,
  //         accountType: `${user.accountType}`,
  //       };
  //     });

  //     const customerArray = x.filter((user) => user.userRole == "Customer");

  //     setCustomerArray(customerArray);
  //   };

  //   useEffect(() => {
  //     getAllEmployeeAccounts();
  //     getAllCustomerAccounts();
  //   }, []);

  return (
    <div className="w-full mx-10 my-5">
      <Tabs defaultValue="inventory">
        <TabsList className="w-3/6">
          <TabsTrigger value="inventory" className="w-3/6 ">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="packaging" className="w-3/6 me-auto ">
            Packaging
          </TabsTrigger>
          <TabsTrigger value="product" className="w-3/6 me-auto ">
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Ingredients Inventory
              </CardTitle>
              <div className="my-auto">
                {/* <CreateAccountForm refreshTable={getAllEmployeeAccounts} /> */}
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <InventoryTable data={ingredients} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packaging">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Packaging Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              {/* <CustomerTable data={customerArray} /> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="product">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Available Products
              </CardTitle>
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
export default InventoryTableTabs;

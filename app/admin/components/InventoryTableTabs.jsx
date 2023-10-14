"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import PackagingTable from "./PackagingTable";
import InventoryTable from "./InventoryTable";

import { Button } from "../../../components/ui/button";
import IngredientsList from "../components/IngredientsList";
import PackagingList from "../components/PackagingList";
import AddPackagingStockForm from "../components/AddPackagingStockForm";
import PackagingWasteTable from "../components/PackagingWasteTable";

import AddStockForm from "../components/AddStockForm";
import IngredientWasteTable from "../components/IngredientWasteTable";

import dayjs from "dayjs";
const InventoryTableTabs = () => {
  // ARRAY FOR TABLE
  const [ingredientStocks, setIngredientStocks] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [wasteList, setWasteList] = useState([]);

  const [packagingStocks, setPackagingStocks] = useState([]);
  const [packagingList, setPackagingList] = useState([]);
  const [packagingWasteList, setPackagingWasteList] = useState([]);

  // STATE HANDLER

  const [ingredientListOpen, setIngredientListOpen] = useState(false);
  const [wasteLogOpen, setWasteLogOpen] = useState(false);
  const [editStockOpen, setEditStockOpen] = useState(false);
  const [addStockOpen, setAddStockOpen] = useState(false);

  const [packagingListOpen, setPackagingListOpen] = useState(false);
  const [wastePackagingOpen, setWastePackagingOpen] = useState(false);
  const [editPackagingStockOpen, setEditPackagingStockOpen] = useState(false);
  const [addPackagingStockOpen, setAddPackagingStockOpen] = useState(false);

  // FOR EDIT FEATURE STATE FOR SELECTED STOCK ID
  const [rowSelected, setRowSelected] = useState({});

  // INGREDIENTS FUNCTIONS
  // // FOR OPENING AND CLOSING DIALOGS AND TOASTER.
  const openAddStock = () => {
    setAddStockOpen(true);
  };

  const closeAddStock = () => {
    setAddStockOpen(false);
  };

  const openIngredientList = () => {
    setIngredientListOpen(true);

    const x = ingredientList.map((i) => {
      const { ingredientId, unit } = i;

      // get stocks of ingredient
      const stocks = ingredientStocks.filter(
        (j) => ingredientId === j.ingredientId && unit === j.unit
      );

      // get total quantity
      const totalQuantity = stocks.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0 // inital value
      );

      return { ...i, totalQuantity };
    });

    setIngredientList(x);
  };

  const closeIngredientList = () => {
    setIngredientListOpen(false);
  };

  const openWasteLog = () => {
    setWasteLogOpen(true);
  };

  const closeWasteLog = () => {
    setWasteLogOpen(false);
  };

  const openEditStock = (stockData) => {
    setEditStockOpen(true);
    setRowSelected(stockData);
  };

  const closeEditStock = () => {
    setEditStockOpen(false);
  };

  // DEDUCT OR ADD QUANITTY TO STOCK AND UPDATES VALUE OF THE INGREDIENT TOTAL QUANITTY
  const updateStocks = async (ingredientId, quantity, stock) => {
    const qty = new Number(quantity);
    const stockQty = new Number(stock.quantity);

    const newStockQuantity = new Number(stockQty + qty);

    const stockData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stock.stockId,
        quantity: newStockQuantity,
      }),
    };

    try {
      const stockRes = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        stockData
      );
      const stockResponse = await stockRes.json();
      getAllIngredientStocks();

      return stockResponse;
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TO STOCKS TABLE AND ADD TO WASTE TABLE IF STOCK IS EXPIRED OR QUANTITY IS 0
  const checkForWaste = async (wasteData, stockId) => {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
      }),
    };
    try {
      const deleteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients`,
        deleteData
      );
    } catch (e) {
      console.log(e);
    }

    try {
      const wasteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/ingredients/waste`,
        wasteData
      );
    } catch (e) {
      console.log(e);
    }

    getWaste();
  };

  // GET ALL INGREDIENTS
  const getAllIngredient = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/ingredient`);
    const data = await res.json();

    setIngredientList(data);

    return data;
  };

  // GET ALL STOCKS DATA
  const getAllIngredientStocks = async () => {
    const dateToday = dayjs().format("MMMM DD, YYYY");

    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients`
    );
    const data = await res.json();

    const resultIngredients = data.filter(
      (ingredient) => ingredient.quantity != 0
    );

    const waste = data.map((i) => {
      let wasteData;
      let wasteProduct = false;

      wasteData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredientId: i.ingredientId,
          quantity: i.quantity,
          wasteDate: i.expirationDate,
          stockId: i.stockId,
        }),
      };

      {
        dateToday == i.expirationDate || i.quantity == 0
          ? (wasteProduct = true)
          : null;
      }

      {
        wasteProduct && checkForWaste(wasteData, i.stockId);
      }
    });

    setIngredientStocks(resultIngredients);

    return resultIngredients;
  };

  // GET ALL WASTE DATA
  const getWaste = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/ingredients/waste`
    );
    const data = await res.json();

    setWasteList(data);

    return data;
  };

  useEffect(() => {
    getAllIngredient();
    getAllIngredientStocks();
    getWaste();
    getAllPackagingStocks();
    getAllPackaging();
    getPackagingWaste();
  }, []);

  const getAllPackagingStocks = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/packaging`
    );
    const data = await res.json();

    const packaging = data.filter((packaging) => packaging.quantity != 0);

    data.forEach((i) => {
      let wasteData;
      let wastePackaging = false;

      wasteData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packagingId: i.packagingId,
          quantity: i.quantity,
          wasteDate: dayjs().format("MMMM DD, YYYY"),
          stockId: i.stockId,
        }),
      };

      {
        i.quantity == 0 ? (wastePackaging = true) : null;
      }

      {
        wastePackaging && checkForPackagingWaste(wasteData, i.stockId);
      }
    });

    setPackagingStocks(packaging);

    return packaging;
  };

  const getAllPackaging = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/packaging`);
    const data = await res.json();

    setPackagingList(data);

    return data;
  };

  const getPackagingWaste = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/inventory/packaging/waste`
    );
    const data = await res.json();

    setPackagingWasteList(data);

    return data;
  };

  const checkForPackagingWaste = async (wasteData, stockId) => {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stockId,
      }),
    };
    try {
      const deleteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging`,
        deleteData
      );
    } catch (e) {
      console.log(e);
    }

    try {
      const wasteRes = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging/waste`,
        wasteData
      );
    } catch (e) {
      console.log(e);
    }

    getPackagingWaste();
  };

  // ADD AND DEDUCT FROM THE TABLE STOCKS
  const updatePackagingStock = async (packagingId, quantity, stock) => {
    const qty = new Number(quantity);
    const stockQty = new Number(stock.quantity);

    const newStockQuantity = new Number(stockQty + qty);

    const stockData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockId: stock.stockId,
        quantity: newStockQuantity,
      }),
    };

    try {
      const stockRes = await fetch(
        `http://localhost:3000/api/admin/inventory/packaging`,
        stockData
      );
      getAllPackagingStocks();
    } catch (error) {
      console.log(error);
    }
  };

  const openAddPackagingStock = () => {
    setAddPackagingStockOpen(true);
  };

  const closeAddPackagingStock = () => {
    setAddPackagingStockOpen(false);
  };

  const openPackagingList = () => {
    setPackagingListOpen(true);

    const x = packagingList.map((i) => {
      const { packagingId, size } = i;

      // get stocks of ingredient
      const stocks = packagingStocks.filter(
        (j) => packagingId === j.packagingId && size === j.size
      );

      // get total quantity
      const totalQuantity = stocks.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0 // inital value
      );

      return { ...i, totalQuantity };
    });

    setPackagingList(x);
  };

  const closePackagingList = () => {
    setPackagingListOpen(false);
  };

  const openWastePackagingLog = () => {
    setWastePackagingOpen(true);
  };

  const closeWastePackagingLog = () => {
    setWastePackagingOpen(false);
  };

  const openEditPackagingStock = (stockData) => {
    setEditPackagingStockOpen(true);
    setRowSelected(stockData);
  };

  const closeEditPackagingStock = () => {
    setEditPackagingStockOpen(false);
  };

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
              <CardTitle className="text-2xl my-2 ms-2">
                Ingredient Stocks
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
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
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <InventoryTable
                data={ingredientStocks}
                updateStocks={updateStocks}
                openEditStock={openEditStock}
                closeEditStock={closeEditStock}
                editStockOpen={editStockOpen}
                setEditStockOpen={setEditStockOpen}
                rowSelected={rowSelected}
                ingredientList={ingredientList}
                refreshStocksTable={getAllIngredientStocks}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packaging">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Packaging Stocks
              </CardTitle>
              <div className="flex flex-row justify-between ms-auto">
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
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <PackagingTable
                data={packagingStocks}
                updatePackagingStock={updatePackagingStock}
                openEditPackagingStock={openEditPackagingStock}
                closeEditPackagingStock={closeEditPackagingStock}
                editPackagingStockOpen={editPackagingStockOpen}
                setEditPackagingStockOpen={setEditPackagingStockOpen}
                rowSelected={rowSelected}
                packagingList={packagingList}
                refreshStocksTable={getAllPackagingStocks}
              />
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

      {/* INGREDIENT LIST  */}
      {ingredientListOpen ? (
        <IngredientsList
          closeIngredientList={closeIngredientList}
          ingredientListOpen={ingredientListOpen}
          ingredientStocks={ingredientStocks}
          setIngredientList={setIngredientList}
          setIngredientListOpen={setIngredientListOpen}
          refreshTable={getAllIngredient}
          data={ingredientList}
          ingredientList={ingredientList}
        />
      ) : null}

      {/* ADD STOCK FORM  */}
      {addStockOpen ? (
        <AddStockForm
          closeAddStock={closeAddStock}
          addStockOpen={addStockOpen}
          setAddStockOpen={setAddStockOpen}
          refreshTable={getAllIngredientStocks}
          refreshIngredientListTable={getAllIngredient}
          ingredientList={ingredientList}
          ingredientStocks={ingredientStocks}
        />
      ) : null}

      {/* WASTE LOG LIST  */}
      {wasteLogOpen ? (
        <IngredientWasteTable
          data={wasteList}
          closeWasteLog={closeWasteLog}
          wasteLogOpen={wasteLogOpen}
          setWasteLogOpen={setWasteLogOpen}
          refreshTable={getWaste}
        />
      ) : null}

      {packagingListOpen ? (
        <PackagingList
          closePackagingList={closePackagingList}
          packagingListOpen={packagingListOpen}
          setPackagingListOpen={setPackagingListOpen}
          data={packagingList}
          getAllPackaging={getAllPackaging}
        />
      ) : null}

      {addPackagingStockOpen ? (
        <AddPackagingStockForm
          closeAddPackagingStock={closeAddPackagingStock}
          addPackagingStockOpen={addPackagingStockOpen}
          setAddPackagingStockOpen={setAddPackagingStockOpen}
          packagingList={packagingList}
          packagingStocks={packagingStocks}
          refreshTable={getAllPackagingStocks}
        />
      ) : null}

      {wastePackagingOpen ? (
        <PackagingWasteTable
          data={packagingWasteList}
          closeWastePackagingLog={closeWastePackagingLog}
          wastePackagingOpen={wastePackagingOpen}
          setWastePackagingOpen={setWastePackagingOpen}
          refreshTable={getPackagingWaste}
        />
      ) : null}
    </div>
  );
};
export default InventoryTableTabs;

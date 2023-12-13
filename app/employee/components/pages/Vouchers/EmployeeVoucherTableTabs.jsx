"use client";
import { useEffect, useState } from "react";
import EmployeeCreateVoucher from "./EmployeeCreateVoucher";
import EmployeeVoucherTable from "./EmployeeVoucherTable";
import EmployeeCustomerVouchers from "./EmployeeCustomerVouchers";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";

const EmployeeVoucherTableTabs = () => {
  const [customerVouchers, setCustomerVouchers] = useState([]);
  const [voucherArray, setVoucherArray] = useState([]);

  const getAllCustomerVouchers = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/voucher/customerVoucher`,
      {
        cache: "no-store",
      }
    );

    const data = await adminRes.json();

    setCustomerVouchers(data);
  };

  const getVouchers = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/voucher`, {
      cache: "no-store",
    });
    const data = await res.json();

    setVoucherArray(data);
  };

  useEffect(() => {
    getAllCustomerVouchers();
    getVouchers();
  }, []);

  return (
    <div className="w-full flex mx-10 my-5">
      <Tabs defaultValue="customerVouchers">
        <TabsList className="w-3/6">
          <TabsTrigger value="customerVouchers" className="w-3/6 ">
            Customer Vouchers
          </TabsTrigger>
          <TabsTrigger value="vouchers" className="w-3/6 me-auto ">
            Vouchers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="customerVouchers">
          <Card
            style={{
              width: "calc(100vw - 250px)",
            }}
          >
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Customer Vouchers
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <EmployeeCustomerVouchers data={customerVouchers} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vouchers">
          <Card
            style={{
              width: "calc(100vw - 250px)",
            }}
          >
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">Vouchers</CardTitle>
              <div className="my-auto">
                <EmployeeCreateVoucher refreshTable={getVouchers} />
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <EmployeeVoucherTable
                data={voucherArray}
                setVoucherArray={setVoucherArray}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default EmployeeVoucherTableTabs;

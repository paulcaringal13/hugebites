"use client";
import { useState } from "react";
import dayjs from "dayjs";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { FaRegEye } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import { TbMailForward, TbMail } from "react-icons/tb";

const OrderTable = ({
  data,
  openViewOrder,
  openAttachImage,
  openViewPayment,
  openSendRequest,
  openRequestAlert,
  closeRequestAlert,
  setAlertMessage,
  setAlertTitle,
  setAlertType,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");

  const handleViewButton = async (order) => {
    const selectedOrderedProducts = await getOrderedProducts(order);
    const orderedProductAddOns = await getOrderedProductAddOns(order);
    const orderedProductSpecialProp = await getOrderedProductSpecialProp(order);

    const orderedProductWithAddOns = selectedOrderedProducts.map((oP) => {
      const { orderedProductId } = oP;
      let shape;

      !oP.shapeName ? (shape = "Default") : (shape = oP.shapeName);

      const addOnsList = orderedProductAddOns.filter(
        (opAddOn) => opAddOn.orderedProductId == orderedProductId
      );

      const specialPropertyList = orderedProductSpecialProp.filter(
        (opSpecialProp) => opSpecialProp.orderedProductId == orderedProductId
      );

      return {
        ...oP,
        shapeName: shape,
        addOns: addOnsList,
        specialProperty: specialPropertyList,
      };
    });

    openViewOrder(orderedProductWithAddOns, order);
  };

  const getOrderedProducts = async (order) => {
    const { orderId } = order;
    const res = await fetch(
      `http://localhost:3000/api/customer/order/orderedProducts?` +
        new URLSearchParams({
          orderId: orderId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    return data;
  };

  const getOrderedProductAddOns = async (order) => {
    const { orderId } = order;

    const res = await fetch(
      `http://localhost:3000/api/customer/order/addOns?` +
        new URLSearchParams({
          orderId: orderId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    return data;
  };

  const getOrderedProductSpecialProp = async (order) => {
    const { orderId } = order;

    const res = await fetch(
      `http://localhost:3000/api/customer/order/specialProperty?` +
        new URLSearchParams({
          orderId: orderId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    return data;
  };

  const columns = [
    {
      header: "View Order",
      id: "viewOrder",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div
            className="h-fit w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:bg-white active:scale-110  duration-100"
            variant="outline"
            onClick={() => {
              closeRequestAlert();
              handleViewButton(rowData);
            }}
          >
            <FaRegEye className="text-black mx-auto my-auto " />
          </div>
        );
      },
    },
    {
      header: "Request Refund",
      id: "request",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <>
            {rowData.hasRequest == 0 ? (
              <div
                className="h-fit w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:bg-white active:scale-110  duration-100"
                variant="outline"
                onClick={() => {
                  const setRowIsNotReceived = () => {
                    setAlertMessage(
                      "Refund is only available after receiving the product!"
                    );
                    setAlertTitle("Request Not Granted!");
                    setAlertType("warning");
                    openRequestAlert();
                  };
                  dayjs().isBefore(rowData.datePickUp) &&
                  rowData.orderStatus != "Cancelled"
                    ? setRowIsNotReceived()
                    : null;

                  const setRowIsNotPaid = () => {
                    setAlertMessage(
                      "Order not paid. You cannot send a request for refund!"
                    );
                    setAlertTitle("Oops!");
                    setAlertType("warning");
                    openRequestAlert();
                  };
                  rowData.isPaid == 0 && rowData.orderStatus != "Cancelled"
                    ? setRowIsNotPaid()
                    : null;

                  const setRowIsCancelled = () => {
                    setAlertMessage("Action failed. Order is cancelled!");
                    setAlertTitle("Oops!");
                    setAlertType("destructive");
                    openRequestAlert();
                  };
                  rowData.orderStatus == "Cancelled"
                    ? setRowIsCancelled()
                    : null;

                  rowData.isPaid == 1 &&
                  dayjs().isAfter(rowData.datePickUp) &&
                  dayjs().isBefore(rowData.refundDeadline)
                    ? openSendRequest(rowData)
                    : null;
                }}
              >
                <TbMail className="text-black mx-auto my-auto h-4 w-4 " />
              </div>
            ) : (
              <div
                className={`${
                  rowData.orderStatus == "Refunded" ||
                  rowData.orderStatus == "Rejected"
                    ? "opacity-[0.5] my-auto h-fit w-fit border-2 p-2 rounded-full text-md mx-auto"
                    : "h-fit w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:bg-white active:scale-110 duration-100"
                }`}
                variant="outline"
                onClick={() => {
                  setAlertMessage("You can only send one request!");
                  setAlertTitle("Oops! Request not granted.");
                  setAlertType("info");
                  openRequestAlert();
                }}
              >
                <TbMailForward className="text-black mx-auto my-auto h-4 w-4 " />
              </div>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "orderId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order ID
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Total Price",
      id: "totalPrice",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="h-fit w-fit text-md mx-auto">
            {rowData.isPriceFinal == 0 && rowData.orderStatus != "Cancelled"
              ? "Pending"
              : `${rowData.totalPrice}`}
          </div>
        );
      },
    },
    {
      accessorKey: "amountPaid",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount Paid
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Status
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },

    {
      accessorKey: "methodOfPayment",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Method of Payment
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "dateOrdered",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Ordered
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "datePickUp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pick up date
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "paymentDeadline",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Deadline
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "refundDeadline",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Refund Deadline
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      globalFilter: search,
      columnFilters,
      columnVisibility,
    },
    onGlobalFilterChange: setSearch,
  });

  return (
    <div className="w-[95%] h-fit mx-8 mb-8 mt-0">
      <div className="flex items-center py-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-2/6"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-transparent text-black border hover:border-ring hover:text-white hover:bg-primary"
            >
              Hide Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="h-24 bg-primary hover:bg-primary"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      <h1 className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </h1>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id != "orderStatus" ? (
                        <div className="text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-row gap-2 w-full mx-auto">
                          <h1 className="text-end w-full my-auto">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </h1>
                          {row.original.orderStatus == "Paid" && (
                            <div
                              className="h-fit w-fit my-auto border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:scale-110 active:bg-white duration-100"
                              variant="outline"
                              onClick={() => openViewPayment(row.original)}
                            >
                              <FaRegEye />
                            </div>
                          )}

                          {row.original.orderStatus == "Cancelled" ||
                          row.original.orderStatus == "Pending" ||
                          row.original.orderStatus == "Refunded" ? (
                            <div
                              className={`${
                                !row.original.proofOfPaymentImage ||
                                row.original.orderStatus == "Refunded"
                                  ? "opacity-[0.5] my-auto h-fit w-fit border-2 p-2 rounded-full text-md ml-auto"
                                  : "h-fit my-auto w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:scale-110 active:bg-white duration-100"
                              }`}
                              variant="outline"
                              onClick={() => {
                                !row.original.proofOfPaymentImage ||
                                row.original.orderStatus == "Refunded"
                                  ? null
                                  : openViewPayment(row.original);
                              }}
                            >
                              <FaRegEye />
                            </div>
                          ) : null}

                          {row.original.orderStatus != "Paid" &&
                          row.original.orderStatus != "Cancelled" &&
                          row.original.orderStatus != "Pending" &&
                          row.original.orderStatus != "Refunded" ? (
                            <button
                              className={`h-fit my-auto w-fit border-2 p-2 rounded-full text-md mx-auto ${
                                row.original.isPriceFinal == 0
                                  ? "opacity-[0.5] my-auto h-fit w-fit border-2 p-2 rounded-full text-md ml-auto"
                                  : "cursor-pointer transform transition-all hover:scale-125 active:scale-110  active:bg-white duration-100"
                              } `}
                              variant="outline"
                              onClick={() => {
                                openAttachImage(row.original);
                              }}
                              disabled={row.original.isPriceFinal == 0}
                            >
                              <RiAttachment2 />
                            </button>
                          ) : null}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 me-5 ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hover:bg-primary hover:text-white duration-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hover:bg-primary hover:text-white duration-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;

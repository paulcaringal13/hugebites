"use client";
import { useState, useEffect } from "react";
import * as React from "react";
import { Label } from "../../../../../components/ui/label";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
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
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { Input } from "../../../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { ReloadIcon } from "@radix-ui/react-icons";

const CustomerTable = ({ data }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const [openUseVoucher, setOpenUseVoucher] = useState(false);
  const [voucher, setVoucher] = useState({});
  const [userId, setUserId] = useState(0);
  const [voucherArray, setVoucherArray] = useState([]);
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const getVouchers = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/voucher`, {
      cache: "no-store",
    });
    const data = await res.json();

    setVoucherArray(data);
  };

  const giveVoucher = async () => {
    const voucherPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voucherId: voucher.voucherId,
        customerId: userId,
      }),
    };

    try {
      const voucherRes = await fetch(
        `http://localhost:3000/api/admin/voucher/customerVoucher`,
        voucherPost
      );
      const res = await voucherRes.json();

      setAlertMessage("Voucher sent successfully.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();
      setOpenUseVoucher(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openRequestAlert = () => {
    setAlertMessageOpen(true);
    setTimeout(() => {
      setAlertMessageOpen(false);
    }, 3000);
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");

  const columns = [
    {
      accessorKey: "customerId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer Id
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },

    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            className="my-auto mx-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "contact",
      header: "Contact",
    },
    {
      accessorKey: "accStatus",
      header: "Account Status",
    },
    {
      header: "Total Spent",
      id: "totalSpent",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="h-fit w-fit text-md mx-auto">
            {formatter.format(rowData.totalSpent)}
          </div>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <Button
            variant="outline"
            className="text-md font-bold p-5"
            onClick={() => {
              setOpenUseVoucher(true);
              setUserId(user.customerId);
            }}
          >
            Give voucher
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
      columnFilters,
      globalFilter: search,
      columnVisibility,
    },
  });

  useEffect(() => {
    getVouchers();
  }, []);

  return (
    <div className="w-full mt-0">
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
            <Button variant="outline" className="ml-auto">
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
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!search ? (
            <TableBody>
              {table?.getRowModel().rows?.length ? (
                table?.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center relative overflow-hidden text-stone-600"
                  >
                    <ReloadIcon className="mx-auto my-5 h-3/6 w-3/6 animate-spin" />
                    <Label> Loading Data</Label>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
          )}
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        {!openUseVoucher ? null : (
          <Dialog
            open={openUseVoucher}
            onOpenChange={setOpenUseVoucher}
            onClose
          >
            <DialogContent className="max-w-full max-h-full md:w-[40%] md:h-[65%] flex flex-col p-0 overflow-y-scroll">
              <div className="flex flex-col gap-2 h-auto w-full px-4 py-6">
                <h1 className="text-3xl font-extrabold text-start">
                  Select Voucher
                </h1>
                {voucherArray.map((i) => {
                  return (
                    <div
                      key={i.voucherId}
                      className={`border-[1px] border-zinc-200 flex flex-col w-full p-3 rounded-sm shadow-sm cursor-pointer text-sm active:bg-ring focus:outline-none focus:bg-ring focus:text-white ${
                        voucher.voucherId == i.voucherId
                          ? "bg-ring border-ring text-white"
                          : "bg-transparent"
                      }`}
                      onClick={() => setVoucher(i)}
                    >
                      <h1 className="text-lg font-extrabold">
                        {i.voucherName}
                      </h1>
                      <Separator />
                      <h1 className="text-sm font-light indent-4 mt-2">
                        Get a {i.discount}% discount for your next order!
                      </h1>
                    </div>
                  );
                })}
              </div>
              <DialogFooter className="border-t-2 pr-2 border-gray-200 mt-auto">
                <Button
                  className="bg-ring hover:bg-ring text-white active:bg-ring-foreground my-2"
                  onClick={() => setOpenUseVoucher(false)}
                >
                  Close
                </Button>
                <Button
                  className="bg-ring hover:bg-ring text-white active:bg-ring-foreground my-2"
                  onClick={() => giveVoucher()}
                >
                  Give Voucher
                </Button>
              </DialogFooter>
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
    </div>
  );
};

export default CustomerTable;

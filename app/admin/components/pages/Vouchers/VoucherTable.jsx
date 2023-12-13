"use client";
import { useState } from "react";
import * as React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BiSolidUserX } from "react-icons/bi";
import { BiSolidUserCheck } from "react-icons/bi";
import { Label } from "../../../../../components/ui/label";
import {
  IoInformationCircleOutline,
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  MdOutlineRestoreFromTrash,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const VoucherTable = ({ data, setVoucherArray }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");

  const columns = [
    {
      accessorKey: "voucherId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Voucher Id
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "voucherName",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Voucher Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "discount",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Discount Offered
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Delete Voucher",
      id: "remove",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-transparent text-black hover:bg-red-500 hover:text-white">
                  <MdOutlineDeleteOutline className="text-xl font-light" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to
                    <span className="text-red-500"> delete</span> this voucher?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-transparent text-black border-[1px] border-zinc-200 hover:bg-red-500 hover:text-white"
                    onClick={async () => {
                      const deleteData = {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          voucherId: rowData.voucherId,
                        }),
                      };
                      const res = await fetch(
                        `http://localhost:3000/api/admin/voucher`,
                        deleteData
                      );

                      const newArr = data.filter(
                        (i) => i.voucherId != rowData.voucherId
                      );

                      setVoucherArray([...newArr]);
                      setAlertMessage("Voucher delete.");
                      setAlertTitle("Success!");
                      setAlertType("success");
                      openRequestAlert();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
  ];

  // alert state
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
    <div className="w-full mt-0">
      <div className="flex items-center py-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-2/6"
        />
        {/* HIDE COLUMN */}
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
                    <TableHead key={header.id} className="text-center">
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
        {/* pagination */}
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
      </div>

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

export default VoucherTable;

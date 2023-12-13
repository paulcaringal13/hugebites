"use client";
import { useEffect, useState } from "react";
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
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { BiChevronDown } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
import { TbMailCancel, TbMail } from "react-icons/tb";

const RequestTable = ({ data, openViewRequest, openCancelRequest }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  const [search, setSearch] = useState("");

  const columns = [
    {
      header: "View Attachment",
      id: "viewRequest",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div
            className="h-fit w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:bg-white active:scale-110  duration-100"
            variant="outline"
            onClick={() => {
              openViewRequest(rowData);
            }}
          >
            <FaRegEye className="text-black mx-auto my-auto " />
          </div>
        );
      },
    },
    {
      header: "Cancel",
      id: "cancel",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            {rowData.isCancelled == 0 &&
            rowData.isRejected == 0 &&
            rowData.isAccepted == 0 ? (
              <div
                className="h-fit w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:bg-white active:scale-110  duration-100"
                variant="outline"
                onClick={() => {
                  openCancelRequest(rowData);
                }}
              >
                <TbMailCancel className="text-black mx-auto my-auto h-4 w-4 " />
              </div>
            ) : (
              <button
                className="opacity-[0.5] h-fit w-fit border-2 p-2 rounded-full text-md mx-auto "
                type="button"
                disabled
              >
                <TbMail className="text-black mx-auto my-auto h-4 w-4 " />
              </button>
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
            {rowData.totalPrice}
          </div>
        );
      },
    },
    {
      accessorKey: "requestStatus",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Request Status
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
            variant="ghost"
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Refund Deadline
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Money Returned",
      id: "moneyRefunded",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="h-fit w-fit text-md mx-auto">
            {formatter.format(rowData.moneyRefunded)}
          </div>
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
        {/* hide columns */}
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
                      {/* {cell.column.id != "refundMessage" ? ( */}
                      <div className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                      {/* ) : (
                        <div className="text-center my-auto flex flex-row">
                          <h1 className="my-auto mx-auto text-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </h1>
                          <div
                            className="h-fit w-fit border-2 p-2 rounded-full text-md mx-auto cursor-pointer transform transition-all hover:scale-125 active:scale-110  active:bg-white duration-100"
                            variant="outline"
                            onClick={() => openAttachImage(row.original)}
                          >
                            <RiAttachment2 />
                          </div>
                        </div>
                      )} */}
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
        {/* pagination */}
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

export default RequestTable;

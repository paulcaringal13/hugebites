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
import { ArrowUpDown, MailCheck } from "lucide-react";
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
import { RiAttachment2 } from "react-icons/ri";
import { TbMailX, TbMailCancel, TbMail } from "react-icons/tb";

const RequestTable = ({ data, openViewRequest, openCancelRequest }) => {
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
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Price
            <ArrowUpDown className="h-3 w-3" />
          </Button>
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
      accessorKey: "moneyRefunded",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto hover:bg-primary hover:text-white transform transition-all hover:scale-105 duration-100"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Money Returned
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
        {/* filter specific column */}
        {/* if nothing is selected */}
        {!columnSelected && (
          <Input
            placeholder="Select column to filter"
            value={table.getColumn("orderId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("orderId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        )}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "orderId" ? (
          <Input
            placeholder="Filter order id..."
            value={table.getColumn("orderId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("orderId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}{" "}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "dateOrdered" ? (
          <Input
            placeholder="Filter order date..."
            value={table.getColumn("dateOrdered")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("dateOrdered")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}{" "}
        {/* if userRole is selected */}
        {columnSelected == "categoryName" ? (
          <Input
            placeholder="Filter category..."
            value={table.getColumn("categoryName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("categoryName")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if name is selected */}
        {columnSelected == "datePickUp" ? (
          <Input
            placeholder="Filter pick up date..."
            value={table.getColumn("datePickUp")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("datePickUp")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if time in is selected */}
        {columnSelected == "paymentDeadline" ? (
          <Input
            placeholder="Filter payment deadlne..."
            value={table.getColumn("paymentDeadline")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("paymentDeadline")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if time in is selected */}
        {columnSelected == "refundDeadline" ? (
          <Input
            placeholder="Filter refund deadlne..."
            value={table.getColumn("refundDeadline")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("refundDeadline")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if time in is selected */}
        {columnSelected == "orderStatus" ? (
          <Input
            placeholder="Filter status..."
            value={table.getColumn("orderStatus")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("orderStatus")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if time in is selected */}
        {columnSelected == "methodOFPayment" ? (
          <Input
            placeholder="Filter payment method..."
            value={table.getColumn("methodOFPayment")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("methodOFPayment")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <BiChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              id="productId"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Product Id
            </DropdownMenuItem>
            <DropdownMenuItem
              id="productName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Product Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="category"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Category
            </DropdownMenuItem>
            <DropdownMenuItem
              id="cakeType"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Cake Type
            </DropdownMenuItem>
            <DropdownMenuItem
              id="status"
              onClick={(e) => {
                setColumnSelected(e.target.id);

                console.log(columnSelected);
              }}
            >
              Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

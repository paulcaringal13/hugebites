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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import {
  BiChevronDown,
  BiEditAlt,
  BiSolidUserCheck,
  BiSolidUserX,
} from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const DefaultProductsTable = ({
  data,
  openEditOfferedProducts,
  openRemoveOfferedProducts,
  openRelaunchOfferedProducts,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  const [search, setSearch] = useState("");

  const columns = [
    {
      accessorKey: "defaultProductId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "categoryName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Name
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "size",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Size
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "shapeName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shape
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "colorName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Color
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "flavorName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Flavor
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Price",
      id: "default_total",
      cell: ({ row }) => {
        const rowData = row.original;
        return <div className="text-center">₱{rowData.default_total}.00</div>;
      },
    },
    {
      header: "Status",
      id: "isDefaultProductRemoved",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="text-center">
            {rowData.isDefaultProductRemoved == 0 ? "Available" : "Unavailable"}
          </div>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-0">
                <DropdownMenuItem className="p-0">
                  <Button
                    className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-emerald-400 hover:text-emerald-50"
                    onClick={() => {
                      openEditOfferedProducts(rowData);
                    }}
                  >
                    <BiEditAlt className="text-lg me-1" />
                    Edit
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="m-0" />
                {rowData.isDefaultProductRemoved == 0 ? (
                  <DropdownMenuItem className="p-0">
                    <Button
                      className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-rose-600 hover:text-rose-50"
                      onClick={() => {
                        openRemoveOfferedProducts(rowData);
                      }}
                    >
                      <BiSolidUserX className="text-lg me-1" />
                      Remove to menu
                    </Button>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="p-0">
                    <Button
                      className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-blue-50"
                      onClick={() => {
                        openRelaunchOfferedProducts(rowData);
                      }}
                    >
                      <BiSolidUserCheck className="text-lg me-1" />
                      Relaunch Product
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
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
    <div className="w-full mt-0">
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
        {/* {!columnSelected && (
          <Input
            placeholder="Select column to filter"
            value={table.getColumn("productId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("productId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        )} */}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "productId" ? (
          <Input
            placeholder="Filter product id..."
            value={table.getColumn("productId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("productId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}{" "}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "productName" ? (
          <Input
            placeholder="Filter product name..."
            value={table.getColumn("productName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("productName")?.setFilterValue(event.target.value)
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
        {columnSelected == "menuName" ? (
          <Input
            placeholder="Filter menu name..."
            value={table.getColumn("menuName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("menuName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}
        {/* if time in is selected */}
        {columnSelected == "status" ? (
          <Input
            placeholder="Filter status..."
            value={table.getColumn("status")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
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
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                      <div className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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

export default DefaultProductsTable;

"use client";
import { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BiEditAlt, BiSolidUserCheck, BiSolidUserX } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  MdOutlineRestoreFromTrash,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { Label } from "@/components/ui/label";

// NOT COMPLETED
const ProductTable = ({
  data,
  openEditProduct,
  openViewFeedbacks,
  openRelaunchProduct,
  openRemoveProduct,
  openOfferedProducts,
  openAddOfferedProducts,
  sizes,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [search, setSearch] = useState("");

  const [viewOpenDescription, setViewOpenDescription] = useState(false);
  const [description, setDescription] = useState("");

  const columns = [
    {
      header: "Image",
      id: "image",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Avatar className="mx-auto">
            <AvatarImage src={rowData.image} alt="product-image" />
            <AvatarFallback>UNK</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "productId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Id
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
      accessorKey: "cakeTypeName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cake Type
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="mx-auto my-auto"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <span className="text-xs ml-2">Sort</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        );
      },
    },
    {
      header: "Product Description",
      id: "productDescription",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Button
            variant="outline"
            className="w-fit h-fit text-xs"
            onClick={() => {
              setViewOpenDescription(true);
              setDescription(rowData.productDescription);
            }}
          >
            View Description
          </Button>
        );
      },
    },

    {
      header: "Offered Products",
      id: "offeredReq",
      cell: ({ row }) => {
        const rowData = row.original;

        const isSizeAvailable = sizes.filter(
          (i) => rowData.productId == i.productId
        );

        return rowData.prodDefaultProducts.length == 0 ? (
          <>
            {rowData.productId == "7000" ? (
              <Button
                variant="outline"
                className="w-fit h-fit text-xs"
                disabled={rowData.productId == "7000"}
              >
                View Offered Products
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-fit h-fit text-xs"
                  onClick={() => openAddOfferedProducts(rowData)}
                >
                  Release new product
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            {rowData.isRemoved == 1 ? (
              <Button
                variant="outline"
                className="w-fit h-fit text-xs"
                disabled
              >
                View Offered Products
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-fit h-fit text-xs"
                onClick={() => openOfferedProducts(rowData)}
              >
                View Offered Products
              </Button>
            )}
          </>
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
            {rowData.productId == "7000" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    disabled={rowData.productId == "7000"}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            ) : (
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
                      className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-blue-50"
                      onClick={() => {
                        openViewFeedbacks(rowData);
                      }}
                    >
                      <VscFeedback className="text-lg me-1" />
                      View Feedbacks
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <Button
                      className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-emerald-400 hover:text-emerald-50"
                      onClick={() => {
                        openEditProduct(rowData);
                      }}
                    >
                      <BiEditAlt className="text-lg me-1" />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="m-0" />
                  {rowData.isRemoved == 0 ? (
                    <DropdownMenuItem className="p-0">
                      <Button
                        className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-rose-600 hover:text-rose-50"
                        onClick={() => {
                          openRemoveProduct(rowData);
                        }}
                      >
                        <MdOutlineDeleteOutline className="text-lg me-1" />
                        Remove to menu
                      </Button>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="p-0">
                      <Button
                        className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-blue-50"
                        onClick={() => {
                          openRelaunchProduct(rowData);
                        }}
                      >
                        <MdOutlineRestoreFromTrash className="text-lg me-1" />
                        Relaunch Product
                      </Button>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
          {!search ? (
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
                    className="h-24 text-center relative overflow-hidden text-stone-600"
                  >
                    <ReloadIcon className="mx-auto my-5 h-3/6 w-3/6 animate-spin" />
                    <h1> Loading Data</h1>
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

      {!viewOpenDescription ? null : (
        <Dialog
          open={viewOpenDescription}
          onOpenChange={setViewOpenDescription}
          onClose
        >
          <DialogContent className="max-w-full max-h-full md:w-[35%] md:h-fit flex flex-col p-0">
            <div className="h-fit w-full px-4 py-6">
              <Label className="my-auto w-fit h-full text-center text-lg font-extrabold">
                Product Description
              </Label>
            </div>
            <div className="h-full w-full">
              <div className="h-full w-[90%] text-sm mx-auto text-justify indent-9">
                {description}
              </div>
            </div>
            <DialogFooter className="border-t-2 pr-2 border-gray-200">
              <Button
                className="bg-primary hover:bg-ring text-white active:bg-primary-foreground my-2"
                onClick={() => {
                  setViewOpenDescription(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductTable;

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "../../../components/ui/label";

const CategoryTable = ({
  data,
  openEditCategory,
  categoryTable,
  setCategoryTable,
  setProductTable,
  productTable,
  updateCategoryTable,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState("");

  const columns = [
    {
      header: "Image",
      id: "categoryImage",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Avatar className="mx-auto">
            <AvatarImage src={rowData.categoryImage} alt="product-image" />
            <AvatarFallback>UNK</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "categoryId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="mx-auto my-auto"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Id
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
      header: "Edit",
      id: "edit",
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-green-500 hover:text-white"
            // PASS ROW DATA TO GET SELECTED ROW ID
            onClick={() => openEditCategory(rowData)}
          >
            <MdOutlineModeEditOutline className="text-lg font-light" />
          </Button>
        );
      },
    },
    {
      header: "Remove",
      id: "remove",
      cell: ({ row }) => {
        const rowData = row.original;

        const productsInCategory = productTable.filter(
          (product) => rowData.categoryId == product.categoryId
        );

        // FIND IF THE MENU TABLE CONTAINS A CATEGORY
        // const isDeletable = productTable.find((product) => {
        //   let isEmpty;
        //   {
        //     product.categoryId == rowData.categoryId
        //       ? (isEmpty = true)
        //       : (isEmpty = false);
        //   }

        //   return isEmpty;
        // });

        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {!rowData.isRemoved ? (
                <Button className="bg-transparent text-black hover:bg-primary hover:text-white">
                  <MdOutlineDeleteOutline className="text-xl font-light" />
                </Button>
              ) : (
                <Button className="bg-transparent text-black hover:bg-blue-500 hover:text-white">
                  <MdOutlineRestoreFromTrash
                    className="font-light"
                    style={{ fontSize: "22px", lineHeight: "30px" }}
                  />
                </Button>
              )}
            </AlertDialogTrigger>
            {!rowData.isRemoved ? (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to
                    <span className="text-primary font-bold"> remove</span> this
                    category?
                  </AlertDialogTitle>
                  {/* <AlertDialogDescription>
                    This will include every product under this category.
                  </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="hover:bg-ring"
                    onClick={async () => {
                      // UPDATE IN THE UI

                      const updatedTable = categoryTable.map((ctg) => {
                        ctg.categoryId == rowData.categoryId
                          ? (ctg.isRemoved = 1)
                          : null;

                        return { ...ctg };
                      });

                      setCategoryTable(updatedTable);

                      // SET DATABASE IS REMOVED DATA
                      const removePut = {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          categoryId: rowData.categoryId,
                          isRemoved: 1,
                        }),
                      };
                      const res = await fetch(
                        `http://localhost:3000/api/admin/menu/categories/remove`,
                        removePut
                      );

                      console.log(res);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>{" "}
              </AlertDialogContent>
            ) : (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to
                    <span className="text-blue-500"> restore</span> this
                    category?
                  </AlertDialogTitle>
                  {/* <AlertDialogDescription>
                    The products under this category is also
                    <span className="text-primary"> removed</span> from the
                    menu. Relaunch product to show them in the menu.
                  </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-blue-500 hover:bg-blue-700"
                    onClick={async () => {
                      // UPDATE IN THE UI
                      const updatedTable = categoryTable.map((ctg) => {
                        ctg.categoryId == rowData.categoryId
                          ? (ctg.isRemoved = 0)
                          : null;

                        return { ...ctg };
                      });

                      setCategoryTable(updatedTable);

                      // DELETE SA DATABASE
                      const removePut = {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          categoryId: rowData.categoryId,
                          isRemoved: 0,
                        }),
                      };
                      const res = await fetch(
                        `http://localhost:3000/api/admin/menu/categories/remove`,
                        removePut
                      );
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
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
        {!columnSelected && (
          <Input
            placeholder="Select column to filter"
            value={table.getColumn("categoryId")?.getFilterValue() ?? ""}
            onChange={(event) => {
              table.getColumn("categoryId")?.setFilterValue(event.target.value);

              setFilterVal(event.target.value);
            }}
            className="max-w-sm w-1/6 ml-4"
          />
        )}
        {/* if EMPLOYEE ID is selected */}
        {columnSelected == "categoryId" ? (
          <Input
            placeholder="Filter category id..."
            value={table.getColumn("categoryId")?.getFilterValue() ?? ""}
            onChange={(event) => {
              table.getColumn("categoryId")?.setFilterValue(event.target.value);

              setFilterVal(event.target.value);
            }}
            className="max-w-sm w-1/6 ml-4"
          />
        ) : null}{" "}
        {/* if userRole is selected */}
        {columnSelected == "categoryName" ? (
          <Input
            placeholder="Filter category name..."
            value={table.getColumn("categoryName")?.getFilterValue() ?? ""}
            onChange={(event) => {
              table
                .getColumn("categoryName")
                ?.setFilterValue(event.target.value);

              setFilterVal(event.target.value);
            }}
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
              id="categoryId"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Category Id
            </DropdownMenuItem>
            <DropdownMenuItem
              id="categoryName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Category Name
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
          {!search && !filterVal ? (
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

export default CategoryTable;

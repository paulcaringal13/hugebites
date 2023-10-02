"use client";
import { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import CreateAccountForm from "../components/CreateAccountForm";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import { customerColumns as columns } from "../components/customerTableColumn";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomerTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSelected, setColumnSelected] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const openCreateDialog = () => {
    setOpenCreate(true);
  };

  const closeCreateDialog = () => {
    setOpenCreate(false);
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
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full mt-0">
      <div className="flex items-center py-4">
        {/* filter specific column */}
        {/* if nothing is selected */}
        {!columnSelected && (
          <Input
            placeholder="Select column to filter"
            value={table.getColumn("customerId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("customerId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {/* if first name is selected */}
        {columnSelected == "firstName" ? (
          <Input
            placeholder="Filter first name..."
            value={table.getColumn("firstName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("firstName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if customerId is selected */}
        {columnSelected == "customerId" ? (
          <Input
            placeholder="Filter employee id..."
            value={table.getColumn("customerId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("customerId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if last name is selected */}
        {columnSelected == "lastName" ? (
          <Input
            placeholder="Filter last name..."
            value={table.getColumn("lastName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("lastName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if email is selected */}
        {columnSelected == "email" ? (
          <Input
            placeholder="Filter email..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if contact is selected */}
        {columnSelected == "contact" ? (
          <Input
            placeholder="Filter contact..."
            value={table.getColumn("contact")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("contact")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if username is selected */}
        {columnSelected == "username" ? (
          <Input
            placeholder="Filter username..."
            value={table.getColumn("username")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if address is selected */}
        {columnSelected == "address" ? (
          <Input
            placeholder="Filter address..."
            value={table.getColumn("address")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("address")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if user role is selected */}
        {columnSelected == "userRole" ? (
          <Input
            placeholder="Filter user role..."
            value={table.getColumn("userRole")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("userRole")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {/* if account status is selected */}
        {columnSelected == "accStatus" ? (
          <Input
            placeholder="Filter account status..."
            value={table.getColumn("accStatus")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("accStatus")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
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
              id="customerId"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Customer Id
            </DropdownMenuItem>
            <DropdownMenuItem
              id="firstName"
              onClick={(e) => {
                setColumnSelected(e.target.id);

                console.log(columnSelected);
              }}
            >
              First Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="lastName"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Last Name
            </DropdownMenuItem>
            <DropdownMenuItem
              id="email"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              id="username"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Username
            </DropdownMenuItem>
            <DropdownMenuItem
              id="address"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Address
            </DropdownMenuItem>
            <DropdownMenuItem
              id="userRole"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              User Role
            </DropdownMenuItem>
            <DropdownMenuItem
              id="contact"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Contact
            </DropdownMenuItem>
            <DropdownMenuItem
              id="accStatus"
              onClick={(e) => {
                setColumnSelected(e.target.id);
              }}
            >
              Account Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* hide columns */}
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
    </div>
  );
};

export default CustomerTable;

"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { BiEditAlt } from "react-icons/bi";
import { BiSolidUserX } from "react-icons/bi";
import { BiSolidUserCheck } from "react-icons/bi";
import EditAccountForm from "./EditAccountForm";

const Employee = {
  employeeId: "",
  fullName: "",
  lastName: "",
  email: "",
  username: "",
  userRole: "",
  contact: "",
  accStatus: "",
};

const adminTableColumn = () => {
  const [openEdit, setOpenEdit] = useState(false);

  const openEditForm = () => {
    setOpenEdit(true);
  };

  const closeEditForm = () => {
    setOpenEdit(false);
  };
};

function openEditComponent() {
  alert("asdsad");
  // state open modal
}

export const adminColumns = [
  {
    accessorKey: "employeeId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="mx-auto my-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          className="mx-auto my-auto"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          className="mx-auto my-auto"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="mx-auto my-auto"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userRole",
    header: "User Role",
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
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      console.log(user);

      return (
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
                onClick={openEditComponent}
                //
              >
                <BiEditAlt className="text-lg me-1" />
                Edit
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            {user.accStatus == "Active" ? (
              <DropdownMenuItem className="p-0">
                <Button className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-rose-600 hover:text-rose-50">
                  <BiSolidUserX className="text-lg me-1" />
                  Deactivate
                </Button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="p-0">
                <Button className="bg-transparent text-black m-0 w-full h-full rounded-none hover:bg-blue-400 hover:text-rose-50">
                  <BiSolidUserCheck className="text-lg me-1" />
                  Reactivate
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

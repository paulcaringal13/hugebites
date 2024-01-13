"use client";
import { useEffect, useState } from "react";
import MiniAdminSidebar from "../../admin/components/MiniAdminSidebar";
import EmployeeMiniAdminSidebar from "../components/EmployeeMiniAdminSidebar";

import UserAccess from "../../admin/components/pages/UserAccess/UserAccess";
import AddRole from "../../admin/components/pages/UserAccess/AddRole";
import EditRole from "../../admin/components/pages/UserAccess/EditRole";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

export default function AdminRequest() {
  const [roles, setRoles] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);

  const [specificRole, setSpecificRole] = useState([]);

  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [openConfirmRelaunch, setOpenConfirmRelaunch] = useState(false);

  const [openAddRoles, setOpenAddRoles] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);

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

  const getSpecificRole = async (role) => {
    const roleRes = await fetch(
      `http://localhost:3000/api/admin/userAccess/specificRole?` +
        new URLSearchParams({
          roleId: role.roleId,
        }),
      {
        cache: "no-store",
      }
    );
    const data = await roleRes.json();

    setSpecificRole(data);
    openEditRoleForm();
  };

  const getRoleForValidate = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/userAccess/validateRole`,
      {
        cache: "no-store",
      }
    );

    // get
    // <a href="http://localhost:3000/api/admin/userAccess/validateRole">Click Here!</a>;

    const data = await adminRes.json();

    setRolesArray(data);
  };

  const openEditRoleForm = () => {
    setOpenEditRole(true);
  };

  const getRoles = async () => {
    const adminRes = await fetch(`http://localhost:3000/api/admin/userAccess`, {
      cache: "no-store",
    });

    // get
    // <a href="http://localhost:3000/api/admin/userAccess">Click Here!</a>;

    const data = await adminRes.json();

    const x = data.filter((i) => i.roleName != "Super Admin");

    setRoles(x);
  };

  useEffect(() => {
    getRoles();
    getRoleForValidate();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-fit" style={{ zIndex: "1" }}>
        <EmployeeMiniAdminSidebar />
      </div>
      <div className="h-auto w-full my-4 p-5 bg-white mx-4 rounded-lg border-[1px] border-zinc-200">
        <div className="flex flex-row w-auto gap-5">
          <Label className="font-extrabold text-3xl">
            Roles and User Access
          </Label>
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => setOpenAddRoles(true)}
          >
            Add Role
          </Button>
        </div>
        <UserAccess
          data={roles}
          setOpenEditRole={setOpenEditRole}
          openEditRole={openEditRole}
          getSpecificRole={getSpecificRole}
          setSpecificRole={setSpecificRole}
          setOpenConfirmRelaunch={setOpenConfirmRelaunch}
          setOpenConfirmRemove={setOpenConfirmRemove}
          rolesArray={rolesArray}
          openRequestAlert={openRequestAlert}
          setAlertMessage={setAlertMessage}
          setAlertTitle={setAlertTitle}
          setAlertType={setAlertType}
        />
      </div>

      {!openAddRoles ? null : (
        <AddRole
          openAddRoles={openAddRoles}
          setOpenAddRoles={setOpenAddRoles}
          setRoles={setRoles}
          roles={roles}
          openRequestAlert={openRequestAlert}
          setAlertMessage={setAlertMessage}
          setAlertTitle={setAlertTitle}
          setAlertType={setAlertType}
        />
      )}

      {!openEditRole ? null : (
        <EditRole
          openEditRole={openEditRole}
          setOpenEditRole={setOpenEditRole}
          setSpecificRole={setSpecificRole}
          specificRole={specificRole[0]}
          setRoles={setRoles}
          roles={roles}
          openRequestAlert={openRequestAlert}
          setAlertMessage={setAlertMessage}
          setAlertTitle={setAlertTitle}
          setAlertType={setAlertType}
        />
      )}

      <AlertDialog open={openConfirmRemove} onOpenChange={setOpenConfirmRemove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove this Role?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-transparent text-black border-[1px] border-zinc-200 hover:bg-rose-500 hover:text-white"
              onClick={async () => {
                const x = specificRole.isRoleRemoved;

                const deleteData = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    roleId: specificRole.roleId,
                    isRoleRemoved: !x,
                  }),
                };
                const res = await fetch(
                  `http://localhost:3000/api/admin/userAccess/remove`,
                  deleteData
                );

                roles.forEach((i) => {
                  i.roleId == specificRole.roleId
                    ? (i.isRoleRemoved = 1)
                    : null;
                });
                setAlertMessage("Role removed.");
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

      <AlertDialog
        open={openConfirmRelaunch}
        onOpenChange={setOpenConfirmRelaunch}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to relaunch this Role?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-transparent text-black border-[1px] border-zinc-200 hover:bg-blue-500 hover:text-white"
              onClick={async () => {
                const x = specificRole.isRoleRemoved;

                const deleteData = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    roleId: specificRole.roleId,
                    isRoleRemoved: !x,
                  }),
                };
                const res = await fetch(
                  `http://localhost:3000/api/admin/userAccess/remove`,
                  deleteData
                );

                roles.forEach((i) => {
                  i.roleId == specificRole.roleId
                    ? (i.isRoleRemoved = 0)
                    : null;
                });
                setAlertMessage("Role relaunched.");
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
}

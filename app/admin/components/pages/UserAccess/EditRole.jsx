"use client";
import { useState, useEffect } from "react";
import "../../../../styles/globals.css";
import * as React from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

const EditRole = ({
  openEditRole,
  setOpenEditRole,
  setSpecificRole,
  specificRole,
  setRoles,
  roles,
  openRequestAlert,
  setAlertMessage,
  setAlertTitle,
  setAlertType,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [dashboardAccess, setDashboardAccess] = useState(true);
  const [menuAccess, setMenuAccess] = useState(false);
  const [orderAccess, setOrderAccess] = useState(false);
  const [customizationAccess, setCustomizationAccess] = useState(false);
  const [auditAccess, setAuditAccess] = useState(false);
  const [inventoryAccess, setInventoryAccess] = useState(false);
  const [reportsAccess, setReportsAccess] = useState(false);
  const [forecastAccess, setForecastAccess] = useState(false);
  const [refundAccess, setRefundAccess] = useState(false);
  const [voucherAccess, setVoucherAccess] = useState(false);
  const [accountsAccess, setAccountsAccess] = useState(false);
  const [userRoleAccess, setUserRoleAccess] = useState(false);

  const [roleNameVal, setRoleNameVal] = useState("");
  const [roleAccessVal, setRoleAccessVal] = useState("");

  const checkAllCheckBox = () => {
    setMenuAccess(true);
    setOrderAccess(true);
    setCustomizationAccess(true);
    setAuditAccess(true);
    setInventoryAccess(true);
    setReportsAccess(true);
    setForecastAccess(true);
    setVoucherAccess(true);
    setRefundAccess(true);
    setAccountsAccess(true);
  };

  const unCheckAllCheckBox = () => {
    setMenuAccess(false);
    setOrderAccess(false);
    setCustomizationAccess(false);
    setAuditAccess(false);
    setInventoryAccess(false);
    setReportsAccess(false);
    setForecastAccess(false);
    setVoucherAccess(false);
    setRefundAccess(false);
    setAccountsAccess(false);
  };

  const editRole = async () => {
    const rolePut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roleId: specificRole.roleId,
        roleName: roleName,
        dashboardAccess: dashboardAccess,
        menuAccess: menuAccess,
        orderAccess: orderAccess,
        customizationAccess: customizationAccess,
        auditAccess: auditAccess,
        inventoryAccess: inventoryAccess,
        reportsAccess: reportsAccess,
        forecastAccess: forecastAccess,
        refundAccess: refundAccess,
        voucherAccess: voucherAccess,
        accountsAccess: accountsAccess,
        userRoleAccess: userRoleAccess,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/userAccess/specificRole`,
        rolePut
      );

      const updatedRoles = roles.map((i) => {
        i.roleId == specificRole.roleId ? (i.roleName = roleName) : null;
        i.roleId == specificRole.roleId
          ? (i.dashboardAccess = dashboardAccess)
          : null;
        i.roleId == specificRole.roleId ? (i.menuAccess = menuAccess) : null;
        i.roleId == specificRole.roleId ? (i.ordersAccess = orderAccess) : null;
        i.roleId == specificRole.roleId
          ? (i.customizationAccess = customizationAccess)
          : null;
        i.roleId == specificRole.roleId ? (i.auditAccess = auditAccess) : null;
        i.roleId == specificRole.roleId
          ? (i.inventoryAccess = inventoryAccess)
          : null;
        i.roleId == specificRole.roleId
          ? (i.reportsAccess = reportsAccess)
          : null;
        i.roleId == specificRole.roleId
          ? (i.forecastAccess = forecastAccess)
          : null;
        i.roleId == specificRole.roleId
          ? (i.refundAccess = refundAccess)
          : null;
        i.roleId == specificRole.roleId
          ? (i.voucherAccess = voucherAccess)
          : null;
        i.roleId == specificRole.roleId
          ? (i.accountAccess = accountsAccess)
          : null;
        i.roleId == specificRole.roleId
          ? (i.userRoleAccess = userRoleAccess)
          : null;

        return { ...i };
      });

      setRoles(updatedRoles);

      setAlertMessage("Role Updated Successfully.");
      setAlertTitle("Success!");
      setAlertType("success");
      openRequestAlert();

      setRoleName("");
      setMenuAccess(false);
      setOrderAccess(false);
      setCustomizationAccess(false);
      setAuditAccess(false);
      setInventoryAccess(false);
      setReportsAccess(false);
      setForecastAccess(false);
      setRefundAccess(false);
      setVoucherAccess(false);
      setAccountsAccess(false);
      setUserRoleAccess(false);
      setOpenEditRole(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (isNameValid, isAccessValid) => {
    !isNameValid || !isAccessValid ? null : editRole();
  };

  useEffect(() => {
    setRoleName(specificRole.roleName);
    setMenuAccess(specificRole.menuAccess);
    setOrderAccess(specificRole.ordersAccess);
    setCustomizationAccess(specificRole.customizationAccess);
    setAuditAccess(specificRole.auditAccess);
    setInventoryAccess(specificRole.inventoryAccess);
    setReportsAccess(specificRole.reportsAccess);
    setForecastAccess(specificRole.forecastAccess);
    setVoucherAccess(specificRole.voucherAccess);
    setRefundAccess(specificRole.refundAccess);
    setAccountsAccess(specificRole.accountAccess);
    setUserRoleAccess(specificRole.userRoleAccess);
  }, [specificRole]);
  // NOT COMPLETED
  console.log(specificRole);
  return (
    <>
      <Dialog open={openEditRole} onOpenChange={setOpenEditRole} onClose>
        <DialogContent className="max-w-full max-h-full md:w-[40%]">
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <Label className="my-auto text-2xl font-extrabold leading-none tracking-tight">
                Edit Role
              </Label>
              <Button
                className="bg-transparent text-gray-400"
                onClick={() => setOpenEditRole(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Input new role name and it&apos;s access.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <Label className="text-lg font-extrabold m-0">Role Name</Label>
            <Input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Role Name"
              className="w-full m-0"
            />
            {!roleNameVal ? null : (
              <Label className="errorMessage">{roleNameVal}</Label>
            )}
          </div>

          <Label className="text-lg font-extrabold m-0">Role Access</Label>

          {/* <div className="flex col-span-1 gap-2 w-fit">
            <Checkbox
              id="terms"
              className="text-white my-2 border-black"
              checked={selectAll}
              onCheckedChange={() => {
                setSelectAll(!selectAll);
                {
                  !selectAll ? checkAllCheckBox() : unCheckAllCheckBox();
                }
              }}
            />
            <Label className="ml-auto my-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Select All
            </Label>
          </div> */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={menuAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setMenuAccess(!menuAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Menu
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={orderAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setOrderAccess(!orderAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Orders
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={customizationAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setCustomizationAccess(!customizationAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Customization
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={auditAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setAuditAccess(!auditAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Audit
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={inventoryAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setInventoryAccess(!inventoryAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Inventory
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={reportsAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setReportsAccess(!reportsAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Reports
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={forecastAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setForecastAccess(!forecastAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Forecast
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={refundAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setRefundAccess(!refundAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Refund
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={voucherAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setVoucherAccess(!voucherAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Voucher
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                id="terms"
                className="text-white border-black"
                checked={accountsAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setAccountsAccess(!accountsAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Account
              </Label>
            </div>
            <div className="flex col-span-1 gap-2 w-fit">
              <Checkbox
                className="text-white border-black"
                checked={userRoleAccess}
                onCheckedChange={(value) => {
                  value == false ? setSelectAll(false) : null;
                  setUserRoleAccess(!userRoleAccess);
                }}
              />
              <Label className="ml-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                User Access
              </Label>
            </div>
            {!roleAccessVal ? null : (
              <Label className="errorMessage col-span-2">{roleAccessVal}</Label>
            )}

            <Button
              className="col-span-2 mt-1 hover:bg-ring active:bg-primary-foreground"
              onClick={() => {
                let isNameValid = false;
                let isAccessValid = false;

                !roleName
                  ? setRoleNameVal("Please fill up the field.")
                  : setRoleNameVal("");

                !roleName ? null : (isNameValid = true);

                !menuAccess &&
                !orderAccess &&
                !refundAccess &&
                !voucherAccess &&
                !inventoryAccess &&
                !customizationAccess &&
                !auditAccess &&
                !forecastAccess &&
                !accountsAccess &&
                !reportsAccess
                  ? setRoleAccessVal("Please select a user access")
                  : setRoleAccessVal("");

                !menuAccess &&
                !orderAccess &&
                !refundAccess &&
                !voucherAccess &&
                !inventoryAccess &&
                !customizationAccess &&
                !auditAccess &&
                !forecastAccess &&
                !accountsAccess &&
                !reportsAccess
                  ? null
                  : (isAccessValid = true);

                validate(isNameValid, isAccessValid);
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditRole;

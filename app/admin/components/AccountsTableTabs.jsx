"use client";
import { useEffect, useState } from "react";

import CreateAccountForm from "../components/CreateAccountForm";
import EditAccountForm from "../components/EditAccountForm";
import AccountActivationDialog from "../components/AccountActivationDialog";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import CustomerTable from "./CustomerTable";
import AdminTable from "./AdminTable";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Button } from "../../../components/ui/button";

const AccountsTableTabs = () => {
  const [employeeArray, setEmployeeArray] = useState([]);
  const [customerArray, setCustomerArray] = useState([]);
  const [accountActivationDialog, setAccountActivationDialog] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [action, setAction] = useState("");
  const [actionFail, setActionFail] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editFail, setEditFail] = useState(false);
  const [userSelected, setUserSelected] = useState({});

  const getAllEmployeeAccounts = async () => {
    const adminRes = await fetch(
      `http://localhost:3000/api/admin/account/employee`
    );
    const data = await adminRes.json();

    const { results } = data;

    const x = results.map((user) => {
      return {
        accountId: `${user.accountId}`,
        employeeId: `${user.employeeId}`,
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,
        contact: `${user.contact}`,
        email: `${user.email}`,
        username: `${user.username}`,
        userRole: `${user.userRole}`,
        accStatus: `${user.accStatus}`,
        accountType: `${user.accountType}`,
      };
    });

    const employeeArr = x.filter(
      (user) => user.userRole != "Customer" && user.userRole != "Super Admin"
    );

    setEmployeeArray(employeeArr);
  };

  const getAllCustomerAccounts = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/account/customer`);
    const data = await res.json();
    const { results } = data;

    // convert to string
    const x = results.map((user) => {
      return {
        customerId: `${user.customerId}`,
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,
        contact: `${user.contact}`,
        email: `${user.email}`,
        username: `${user.username}`,
        address: `${user.address}`,
        userRole: `${user.userRole}`,
        accStatus: `${user.accStatus}`,
        accountType: `${user.accountType}`,
      };
    });

    const customerArray = x.filter((user) => user.userRole == "Customer");

    setCustomerArray(customerArray);
  };

  const handleEditModal = (editOpen, user) => {
    setEditModal(editOpen);
    setUserSelected(user);
    setEditSuccess(false);
  };

  const handleActivationModal = (
    accountActivationModal,
    accountId,
    accStatus
  ) => {
    setUserSelected({
      accountId: accountId,
      accStatus: accStatus,
    });

    setAccountActivationDialog(accountActivationModal);
  };

  const handleActionSuccess = (message) => {
    setActionSuccess(true);
    setAction(message);
  };

  const handleEditSuccess = () => {
    setEditSuccess(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const handleActivationClose = () => {
    setAccountActivationDialog(false);
    setActionSuccess(false);
  };

  useEffect(() => {
    getAllEmployeeAccounts();
    getAllCustomerAccounts();
  }, []);

  return (
    <div className="w-full mx-10 my-5">
      <Tabs defaultValue="employee">
        <TabsList className="w-3/6">
          <TabsTrigger value="employee" className="w-3/6 ">
            Employee
          </TabsTrigger>
          <TabsTrigger value="customer" className="w-3/6 me-auto ">
            Customer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="employee">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Employee Accounts
              </CardTitle>
              <div className="my-auto">
                <CreateAccountForm refreshTable={getAllEmployeeAccounts} />
                {editModal ? (
                  <EditAccountForm
                    editOpen={editModal}
                    user={userSelected}
                    handleEditClose={handleEditClose}
                    refreshTable={getAllEmployeeAccounts}
                    handleEditSuccess={handleEditSuccess}
                    setEditFail={setEditFail}
                  />
                ) : null}
                {accountActivationDialog ? (
                  <AccountActivationDialog
                    dialogOpen={accountActivationDialog}
                    user={userSelected}
                    refreshTable={getAllEmployeeAccounts}
                    handleActionSuccess={handleActionSuccess}
                    setActionFail={setActionFail}
                    handleClose={handleActivationClose}
                  />
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <AdminTable
                data={employeeArray}
                handleEditModal={handleEditModal}
                handleActivationModal={handleActivationModal}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customer">
          <Card className="w-full">
            <CardHeader className="m-0 p-4 flex flex-row justify-between">
              <CardTitle className="text-2xl my-2 ms-2 ">
                Customer Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <CustomerTable data={customerArray} />
            </CardContent>
          </Card>
        </TabsContent>
        {editSuccess ? (
          <ToastProvider duration={4000}>
            <Toast variant="success" className="w-fit h-fit">
              <div className="grid gap-1">
                <ToastTitle className="text-lg">Success!</ToastTitle>
                <ToastDescription className="text-sm font-light">
                  Changes updated successfully.
                </ToastDescription>
              </div>
              <ToastClose />
            </Toast>
            <ToastViewport />
          </ToastProvider>
        ) : null}

        {editFail ? (
          <ToastProvider duration={10000}>
            <Toast variant="destructive" className="w-fit h-fit">
              <div className="grid gap-1">
                <ToastTitle className="text-lg">
                  Uh oh! Something went wrong.
                </ToastTitle>
                <ToastDescription className="text-sm font-light">
                  There was a problem with your request.
                </ToastDescription>
              </div>
              <ToastClose />
            </Toast>
            <ToastViewport />
          </ToastProvider>
        ) : null}

        {actionSuccess ? (
          <ToastProvider duration={2000}>
            <Toast variant="success" className="w-fit h-fit">
              <div className="grid gap-1">
                <ToastTitle className="text-lg">Success!</ToastTitle>
                <ToastDescription className="text-sm font-light">
                  Account {action} successfully.
                </ToastDescription>
              </div>
              <ToastClose />
            </Toast>
            <ToastViewport />
          </ToastProvider>
        ) : null}

        {actionFail ? (
          <ToastProvider duration={10000}>
            <Toast variant="destructive" className="w-fit h-fit">
              <div className="grid gap-1">
                <ToastTitle className="text-lg">
                  Uh oh! Something went wrong.
                </ToastTitle>
                <ToastDescription className="text-sm font-light">
                  There was a problem with your request.
                </ToastDescription>
              </div>
              <ToastClose />
            </Toast>
            <ToastViewport />
          </ToastProvider>
        ) : null}
      </Tabs>
    </div>
  );
};
export default AccountsTableTabs;

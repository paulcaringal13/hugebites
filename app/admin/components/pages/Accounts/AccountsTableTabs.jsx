"use client";
import { useEffect, useState } from "react";
import CreateAccountForm from "./CreateAccountForm";
import EditAccountForm from "./EditAccountForm";
import AccountActivationDialog from "./AccountActivationDialog";
import CustomerTable from "./CustomerTable";
import AdminTable from "./AdminTable";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

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
      `http://localhost:3000/api/admin/account/employee`,
      {
        cache: "no-store",
      }
    );

    const data = await adminRes.json();

    const x = data.filter((i) => i.userRole != "Super Admin");

    setEmployeeArray(x);
  };

  const getAllCustomerAccounts = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/account/customer`);
    const data = await res.json();

    setCustomerArray(data);
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
    <div className="w-full flex mx-10 my-5">
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
          <Card
            style={{
              width: "calc(100vw - 250px)",
            }}
          >
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

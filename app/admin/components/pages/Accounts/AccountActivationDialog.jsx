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
import { Button } from "@/components/ui/button";

// NOT COMPLETED

const AccountActivationDialog = ({
  dialogOpen,
  user,
  refreshTable,
  handleActionSuccess,
  setActionFail,
  handleClose,
}) => {
  const handleRequest = async (isDeactivated) => {
    let data = {
      isDeactivated: isDeactivated,
      accStatus: "",
    };
    let message;

    {
      !isDeactivated ? (message = "activated") : (message = "deactivated");
    }

    {
      !isDeactivated
        ? (data = { ...data, accStatus: "Active" })
        : (data = { ...data, accStatus: "Deactivated" });
    }

    const deactReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/account/employee/deactivate?` +
          new URLSearchParams({ accountId: user.accountId }),
        deactReq
      );
      const response = await res.json();
      {
        response ? handleActionSuccess(message) : setActionFail(true);
      }
    } catch (e) {
      console.log(e);
    }
    refreshTable();
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleClose}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>CONFIRM ACTION</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to{" "}
            {user.accStatus == "Active" ? "deactivate" : "reactivate"} this
            account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {user.accStatus == "Active" ? (
            <AlertDialogAction
              onClick={() => handleRequest(1)}
              className="hover:bg-ring"
            >
              Deactivate
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              onClick={() => handleRequest(0)}
              className="bg-blue-400 hover:bg-blue-500"
            >
              Reactivate
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountActivationDialog;

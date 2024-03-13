"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AddOnsDelete({
  selectedAddOn,
  openConfirmRemoveAddOns,
  setOpenConfirmRemoveAddOns,
  setAddOnsList,
  addOnsList,
  newAddOnsList,
  setNewAddOnsList,
  tier2AddOnsList,
  tier3AddOnsList,
  setTier2AddOnsList,
  setTier3AddOnsList,
}) {
  return (
    <Dialog
      open={openConfirmRemoveAddOns}
      onOpenChange={setOpenConfirmRemoveAddOns}
      onClose
    >
      <DialogContent className="flex flex-col max-w-full max-h-full md:w-[30%] md:h-fit">
        <div className="flex-1 h-fit m-0">
          <DialogTitle className="h-fit">Remove add on?</DialogTitle>
        </div>
        <div className="flex flex-row justify-end gap-3">
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-white active:bg-primary-foreground duration-300 w-fit"
            onClick={() => {
              setOpenConfirmRemoveAddOns(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="hover:bg-ring active:bg-primary-foreground duration-300 w-fit"
            onClick={async () => {
              const deleteData = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cartAddOnsId: selectedAddOn.cartAddOnsId,
                }),
              };
              const res = await fetch(
                `http://localhost:3000/api/customer/cart/addOns/remove`,
                deleteData
              );

              const updatedNewAddOnsList = newAddOnsList.filter(
                (i) => i.cartAddOnsId != selectedAddOn.cartAddOnsId
              );

              const updatedAddOnsList = addOnsList.filter(
                (i) => i.cartAddOnsId != selectedAddOn.cartAddOnsId
              );

              const updatedTier2List = tier2AddOnsList.filter(
                (i) => i.cartAddOnsId != selectedAddOn.cartAddOnsId
              );

              const updatedTier3List = tier3AddOnsList.filter(
                (i) => i.cartAddOnsId != selectedAddOn.cartAddOnsId
              );

              setAddOnsList(updatedAddOnsList);
              setTier2AddOnsList(updatedTier2List);
              setTier3AddOnsList(updatedTier3List);

              setNewAddOnsList(updatedNewAddOnsList);

              setOpenConfirmRemoveAddOns(false);
            }}
          >
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

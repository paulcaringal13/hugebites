"use client";
import { useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const TermsAndConditions = ({
  openTermsAndConditions,
  setOpenTermsAndConditions,
}) => {
  const router = useRouter();

  const [isAccepted, setIsAccepted] = useState(false);

  const acceptCondition = () => {
    isAccepted ? localStorage.setItem("isFirstLogged", false) : null;
    setOpenTermsAndConditions(false);
  };

  const closeTermsAndCondition = () => {
    localStorage.clear();

    router.replace("/customer/sign-in");
  };

  return (
    <div className="h-screen w-[1000px] absolute top-0">
      <Dialog
        open={openTermsAndConditions}
        onOpenChange={setOpenTermsAndConditions}
        onClose
      >
        <DialogContent className="max-w-full max-h-full md:w-[50%] md:h-[90%] overflow-y-scroll">
          <div className="h-full w-full flex flex-col">
            <h1 className="font-extrabold text-3xl mx-auto mb-4">
              Terms and Conditions
            </h1>
            <p className="text-sm font-light indent-10 text-justify">
              Welcome to Huge Bites! We&apos;re delighted to serve you and
              provide you with delicious cakes for your special occasions.
              Please take a moment to review our terms and conditions for
              ordering cakes through our website:
            </p>
            <ol type="1">
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">1. Order Placement</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  All cake orders must be placed a minimum of 3 days in advance
                  before your desired pick-up or delivery date.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">2. Rescheduling</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  Rescheduling of cake orders is strictly prohibited once the
                  order has been placed. Please double-check your schedule and
                  requirements before confirming your order.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold"> 3. Payment</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  At Huge Bites, we operate on a payment-first basis before
                  confirming your order. We offer various payment methods and
                  have established specific rules for your convenience. Here are
                  the details:
                </p>
                <div className="container w-[100%] ml-auto h-fit mt-3">
                  <p className="text-sm font-light indent-10 text-justify mb-3">
                    • &emsp;&emsp;
                    <span className="font-extrabold">In-Store Payment:</span> To
                    complete your order, payment must be made in person at our
                    physical store located at Phase 1 Block 73 Lot 32 Mabuhay
                    City, Baclaran, City of Cabuyao, Laguna within 2 days after
                    placing your order.
                  </p>
                  <p className="text-sm font-light indent-10 text-justify">
                    • &emsp;&emsp;
                    <span className="font-extrabold">GCash Payment:</span> For
                    GCash payments, you have two options: you can pay for your
                    order at the time of checkout, or you can complete the
                    payment within 2 days by sending it to our GCash Account
                    #09956520909.
                  </p>
                </div>
                <p
                  className="italic text-sm font-extrabold mt-3"
                  style={{ color: "#ff0000" }}
                >
                  *Note: Failure to make the payment within 2 days will result
                  in the cancellation of your order.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold"> 4. Delivery Options</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  You have the option to receive your cake order through one of
                  the following methods:
                </p>
                <div className="container w-[100%] ml-auto h-fit mt-3">
                  <p className="text-sm font-light indent-10 text-justify">
                    • &emsp;&emsp;
                    <span className="font-extrabold">
                      Personal Pick-Up:
                    </span>{" "}
                    You may choose to pick up your cake order from our physical
                    location at the agreed-upon time.
                  </p>
                  <p className="text-sm font-light indent-10 text-justify mb-3">
                    • &emsp;&emsp;
                    <span className="font-extrabold">
                      Third-Party Services:
                    </span>{" "}
                    Alternatively, you can arrange for delivery through
                    third-party services like Lalamove, Toktok, or other similar
                    platforms. The delivery fees and scheduling are the
                    responsibility of the customer.
                  </p>
                </div>
                <p
                  className="italic text-sm font-extrabold mt-3"
                  style={{ color: "#ff0000" }}
                >
                  *Note: We are not accountable if the cake has been damaged
                  upon delivery.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">5. Money Cake Orders:</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  If you are ordering a cake from our Money Cake menu, please
                  specify the exact amount of money you want placed on the cake
                  during the ordering process. This amount will be included in
                  the final price of your cake.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">6. Tiered Cakes Orders:</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  For tiered cakes, we offer only one specific flavor per cake.
                  Please refer to the product description or consult with our
                  social media and Gmail account for available flavor options.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold">
                  7. Cake Customization Orders:
                </h1>
                <p className="text-sm font-light indent-10 text-justify">
                  For cake customization, if you modify the details of the cake
                  and attach an image, please wait within 24 hours for the final
                  pricing of your customized cake. It will appear in your
                  account, and you will receive a notification in your provided
                  Gmail account.
                </p>
              </li>
              <li className="text-start" style={{ lineHeight: "3" }}>
                <h1 className="text-md font-bold"> 8. Refund Guidelines:</h1>
                <p className="text-sm font-light indent-10 text-justify">
                  Here are our redo & refund guidelines that you need to know:
                </p>
                <div className="container w-[100%] ml-auto h-fit mt-3">
                  <p className="text-sm font-light indent-10 text-justify">
                    • &emsp; If there are errors in the order fulfillment
                    process, such as delivering the wrong cake flavor, size, or
                    design.
                  </p>
                  <p className="text-sm font-light indent-10 text-justify mb-3">
                    • &emsp;If you receive a cake that is damaged, spoiled, or
                    does not meet the expected quality standards, you will
                    receive a full refund.
                  </p>
                  <p className="text-sm font-light indent-10 text-justify mb-3">
                    • &emsp; If the cake does not meet the correct date of
                    pickup, you will receive a full refund.
                  </p>
                </div>
              </li>
              <li>
                <p className="text-sm font-light indent-10 text-justify mb-3">
                  By placing an order through the Huge Bites website, you
                  acknowledge and agree to these terms and conditions. Please
                  read them carefully and feel free to reach out to our social
                  media account if you have any questions or require further
                  assistance. We&apos;re here to make your cake ordering
                  experience as delightful as the cakes we serve!
                </p>
              </li>
              <li style={{ lineHeight: "3" }} className="mt-10">
                <p className="text-sm font-extrabold text-justify mb-3">
                  Contact Information:
                </p>
                <p className="text-sm font-light text-justify mb-3">
                  Facebook: Huge Bites
                </p>
                <p className="text-sm font-light text-justify mb-3">
                  Instagram: @happyhugebites
                </p>
                <p className="text-sm font-light text-justify mb-3">
                  Gmail: hugebitesofficial@gmail.com
                </p>
                <p className="text-sm font-light text-justify mb-3">
                  Mobile Number: 0927-662-3221
                </p>

                <p className="text-sm font-light text-justify mt-10">
                  Thank you for choosing Huge Bites for your cake needs. We look
                  forward to sweetening your special moments!
                </p>
              </li>
            </ol>
          </div>
          <div className="flex flex-row gap-2">
            <Checkbox
              id="terms"
              className="text-white border-black"
              checked={isAccepted}
              onCheckedChange={setIsAccepted}
            />
            <h1
              htmlFor="terms"
              className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Agree to terms and conditions.
            </h1>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              className="hover:bg-ring active:bg-primary-foreground hover:text-white text-md  w-[30%] ml-auto"
              variant="outline"
              onClick={() => closeTermsAndCondition()}
            >
              Close
            </Button>
            <Button
              className="hover:bg-ring active:bg-primary-foreground hover:text-white text-md  w-[30%]"
              variant="outline"
              onClick={() => acceptCondition()}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TermsAndConditions;

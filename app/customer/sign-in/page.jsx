"use client";
import { useState, useEffect } from "react";
import LandingPageNavbar from "../components/LandingPageNavbar";
import CustomerSignIn from "../components/CustomerSignIn";
import signIn from "../../../public/images/signIn.svg";

const SignInPage = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [tableCustomerAccounts, setTableCustomerAccounts] = useState([]);

  const getAllCustomerAccounts = async () => {
    // GET ALL CUSTOMER ACCOUNTS FROM THE ACCOUNTS TABLE IN THE DATABASE
    const res = await fetch(`http://localhost:3000/api/customer/sign-in`, {
      cache: "no-store",
    });

    const data = await res.json();

    setCustomerAccounts(data);
  };

  const getTableCustomerData = async () => {
    // GET ALL CUSTOMER ACCOUNTS FROM THE ACCOUNTS TABLE IN THE DATABASE
    const res = await fetch(
      `http://localhost:3000/api/customer/sign-in/tbl_customer`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setTableCustomerAccounts(data);
  };

  // STORE THE RESPONSE TO THIS VARIABLE

  useEffect(() => {
    getAllCustomerAccounts();
    getTableCustomerData();
  }, []);

  return (
    <div
      className="bg-accent h-[800px] flex flex-col"
      style={{
        zIndex: "-1",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "100",
        }}
      >
        <LandingPageNavbar />
      </div>
      <div className="relative" style={{ paddingTop: "250px", height: "90vh" }}>
        <div
          style={{
            width: "650px",
            height: "100%",
            backgroundImage: `url('${signIn.src}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            top: 0.5,
          }}
          className="mt-20"
        ></div>
        {/* PASS THE ARRAY OF EXISTING CUSTOMER ACCOUNTS INTO COMPONENT */}
        <div className="relative left-0 w-full">
          <CustomerSignIn
            customerAccounts={customerAccounts}
            tableCustomerAccounts={tableCustomerAccounts}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

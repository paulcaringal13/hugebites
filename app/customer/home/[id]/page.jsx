"use client";
import React, { useEffect, useState } from "react";
import HomePageNavbar from "../../components/HomePageNavbar";
import CustomerSidebar from "../../components/CustomerSidebar";
import HomePage from "../../components/Home/HomePage";
import TermsAndConditions from "../../components/Home/TermsAndConditions";

// COMPLETED

export default function Home(path) {
  const { params } = path;
  const { id } = params;

  const [userData, setUserData] = useState({});
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState();

  async function getUserData() {
    const res = await fetch(
      `http://localhost:3000/api/customer/home?` +
        new URLSearchParams({
          accountId: id,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();

    const isFirstLogged =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("isFirstLogged")
        : "";

    isFirstLogged == "false" ? null : setIsFirstTime(true);

    setUserData(data);
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    isFirstTime && setOpenTermsAndConditions(true);

    getUserData();
  }, [isFirstTime]);

  return (
    <main className="Home flex flex-row h-fit bg-accent">
      <div className="z-10">
        <CustomerSidebar account={userData} />
      </div>
      <div className="flex flex-col w-full">
        <HomePageNavbar userId={userData.customerId} />
        <div className="h-auto w-full">
          {!isFirstTime ? null : (
            <TermsAndConditions
              openTermsAndConditions={openTermsAndConditions}
              setOpenTermsAndConditions={setOpenTermsAndConditions}
            />
          )}
          <HomePage userData={userData} />
        </div>
      </div>
    </main>
  );
}

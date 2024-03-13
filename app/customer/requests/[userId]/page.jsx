"use client";
import { useState, useEffect } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import HomePageNavbar from "../../components/HomePageNavbar";
import RequestModule from "../../components/RequestModule";

export default function Request(path) {
  const { params } = path;
  const { userId } = params;

  const [userData, setUserData] = useState([]);

  async function getUserData() {
    const res = await fetch(
      `http://localhost:3000/api/customer/home?` +
        new URLSearchParams({
          accountId: userId,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();
    setUserData(data);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="Home flex flex-row h-screen">
      <div className="">
        <CustomerSidebar account={userData} />
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
          bgcolor: "red",
        }}
      >
        <HomePageNavbar userId={userId} />
        <RequestModule userData={userData} />
      </div>
    </main>
  );
}

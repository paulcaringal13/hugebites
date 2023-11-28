import React from "react";
import HomePageNavbar from "../../components/HomePageNavbar";
import CustomerSidebar from "../../components/CustomerSidebar";
import Link from "next/link";

export default async function Home(path) {
  const { params } = path;
  const { id } = params;

  // GET ALL USER DATA NEEDED
  async function getUserData() {
    const res = await fetch(
      `http://localhost:3000/api/customer/home?` +
        new URLSearchParams({
          accountId: id,
        }),
      { cache: "no-store" }
    );

    const data = await res.json();

    return data;
  }

  const userData = await getUserData();

  const redirect = () => {
    <Link href={`/customer/menu/${userData.accountId}`}>ASD</Link>;
  };

  return (
    <main className="Home flex flex-row h-screen">
      <div className="z-10">
        <CustomerSidebar account={userData} />
      </div>
      <div className="flex flex-col w-full">
        <HomePageNavbar />
        <div style={{ height: "100%" }}></div>
      </div>
    </main>
  );
}

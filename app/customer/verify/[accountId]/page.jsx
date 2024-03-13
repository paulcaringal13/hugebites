"use client";
import { useEffect } from "react";
import Link from "next/link";
import verifyImg from "../../../../public/images/Verified-pana.png";
import LandingPageNavbar from "../../components/LandingPageNavbar";

export default function Verify(path) {
  const { params } = path;
  const { accountId } = params;

  const verifyAccount = async () => {
    const employeeResponse = await fetch(
      `http://localhost:3000/api/customer/sign-up/create-account/accounts?` +
        new URLSearchParams({ accountId: accountId }),
      { cache: "no-store" }
    );
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-accent text-center">
      <div
        style={{
          position: "absolute",
          zIndex: "100",
        }}
      >
        <LandingPageNavbar />
      </div>
      <div
        style={{
          width: "650px",
          height: "60%",
          backgroundImage: `url('${verifyImg.src}')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="mt-40 mx-auto"
      ></div>
      <h1 className="font-extrabold text-3xl">
        Account Verified Successfully.
      </h1>
      <Link href="/customer/sign-in" className="text-2xl font-extrabold">
        Sign in now!
      </Link>
    </div>
  );
}

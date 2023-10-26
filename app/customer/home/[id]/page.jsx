import React from "react";
import HomePageNavbar from "../../components/HomePageNavbar";
import CustomerSidebar from "../../components/CustomerSidebar";
import SidebarItem from "../../components/CustomerSidebar";
import { RiCakeLine } from "react-icons/ri";
import { LuShoppingBasket } from "react-icons/lu";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { LayoutDashboardIcon, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default async function Home(path) {
  const { params } = path;
  const { id } = params;
  // const router = useRouter();

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
        <CustomerSidebar account={userData}>
          <SidebarItem
            icon={<LayoutDashboardIcon size={20} />}
            text="Dashboard"
            alert
          />
          <SidebarItem icon={<RiCakeLine size={20} />} text="Menu" />
          <SidebarItem
            icon={<LuShoppingBasket size={20} />}
            text="Orders"
            alert
          />
          <SidebarItem
            icon={<AiOutlineUserSwitch size={20} />}
            text="Request"
          />
          <SidebarItem icon={<UserCircle size={20} />} text="Edit profile" />
        </CustomerSidebar>
      </div>
      <div className="flex flex-col w-full">
        <HomePageNavbar />
        <div style={{ height: "100%" }}></div>
      </div>
    </main>
  );
}

"use client"
import Link from "next/link"

const AdminSidebar = () => {
  const Menus = [ 
    { name : "Account", route: "admin/pages/accounts" }, 
    { name : "Menu", route: "admin/pages/menu" },
    { name : "Orders", route: "admin/pages/orders" },
    { name : "Transaction", route: "admin/pages/transaction" },
    { name : "Customization", route: "admin/pages/customization" },
    { name : "Schedule", route: "admin/pages/schedule" },
    { name : "Inventory", route: "admin/pages/inventory " },
    { name : "Reports", route: "admin/pages/reports" },
  ]

  return (
    <ul className="pt-6">
      {Menus.map((menu, index) => (
        <li key={index} className="text-gray-300 text-lg flex rounded-md cursor-pointer hover:bg-slate-400 hover:text-black hover:font-extrabold hover:text-xl duration-700">
          <Link href={menu.route} className="btn p-10 first-letter:w-full mx-auto">
              {menu.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default AdminSidebar
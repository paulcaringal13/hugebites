import Link from "next/link"

const AdminSidebar = () => {
  const Menus = [ 
    { name : "Account", route: "admin/accounts" }, 
    { name : "Menu", route: "admin/menu" },
    { name : "Orders", route: "admin/orders" },
    { name : "Transaction", route: "admin/transaction" },
    { name : "Customization", route: "admin/customization" },
    { name : "Schedule", route: "admin/schedule" },
    { name : "Inventory", route: "admin/inventory " },
    { name : "Reports", route: "admin/reports" },
  ]

  let x = Menus.map(function(menu){
    return `${menu.route}`;
})

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
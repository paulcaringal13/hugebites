import Link from "next/link"

const AdminSidebar = () => {
  return (

    <>
      <div className="container">
        <ul>
          <Link href={"admin/accounts"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950 drop-shadow-2xl">
            <h1 className="mx-auto text-white font-semibold text-xl">
              Account
            </h1>
          </Link>
          <Link href={"admin/menu"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950 drop-shadow-lg">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Menu
          </h1>
          </Link>
          <Link href={"admin/orders"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Orders
          </h1>
          </Link>
          <Link href={"admin/transaction"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Transaction
          </h1>
          </Link>
          <Link href={"admin/customization"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Customization
          </h1>
          </Link>
          <Link href={"admin/schedule"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Schedule
          </h1>
          </Link>
          <Link href={"admin/invetory"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Inventory
          </h1>
          </Link>
          <Link href={"admin/reports"} className="btn flex py-9 px-3 bg-slate-400 border-solid border-2 border-neutral-950">
          <h1 className="mx-auto text-white font-semibold text-xl">
            Reports
          </h1>
          </Link>
        </ul>
      </div>
    </>
  )
}

export default AdminSidebar
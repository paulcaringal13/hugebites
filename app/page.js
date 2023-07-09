import Menu from '@/components/Menu'
import './styles/globals.css'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <h1>Landing Page</h1>
      <Menu/>
      <div className="container flex flex-col mt-10 px-2">
        <Link href={'/user/admin'} className="btn w-24 text-center bg-slate-600 mt-5 p-5 rounded-md text-white hover:text-slate-100 duration-500">Admin</Link>
        <Link href={'/user/employee'} className="btn w-32 text-center bg-slate-600 mt-5 p-5 rounded-md text-white hover:text-slate-100 duration-500">Employee</Link>
        <Link href={'/user/customer'} className="btn w-32 text-center bg-slate-600 mt-5 p-5 rounded-md text-white hover:text-slate-100 duration-500">Customer</Link>
      </div>
    </>
  )
}
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-600 px-8 py-3 fixed w-screen z-50">
      <div>
        <Link href={"/"} className="text-5xl">
          Huge<span className="text-sky-200">Bites</span>
        </Link>
      </div>
      <ul className="flex item-center">
        <li className="mx-4">
          <Link href={"#menu"} className="hover:text-sky-200 duration-500">
            Menu
          </Link>
        </li>
        <li className="mx-4">
          <Link href={"/sign-in"} className="hover:text-sky-200 duration-500">
            Sign In
          </Link>
        </li>
        <li className="mx-4">
          <Link href={"/sign-up"} className="hover:text-sky-200 duration-500">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

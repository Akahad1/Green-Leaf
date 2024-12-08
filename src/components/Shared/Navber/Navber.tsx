"use client";
import { useUser } from "@/context/user.provider";
import { logOut } from "@/Services/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Nabver = () => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const handleLogOut = () => {
    logOut();
    setIsLoading(true);

    router.push("/login");
  };
  return (
    <div className="top-0 sticky z-50 w-full mb-[-40px]">
      <div className="navbar bg-base-100  border-b   mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/imageGallery">Image gallery</Link>
              </li>
              <li>
                <Link href="/deshbord">Dashboard</Link>
              </li>
              <li>
                <Link href="/aboutUs">About Us</Link>
              </li>
              <li>
                <Link href="/contactUs ">Contact Us </Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            {/* <Image src={brandLogo} width={30} height={30} alt="brand logo" /> */}
            Green Leaf
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/imageGallery">Image gallery</Link>
            </li>
            <li>
              <Link href="/deshbord">Dashboard</Link>
            </li>
            <li>
              <Link href="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link href="/contactUs ">Contact Us </Link>
            </li>
            <button></button>
          </ul>
        </div>
        <div className="navbar-end">
          <button
            onClick={() => handleLogOut()}
            className="btn  rounded-full px-5"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nabver;

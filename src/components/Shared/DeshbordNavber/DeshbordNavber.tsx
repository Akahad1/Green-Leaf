"use client";
import { useUser } from "@/context/user.provider";
import { useGetUser } from "@/hooks/user.hook";
import { logOut } from "@/Services/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";

interface DeshbordNavberProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  userId: string;
}
const DeshbordNavber: React.FC<DeshbordNavberProps> = ({
  toggleSidebar,
  isOpen,
  userId,
}) => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const handleLogOut = () => {
    logOut();
    setIsLoading(true);

    router.push("/login");
  };
  console.log("id", userId);
  const { data: userData, isLoading } = useGetUser(userId);

  console.log("userdata", userData);
  return (
    <div className=" bg-white w-full ">
      <div className="navbar   border-b  ">
        <div className="navbar-start">
          <button
            className=" p-2 inline h-24 lg:hidden"
            onClick={toggleSidebar}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
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
        <div className="navbar-end mr-4">
          <div className="flex gap-3">
            <div className="avatar">
              <Suspense fallback={isLoading}>
                <div className="w-12 rounded-full">
                  {userData?.data.image ? (
                    <img src={userData?.data.image} />
                  ) : (
                    <>
                      {" "}
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </>
                  )}
                </div>
              </Suspense>
            </div>
            <div>
              <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <details>
                      <summary>
                        <Suspense fallback={isLoading}>
                          {userData?.data.name}
                        </Suspense>
                      </summary>
                      <ul className="bg-base-100 rounded-t-none p-3 mb-5">
                        <li className="flex lg:hidden">
                          <Link href="/">
                            {" "}
                            <FaHome className="inline h-4 w-4 mr-2 " />
                            Home
                          </Link>
                        </li>
                        <li className="flex">
                          <Link href="/profile">
                            {" "}
                            <FaUser className="inline h-4 mr-2 " /> Profile
                          </Link>
                        </li>
                        <li>
                          <div onClick={() => handleLogOut()}>
                            <IoMdLogOut size={20} className="inline " /> SingOut{" "}
                          </div>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeshbordNavber;

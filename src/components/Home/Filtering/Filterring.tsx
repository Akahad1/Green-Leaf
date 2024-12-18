"use client";

import { useGetUser } from "@/hooks/user.hook";
import Image from "next/image";
import Link from "next/link";

// components/SearchFilter.tsx
interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
interface SearchFilterProps {
  setParm: React.Dispatch<React.SetStateAction<string>>;
  setSearchParm: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  setParm,
  setSearchParm,
  userId,
}) => {
  const { data: userData, isLoading } = useGetUser(userId);

  return (
    <div className="flex ">
      <div className="w-full max-w-lg lg:max-w-[calc(36rem-35px)] lg:mr-10 flex p-3 rounded-lg shadow-xl bg-gradient-to-r cursor-pointer hover:shadow-xl transition-all">
        {userData?.data.image ? (
          <Link href="/profile">
            <div className="avatar">
              <div className="rounded-full w-12  mr-6 lg:mr-6 shadow-md">
                <img src={userData?.data?.image} />
              </div>
            </div>
          </Link>
        ) : (
          <Link href="/profile">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
              alt="Profile Image"
              width={48}
              height={48}
              className="rounded-full mr-6 lg:mr-6 shadow-md"
            />
          </Link>
        )}
        <input
          type="text"
          onChange={(e) => setSearchParm(e.target.value)}
          placeholder="Search posts..."
          className="border rounded-xl bg-white bg-opacity-70 p-2 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all  w-full lg:w-96 lg:mx-6"
        />
      </div>
      <select
        onChange={(e) => setParm(e.target.value)}
        className="border hidden border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 lg:w-52 bg-white"
      >
        <option value="">All Categories</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Flowers">Flowers</option>
        <option value="Herbs">Herbs</option>
        <option value="Fruits">Fruits</option>
      </select>
    </div>
  );
};

export default SearchFilter;

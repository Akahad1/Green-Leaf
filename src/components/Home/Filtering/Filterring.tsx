"use client";
// components/SearchFilter.tsx
interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
interface SearchFilterProps {
  setParm: React.Dispatch<React.SetStateAction<string>>;
  setSearchParm: React.Dispatch<React.SetStateAction<string>>;
}
const SearchFilter: React.FC<SearchFilterProps> = ({
  setParm,
  setSearchParm,
}) => {
  return (
    <div className="flex space-x-4 items-center lg:hidden ">
      <input
        type="text"
        onChange={(e) => setSearchParm(e.target.value)}
        placeholder="Search posts..."
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 lg:w-80"
      />

      <select
        onChange={(e) => setParm(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 lg:w-52 bg-white"
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

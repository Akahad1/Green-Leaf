import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Error Image */}
        <div className="relative w-72 h-72 mx-auto">
          <Image
            src="/images/not-found.svg" // Replace with your "Not Found" image
            alt="Not Found"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-700 mt-6">
          Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mt-4">
          We couldn't find the page you're looking for.
        </p>

        {/* Back Home Button */}
        <Link href="/">
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

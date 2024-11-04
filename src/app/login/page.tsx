"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { toast } from "sonner";
// import { signIn } from "next-auth/react";

import Link from "next/link";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";

const LoginPage = () => {
  const { mutate: handleUserLogIn, isPending, isSuccess } = useUserLogin();
  const route = useRouter();
  const { setIsLoading } = useUser();
  const logInHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const email = form.email.value;

    const password = form.password.value;
    const userInfo = {
      password,
      email,
    };
    handleUserLogIn(userInfo);
    setIsLoading(true);
  };
  const searchParam = useSearchParams();
  const pathname = searchParam.get("redirect");
  console.log(pathname);
  useEffect(() => {
    if (!isPending && isSuccess) {
      if (pathname) {
        route.push(pathname); // Navigate to the saved path
      } else {
        route.push("/"); // Navigate to the home page
      }
    }
  }, [isPending, isSuccess, pathname, route]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

        <form className="space-y-4" onSubmit={logInHandler}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          {/* Submit Button */}
          <div>
            <p className="text-sm">
              Please Create A{" "}
              <Link className="text-blue-500" href="/singup">
                New Accoutnt
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        {/* OAuth Buttons */}
        <div className="mt-6 space-y-4">
          {/* <button
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            className="w-full flex justify-center items-center bg-red-600 text-white p-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5 mr-2"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.13 0 5.23 1.37 6.43 2.5l4.71-4.71C31.33 4.69 27.89 3 24 3 14.58 3 7 10.58 7 20s7.58 17 17 17c4.59 0 8.31-1.53 11.09-4.13l-4.71-4.71c-1.26 1.11-3.31 2.34-6.38 2.34-5.06 0-9.35-3.45-10.88-8.12H7.92V20H13c1.53-4.67 5.82-8.12 11-8.12z"
              />
              <path
                fill="#34A853"
                d="M7.92 14.4c-.61 1.84-.92 3.82-.92 5.6s.31 3.76.92 5.6V20H13c1.53-4.67 5.82-8.12 11-8.12V7c-6.52 0-12.06 3.75-14.08 9.4z"
              />
              <path
                fill="#FBBC05"
                d="M24 37c3.89 0 7.33-1.34 9.71-3.66l-4.71-4.71c-1.54 1.05-3.65 1.88-6.43 1.88-5.19 0-9.53-3.52-10.93-8.24H7.92v3.2C10.94 33.34 17.48 37 24 37z"
              />
              <path
                fill="#EA4335"
                d="M42 24c0-1.3-.11-2.53-.32-3.74H24v7.08h10.09c-.43 2.17-1.56 4.01-3.14 5.34l4.71 4.71C38.96 34.44 42 29.72 42 24z"
              />
            </svg>
            Log In with Google
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

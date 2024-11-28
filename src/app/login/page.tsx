"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";

const LoginPage = () => {
  const { mutate: handleUserLogIn, isPending, isSuccess } = useUserLogin();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const route = useRouter();
  const { setIsLoading } = useUser();

  // Handle form submission
  const logInHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message on new attempt
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const userInfo = { email, password };

    handleUserLogIn(userInfo, {
      onError: (err: any) => {
        // Display backend error message
        const message = err.response?.data?.message || "Login failed!";
        setErrorMessage(message);
        toast.error(message); // Optional: Display toast notification
      },
    });
    setIsLoading(true);
  };

  // Handle redirect after successful login
  useEffect(() => {
    if (!isPending && isSuccess) {
      route.push("/"); // Navigate to the home page
      toast.success("Logged in successfully!");
    }
  }, [isPending, isSuccess, route]);

  // Demo user data
  const demoUser = { email: "aksahad@gmail.com", password: "123456" };
  const demoAdmin = { email: "skshkib@gmail.com", password: "123456" };

  // Auto-fill the form for demo users
  const fillDemoUser = (user: { email: string; password: string }) => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    emailInput.value = user.email;
    passwordInput.value = user.password;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>

        <form className="space-y-6" onSubmit={logInHandler}>
          {/* Email */}
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Links for registration */}
        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link href="/singup" className="text-blue-500 hover:underline">
              Create one here
            </Link>
          </p>
        </div>

        {/* Demo Buttons */}
        <div className="space-y-4 mt-6">
          <button
            onClick={() => fillDemoUser(demoUser)}
            className="w-full bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Demo User Login
          </button>
          <button
            onClick={() => fillDemoUser(demoAdmin)}
            className="w-full bg-red-500 text-white p-3 rounded-md font-semibold hover:bg-red-600 transition duration-300"
          >
            Demo Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

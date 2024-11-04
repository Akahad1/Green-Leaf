"use client";

import { useUserRegistration } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

const SignupForm = () => {
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const route = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.fullname.value;

    const email = form.email.value;
    const phone = form.phone.value;

    const password = form.password.value;

    const userinfo = {
      name,
      email,
      password,
      phone,
    };
    console.log(userinfo);

    handleUserRegistration(userinfo);
    if (isSuccess) {
      form.reset();
    }
  };
  useEffect(() => {
    if (!isPending && isSuccess) {
      route.push("/login");
    }
  }, [isPending, isSuccess, route]);
  if (isPending) {
    <h1>Pending...</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}

          <input
            type="text"
            name="fullname"
            placeholder="Name"
            className="w-full  p-2 border border-gray-300 rounded-md"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder=" Email"
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

          {/* phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

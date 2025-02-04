"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { jwtDecode } from "jwt-decode";

import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form";

export const resisterUser = async (userData: FieldValues) => {
  try {
    const { data } = await AxiosInstance.post("/auth/signup", userData);
    if (data.success) {
      (await cookies()).set("accessToken", data.data.accessToken);
      (await cookies()).set("refreshToken", data.data.refreshToken);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await AxiosInstance.post("/auth/login", userData);
    if (data.success) {
      (await cookies()).set("accessToken", data.data.accessToken);
      (await cookies()).set("refreshToken", data.data.refreshToken);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const currentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return decodedToken;
  }
  return decodedToken;
};

export const logOut = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

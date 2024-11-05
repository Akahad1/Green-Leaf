"use server";

import AxiosInstance from "@/lib/AuthInstanse";

export const getUser = async (UserId: string): Promise<any> => {
  try {
    const { data } = await AxiosInstance.get(`/user/${UserId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

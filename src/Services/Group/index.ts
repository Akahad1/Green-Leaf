"use server";
import AxiosInstance from "@/lib/AuthInstanse";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createGroup = async (groupData: FieldValues): Promise<any> => {
  console.log(groupData);
  try {
    const { data } = await AxiosInstance.post(
      "/groups/create-group",
      groupData
    );
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

"use server";
import AxiosInstance from "@/lib/AuthInstanse";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createGroup = async (groupData: FieldValues): Promise<any> => {
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
export const getMyGroup = async (userId: string): Promise<any> => {
  console.log(userId);
  try {
    const { data } = await AxiosInstance.get(`/groups/${userId}`);
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getSpecificMyGroup = async (
  userId: string,
  groupId: string
): Promise<any> => {
  console.log(userId);
  try {
    const { data } = await AxiosInstance.get(
      `/groups/${userId}/group/${groupId}`
    );
    console.log("internal", data);
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

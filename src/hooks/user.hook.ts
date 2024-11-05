import {
  getUser,
  updateUserCoverImage,
  updateUserImage,
  updateUserinfo,
} from "@/Services/User";
import { profileImage } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(userId),
  });
};
export const useAddProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, profileImage>({
    mutationKey: ["user"],
    mutationFn: async (profileInfo) => await updateUserImage(profileInfo),
    onSuccess: () => {
      toast.success("Profile update Successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAddCoverImage = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, profileImage>({
    mutationKey: ["user"],
    mutationFn: async (profileInfo) => await updateUserCoverImage(profileInfo),
    onSuccess: () => {
      toast.success("Profile update Successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useAddUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, profileImage>({
    mutationKey: ["user"],
    mutationFn: async (profileInfo) => await updateUserinfo(profileInfo),
    onSuccess: () => {
      toast.success("Profile update Successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

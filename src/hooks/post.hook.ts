import { deletedPost, getAllPost, updatePost } from "@/Services/AllPost";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllPost = (catagory: string, searchParam: string) => {
  return useQuery({
    queryKey: ["post", catagory, searchParam],
    queryFn: async () => await getAllPost(catagory, searchParam),
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["post"],
    mutationFn: async (postid) => await deletedPost(postid),
    onSuccess: () => {
      toast.success("post deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["post"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["post"],
    mutationFn: async (postid) => await updatePost(postid),
    onSuccess: () => {
      toast.success("post Update Successfully");
      queryClient.invalidateQueries({
        queryKey: ["post"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

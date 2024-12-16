import { createGroup, getMyGroup, getSpecificMyGroup } from "@/Services/Group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["group"],
    mutationFn: async (groupData) => await createGroup(groupData),

    onSuccess: () => {
      toast.success("Group Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["group"],
        exact: false,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useGetMyGroup = (userId: string) => {
  return useQuery({
    queryKey: ["group", userId],
    queryFn: async () => await getMyGroup(userId),
  });
};
export const useSpecificGetMyGroup = (userId: string, groupId: string) => {
  return useQuery({
    queryKey: ["group", userId, groupId],
    queryFn: async () => await getSpecificMyGroup(userId, groupId),
  });
};

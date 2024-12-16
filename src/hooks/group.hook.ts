import { createGroup } from "@/Services/Group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  // const toastID = toast.loading("Creating Group");

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

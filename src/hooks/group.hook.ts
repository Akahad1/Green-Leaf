import {
  createGroup,
  getMyGroup,
  getNotInvolvedGroup,
  getSpecificMyGroup,
  memberApproval,
  sendInviteRequest,
  updateSpecificMyGroup,
} from "@/Services/Group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface InviteRequestPayload {
  groupId: string;
  userId: string;
}
interface TUpGroup {
  userId: string;
  groupId: string;

  groupData: { coverImage: string | null };
}
interface TMemberApproval {
  groupId: string;
  requestId: string;
  status: string;
}
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
export const usesendInviteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, InviteRequestPayload>({
    mutationKey: ["group"],
    mutationFn: async ({ groupId, userId }: InviteRequestPayload) => {
      return await sendInviteRequest(groupId, userId);
    },

    onSuccess: () => {
      toast.success("Join Reqest Send Successfully");

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
export const useUpdateSpecificMyGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TUpGroup>({
    mutationKey: ["group"],
    mutationFn: async ({ userId, groupId, groupData }: TUpGroup) => {
      return await updateSpecificMyGroup(userId, groupId, groupData);
    },

    onSuccess: () => {
      toast.success("Group Update Successfully");

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
export const useMemberApproval = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TMemberApproval>({
    mutationKey: ["group"],
    mutationFn: async ({ groupId, requestId, status }: TMemberApproval) => {
      return await memberApproval(groupId, requestId, status);
    },

    onSuccess: () => {
      toast.success("Your Reqest Send Successfully");

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
export const useNotInvolvedGroup = (userId: string) => {
  return useQuery({
    queryKey: ["group", userId],
    queryFn: async () => await getNotInvolvedGroup(userId),
  });
};

import HomePostCard from "@/components/Home/HomePostCartd/HomePostCartd";
import CardLoader from "@/components/Loader/CardLoder/CardLoder";
import PostEditorModal from "@/components/ProfilePage/PostCreator/PostCreator";
import { useSpecificGetMyGroup } from "@/hooks/group.hook";
import { useGetGroupPost } from "@/hooks/post.hook";
import React from "react";

const GroupDiscussion = ({
  groupId,
  userId,
}: {
  groupId: string;
  userId: string;
}) => {
  const { data: groupPostData, isLoading } = useGetGroupPost(groupId);
  const { data: groupData, isLoading: GropLoading } = useSpecificGetMyGroup(
    userId,
    groupId
  );
  if (isLoading) {
    return <CardLoader></CardLoader>;
  }
  console.log("g", groupPostData);
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-3 ">
      <div className="lg:col-span-7">
        <PostEditorModal userId={userId} groupId={groupId}></PostEditorModal>
        <div className="mt-3">
          <HomePostCard
            data={groupPostData}
            isLoading={isLoading}
            currentUserId={userId}
          ></HomePostCard>
        </div>
      </div>
      <div className="hidden lg:relative lg:col-span-5  mt-3 lg:block">
        <div className="lg:sticky lg:top-20 p-4 border bg-white border-gray-200 rounded-lg shadow-sm">
          <p className="text-xl font-semibold text-gray-800 mb-2">About</p>

          <p className="text-gray-600">
            <span>Description: </span>
            {groupData?.data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupDiscussion;

import GroupProfile from "@/components/Groups/GroupsProfile/GroupsProfile";
import { currentUser } from "@/Services/AuthService";

const pages = async ({ params }: { params: any }) => {
  const { groupId } = await params;
  console.log(groupId);
  const user = await currentUser();
  return (
    <div>
      <GroupProfile groupId={groupId} userId={user?._id}></GroupProfile>
    </div>
  );
};

export default pages;

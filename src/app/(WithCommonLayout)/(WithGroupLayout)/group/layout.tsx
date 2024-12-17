import CreateGroup from "@/components/Groups/CreateGroup/CreateGroup";
import { currentUser } from "@/Services/AuthService";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      {/* desktop view */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-5">
        <div className="lg:col-span-4">
          <CreateGroup userId={user?._id}></CreateGroup>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
      {/* Mobile View  */}
      <div className="block lg:hidden">
        <CreateGroup userId={user?._id}></CreateGroup>
      </div>

      <div className="lg:hidden mt-5">{children}</div>
    </div>
  );
};

export default layout;

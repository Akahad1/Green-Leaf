import Nabver from "@/components/Shared/Navber/Navber";
import { currentUser } from "@/Services/AuthService";

import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div>
      <Nabver user={user}></Nabver>
      <div className="bg-[#F4F2EE]">
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;

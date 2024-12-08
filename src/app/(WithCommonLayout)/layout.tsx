import Nabver from "@/components/Shared/Navber/Navber";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nabver></Nabver>
      <div className="bg-[#F4F2EE]">
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;

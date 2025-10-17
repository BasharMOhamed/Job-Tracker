import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="place-items-center place-content-center min-h-screen">
      {children}
    </div>
  );
};

export default layout;

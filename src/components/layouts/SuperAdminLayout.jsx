import React from "react";
import SuperAdminSidebar from "../sidebar/SuperAdminSidebar";
import SuperAdminHeader from "../header/SuperAdminHeader";
import { useTheme } from "../../hooks/theme/useTheme";

const SuperAdminLayout = ({
  children,
  setActiveTab,
  hideSidebarAndHeader = false,
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen bg-[#E5E4E0]">
      {!hideSidebarAndHeader && (
        <div className="w-[280px] bg-[#E9EBF7]">
          <div className="fixed w-[280px] h-screen bg-[#E9EBF7] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:w-0 [-ms-overflow-style:'none'] [scrollbar-width:none]">
            <SuperAdminSidebar setActiveTab={setActiveTab} />
          </div>
        </div>
      )}
      <div
        className={`flex-1 flex flex-col ${
          hideSidebarAndHeader ? "w-full" : "min-w-0"
        }`}
      >
        {!hideSidebarAndHeader && <SuperAdminHeader />}
        <main
          className="p-4 flex-1 overflow-auto"
          style={{ backgroundColor: theme?.backgroundColor }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

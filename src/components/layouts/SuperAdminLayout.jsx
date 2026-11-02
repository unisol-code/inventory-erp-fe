import { useState, useEffect } from "react";
import SuperAdminSidebar from "../sidebar/SuperAdminSidebar";
import SuperAdminHeader from "../header/SuperAdminHeader";
import { useTheme } from "../../hooks/theme/useTheme";

const SuperAdminLayout = ({
  children,
  setActiveTab,
  hideSidebarAndHeader = false,
}) => {
  const { theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleOverlayClick = () => setIsMobileOpen(false);

  if (hideSidebarAndHeader) {
    return (
      <div className="flex min-h-screen bg-[#E5E4E0]">
        <main
          className="p-4 flex-1 overflow-auto"
          style={{ backgroundColor: theme?.backgroundColor }}
        >
          {children}
        </main>
      </div>
    );
  }

  const sidebarMarginClass = isCollapsed ? "md:ml-[64px]" : "md:ml-[260px]";

  return (
    <div className="flex min-h-screen bg-[#E5E4E0]">
      <div
        className="hidden md:block fixed top-0 left-0 bottom-0 z-30 overflow-y-auto transition-all duration-300"
        style={{
          width: isCollapsed ? "64px" : "260px",
        }}
      >
        <SuperAdminSidebar
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      <div
        className="fixed md:hidden inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{
          opacity: isMobileOpen ? 1 : 0,
          visibility: isMobileOpen ? "visible" : "hidden",
        }}
        onClick={handleOverlayClick}
      />

      <div
        className="fixed md:hidden inset-y-0 left-0 z-50 w-80 max-w-[90vw] transform transition-transform duration-300 ease-in-out"
        style={{
          transform: isMobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SuperAdminSidebar
          setActiveTab={setActiveTab}
          isCollapsed={false}
          toggleCollapse={() => {}}
        />
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarMarginClass}`}
      >
        <SuperAdminHeader onMenuToggle={() => setIsMobileOpen(true)} />
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

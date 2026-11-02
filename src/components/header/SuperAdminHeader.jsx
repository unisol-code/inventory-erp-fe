import { useState } from "react";
import { Menu as MenuIcon, LogOut } from "lucide-react";
import { useTheme } from "../../hooks/theme/useTheme";
import { useSetRecoilState } from "recoil";
import { useSignIn } from "../../hooks/auth/useSignIn";
import { userAuthState } from "../../state/authenticatedState/authenticatedState";

const SuperAdminHeader = ({ onMenuToggle }) => {
  const { theme } = useTheme();
  const [showLogout, setShowLogout] = useState(false);

  const { resetSuperAdmin } = useSignIn();
  const setUserInfo = useSetRecoilState(userAuthState);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserInfo({
      isAuthenticated: false,
    });
    resetSuperAdmin();
  };

  return (
    <header
      className="flex items-center justify-between h-[65px] px-6 shadow-sm border-b transition-all duration-300"
      style={{
        backgroundColor: theme?.cardBg || "rgba(255, 255, 255, 0.85)",
        borderBottomColor: theme?.sidebarDivider || `${theme?.primaryColor}20`,
      }}
    >
      <button
        type="button"
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg transition-all duration-200"
        style={{
          color: theme?.sidebarText || "#334155",
        }}
        aria-label="Toggle menu"
      >
        <MenuIcon size={20} />
      </button>

      {/* Profile - Right Side */}
      <div
        className="ml-auto flex items-right gap-2 relative"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        <div className="relative flex items-center">
          <img
            className="cursor-pointer w-[30px] h-[30px] object-cover rounded-full"
            style={{
              borderWidth: "2px",
              borderColor: theme?.sidebarDivider || "#B8D9ED",
            }}
            src="https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />
          <span className="ml-2 text-[12px] font-medium" style={{ color: theme?.accentColor }}>
            SuperAdmin
          </span>
          {showLogout && (
            <button
              type="button"
              onClick={handleLogout}
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg transition-opacity duration-200 z-50"
              style={{
                backgroundColor: theme?.cardBg || "#FFFFFF",
                color: theme?.activeModuleText || theme?.accentColor || "#1C5CD6",
                border: `1px solid ${theme?.sidebarDivider || "#B8D9ED"}`,
              }}
            >
              <LogOut size={12} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default SuperAdminHeader;

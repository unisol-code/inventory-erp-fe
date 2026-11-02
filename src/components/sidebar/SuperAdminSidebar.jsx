import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  ChevronDown,
  ChevronLeft,
  HelpCircle,
  Phone,
  LogOut,
} from "lucide-react";
import { useSignIn } from "../../hooks/auth/useSignIn";
import { userAuthState } from "../../state/authenticatedState/authenticatedState";
import { useTheme } from "../../hooks/theme/useTheme";

import dashboard from "../../assets/images/dashboard.png";
import inventoryImg from "../../assets/images/inventoryImg.png";
import warehouseImg from "../../assets/images/warehouseImg.png";
import ProductImg from "../../assets/images/ProductImg.png";
import replenishmentImg from "../../assets/images/replenishmentImg.png";
import vendorMgmtImg from "../../assets/images/vendorMgmtImg.png";
import clientMgmtImg from "../../assets/images/clientMgmtImg.png";
import tenderImg from "../../assets/images/tenderImg.png";
import reportsImg from "../../assets/images/reportsImg.png";
import inventoryMainImg from "../../assets/images/inventoryMainImg.png";

const SuperAdminSidebar = ({ setActiveTab, isCollapsed, toggleCollapse }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  const { resetSuperAdmin } = useSignIn();
  const setUserInfo = useSetRecoilState(userAuthState);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const getBg = () => theme?.bgSidebar || "#E9EBF7";
  const getPrimary = () => theme?.primaryColor || "#A9B5FF";
  const getSecondary = () => theme?.secondaryColor || "#CAD2FF";
  const getHighlight = () => theme?.highlightColor || getSecondary();
  const getBgImage = () => theme?.backgroundImg || "";
  const getLogo = () => theme?.logoImage || inventoryMainImg;

  const getSidebarText = () => theme?.sidebarText || getBg();
  const getSidebarIcon = () => theme?.sidebarIcon || getSidebarText();
  const getSidebarHover = () => theme?.sidebarHover || "rgba(255,255,255,0.15)";
  const getActiveModuleBg = () => theme?.activeModuleBg || getSidebarHover();
  const getActiveModuleText = () => theme?.activeModuleText || getPrimary();
  const getActiveSubModuleBg = () => theme?.activeSubModuleBg || "rgba(255,255,255,0.3)";
  const getActiveSubModuleText = () => theme?.activeSubModuleText || getPrimary();
  const getActiveIndicator = () => theme?.activeIndicator || getPrimary();
  const getSidebarDivider = () => theme?.sidebarDivider || "rgba(255,255,255,0.2)";

  // useEffect(() => {
  //   if (location.pathname === "/inventory-dashboard") {
  //     setActiveTab("Dashboard");
  //   }
  //   const matchItem = menuItems.find(
  //     (item) =>
  //       item.type === "accordion" &&
  //       item.subItems?.some((sub) => isLinkActive(sub.path))
  //   );
  //   if (matchItem) {
  //     setExpandedMenu(matchItem.id);
  //     const matchedChild = matchItem.subItems?.find((sub) => isLinkActive(sub.path));
  //     setActiveChild(matchedChild ? matchedChild.path : matchItem.firstChildPath);
  //   }
  // }, [location.pathname, setActiveTab]);

  useEffect(() => {
    const matchItem = menuItems.find(
      (item) =>
        item.type === "accordion" &&
        item.subItems?.some((sub) => sub.path === location.pathname)
    );

    // Only the parent belonging to the current route stays expanded
    setExpandedMenu(matchItem?.id ?? null);

    // Only the child belonging to the current route stays active
    const matchedChild = matchItem?.subItems?.find(
      (sub) => sub.path === location.pathname
    );

    setActiveChild(matchedChild?.path ?? null);

    if (location.pathname === "/inventory-dashboard") {
      setActiveTab("Dashboard");
    }
  }, [location.pathname, setActiveTab]);

  const handleTabClick = (tabName, isAccordionParent = false) => {
    setActiveTab(tabName);
    if (!isAccordionParent) {
      setExpandedMenu(null);
      setActiveChild(null);
    }
  };

  // const toggleMenu = (menuId, firstChildPath = null) => {
  //   if (expandedMenu === menuId) {
  //     setExpandedMenu(null);
  //     setActiveChild(null);
  //   } else {
  //     setExpandedMenu(menuId);
  //     if (firstChildPath) {
  //       setActiveChild(firstChildPath);
  //     }
  //   }
  // };

  const toggleMenu = (menuId, firstChildPath = null) => {
    setExpandedMenu((previousMenu) => {
      if (previousMenu === menuId) {
        setActiveChild(null);
        return null;
      }

      setActiveChild(firstChildPath);
      return menuId;
    });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    // setToast({ type: "success", message: "Logged out successfully" });
    setUserInfo({
      isAuthenticated: false,
    });
    resetSuperAdmin();
    navigate("/");
  };

  const isLinkActive = (path) => location.pathname === path;

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: dashboard,
      path: "/inventory-dashboard",
      type: "link",
    },
    {
      id: "inventory",
      name: "Inventory",
      icon: inventoryImg,
      type: "accordion",
      firstChildPath: "/inventory",
      subItems: [
        { name: "All Inventory", path: "/inventory" },
        { name: "Inventory Tracking", path: "/inventory/inventory-tracking" },
        { name: "Quotation", path: "/inventory/quotation" },
        { name: "Proposals", path: "/inventory/proposals" },
      ],
    },
    {
      id: "warehouse",
      name: "Warehouse Management",
      icon: warehouseImg,
      path: "/warehouse-management",
      type: "link",
    },
    {
      id: "product",
      name: "Product",
      icon: ProductImg,
      type: "accordion",
      firstChildPath: "/product",
      subItems: [
        { name: "Product Management", path: "/product" },
        { name: "Purchase Order", path: "/product/product-order" },
      ],
    },
    {
      id: "replenishment",
      name: "Replenishment",
      icon: replenishmentImg,
      path: "/replenishment",
      type: "link",
    },
    {
      id: "vendor",
      name: "Vendor Management",
      icon: vendorMgmtImg,
      path: "/vendor-management",
      type: "link",
    },
    {
      id: "client",
      name: "Client Management",
      icon: clientMgmtImg,
      path: "/client-management",
      type: "link",
    },
    {
      id: "tender",
      name: "Tender Management",
      icon: tenderImg,
      path: "/tender-management",
      type: "link",
    },
    {
      id: "reports",
      name: "Reports",
      icon: reportsImg,
      path: "/reports",
      type: "link",
    },
  ];

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const hasSubmenu = item.type === "accordion";
    const isExpanded = expandedMenu === item.id;
    const isParentChildActive = item.subItems?.some(
      (sub) => activeChild === sub.path || isLinkActive(sub.path)
    );
    // const isActive = !hasSubmenu
    //   ? isLinkActive(item.path)
    //   : expandedMenu === item.id || isParentChildActive;

    const isActive = hasSubmenu
      ? isExpanded
      : location.pathname === item.path;

    if (hasSubmenu) {
      return (
        <div key={item.id} className="mb-1">
          <button
            type="button"
            onClick={() => toggleMenu(item.id, item.firstChildPath)}
            className="w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 group"
            style={{
              backgroundColor: isActive ? getActiveModuleBg() : "transparent",
              color: isActive ? getActiveModuleText() : getSidebarText(),
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = getSidebarHover();
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
            }}
            title={item.name}
          >
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 ml-1">
              <img
                src={Icon}
                alt={item.name}
                className="w-5 h-5 object-contain transition-transform duration-200"
              />
            </span>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-sm font-medium">
                  {item.name}
                </span>
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200"
                  style={{
                    color: getSidebarIcon(),
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </>
            )}
          </button>
          {isExpanded && !isCollapsed && (
            <ul className="mt-1 space-y-1">
              {item.subItems?.map((sub) => {
                const isChildActive = activeChild ? activeChild === sub.path : isLinkActive(sub.path);
                return (
                  <li key={sub.path}>
                    <NavLink
                      to={sub.path}
                      onClick={() => {
                        handleTabClick(sub.name, true);
                        setActiveChild(sub.path);
                      }}
                      className="block w-full rounded-lg text-xs font-medium py-2 pl-10 pr-3 transition-all duration-200 relative overflow-hidden"
                      style={{
                        backgroundColor: isChildActive
                          ? getActiveSubModuleBg()
                          : "transparent",
                        color: isChildActive
                          ? getActiveSubModuleText()
                          : getSidebarText(),
                      }}
                      onMouseEnter={(e) => {
                        if (!isChildActive) e.currentTarget.style.backgroundColor = getSidebarHover();
                      }}
                      onMouseLeave={(e) => {
                        if (!isChildActive) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {isChildActive && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full"
                          style={{ backgroundColor: getActiveIndicator() }}
                        />
                      )}
                      {sub.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    }

    return (
      <li key={item.id} className="mb-1">
        <NavLink
          to={item.path}
          onClick={() => handleTabClick(item.name, true)}
          className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all duration-200 relative group"
          style={{
            backgroundColor: isLinkActive(item.path) ? getActiveModuleBg() : "transparent",
            color: isLinkActive(item.path) ? getActiveModuleText() : getSidebarText(),
          }}
          onMouseEnter={(e) => {
            if (!isLinkActive(item.path)) e.currentTarget.style.backgroundColor = getSidebarHover();
          }}
          onMouseLeave={(e) => {
            if (!isLinkActive(item.path)) e.currentTarget.style.backgroundColor = "transparent";
          }}
          title={item.name}
        >
          {isLinkActive(item.path) && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full"
              style={{ backgroundColor: getActiveIndicator() }}
            />
          )}
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 ml-1">
            <img
              src={Icon}
              alt={item.name}
              className="w-5 h-5 object-contain transition-transform duration-200"
            />
          </span>
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </NavLink>
      </li>
    );
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: getBg(),
        backgroundImage: getBgImage()
          ? `linear-gradient(180deg, ${getPrimary()}0A 0%, ${getHighlight()}0A 100%)`
          : `linear-gradient(180deg, ${getPrimary()}0A 0%, ${getHighlight()}0A 100%)`,
      }}
    >
      {getBgImage() && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${getBgImage()})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
          }}
        />
      )}

      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${getSidebarDivider()}` }}>
          <div className="flex items-center justify-center w-full">
            <img
              src={getLogo()}
              alt="Company Logo"
              className={`object-contain transition-all duration-300 ${isCollapsed ? "h-12 w-12" : "h-14 w-full"
                }`}
            />
          </div>
          <button
            type="button"
            onClick={toggleCollapse}
            className="hidden md:block absolute top-4 right-[-18px] shadow-xl rounded-full p-1.5 transition-all duration-200 z-10"
            style={{
              backgroundColor: theme?.cardBg || "#FFFFFF",
              color: theme?.textColor || "#334155",
            }}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>

        <div className="border-t" style={{ borderColor: getSidebarDivider() }}>
          <div
            className={`flex flex-col ${isCollapsed ? "items-center gap-1.5 p-2" : "p-2"
              }`}
          >
            <button
              type="button"
              onClick={() => navigate("/reports")}
              className={`flex items-center gap-2.5 rounded-xl text-sm font-medium ${isCollapsed ? "w-9 h-9 justify-center" : "w-full py-2"
                }`}
              style={{ color: getSidebarIcon() }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = getSidebarHover())}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              title="Help Center"
            >
              <HelpCircle size={18} />
              {!isCollapsed && <span>Help Center</span>}
            </button>
            <button
              type="button"
              onClick={() => navigate("/client-management")}
              className={`flex items-center gap-2.5 rounded-xl text-sm font-medium ${isCollapsed ? "w-9 h-9 justify-center" : "w-full py-2"
                }`}
              style={{ color: getSidebarIcon() }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = getSidebarHover())}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              title="Contact Us"
            >
              <Phone size={18} />
              {!isCollapsed && <span>Contact Us</span>}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className={`flex items-center gap-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isCollapsed ? "w-9 h-9 justify-center" : "w-full py-2"
                }`}
              style={{ color: getActiveModuleText() }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.buttonDanger || "#B42318";
                e.currentTarget.style.color = theme?.buttonPrimaryText || "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = theme?.activeModuleText || theme?.primaryColor || "#4FA8E5";
              }}
              title="Log out"
            >
              <LogOut size={18} />
              {!isCollapsed && <span>Log out</span>}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme?.sidebarDivider || "rgba(0,0,0,0.15)"};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme?.sidebarText || "rgba(0,0,0,0.3)"};
        }
      `}</style>
    </div>
  );
};

export default SuperAdminSidebar;

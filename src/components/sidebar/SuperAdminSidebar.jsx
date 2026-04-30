import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
//import UnisolLogoImage from "../../assets/images/unisolLogoImg.png";
// import { useSignIn } from "../hooks/auth/useSignIn";
import { useSetRecoilState } from "recoil";
// import { userAuthState } from "../../state/isAuthenticatedAtom";
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
import unisolServicesImg from "../../assets/images/unisolservices.png";
// import training from "../../assets/images/training.png";
import contactUs from "../../assets/images/contactUs.png";
import helpCentre from "../../assets/images/helpCentre.png";
import { useSignIn } from "../../hooks/auth/useSignIn";
import { userAuthState } from "../../state/authenticatedState/authenticatedState";
import { useTheme } from "../../hooks/theme/useTheme";

const SuperAdminSidebar = ({
  toggleSidebar,
  isSidebarVisible,
  setActiveTab,
}) => {
  const [isInventoryExapanded, setInventoryExpanded] = useState(false);
  const [isProductExapanded, setProductExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);

  const { resetSuperAdmin } = useSignIn();
  const setUserInfo = useSetRecoilState(userAuthState);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    if (location.pathname === "/inventory-dashboard") {
      setSelectedItem("Dashboard");
    }
  }, []);

  // Automatically expand the correct subtab based on the current route
  useEffect(() => {
    if (
      location.pathname.includes("/inventory") ||
      location.pathname.includes("/inventory/inventory-tracking") ||
      location.pathname.includes("/inventory/quotation") ||
      location.pathname.includes("/inventory/proposals")
    ) {
      setInventoryExpanded(true);
      setProductExpanded(false);
    } else if (
      location.pathname.includes("/product") ||
      location.pathname.includes("/product/product-order")
    ) {
      setProductExpanded(true);
      setInventoryExpanded(false);
    }
  }, [location.pathname]);

  const handleTabClick = (tabName) => {
    setSelectedItem(tabName);
    setActiveTab(tabName);

    // Close other menus when a new menu is opened
    if (tabName === "Inventory") {
      setInventoryExpanded(!isInventoryExapanded);
      setProductExpanded(false);
    } else if (tabName === "Product") {
      setProductExpanded(!isProductExapanded);
      setInventoryExpanded(false);
    } else {
      // Close both menus when clicking on other tabs
      setInventoryExpanded(false);
      setProductExpanded(false);
    }
  };

  const toggleInventorySubtabs = () => {
    setInventoryExpanded(!isInventoryExapanded);
  };

  const toggleProductSubtabs = () => {
    setProductExpanded(!isProductExapanded);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserInfo({
      isAuthenticated: false,
    });
    resetSuperAdmin();
    navigate("/");
  };

  /*const getBackgroundColor = (itemName) => {
    if (itemName === "Inventory") {
      return isInventoryExapanded ? "#A9B5FF" : "#CAD2FF";
    }
    if (itemName === "Product") {
      return isProductExapanded ? "#A9B5FF" : "#CAD2FF";
    }
    return selectedItem === itemName ? "#A9B5FF" : "#CAD2FF";
  };*/

  const getBackgroundColor = (itemName) => {
    const primaryColor = theme?.primaryColor || "#A9B5FF";
    const secondaryColor = theme?.secondaryColor || "#CAD2FF";
    const dropdownColor = theme?.dropdownColor || secondaryColor;

    if (theme?.backgroundImg) {
      return itemName === selectedItem ? primaryColor : secondaryColor;
    }

    if (itemName === "Inventory") {
      return isInventoryExapanded ? primaryColor : secondaryColor;
    }
    if (itemName === "Product") {
      return isProductExapanded ? primaryColor : secondaryColor;
    }
    return selectedItem === itemName ? primaryColor : secondaryColor;
  };

  return (
    <div
      className="px-4 w-full min-h-full relative"
      style={{
        backgroundColor: theme?.bgSidebar || "#E9EBF7",
        zIndex: 10,
      }}
    >
      {theme?.backgroundImg && (
        <div
          style={{
            backgroundImage: `url(${theme.backgroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "335px",
            zIndex: 0,
            opacity: 0.5,
          }}
        />
      )}
      <div
        className="flex flex-col relative"
        style={{
          zIndex: 10,
        }}
      >
        <div className="w-full flex flex-col justify-center items-center">
          {theme?.logoImage && (
            <img
              className="h-[110px] w-[220px] object-contain"
              src={theme.logoImage}
              alt="Company Logo"
            />
          )}
          <img
            className="h-[110px] w-[220px] object-contain"
            src={inventoryMainImg}
            alt=""
          />
        </div>
        <nav>
          <ul>
            <li
              onClick={() => handleTabClick("Dashboard")}
              className="border-transparent"
            >
              <NavLink to="/inventory-dashboard" className="cursor-pointer">
                <div
                  className="flex pl-5 p-4 text-black h-[33px] text-sm items-center gap-4 my-5 rounded-xl"
                  style={{ backgroundColor: getBackgroundColor("Dashboard") }}
                >
                  <span className="ml-0">
                    <img
                      src={dashboard}
                      alt="Dashboard Icon"
                      className="w-6 h-6"
                    />
                  </span>
                  Dashboard
                </div>
              </NavLink>
            </li>

            <li onClick={() => handleTabClick("Inventory")}>
              <div
                className="flex pl-1 p-4 text-black h-[33px] text-sm items-center gap-4 rounded-xl cursor-pointer"
                style={{ backgroundColor: getBackgroundColor("Inventory") }}
              >
                <span className="ml-0">
                  <img
                    src={inventoryImg}
                    alt="Inventory Icon"
                    className="w-12 h-12 mt-1"
                  />
                </span>
                Inventory
                <span className="ml-auto text-gray-500">
                  {isInventoryExapanded ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              {isInventoryExapanded && (
                <ul
                  className="w-full rounded-xl overflow-hidden text-xs border-[0.5px] border-gray-300"
                  style={{
                    width: "90%",
                    marginLeft: "5%",
                    marginRight: "6%",
                    marginTop: "-0.5px",
                    backgroundColor: theme?.dropdownColor || "#CAD2FF",
                  }}
                >
                  <li
                    onClick={() => handleTabClick("All Inventory")}
                    className="border-b border-gray-300"
                  >
                    <NavLink to="/inventory" className="cursor-pointer">
                      <div className="p-1.5 text-left pl-10 text-black text-[12px] leading-[1.2] border-t border-white/20">
                        All Inventory
                      </div>
                    </NavLink>
                  </li>
                  <li
                    onClick={() => handleTabClick("Inventory Tracking")}
                    className="border-b border-gray-300"
                  >
                    <NavLink
                      to="/inventory/inventory-tracking"
                      className="cursor-pointer"
                    >
                      <div className="p-1.5 text-left pl-10 text-black text-[12px] leading-[1.2] border-t border-white/20">
                        Inventory Tracking
                      </div>
                    </NavLink>
                  </li>
                  <li
                    onClick={() => handleTabClick("Quotation")}
                    className="border-b border-gray-300"
                  >
                    <NavLink
                      to="/inventory/quotation"
                      className="cursor-pointer"
                    >
                      <div className="p-1.5 text-left pl-10 text-black text-[12px] leading-[1.2] border-t border-white/20">
                        Quotation
                      </div>
                    </NavLink>
                  </li>
                  <li onClick={() => handleTabClick("Proposals")}>
                    <NavLink
                      to="/inventory/proposals"
                      className="cursor-pointer"
                    >
                      <div className="p-1.5 text-left pl-10 text-black text-[12px] leading-[1.2] border-t border-white/20">
                        Proposals
                      </div>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li onClick={() => handleTabClick("Warehouse Management")}>
              <NavLink to="/warehouse-management" className="cursor-pointer">
                <div
                  className="flex pl-5 p-4 text-black h-[33px] text-sm items-center gap-4 my-5 rounded-xl"
                  style={{
                    backgroundColor: getBackgroundColor("Warehouse Management"),
                  }}
                >
                  <span className="ml-0">
                    <img
                      src={warehouseImg}
                      alt="Warehouse Icon"
                      className="w-4 h-4"
                    />
                  </span>
                  Warehouse Management
                </div>
              </NavLink>
            </li>

            <li onClick={() => handleTabClick("Product")}>
              <div
                className="flex p-4 text-black h-[33px] text-sm items-center gap-2 mt-5 rounded-xl w-50 cursor-pointer"
                style={{ backgroundColor: getBackgroundColor("Product") }}
              >
                <span className="ml-0">
                  <img
                    src={ProductImg}
                    alt="Product Icon"
                    className="w-6 h-7 mt-2"
                  />
                </span>
                Product
                <span className="ml-auto text-gray-500">
                  {isProductExapanded ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              {isProductExapanded && (
                <ul
                  className="w-full rounded-xl overflow-hidden text-xs border-[0.5px] border-gray-300"
                  style={{
                    width: "90%",
                    marginLeft: "5%",
                    marginRight: "5%",
                    marginTop: "-0.5px",
                    backgroundColor: theme?.dropdownColor || "#CAD2FF",
                  }}
                >
                  <li
                    onClick={() => handleTabClick("Product Management")}
                    className="border-b border-gray-300"
                  >
                    <NavLink to="/product" className="cursor-pointer">
                      <div className="p-1.5 text-left pl-10 text-black text-[12px] leading-[1.2]">
                        Product Management
                      </div>
                    </NavLink>
                  </li>
                  <li onClick={() => handleTabClick("Purchase Order")}>
                    <NavLink
                      to="/product/product-order"
                      className="cursor-pointer"
                    >
                      <div className="p-1.5 text-left pl-10 text-black text-[12px] leading-[1.2]">
                        Purchase Order
                      </div>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li onClick={() => handleTabClick("Replenishment")}>
              <NavLink to="/replenishment" className="cursor-pointer">
                <div
                  className="flex pl-4 p-4 text-black h-[33px] text-sm items-center gap-4 rounded-xl mt-5"
                  style={{
                    backgroundColor: getBackgroundColor("Replenishment"),
                  }}
                >
                  <span className="ml-0">
                    <img
                      src={replenishmentImg}
                      alt="Replenishment Icon"
                      className="w-5 h-5"
                    />
                  </span>
                  Replenishment
                </div>
              </NavLink>
            </li>

            <li onClick={() => handleTabClick("Vendor Management")}>
              <NavLink to="/vendor-management" className="cursor-pointer">
                <div
                  className="flex pl-5 p-4 text-black h-[33px] text-sm items-center gap-4 rounded-xl mt-5"
                  style={{
                    backgroundColor: getBackgroundColor("Vendor Management"),
                  }}
                >
                  <span className="ml-0">
                    <img
                      src={vendorMgmtImg}
                      alt="Vendor Icon"
                      className="w-4 h-4"
                    />
                  </span>
                  Vendor Management
                </div>
              </NavLink>
            </li>

            <li onClick={() => handleTabClick("Client Management")}>
              <NavLink to="/client-management" className="cursor-pointer">
                <div
                  className="flex pl-6 p-4 text-black h-[33px] text-sm items-center gap-4 rounded-xl mt-5"
                  style={{
                    backgroundColor: getBackgroundColor("Client Management"),
                  }}
                >
                  <span className="ml-0">
                    <img
                      src={clientMgmtImg}
                      alt="Client Icon"
                      className="w-3 h-4"
                    />
                  </span>
                  Client Management
                </div>
              </NavLink>
            </li>

            <li onClick={() => handleTabClick("Tender Management")}>
              <NavLink to="/tender-management" className="cursor-pointer">
                <div
                  className="flex pl-6 p-4 text-black h-[33px] text-sm items-center gap-4 rounded-xl mt-5"
                  style={{
                    backgroundColor: getBackgroundColor("Tender Management"),
                  }}
                >
                  <span className="ml-0">
                    <img
                      src={tenderImg}
                      alt="Tender Mgmt Icon"
                      className="w-3 h-4"
                    />
                  </span>
                  Tender Management
                </div>
              </NavLink>
            </li>

            <li onClick={() => handleTabClick("Reports")}>
              <NavLink to="/reports" className="cursor-pointer">
                <div
                  className="flex pl-6 p-4 text-black h-[33px] text-sm items-center gap-4 rounded-xl mt-5"
                  style={{ backgroundColor: getBackgroundColor("Reports") }}
                >
                  <span className="ml-0">
                    <img
                      src={reportsImg}
                      alt="Reports Icon"
                      className="w-4 h-4"
                    />
                  </span>
                  Reports
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="flex flex-col w-full items-start gap-8 py-8 pr-14 pl-6 relative"
        style={{
          zIndex: 10,
        }}
      >
        <p className="cursor-pointer hover:font-medium flex text-[#7C8DB5]">
          <span className="mr-2">
            <img src={helpCentre} alt="Dashboard Icon" className="w-6 h-6" />
          </span>
          Help Center
        </p>
        <p className="cursor-pointer hover:font-medium flex text-[#7C8DB5]">
          <span className="mr-2">
            <img src={contactUs} alt="Dashboard Icon" className="w-6 h-6" />
          </span>
          Contact Us
        </p>
        <p
          onClick={handleLogout}
          className="cursor-pointer hover:font-medium flex text-[#000000]"
        >
          <span className="flex justify-center items-center gap-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-box-arrow-right ml-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </span>
          Log out
        </p>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;

import React, { useEffect, useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const SuperAdminHeader = () => {
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setError("Search query cannot be empty.");
    } else {
      setError("");
      // Implement search logic here
      console.log("Search for:", searchQuery);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white h-[65px] py-2 px-8 flex justify-between items-center sticky top-0 z-20 shadow-md">
      {/* Left Side: Search Bar */}
      <div className="flex items-center space-x-2">
        <span className="relative flex">
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#F5F6FA] border h-[40px] w-[350px] border-[#BDC3C9] rounded-full pl-2 pr-7 py-1 focus:outline-none focus:border-blue-500"
          ></input>
          <FaSearch className="absolute top-3 right-3 text-gray-300" />
        </span>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors shadow-md"
        >
          Search
        </button>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        {/* <span>
          <FaBell
            className="text-gray-600 text-xl cursor-pointer hover:text-blue-500"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <div className="h-[170px] w-[250px] flex flex-col">
              <div className="h-[30px] flex justify-between items-center px-5">
                <h2 className="font-bold text-xs">Notifications</h2>
                <Link to={`/emp/allNotification/${empId}`}>
                  <span className="flex gap-1 hover:text-blue-600">
                    <h2 className="text-xs">see all</h2>
                    <MdKeyboardDoubleArrowRight />
                  </span>
                </Link>
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-3 justify-center overflow-y-scroll y-slider">
                {allNotification?.data?.notifications
                  ?.slice(0, 3)
                  .map((notification) => (
                    <p className="text-xs font-medium" key={notification._id}>
                      {notification.message}
                    </p>
                  ))}
              </div>
            </div>
          </Menu>
        </span> */}
        {/* Admin Icon */}
        <div className="flex flex-col justify-around items-center pr-2 ">
          <img
            className="cursor-pointer w-[30px] h-[30px] object-cover rounded-full hover:border-2 hover:border-black"
            src="https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          {/* User Name */}
          <span className="text-[12px]">SuperAdmin</span>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHeader;

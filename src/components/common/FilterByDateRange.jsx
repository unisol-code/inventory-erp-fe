import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { RiMistFill } from "react-icons/ri";

const FilterByDateRange = ({ filterName, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    fromDate: "",
    toDate: "",
  });
  const open = Boolean(anchorEl);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = async (field, value) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [field]: value,
    }));
  };

  const handleFilterApply = async () => {
    if (onFilterChange) {
      await onFilterChange(filterName, selectedDates);
    }
    handleFilterClose();
  };

  return (
    <div>
      <RiMistFill
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleFilterClick}
        className="absolute top-1 right-2 text-[22px] hover:text-blue-600 cursor-pointer"
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleFilterClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <div className="flex flex-col items-start justify-start w-full">
            <label htmlFor="fromDate" className="font-bold">
              from date
            </label>
            <input
              id="fromDate"
              name="fromDate"
              type="date"
              className="h-[30px] border rounded-md"
              onChange={(e) => handleDateChange("fromDate", e.target.value)}
            />
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex flex-col items-start justify-start w-full">
            <label htmlFor="toDate" className="font-bold">
              to date
            </label>
            <input
              id="toDate"
              name="toDate"
              type="date"
              className="h-[30px]"
              onChange={(e) => handleDateChange("toDate", e.target.value)}
            />
          </div>
        </MenuItem>

        <div className="flex justify-center w-full">
          <button
            onClick={handleFilterApply}
            disabled={!selectedDates.fromDate || !selectedDates.toDate} // Disable if any date is missing
            className="bg-blue-600 text-white py-2 px-4 text-center rounded-lg cursor-pointer hover:bg-blue-500 disabled:bg-gray-400"
          >
            Apply Filter
          </button>
        </div>
      </Menu>
    </div>
  );
};

export default FilterByDateRange;

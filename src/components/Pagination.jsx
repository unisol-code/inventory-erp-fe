import { useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPageOptions = [10, 15, 20],
  onPageChange,
  onItemsPerPageChange,
  height = "40px",
  width = "100%",
}) => {
  const [pageInput, setPageInput] = useState(currentPage);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setPageInput(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setPageInput(currentPage + 1);
    }
  };

  const handlePageInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPageInput(value);
  };

  const handlePageInputBlur = () => {
    if (pageInput > 0 && pageInput <= totalPages) {
      onPageChange(pageInput);
    } else {
      setPageInput(currentPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    onItemsPerPageChange(value);
  };
  return (
    <div className="px-[30px] py-4 flex items-center w-full">
      <span className="flex gap-2 text-xs">
        <h2>Page</h2>
        <h2>{currentPage}</h2>
        <h2>out of {totalPages}</h2>
      </span>
      <span className="flex-1"></span>
      <div className="flex gap-4 justify-center items-center">
        <button
          className="h-[25px] border border-gray-300 bg-[#F6F6F6] hover:bg-[#C3E6FB] rounded-md px-3 text-xs disabled:opacity-50 flex justify-center items-center"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          style={{
            padding: `calc(${height} * 0.2) calc(${width} * 0.03)`,
            //height: `calc(${height} * 0.8)`,
            minWidth: `calc(${width} * 0.1)`,
          }}
        >
          Prev
        </button>
        <button
          className=" h-[25px] border border-gray-300 bg-[#F6F6F6] hover:bg-[#C3E6FB] rounded-md px-3 text-xs disabled:opacity-50 flex justify-center items-center"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          style={{
            padding: `calc(${height} * 0.2) calc(${width} * 0.03)`,
            //height: `calc(${height} * 0.8)`,
            minWidth: `calc(${width} * 0.1)`,
          }}
        >
          Next
        </button>
        <span className="flex gap-2 h-full items-center justify-end w-[180px]">
          <h2 className="text-xs">Page</h2>
          <input
            className="h-[25px] border border-gray-300 bg-[#F6F6F6] rounded-md px-3 text-xs "
            type="number"
            min="1"
            max={totalPages}
            value={pageInput}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            name="page"
            style={{
              width: `calc(${width} * 0.23)`,
              // height: `calc(${height} * 0.8)`,
              padding: `calc(${height} * 0.2) calc(${width} * 0.02)`,
            }}
          />
          <h2 className="text-xs flex justify-between w-[35px]">
            of {totalPages}
          </h2>
          {/*<select
            className="h-[25px] cursor-pointer border border-gray-300 bg-[#F6F6F6] rounded-md px-2 text-xs flex justify-center items-center"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{
              width: `calc(${width} * 0.3)`,
              // height: `calc(${height} * 0.8)`,
              padding: `calc(${height} * 0.1) calc(${width} * 0.02)`,
            }}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>*/}
        </span>
      </div>
    </div>
  );
};

export default Pagination;

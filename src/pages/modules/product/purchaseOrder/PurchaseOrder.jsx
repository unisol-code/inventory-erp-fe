import { Filter, Search, CirclePlus, ArrowUpDown } from "lucide-react";
import { useEffect, useCallback } from "react";
import AddNewPurchaseDialog from "../../../../components/Dialog/AddNewPurchaseDialog";
import { useState } from "react";
import usePurchase from "../../../../hooks/product/usePurchaseManagement";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Formik } from "formik";

const PurchaseOrder = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isAddNewPurchaseDialogOpen, setIsAddNewPurchaseDialogOpen] =
    useState(false);
  const {
    fetchAllPurchaseOrders,
    purchaseOrders,
    loading,
    fetchPurchaseOrderById,
    purchaseOrderDetails,
    fetchSearchPurchaseOrders,
    fetchPurchaseOrderByOrderNo,
  } = usePurchase();

  useEffect(() => {
    fetchAllPurchaseOrders(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/product/product-order/${id}`);
    fetchPurchaseOrderById(id);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value) {
        fetchSearchPurchaseOrders({ poOrderNo: value });
        fetchPurchaseOrderByOrderNo(value);
      } else {
        fetchAllPurchaseOrders(page, limit);
      }
    }, 500),
    [page, limit]
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const tableHeaders = [
    "Purchase Order",
    "Supplier",
    "Destination",
    "QTY.",
    "Received",
    "Total",
    "Ordered Date",
    "Action",
  ];

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    setIsSearchBarVisible((prev) => !prev);
  };

  const renderPagination = () => {
    const pagination = purchaseOrders?.pagination;

    if (!pagination) return null;

    const { currentPage, totalPages, hasNextPage, hasPrevPage, totalCount } =
      pagination;

    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalCount);

    const generatePageNumbers = () => {
      const pageNumbers = [];

      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      const startRange = Math.max(2, currentPage - 1);
      const endRange = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startRange; i <= endRange; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    };

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t">
        <div className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalCount} results
        </div>
        <div className="flex items-center bg-white rounded-lg">
          {/* Previous Button */}
          <button
            onClick={() => hasPrevPage && handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className={`px-2 py-1 border border-gray-300 text-gray-500 bg-white rounded-bl-md rounded-tl-md text-sm 
              ${
                !hasPrevPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          {generatePageNumbers().map((item, index) => (
            <button
              key={index}
              onClick={() => typeof item === "number" && handlePageChange(item)}
              disabled={item === "..."}
              className={`px-2 py-1 text-sm
                ${
                  item === currentPage
                    ? "border border-blue-500 text-blue-600 bg-blue-500/40"
                    : item === "..."
                    ? "border border-gray-300 text-gray-500 bg-white cursor-default"
                    : "border border-gray-300 text-gray-500 bg-white hover:bg-gray-100"
                }`}
            >
              {item}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={`px-2 py-1 border border-gray-300 text-gray-500 bg-white rounded-tr-md rounded-br-md text-sm
              ${
                !hasNextPage
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-0 p-1 bg-transparent min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-2">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-black">Purchase Order</h1>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-2">
            <button
              className="px-8 py-2 text-xs font-bold bg-white text-black border border-[#949494] border-solid rounded-lg"
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.4)" }}
            >
              All
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <button
              className="flex items-center px-4 py-2 bg-[#B6DAE6B5] text-[#1A6A85] font-medium border border-[#1A6A85] rounded-lg text-xs"
              onClick={() => setIsAddNewPurchaseDialogOpen(true)} // Corrected this line
            >
              <CirclePlus size={18} className="mr-2" />
              <span className="mb-0.5">Create Purchase Order</span>
            </button>
            {isAddNewPurchaseDialogOpen && (
              <AddNewPurchaseDialog
                onClose={() => setIsAddNewPurchaseDialogOpen(false)} // Corrected this line
              />
            )}

            {/* Conditional Rendering of Search Bar */}
            {isSearchBarVisible && (
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by Order Number"
                  onChange={handleSearchChange}
                  value={searchTerm}
                  className="h-9 px-4 border border-gray-400 rounded-lg text-sm w-[200px] search-input"
                />
              </div>
            )}

            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg mb-1"
              style={{ boxShadow: "2px 3px 4px 0px #00000040" }}
              onClick={handleSearchClick}
            >
              <Search size={16} />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg mb-1"
              style={{ boxShadow: "2px 3px 4px 0px #00000040" }}
            >
              <Filter size={16} />
            </button>
            <button
              className="flex p-2 text-gray-400 hover:text-gray-600 rounded-lg mb-1"
              style={{ boxShadow: "2px 3px 4px 0px #00000040" }}
            >
              <ArrowUpDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm px-4">
        <table className="w-full">
          <thead>
            <tr className="border-b-[2px] border-gray-300">
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-center text-sm font-semibold text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {purchaseOrders?.purchaseOrders?.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 last:border-b-0"
              >
                <td className="px-6 pr-8 py-4 text-center text-sm font-bold text-black">
                  {order.poOrderNo}
                </td>
                <td className="px-6 py-4 text-center text-sm text-black">
                  {/* Supplier not in current API, left as placeholder */}
                  Supplier Name
                </td>
                <td className="px-6 py-4 text-center text-sm text-black">
                  {/* Destination not in current API, left as placeholder */}
                  Destination
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-8 py-1 text-sm text-center bg-[#AAEE8A5E] text-[#329F00] border border-[#329F00] rounded-lg">
                    {order.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-black">
                  {order.received}
                </td>
                <td className="px-6 py-4 text-center text-sm text-black">
                  {order.total}
                </td>
                <td className="px-6 py-4 text-center text-sm text-black">
                  {new Date(order.orderedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center text-sm text-black">
                  <button
                    className="px-5 py-2 rounded-md text-white font-semibold whitespace-nowrap bg-[#56AAC5]"
                    onClick={() => handleViewDetails(order._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );
};

export default PurchaseOrder;

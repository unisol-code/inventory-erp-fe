import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/theme/useTheme";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showRowPerPage = false,
}) => {
  const { theme } = useTheme();

  const primary = theme?.primaryColor || "#4FA8E5";
  const activeBg = theme?.paginationActiveBg || primary;
  const activeText = theme?.paginationActiveText || "#FFFFFF";
  const paginationBorder = theme?.paginationBorder || "#CBD5E1";
  const tableText = theme?.tableText || "#334155";
  const tableMutedText = theme?.tableMutedText || "#64748B";
  const cardBg = theme?.cardBg || "#FFFFFF";
  const [itemsPerPageState, setItemsPerPageState] = useState(
    itemsPerPage ?? 10
  );

  useEffect(() => {
    if (
      itemsPerPage !== undefined &&
      itemsPerPage !== itemsPerPageState
    ) {
      setItemsPerPageState(itemsPerPage);
    }
  }, [itemsPerPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPageState(value);

    if (onItemsPerPageChange) {
      onItemsPerPageChange(value);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      }

      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (!currentPage || !totalPages) return null;

  return (
    <div
      className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-3 gap-3 w-full rounded-b-lg shadow-sm"
      style={{
        backgroundColor: cardBg,
        borderTop: `4px solid ${activeBg}`,
      }}
    >
      <div className="flex flex-wrap items-center gap-4">
        <p className="font-medium text-sm" style={{ color: tableMutedText }}>
          Showing {(currentPage - 1) * itemsPerPageState + 1} to{" "}
          {Math.min(currentPage * itemsPerPageState, totalItems)} of{" "}
          {totalItems} Entries
        </p>

        {showRowPerPage && (
          <div className="flex items-center gap-2 text-sm" style={{ color: tableText }}>
            <span>Rows per page:</span>
            <select
              value={itemsPerPageState}
              onChange={handleItemsPerPageChange}
              className="border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                borderColor: paginationBorder,
                color: tableText,
                backgroundColor: cardBg,
                "--tw-ring-color": activeBg,
              }}
            >
              {[5, 10, 15, 20, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
          style={{
            backgroundColor: currentPage === 1 ? theme?.buttonDisabledBg || "#E2E8F0" : activeBg,
            color: currentPage === 1 ? theme?.buttonDisabledText || "#94A3B8" : activeText,
            borderColor: currentPage === 1 ? theme?.buttonDisabledBg || "#E2E8F0" : activeBg,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <div className="flex items-center gap-2 mx-2">
          {renderPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" && handlePageClick(page)
              }
              disabled={page === "..."}
              className="w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor:
                  page === currentPage
                    ? activeBg
                    : page === "..."
                    ? "transparent"
                    : cardBg,
                color:
                  page === currentPage
                    ? activeText
                    : page === "..."
                    ? tableMutedText
                    : tableMutedText,
                borderColor:
                  page === currentPage
                    ? activeBg
                    : page === "..."
                    ? "transparent"
                    : paginationBorder,
                borderWidth: page === currentPage ? "0" : "1px",
                cursor: page === "..." ? "not-allowed" : "pointer",
                transform: page === currentPage ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  page === currentPage
                    ? `0 1px 3px ${activeBg}44`
                    : "none",
              }}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
          style={{
            backgroundColor:
              currentPage === totalPages || totalPages === 0
                ? theme?.buttonDisabledBg || "#E2E8F0"
                : activeBg,
            color:
              currentPage === totalPages || totalPages === 0
                ? theme?.buttonDisabledText || "#94A3B8"
                : activeText,
            borderColor:
              currentPage === totalPages || totalPages === 0
                ? theme?.buttonDisabledBg || "#E2E8F0"
                : activeBg,
            cursor:
              currentPage === totalPages || totalPages === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
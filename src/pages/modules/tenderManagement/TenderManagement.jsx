import { useEffect, useState } from "react";
import { useTender } from "../../../hooks/tender/useTender";
import TendorsViewDetails from "../../../components/Dialog/TendorsViewDetails";
import AddTenders from "../../../components/Dialog/AddTenders";
import Pagination from "../../../components/Pagination";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

const TenderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [createForm, setCreateForm] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const { fetchTenderList, tenders } = useTender();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchTenderList(page, limit, searchTerm);
  }, [page, limit, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setPage(1); // Reset to first page when searching
      fetchTenderList(1, limit, searchTerm);
    } else {
      // If search term is empty, reset to default list
      fetchTenderList(1, limit);
    }
  };

  const onPageChange = (data) => {
    console.log("data", data);
    setPage(data);
    fetchTenderList(data, limit, searchTerm);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    fetchTenderList(page, data, searchTerm);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderPagination = () => {
    const pagination = tenders?.data?.pagination;

    if (!pagination) return null;

    const { currentPage, totalPages, hasNextPage, hasPrevPage, totalCount } =
      pagination;
    const limit = 10; // You may need to adjust this value as per your requirements
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
    <div className="w-full bg-white">
      <div className="flex justify-between px-6 py-3">
        <h1 className="text-[25px] font-semibold">Tenders Management</h1>
        <button
          onClick={() => setCreateForm(true)}
          className="h-[32px] w-[132px]  text-[#000000] bg-[#56AAC5] rounded-[10px] "
        >
          Create
        </button>
      </div>
      {createForm && <AddTenders onClose={() => setCreateForm(false)} />}
      <div className="flex ">
        <div className="mt-4 px-6 w-full flex items-center gap-4 py-2">
          <span className="relative min-w-[40%]">
            <CiSearch
              onClick={handleSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl cursor-pointer hover:scale-[1.1] transition duration-300 hover:text-black"
            />
            <input
              type="text"
              placeholder="Quick Search"
              className="border w-full h-[40px] rounded-full pl-12 pr-4 py-2 border-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </span>
          <FaFilter />
        </div>
        {/* <div className="flex flex-col px-8">
          <p>Status</p>
          <select className="w-[300px] h-[40px] bg-white rounded-lg border border-gray-200">
            <option value="1">Select Status</option>
          </select>
        </div> */}
      </div>

      <div className="px-4">
        <div className="w-full ">
          <table className="w-full table-fixed border-collapse">
            <thead className="border-b-2 border-gray-400">
              <tr className="text-center text-gray-600 text-sm font-semibold">
                <th className="px-2 py-8">Tender ID</th>
                <th className="px-2 py-8">Title</th>
                <th className="px-2 py-8">Issued Date</th>
                <th className="px-2 py-8">Authorised Person</th>
                <th className="px-2 py-8">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {tenders?.data?.tenders?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-400 text-center text-[15px] font-normal"
                >
                  <td className="px-2 py-8">{item.tenderID}</td>
                  <td className="px-2 py-8">{item.title}</td>
                  <td className="px-2 py-8">{item.issueDate.split("T")[0]}</td>
                  <td className="px-2 py-8">{item.authorizedPerson}</td>
                  <td className="px-2 py-8">
                    <button
                      onClick={() => {
                        setViewDetails(true);
                        setSelectedId(item._id);
                      }}
                      className="w-[91px] h-[26px] bg-[#56AAC5] text-white rounded-md "
                    >
                      View Detail
                    </button>
                  </td>
                  {viewDetails && selectedId === item?._id && (
                    <TendorsViewDetails
                      id={item?._id}
                      onClose={() => setViewDetails(false)}
                    />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      {/*<Pagination
        currentPage={fetchTenderList?.pagination?.currentPage}
        totalPages={fetchTenderList?.pagination?.totalPages}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />*/}
      {renderPagination()}
    </div>
  );
};

export default TenderManagement;

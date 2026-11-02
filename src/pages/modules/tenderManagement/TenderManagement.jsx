import { useEffect, useState } from "react";
import { useTender } from "../../../hooks/tender/useTender";
import TendorsViewDetails from "../../../components/Dialog/TendorsViewDetails";
import AddTenders from "../../../components/Dialog/AddTenders";
import Pagination from "../../../components/common/Pagination";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import BreadCrumb from "../../../components/common/BreadCrumb";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { useTheme } from "../../../hooks/theme/useTheme";

const TenderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [createForm, setCreateForm] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const { theme } = useTheme();
  const { fetchTenderList, tenders } = useTender();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchTenderList(page, limit, searchTerm);
  }, [page, limit, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setPage(1);
      fetchTenderList(1, limit, searchTerm);
    } else {
      fetchTenderList(1, limit);
    }
  };

  const onPageChange = (data) => {
    setPage(data);
    fetchTenderList(data, limit, searchTerm);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    setPage(1);
    fetchTenderList(1, data, searchTerm);
  };

  const breadcrumbPaths = [
    { label: "Dashboard", url: "/inventory-dashboard" },
    { label: "Tender Management" },
  ];

  const columns = [
    { field: "tenderID", header: "Tender ID", sortable: true },
    { field: "title", header: "Title", sortable: true },
    { field: "issueDate", header: "Issued Date", sortable: true },
    { field: "authorizedPerson", header: "Authorised Person", sortable: true },
    {
      field: "action",
      header: "Action",
      body: (row) => (
        <div className="flex justify-center gap-2">
          <button
            className="px-4 py-1.5 text-sm text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme?.accentColor || "#1C5CD6" }}
            onClick={() => {
              setViewDetails(true);
              setSelectedId(row._id);
            }}
          >
            View Detail
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <BreadCrumb paths={breadcrumbPaths} />

      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: theme?.accentColor || "#2D3748" }}>
            Tenders Management
          </h1>
          <Button
            label="Create"
            variant="primary"
            onClick={() => setCreateForm(true)}
            className="h-10 px-6"
          />
        </div>

        <div className="mt-4 mb-4 w-full flex items-center gap-4">
          <span className="relative flex-1 min-w-[200px]">
            <CiSearch
              onClick={handleSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl cursor-pointer hover:scale-[1.1] transition duration-300 hover:text-black"
            />
            <input
              type="text"
              placeholder="Quick Search"
              className="w-full h-10 border border-gray-300 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </span>
          <FaFilter className="text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>

        <Table
          data={tenders?.data?.tenders || []}
          columns={columns}
          emptyMessage="No tenders found."
        />

        <Pagination
          currentPage={tenders?.data?.pagination?.currentPage || page}
          totalPages={tenders?.data?.pagination?.totalPages || 1}
          totalItems={tenders?.data?.pagination?.totalCount}
          itemsPerPage={limit}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      {createForm && <AddTenders onClose={() => setCreateForm(false)} />}

      {viewDetails && selectedId && (
        <TendorsViewDetails
          id={selectedId}
          onClose={() => setViewDetails(false)}
        />
      )}
    </div>
  );
};

export default TenderManagement;

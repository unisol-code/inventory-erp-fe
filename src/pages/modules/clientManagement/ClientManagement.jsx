import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import useClientManagement from "../../../hooks/clientManagement/useClientManagement";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import Pagination from "../../../components/common/Pagination";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import BreadCrumb from "../../../components/common/BreadCrumb";
import CreateClientDialog from "../../../components/Dialog/CreateClientDialog";
import ViewClientDetailsDialog from "../../../components/Dialog/ViewClientDetailsDialog";
import { useTheme } from "../../../hooks/theme/useTheme";
import { useTender } from "../../../hooks/tender/useTender";

const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const { theme } = useTheme();
  const {
    fetchClientListByQuery,
    fetchClientDetailsById,
    resetFetchClientDetailsById,
    fetchApplicableGst,
    fetchMouValidity,
    fetchManufacturerName,
    clientsByQuery,
    clientsById,
    applicableGst,
    mouValidity,
    manufacturerName,
    createClient,
  } = useClientManagement();

  const { fetchStockName, stockName } = useTender();

  useEffect(() => {
    fetchApplicableGst();
    fetchMouValidity();
    fetchStockName();
    fetchManufacturerName();
  }, [createClient]);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    fetchClientListByQuery(page, limit, trimmedSearchTerm);
  }, [searchTerm, page, limit]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const [isCreateClientDialogOpen, setIsCreateClientDialogOpen] = useState(false);
  const [isViewClientDialogOpen, setIsViewClientDialogOpen] = useState(false);

  const toggleModal = () => {
    setIsCreateClientDialogOpen(true);
  };

  const handleViewDetails = (id) => {
    fetchClientDetailsById(id);
    setSelectedId(id);
    setIsViewClientDialogOpen(true);
  };

  const breadcrumbPaths = [
    { label: "Dashboard", url: "/inventory-dashboard" },
    { label: "Client Management" },
  ];

  const columns = [
    { field: "srNo", header: "Sr No", sortable: true },
    { field: "dealerName", header: "Dealer Name", sortable: true },
    { field: "manufacturerName", header: "Manufacturer Name", sortable: true },
    { field: "productName", header: "Name of Product", sortable: true },
    { field: "productCode", header: "Product Code", sortable: true },
    { field: "hsnCode", header: "HSN Code", sortable: true },
    {
      field: "action",
      header: "Action",
      body: (row) => (
        <div className="flex justify-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme?.accentColor || "#1C5CD6" }}
            onClick={() => handleViewDetails(row._id)}
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto client">
      <BreadCrumb paths={breadcrumbPaths} />

      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: theme?.accentColor || "#2D3748" }}>
            Client Management
          </h1>
          <Button
            label="Create"
            icon="pi pi-plus"
            variant="primary"
            onClick={toggleModal}
            className="h-10 px-5"
          />
        </div>

        <div className="mt-4 mb-4 w-full flex items-center gap-4">
          <span className="relative flex-1 min-w-[200px]">
            <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Quick Search"
              className="w-full h-10 border border-gray-300 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </span>
          <FaFilter className="text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>

        <Table
          data={clientsByQuery?.clients || []}
          columns={columns}
          emptyMessage="No clients found."
        />

        <Pagination
          currentPage={page}
          totalPages={clientsByQuery?.pagination?.totalPages || 1}
          totalItems={clientsByQuery?.pagination?.totalItems}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {isCreateClientDialogOpen && (
        <CreateClientDialog
          applicableGst={applicableGst}
          mouValidity={mouValidity}
          stockName={stockName}
          manufacturerName={manufacturerName}
          onClose={() => setIsCreateClientDialogOpen(false)}
        />
      )}

      {isViewClientDialogOpen && selectedId && clientsById && (
        <ViewClientDetailsDialog
          data={clientsById}
          applicableGst={applicableGst}
          mouValidity={mouValidity}
          stockName={stockName}
          manufacturerName={manufacturerName}
          onClose={() => {
            resetFetchClientDetailsById();
            setIsViewClientDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ClientManagement;

import { useEffect, useState } from "react";
import useClientManagement from "../../../hooks/clientManagement/useClientManagement";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import Pagination from "../../../components/Pagination";
import CreateClientDialog from "../../../components/Dialog/CreateClientDialog";
import ViewClientDetailsDialog from "../../../components/Dialog/ViewClientDetailsDialog";
import { useTender } from "../../../hooks/tender/useTender";
const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
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
    loading,
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
    setPage(1); // Reset to the first page whenever a new search starts
  };
  const handlePageChange = (newPage) => {
    setPage(newPage); // Update page state
  };
  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit); // Update items per page
    fetchClientListByQuery(page, newLimit, searchTerm.trim());
  };

  console.log("clientsByQuery :", clientsByQuery);
  console.log("applicableGst :", applicableGst);
  console.log("mouValidity :", mouValidity);
  console.log("stockName :", stockName);
  console.log("manufacturerName :", manufacturerName);

  const [isCreateClientDialogOpen, setIsCreateClientDialogOpen] =
    useState(false);
  const [isViewClientDialogOpen, setIsViewClientDialogOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setIsCreateClientDialogOpen(true);
  };
  const handleViewDetails = (id) => {
    console.log("id :", id);
    fetchClientDetailsById(id);
    setSelectedId(id);
    setIsViewClientDialogOpen(true);
  };
  console.log("clientsById :", clientsById);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchClientListByQuery(page, limit, searchTerm);
    } else {
      console.log("Please enter a search term.");
    }
  };

  const onPageChange = (data) => {
    console.log("data", data);
    setPage(data);
  };

  const onItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to the first page whenever the items per page change
  };

  return (
    <div className="container mx-auto  client">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="clienthead">Client Management</h1>
          <button
            className="text-dark px-4 py-2 rounded createclient hover:scale-[1.1] transition duration-300"
            onClick={toggleModal}
          >
            Create
          </button>
        </div>

        <div className="mt-4 px-6 w-full flex items-center gap-4 py-2">
          <span className="relative min-w-[40%]">
            <CiSearch
              onClick={() => {
                if (searchTerm.trim()) {
                  fetchClientListByQuery(page, limit, searchTerm.trim());
                }
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl cursor-pointer hover:scale-[1.1] transition duration-300 hover:text-black"
            />
            <input
              type="text"
              placeholder="Quick Search"
              className="border w-full h-[40px] rounded-full pl-12 pr-4 py-2 border-gray-500"
              value={searchTerm}
              onChange={handleSearchInputChange} // Update searchTerm and reset page
            />
          </span>
          <FaFilter />
        </div>
        {/* Table Section */}
        <div className="border-t border-gray-300 w-full h-[460px] overflow-y-scroll">
          <table className="table-auto w-full">
            <thead className="">
              <tr>
                <th className="text-left px-4 py-4">Sr No</th>
                <th className="text-left px-4 py-4">Dealer Name</th>
                <th className="text-left px-4 py-4">Manufacturer Name</th>
                <th className="text-left px-4 py-4">Name of Product</th>
                <th className="text-left px-4 py-4">Product Code</th>
                <th className="text-left px-4 py-4">HSN Code</th>
                <th className="text-left px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Data */}
              {clientsByQuery?.clients?.map((client) => (
                <tr key={client?._id} className="border-t">
                  <td className="px-4 py-4">{client?.srNo}</td>
                  <td className="px-4 py-4">{client?.dealerName}</td>
                  <td className="px-4 py-4">{client?.manufacturerName}</td>
                  <td className="px-4 py-4">{client?.productName}</td>
                  <td className="px-4 py-4">{client?.productCode}</td>
                  <td className="px-4 py-4">{client?.hsnCode}</td>
                  <td className="px-4 py-4">
                    <button
                      className="bg-[#56AAC5] w-[130px] text-[15px] text-white px-2 py-1 rounded-md hover:scale-[1.1] transition duration-300"
                      onClick={() => handleViewDetails(client?._id)}
                    >
                      View Details
                    </button>
                    {isViewClientDialogOpen &&
                      selectedId === client?._id &&
                      clientsById && (
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={clientsByQuery?.pagination?.totalPages || 1}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
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
    </div>
  );
};

export default ClientManagement;

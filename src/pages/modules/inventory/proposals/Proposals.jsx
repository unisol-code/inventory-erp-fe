import { useState, useEffect, useCallback } from "react";
import { Eye } from "lucide-react";
import Pagination from "../../../../components/common/Pagination";
import Button from "../../../../components/common/Button";
import Table from "../../../../components/common/Table";
import BreadCrumb from "../../../../components/common/BreadCrumb";
import AddNewProposalDialog from "../../../../components/Dialog/AddNewProposalDialog";
import useProposals from "../../../../hooks/inventory/useProposals";
import debounce from "lodash/debounce";
import { useFormik } from "formik";
import { useTheme } from "../../../../hooks/theme/useTheme";

const Proposals = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const { theme } = useTheme();
  const {
    fetchPropsalList,
    proposalList,
    fetchSearchAllInventory,
    deleteProposal,
    fetchProposalById,
    proposalDetails,
  } = useProposals();

  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPropsalList(page, limit);
  }, []);

  const debouncedSearch = useCallback(
    debounce((values) => {
      if (values.proposalName) {
        fetchSearchAllInventory(values);
      } else {
        fetchPropsalList(page, limit);
      }
    }, 500),
    []
  );

  const formik = useFormik({
    initialValues: {
      proposalName: "",
    },
    onSubmit: (values) => {
      if (values.proposalName) {
        fetchSearchAllInventory(values);
      } else {
        fetchPropsalList(page, limit);
      }
    },
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("proposalName", value);
    debouncedSearch({ proposalName: value });
  };

  const onPageChange = (data) => {
    setPage(data);
    fetchPropsalList(data, limit);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    fetchPropsalList(page, data);
  };

  const handleDelete = async (_id) => {
    await deleteProposal(_id);
    fetchPropsalList(page, limit);
  };

  const handleEditEvent = (id) => {
    fetchProposalById(id);
    setSelectedId(id);
    setEditing(true);
  };

  const breadcrumbPaths = [
    { label: "Dashboard", url: "/inventory-dashboard" },
    { label: "Inventory", url: "/inventory" },
    { label: "Proposal" },
  ];

  const columns = [
    { field: "proposalID", header: "Proposal ID", sortable: true },
    { field: "proposalName", header: "Proposal Name", sortable: true },
    { field: "clientName", header: "Client Name", sortable: true },
    { field: "status", header: "Status", sortable: true },
    { field: "budgetEstimation", header: "Total Value", sortable: true },
    {
      field: "action",
      header: "Action",
      body: (row) => (
        <div className="flex justify-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme?.accentColor || "#1C5CD6" }}
            onClick={() => handleEditEvent(row._id)}
          >
            <Eye size={14} />
            View Details
          </button>
          <button
            className="p-2 text-red-500 hover:text-red-600"
            onClick={() => handleDelete(row._id)}
          >
            <i className="pi pi-trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <BreadCrumb paths={breadcrumbPaths} />

      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: theme?.accentColor || "#2D3748" }}>
            Proposal
          </h1>
          <div className="flex items-center gap-4">
            <Button
              label="Create"
              icon="pi pi-plus"
              variant="primary"
              onClick={() => setIsNewProductDialogOpen(true)}
              className="h-10 px-5"
            />
            <div className="relative">
              <input
                className="w-[300px] h-10 border border-gray-300 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={formik.values.proposalName}
                onChange={handleSearchChange}
                placeholder="Search by Proposal Name..."
              />
              <i className="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>
        </div>

        <Table
          data={proposalList?.proposals || []}
          columns={columns}
          emptyMessage="No proposals found."
        />

        <Pagination
          currentPage={proposalList?.pagination?.currentPage}
          totalPages={proposalList?.pagination?.totalPages}
          totalItems={proposalList?.pagination?.totalItems}
          itemsPerPage={limit}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      {isNewProductDialogOpen && (
        <AddNewProposalDialog
          onClose={() => setIsNewProductDialogOpen(false)}
        />
      )}

      {editing && selectedId && (
        <AddNewProposalDialog
          data={proposalDetails}
          editing
          onClose={() => {
            setSelectedId(null);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default Proposals;

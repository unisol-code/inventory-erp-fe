import { useState, useEffect, useCallback } from "react";
import { Eye } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewQuotationDialog from "../../../../components/Dialog/CreateNewQuotationDialog";
import { useQuotation } from "../../../../hooks/inventory/useQuotation";
import Pagination from "../../../../components/common/Pagination";
import Button from "../../../../components/common/Button";
import Table from "../../../../components/common/Table";
import BreadCrumb from "../../../../components/common/BreadCrumb";
import { debounce } from "lodash";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../hooks/theme/useTheme";

const Quotation = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isQuotationDialogOpen, setIsQuotationDialogOpen] = useState(false);
  const { theme } = useTheme();
  const {
    fetchQuotationList,
    fetchSearchQuotation,
    quotationsList,
    loading,
    deleteQuotation,
  } = useQuotation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      quotationName: "",
    },
    onSubmit: (values) => {
      if (values.quotationName) {
        fetchSearchQuotation(values);
      } else {
        fetchQuotationList(page, limit);
      }
    },
  });

  useEffect(() => {
    fetchQuotationList(page, limit, formik.values.quotationName);
  }, [page, limit, formik.values.quotationName]);

  const debouncedSearch = useCallback(
    debounce((values) => {
      if (values.quotationName) {
        fetchSearchQuotation({ ...values, page, limit });
      }
    }, 500),
    [fetchSearchQuotation, page, limit]
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("quotationName", value);
    setPage(1);
    debouncedSearch({ quotationName: value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleDelete = async (_id) => {
    await deleteQuotation(_id);
  };

  const handleViewDetails = (id) => {
    navigate(`/inventory/quotations/${id}`);
  };

  const breadcrumbPaths = [
    { label: "Dashboard", url: "/inventory-dashboard" },
    { label: "Inventory", url: "/inventory" },
    { label: "Quotation" },
  ];

  const columns = [
    { field: "quotationNo", header: "Quotation ID", sortable: true },
    { field: "quotationName", header: "Quotation Name", sortable: true },
    { field: "customerName", header: "Customer Name", sortable: true },
    { field: "customerState", header: "Customer State", sortable: true },
    { field: "validity", header: "Validity", sortable: true },
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
          <button
            className="p-2 text-red-500 hover:text-red-600"
            onClick={() => handleDelete(row._id)}
          >
            <DeleteIcon />
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
            Quotation
          </h1>
          <div className="flex items-center gap-4">
            <Button
              label="Create"
              icon="pi pi-plus"
              variant="primary"
              onClick={() => setIsQuotationDialogOpen(true)}
              className="h-10 px-5"
            />
            <div className="relative">
              <input
                className="w-[300px] h-10 border border-gray-300 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={formik.values.quotationName}
                onChange={handleSearchChange}
                placeholder="Search by Quotation Name..."
              />
              <i className="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>
        </div>

        <Table
          data={quotationsList?.quotations || []}
          columns={columns}
          loading={loading}
          emptyMessage="No quotations found."
        />

        <Pagination
          currentPage={quotationsList?.pagination?.currentPage}
          totalPages={quotationsList?.pagination?.totalPages}
          totalItems={quotationsList?.pagination?.totalItems}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {isQuotationDialogOpen && (
        <CreateNewQuotationDialog
          onClose={() => setIsQuotationDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Quotation;

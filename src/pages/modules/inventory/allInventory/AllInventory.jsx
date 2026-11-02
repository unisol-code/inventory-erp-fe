import { useCallback, useEffect, useState } from "react";
import { Eye } from "lucide-react";
import debounce from "lodash/debounce";
import Pagination from "../../../../components/common/Pagination";
import Table from "../../../../components/common/Table";
import BreadCrumb from "../../../../components/common/BreadCrumb";
import InventoryDialog from "../../../../components/Dialog/InventoryDialog";
import useProductManagement from "../../../../hooks/product/useProductManagement";
import { useFormik } from "formik";
import useAllInventory from "../../../../hooks/inventory/useAllInventory";
import { useTheme } from "../../../../hooks/theme/useTheme";

const AllInventory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const { theme } = useTheme();
  const { fetchSearchAllProducts, fetchAllProducts, allProducts, loading } =
    useProductManagement();
  const { fixProductsByID, fetchFixProductsByID } = useAllInventory();

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchAllProducts(page, limit);
  }, []);

  const debouncedSearch = useCallback(
    debounce((values) => {
      if (values.productName) {
        fetchSearchAllProducts(values);
      } else {
        fetchAllProducts(page, limit);
      }
    }, 500),
    []
  );

  const formik = useFormik({
    initialValues: {
      productName: "",
    },
    onSubmit: (values) => {
      if (values.productName) {
        fetchSearchAllProducts(values);
      } else {
        fetchAllProducts(page, limit);
      }
    },
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("productName", value);
    debouncedSearch({ productName: value });
  };

  const onPageChange = (data) => {
    setPage(data);
    fetchAllProducts(data, limit);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    fetchAllProducts(page, data);
  };

  const handleEditEvent = (id) => {
    fetchFixProductsByID(id);
    setSelectedId(id);
    setEditing(true);
  };

  const breadcrumbPaths = [
    { label: "Dashboard", url: "/inventory-dashboard" },
    { label: "All Inventory" },
  ];

  const columns = [
    { field: "productName", header: "Product Name", sortable: true },
    { field: "srNo", header: "Code", sortable: true },
    { field: "productType", header: "Item Group", sortable: true },
    { field: "date", header: "Added On", sortable: true },
    { field: "quantity", header: "Quantity Unit", sortable: true },
    { field: "companyPrice", header: "Price", sortable: true },
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
            All Inventory
          </h1>
          <div className="relative">
            <input
              className="w-[300px] h-10 border border-gray-300 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={formik.values.productName}
              onChange={handleSearchChange}
              placeholder="Search by Product Name..."
            />
            <i className="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        <Table
          data={allProducts?.products || []}
          columns={columns}
          loading={loading}
          emptyMessage="No products found."
        />

        <Pagination
          currentPage={allProducts?.pagination?.currentPage}
          totalPages={allProducts?.pagination?.totalPages}
          totalItems={allProducts?.pagination?.totalItems}
          itemsPerPage={limit}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      {editing && selectedId && (
        <InventoryDialog
          data={fixProductsByID}
          openDialog={editing}
          onClose={() => {
            setSelectedId(null);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default AllInventory;

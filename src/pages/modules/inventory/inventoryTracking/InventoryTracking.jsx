import { useState } from "react";
import { Eye } from "lucide-react";
import BreadCrumb from "../../../../components/common/BreadCrumb";
import Table from "../../../../components/common/Table";
import InventoryTrackingDialog from "../../../../components/Dialog/InventoryTrackingDialog";
import { useTheme } from "../../../../hooks/theme/useTheme";

const InventoryTracking = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme } = useTheme();

  const inventoryData = [
    {
      orderId: "1",
      typeOfProduct: "Electronics",
      item: "1",
      shippingService: "Priority",
      trackingCode: "10 kg",
      orderDate: "2024-11-15",
      reciveDate: "2024-11-15",
      action: "View Details",
    },
    {
      orderId: "2",
      typeOfProduct: "Electronics",
      item: "2",
      shippingService: "Priority",
      trackingCode: "20 kg",
      orderDate: "2024-11-15",
      reciveDate: "2024-11-15",
      action: "View Details",
    },
    {
      orderId: "3",
      typeOfProduct: "Electronics",
      item: "3",
      shippingService: "Priority",
      trackingCode: "5 kg",
      orderDate: "2024-11-15",
      reciveDate: "2024-11-15",
      action: "View Details",
    },
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const breadcrumbPaths = [
    { label: "Dashboard", url: "/inventory-dashboard" },
    { label: "Inventory", url: "/inventory" },
    { label: "Inventory Tracking" },
  ];

  const columns = [
    { field: "orderId", header: "ORDER ID", sortable: true },
    { field: "typeOfProduct", header: "Type of Product", sortable: true },
    { field: "item", header: "Item", sortable: true },
    { field: "shippingService", header: "Shipping Service", sortable: true },
    { field: "trackingCode", header: "Tracking Code", sortable: true },
    { field: "orderDate", header: "Order Date", sortable: true },
    { field: "reciveDate", header: "Recive Date", sortable: true },
    {
      field: "action",
      header: "Action",
      body: () => (
        <div className="flex justify-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme?.accentColor || "#1C5CD6" }}
            onClick={() => setIsDialogOpen(true)}
          >
            <Eye size={14} />
            View Details
          </button>
          <button
            className="p-2 text-red-500 hover:text-red-600"
            onClick={() => alert("Deleting Item")}
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
            Inventory Tracking
          </h1>
          <div className="flex items-center gap-4">
            <select
              className="w-40 h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Sell"
            >
              <option value="Sell">Sell</option>
              <option value="Buy">Buy</option>
            </select>
            <div className="relative">
              <input
                className="w-[300px] h-10 border border-gray-300 rounded-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search by Product..."
              />
              <i className="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>
        </div>

        <Table
          data={inventoryData}
          columns={columns}
          emptyMessage="No inventory tracking records found."
        />
      </div>

      {isDialogOpen && (
        <InventoryTrackingDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default InventoryTracking;

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryTrackingDialog from "../../../../components/Dialog/InventoryTrackingDialog";

const InventoryTracking = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  // Define table columns
  const columns = [
    { id: "orderId", label: "ORDER ID" },
    { id: "typeOfProduct", label: "Type of Product" },
    { id: "item", label: "Item" },
    { id: "shippingService", label: "Shipping Service" },
    { id: "trackingCode", label: "Tracking Code" },
    { id: "orderDate", label: "Order Date" },
    { id: "reciveDate", label: "Recive Date" },
    { id: "action", label: "Action" },
  ];
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const sell = ["Sell", "Buy"];
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "10px",
        minHeight: "600px",
      }}
    >
      {/* Search Section */}
      <div className="search-section flex items-center justify-between px-6 bg-gray-100 border-b border-gray-300 py-4">
        <h2 className="text-2xl font-bold">Inventory Tracking</h2>
        <div className="flex items-center space-x-4">
          <select
            className="w-40 h-10 border border-gray-400 rounded-lg px-2"
            placeholder="Sell"
          >
            {sell?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            className="w-[300px] h-10 border border-gray-400 rounded-lg px-4"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search by Product..."
          />
        </div>
      </div>

      <div className="table-section">
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.map((row, index) => (
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{row.orderId}</TableCell>
                  <TableCell align="center">{row.typeOfProduct}</TableCell>
                  <TableCell align="center">{row.item}</TableCell>
                  <TableCell align="center">{row.shippingService}</TableCell>
                  <TableCell align="center">{row.trackingCode}</TableCell>
                  <TableCell align="center">{row.orderDate}</TableCell>
                  <TableCell align="center">{row.reciveDate}</TableCell>
                  <TableCell align="center">
                    <>
                      <button
                        className="p-2 text-white rounded-full hover:bg-blue-600"
                        style={{ backgroundColor: "#56AAC5" }}
                        onClick={() => setIsDialogOpen(true)}
                      >
                        {row.action}
                      </button>

                      <InventoryTrackingDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      />
                    </>
                    <button
                      className="p-2 text-red-500 hover:text-red-600"
                      onClick={() => alert("Deleting Item")}
                    >
                      <DeleteIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default InventoryTracking;

import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import debounce from "lodash/debounce";
import { Button } from "@mui/material";
import Pagination from "../../../../components/Pagination";
import InventoryDialog from "../../../../components/Dialog/InventoryDialog";
import useProductManagement from "../../../../hooks/product/useProductManagement";
import { useFormik } from "formik";
import useAllInventory from "../../../../hooks/inventory/useAllInventory";

const columns = [
  { id: "productName", label: "Product Name" },
  { id: "srNo", label: "Code" },
  { id: "productType", label: "Item Group" },
  { id: "date", label: "Added On" },
  { id: "quantity", label: "Quantity Unit" },
  { id: "companyPrice", label: "price" },
  { id: "action", label: "Action" },
];

const AllInventory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const { fetchSearchAllProducts, fetchAllProducts, allProducts, loading } =
    useProductManagement();
  const { fixProductsByID, fetchFixProductsByID } = useAllInventory();
  console.log("allProducts", allProducts);

  const [openDialog, setOpenDialog] = useState(false);
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
        fetchAllEmployees(page, limit);
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

  const handleDelete = async (_id) => {
    await deleteProposal(_id);
    fetchAllProducts(page, limit); // Refresh the list
  };

  const handleEditEvent = (id) => {
    console.log("id", id);
    fetchFixProductsByID(id);
    setSelectedId(id);
    setEditing(true);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "10px",
        minHeight: "600px",
      }}
    >
      <div className="search-section flex h-[100px] items-center justify-between px-6 bg-gray-100 border-b border-gray-300">
        <h2 className="text-2xl font-bold">All Inventory</h2>
        <input
          className="w-[300px] h-10 border border-gray-400 rounded-lg px-4"
          type="text"
          value={formik.values.productName}
          onChange={handleSearchChange}
          placeholder="Search by Product Name..."
        />
      </div>

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
            {allProducts?.products?.map((row, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                <TableCell align="center">{row.productName}</TableCell>
                <TableCell align="center">{row.srNo}</TableCell>
                <TableCell align="center">{row.productType}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row?.companyPrice}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#56AAC5",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "10px",
                      fontFamily: "Lexend",
                    }}
                    className="p-2 text-white rounded-full hover:bg-blue-600"
                    onClick={() => handleEditEvent(row._id)}
                  >
                    View Details
                  </Button>
                  {editing && selectedId === row._id && (
                    <InventoryDialog
                      data={fixProductsByID}
                      openDialog={editing}
                      onClose={() => {
                        setSelectedId(null);
                        setEditing(false);
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        currentPage={allProducts?.pagination?.currentPage}
        totalPages={allProducts?.pagination?.totalPages}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Paper>
  );
};

export default AllInventory;

import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewQuotationDialog from "../../../../components/Dialog/CreateNewQuotationDialog";
import { useQuotation } from "../../../../hooks/inventory/useQuotation";
import Pagination from "../../../../components/Pagination";
import { debounce } from "lodash";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "quotationId", label: "Quotation ID" },
  { id: "quotationName", label: "Quotation Name" },
  { id: "customerName", label: "Customer Name" },
  { id: "cityStateZip", label: "Customer State" },
  { id: "validity", label: "Validity" },
  { id: "action", label: "Action" },
];

const Quotation = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isQuotationDialogOpen, setIsQuotationDialogOpen] = useState(false);
  const {
    fetchQuotationList,
    fetchQuotationById,
    fetchSearchQuotation,
    quotationsList,
    loading,
    quotationDetails,
    deleteQuotation,
  } = useQuotation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [editing, setEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      quotationName: "",
    },
    onSubmit: (values) => {
      if (values.quotationName) {
        fetchSearchAllInventory(values);
      } else {
        fetchAllEmployees(page, limit);
      }
    },
  });

  useEffect(() => {
    fetchQuotationList(page, limit, formik.values.quotationName);
  }, [page, limit, formik.values.quotationName]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("quotationName", value);
    setPage(1); // Reset to first page when searching

    // If you're using debounce, adjust the debouncedSearch
    debouncedSearch({
      quotationName: value,
      page: 1,
      limit: limit,
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const onPageChange = (data) => {
    setPage(data);
    fetchQuotationList(data, limit);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    fetchQuotationList(page, data);
  };

  const handleDelete = async (_id) => {
    await deleteQuotation(_id);
  };

  const handleViewDetails = async (id) => {
    // await fetchQuotationById(id);
    // setSelectedId(id);
    // setEditing(true);
    navigate(`/inventory/quotations/${id}`);
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
      {/* Search Section */}
      <div className="search-section flex items-center justify-between px-6 bg-gray-100 border-b border-gray-300 py-4">
        <h2 className="text-2xl font-bold">Quotation</h2>
        <div className="flex items-center space-x-4">
          <button
            className="bg-[#56AAC5] text-white py-2 pl-6 pr-6 rounded-lg"
            onClick={() => setIsQuotationDialogOpen(true)}
          >
            Create
          </button>
          {isQuotationDialogOpen && (
            <CreateNewQuotationDialog
              onClose={() => setIsQuotationDialogOpen(false)}
            />
          )}
          <input
            className="w-[300px] h-10 border border-gray-400 rounded-lg px-4"
            type="text"
            value={formik.values.quotationName}
            onChange={handleSearchChange}
            placeholder="Search by Quotation Name..."
          />
        </div>
      </div>

      {/* Table Section */}
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
              {quotationsList?.quotations?.map((row, index) => (
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{row.quotationNo}</TableCell>
                  <TableCell align="center">{row.quotationName}</TableCell>
                  <TableCell align="center">John</TableCell>
                  <TableCell align="center">{row.to?.customerState}</TableCell>
                  <TableCell align="center">
                    {new Date(row.validity).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="p-2 text-white rounded-full hover:bg-blue-600"
                      style={{ backgroundColor: "#56AAC5" }}
                      onClick={() => handleViewDetails(row._id)}
                    >
                      View Details
                    </button>
                    <button
                      className="p-2 text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(row._id)}
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

      {/* Pagination */}
      <Pagination
        currentPage={quotationsList?.pagination?.currentPage}
        totalPages={quotationsList?.pagination?.totalPages}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Paper>
  );
};

export default Quotation;

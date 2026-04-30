import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import useProposals from "../../../../hooks/inventory/useProposals";
import debounce from "lodash/debounce";
import { useFormik } from "formik";
import Pagination from "../../../../components/Pagination";
import AddNewProposalDialog from "../../../../components/Dialog/AddNewProposalDialog";

const columns = [
  { id: "proposalId", label: "Propsal ID" },
  { id: "proposalName", label: "Propsal Name" },
  { id: "clientName", label: "Client Name" },
  { id: "status", label: "Status" },
  { id: "budgetEstimation", label: "Total Value" },
  { id: "action", label: "Action" },
];

const Proposals = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const { fetchPropsalList, proposalList, fetchSearchAllInventory, deleteProposal,
    fetchProposalById, proposalDetails } = useProposals();

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
        fetchAllEmployees(page, limit);
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
    fetchPropsalList(page, limit); // Refresh the list
  };

  const handleEditEvent = (id) => {
    fetchProposalById(id);
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
      {/* Search Section */}
      <div className="search-section flex items-center justify-between px-6 bg-gray-100 border-b border-gray-300 py-4">
        <h2 className="text-2xl font-bold">Proposal</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-[#56AAC5] text-white py-2 pl-6 pr-6 rounded-lg"
            onClick={() => setIsNewProductDialogOpen(true)}
          >
            Create
          </button>
          {isNewProductDialogOpen && (
            <AddNewProposalDialog
              onClose={() => setIsNewProductDialogOpen(false)}
            />
          )}
          <input
            className="w-[300px] h-10 border border-gray-400 rounded-lg px-4"
            type="text"
            value={formik.values.proposalName}
            onChange={handleSearchChange}
            placeholder="Search by Propsal Name..."
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
              {proposalList?.proposals?.map((row, index) => (
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{row.proposalID}</TableCell>
                  <TableCell align="center">{row.proposalName}</TableCell>
                  <TableCell align="center">{row.clientName}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.budgetEstimation}</TableCell>
                  <TableCell align="center">
                    <button
                      className="p-2 text-white rounded-full hover:bg-blue-600"
                      style={{ backgroundColor: "#56AAC5" }}
                      onClick={() => handleEditEvent(row._id)}
                    > View Details
                    </button>
                    {editing && selectedId === row._id && (
                      <AddNewProposalDialog
                        // data={row}
                        data={proposalDetails}
                        editing
                        onClose={() => {
                          setSelectedId(null);
                          setEditing(false);
                        }}
                      />
                    )}
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
        <Pagination
          currentPage={
            proposalList?.pagination?.currentPage
          }
          totalPages={
            proposalList?.pagination?.totalPages
          }
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </Paper>
  )
}

export default Proposals
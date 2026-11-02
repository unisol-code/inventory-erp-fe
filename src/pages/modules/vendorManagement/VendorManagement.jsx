import React, { useEffect, useState } from "react";
// import vector from "../../../assets/images/vector.png";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import Dialog from "../../../components/Dialog/Dialog";
import useVendor from "../../../hooks/vendor/useVendor";
import { useFormik } from "formik";
import Pagination from "../../../components/common/Pagination";

const VendorManagement = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [edit, setedit] = useState(false);
  const {
    fetchVendorDetails,
    vendor,
    fetchVendorAllDetails,
    vendorAllDetails,
  } = useVendor();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Formik for search functionality
  const formik = useFormik({
    initialValues: {
      vendorName: "",
    },
    onSubmit: (values) => {
      fetchVendorAllDetails(1, limit, values.vendorName);
    },
  });

  useEffect(() => {
    fetchVendorAllDetails(page, limit, formik.values.vendorName);
  }, [page, limit, formik.values.vendorName]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue("vendorName", value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const onPageChange = (data) => {
    setPage(data);
    fetchVendorAllDetails(data, limit, formik.values.vendorName);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    fetchVendorAllDetails(page, data, formik.values.vendorName);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setedit(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleit = async (id) => {
    try {
      setIsDialogOpen(true);
      setedit(true);
      if (id) {
        await fetchVendorDetails(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-h-auto  bg-white p-4">
        <div className="flex">
          <div className="flex ">
            <div className=" text-2xl font-bold">Vendors Management</div>
          </div>
          <button
            className="bg-[#56AAC5] text-white px-6 py-2 relative left-80  rounded-lg "
            onClick={openDialog}
          >
            Create
          </button>

          <div className="flex ps-[380px]  gap-10">
            <div className="relative w-80">
              <form onSubmit={formik.handleSubmit}>
                <input
                  className="w-full rounded-full bg-slate-100 border-2 p-2 pl-8 pr-12"
                  type="text"
                  name="vendorName"
                  value={formik.values.vendorName}
                  onChange={handleSearchChange}
                  placeholder="Search by Vendor Name"
                />
              </form>
              {/* Search Icon */}
              <FaSearch className="absolute right-4 top-5 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="flex  items-center">
              <FaFilter />
              &nbsp;
              <p>Filter</p>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-[#000000]  my-2" />

        {/* /////////////////////// Table ///////////////////////////////////*/}

        <div className="p-2 font-light overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 font-bold text-center">Vendor ID</th>
                <th className="px-6 py-4 font-bold text-center">Vendor Name</th>
                <th className="px-6 py-4 font-bold text-center">
                  Contact Number
                </th>
                <th className="px-6 py-4 font-bold text-center">Category</th>
                <th className="px-6 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tr>
              <td colSpan="13">
                <hr className="border-t-2 border-light my-2" />
              </td>
            </tr>
            <tbody>
              {vendorAllDetails?.data?.vendors?.map((vndr) => (
                <tr className="border-b-2 border-gray-300" key={vndr._id}>
                  <td className="px-4 py-2 font-medium text-center text-gray-500">
                    {vndr.vendorId}
                  </td>

                  <td className="px-4 py-1 font-medium text-center text-gray-500">
                    {vndr?.vendorName}
                  </td>
                  <td className="px-4 py-1 font-medium text-center text-gray-500">
                    {vndr?.contactNumber}
                  </td>
                  <td className="px-4 py-1 font-medium text-center text-gray-500">
                    {vndr?.category}
                  </td>

                  <td className="px-4 py-1 font-medium text-center text-gray-500">
                    <button
                      className="bg-[#56AAC5] w-[130px] text-[15px] text-white px-2 py-1 rounded-md hover:scale-[1.1] transition duration-300"
                      onClick={() => {
                        handleit(vndr._id);
                      }}
                    >
                      view Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={vendorAllDetails?.data?.pagination?.currentPage}
          totalPages={vendorAllDetails?.data?.pagination?.totalPages}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
      {isDialogOpen && (
        <Dialog
          vendo={edit ? vendor : null}
          openDialog={isDialogOpen}
          closeDialog={closeDialog}
        />
      )}
      {!edit && <Dialog openDialog={isDialogOpen} closeDialog={closeDialog} />}
    </>
  );
};

export default VendorManagement;

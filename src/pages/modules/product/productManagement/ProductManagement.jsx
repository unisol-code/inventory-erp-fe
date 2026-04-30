import { useCallback, useEffect, useState } from "react";
import AddNewProductDialog from "../../../../components/Dialog/AddNewProductDialog";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import useProductManagement from "../../../../hooks/product/useProductManagement";
import ProductDetails from "../../../../components/Dialog/ProductDetails";
import Pagination from "../../../../components/Pagination";
import { debounce } from "lodash";

const ProductManagement = () => {
  const [selectId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddNewProductDialogOpen, setIsAddNewProductDialogOpen] =
    useState(false);
  const [viewDetail, setViewDetails] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    fetchAllProducts,
    fetchEmergencyRequiredItem,
    fetchProductDetails,
    fetchTopSellingProducts,
    fetchProductById,
    resetProductById,
    fetchSearchAllProducts,
    allProducts,
    emergencyRequiredItem,
    productDetails,
    topSellingProducts,
    productById,
  } = useProductManagement();
  useEffect(() => {
    fetchAllProducts(page, limit);
    fetchEmergencyRequiredItem();
    fetchProductDetails();
    fetchTopSellingProducts();
  }, []);

  /* const handleSearch = () => {
    if (searchTerm.trim()) {
      // search function
    } else {
      console.log("Please enter a search term.");
    }
  }; */

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value) {
        fetchSearchAllProducts({ productName: value });
      } else {
        fetchAllProducts(page, limit);
      }
    }, 500),
    [page, limit]
  );

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  console.log("allProducts :", allProducts);
  console.log("emergencyRequiredItem :", emergencyRequiredItem);
  console.log("product detail: ", productDetails);
  console.log("topSellingProducts: ", topSellingProducts);

  const handleViewDetails = (id) => {
    console.log("id:", id);
    setSelectedId(id);
    fetchProductById(id);
    setViewDetails(true);
  };
  console.log("productById :", productById);

  const onPageChange = (data) => {
    console.log("data", data);
    setPage(data);
    fetchAllProducts(data, limit);
  };

  const onItemsPerPageChange = (data) => {
    setLimit(data);
    fetchAllProducts(page, data);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="bg-white rounded-2xl w-full h-[66px] flex items-center justify-between px-[30px]">
        <h2 className="font-semibold text-xl">ProductManagement</h2>
        <button
          className="text-[#1A6A85] bg-[#CBE5ED] border border-[#1A6A85] rounded-md py-2 px-4 flex justify-center items-center gap-2"
          onClick={() => setIsAddNewProductDialogOpen(true)}
        >
          <IoAddOutline />
          Add Product
        </button>
        {isAddNewProductDialogOpen && (
          <AddNewProductDialog
            onClose={() => setIsAddNewProductDialogOpen(false)}
          />
        )}
      </div>
      <div className="bg-white rounded-2xl w-full flex flex-col p-2">
        {/* top 3 cards */}

        <div className="grid grid-cols-3 h-[217px] gap-2">
          <div className="flex flex-col gap-2 col-span-1 w-full h-full shadow-xl rounded-xl border border-[#A7A7A7] p-2">
            <h2 className="font-bold">Product Details</h2>
            <div className="flex-1 flex flex-col px-2 gap-2">
              <div className="flex w-full justify-between items-center">
                {" "}
                <h3 className="text-red-600">Out of Stock Item</h3>{" "}
                <p>{productDetails?.outOfStock}</p>
              </div>
              <div className="flex w-full justify-between items-center">
                {" "}
                <h3>Total Item Group</h3>{" "}
                <p>{productDetails?.totalItemGroups}</p>
              </div>
              <div className="flex w-full justify-between items-center">
                {" "}
                <h3>Total Item</h3> <p>{productDetails?.totalItems}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-1 w-full h-full shadow-xl rounded-xl border border-[#A7A7A7] p-2">
            <h2 className="font-bold">Top Selling Item</h2>
            <div className="flex-1 flex flex-col px-2 gap-1">
              {topSellingProducts?.products?.map((product, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-center gap-4"
                >
                  <img
                    src={product?.productImage}
                    alt="img"
                    className="h-[30px] w-[30px]"
                  />
                  <h3>{product?.productName}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-1 w-full h-full shadow-xl rounded-xl border border-[#A7A7A7] p-2">
            <h2 className="font-bold">Emergency Required Item</h2>
            <div className="flex-1 flex flex-col px-2 gap-2">
              {emergencyRequiredItem?.products?.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between items-center"
                >
                  <span className="flex gap-2 items-center">
                    <img
                      src={item?.image}
                      alt="img"
                      className="h-[30px] w-[30px]"
                    />{" "}
                    <h3 className="text-[#A7A7A7] font-semibold">
                      {item?.productName}
                    </h3>
                  </span>
                  {item?.quantity === 0 ? (
                    <p className="text-red-600 font-semibold">out of stock</p>
                  ) : (
                    <p className="text-[#FFB800] font-semibold">
                      {item?.quantity} left
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* search bar and filter */}

        <div className="mt-4 px-6 w-full flex items-center gap-4 py-2">
          <span className="relative min-w-[40%]">
            <CiSearch
              onClick={handleSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl cursor-pointer hover:scale-[1.1] transition duration-300 hover:text-black"
            />
            <input
              type="text"
              placeholder="Quick Search"
              className="border w-full h-[40px] rounded-full pl-12 pr-4 py-2 border-gray-500"
              value={searchTerm}
              onChange={handleSearch}
              /* onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }} */
            />
          </span>
          {/* <FaFilter /> */}
        </div>

        {/* Table Section */}
        <div className="w-full">
          <div className="border-t border-gray-300 w-full h-[400px] overflow-auto ">
            <table
              className="table-auto w-full"
              style={{ fontSize: "14px", fontWeight: 400, color: "#a6a3a3" }}
            >
              <thead className="text-gray-400 font-light">
                <tr>
                  <th className="text-left px-4 py-4">Product Name</th>
                  <th className="text-center px-4 py-4"> Code</th>
                  <th className="text-center px-4 py-4">Item Group</th>
                  <th className="text-center px-4 py-4">Last Purchase</th>
                  <th className="text-center px-4 py-4">Quantity Unit</th>
                  <th className="text-center px-4 py-4">Price</th>
                  <th className="text-center px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {allProducts?.products?.map((product) => (
                  <tr key={product?._id} className="border-t">
                    <td className="text-left px-4 py-4">
                      {product?.productName}
                    </td>
                    <td className="text-center px-4 py-4">{product?.srNo}</td>
                    <td className="text-center px-4 py-4">
                      {product?.productType}
                    </td>
                    <td className="text-center px-4 py-4">
                      {product?.lastPurchase}
                    </td>
                    <td className="text-center px-4 py-4">
                      {product?.quantity}
                    </td>
                    <td className="text-center px-4 py-4">
                      {product?.companyPrice}
                    </td>
                    <td className="text-right px-4 py-4">
                      <button
                        onClick={() => handleViewDetails(product?._id)}
                        className="clientview text-white px-3 py-1 rounded bg-[#3aa5c9] "
                        // onClick={() => console.log("View Details:", item)}
                      >
                        View Details
                      </button>
                      {selectId === product?._id && productById && (
                        <ProductDetails
                          data={productById}
                          openViewDetails={viewDetail}
                          closeViewDetails={() => {
                            setViewDetails(false);
                            resetProductById();
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={allProducts?.pagination?.currentPage}
            totalPages={allProducts?.pagination?.totalPages}
            onPageChange={onPageChange}
            onFilterChange={onItemsPerPageChange}
          />
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default ProductManagement;

import { useEffect, useState } from "react";
import { GrCompliance } from "react-icons/gr";
import { HiOutlineInbox } from "react-icons/hi2";
import { BiSolidLike } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { TfiExport } from "react-icons/tfi";
import { Table } from "antd";
import { IoMdEye } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoArrowDownRight } from "react-icons/go";
import Chart from "./Chart";
import Newreplenishment from "../../../components/Dialog/Newreplenishment";
import Order from "../../../components/Dialog/Order";
import useReplenishment from "../../../hooks/replenishment/useReplenishment";
import { useFormik } from "formik";
import useWarehouseManagement from "../../../hooks/warehouseManagement/useWarehouseManagement";
import cardimg from "../../../assets/images/cardimg.png";

const Replenishment = () => {
  const [showmodal, setshowmodal] = useState(false);
  const [orderplace, setorderplace] = useState(false);
  const [warehouse, setWarehouse] = useState(false);
  const [warehouseType, setWarehouseType] = useState();
  const [productDetails, setProductDetails] = useState(null);
  const {
    fetchTopSellingProducts,
    topSellingProducts,
    createReplenishment,
    fetchReplenishmentProductById,
    replenishmentProductById,
    setSearchTerm,
    searchTerm,
  } = useReplenishment();

  const { fetchAllWareHouses, allWareHouse } = useWarehouseManagement();

  useEffect(() => {
    fetchAllWareHouses();
  }, []);

  useEffect(() => {
    fetchTopSellingProducts();
  }, [fetchTopSellingProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selected value:", selectedValue);
    setWarehouseType(selectedValue);
  };

  console.log("topSellingProducts :", topSellingProducts);

  const handleViewReplenishmentProductDetail = async (id) => {
    console.log(id);
    await fetchReplenishmentProductById(id);
    console.log("ReplenishmentProductDetail :", replenishmentProductById);
    setProductDetails(replenishmentProductById.product);
  };

  const topSellingProductsColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Item Sold",
      dataIndex: "itemSold",
      key: "itemSold",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: "Total Value",
      dataIndex: "totalValue",
      key: "totalValue",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <div className="flex items-center">
          <span>{record.Status}</span>
          &nbsp;
          <IoMdEye
            color="blue"
            onClick={() => {
              handleViewReplenishmentProductDetail(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  const formik = useFormik({
    initialValues: {
      productId: "",
      product: "",
      quantity: "",
      amount: "",
    },
    onSubmit: async (values) => {
      try {
        await createReplenishment(values);
        console.log("values:", values);
        //setshowmodal(false)
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className="p-0 pt-0 xl-custom:space-y-0 xl-custom:px-8 xl-custom:py-6">
      <div className="bg-white rounded-lg w-full mb-2 h-17 flex items-center justify-between">
        <h1 className="text-2xl py-3 px-3">
          <b>Replenishment</b>
        </h1>
        <div className="flex items-center mr-2">
          <b className="text-black mr-2">Warehouse:</b>
          <select
            onChange={handleSelectChange}
            className="w-[111px] text-[13px] px-1 text-black font-bold rounded-3xl"
          >
            <option disabled value="">
              None
            </option>
            {allWareHouse?.wareHouses?.map((warehouse, index) => (
              <option
                key={warehouse._id || index}
                value={warehouse.warehouseName || warehouse}
              >
                {warehouse.warehouseName || warehouse}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <br /> */}
      <div className="flex flex-col w-full h-100vh">
        <div className="bg-white flex w-full h-full p-2 rounded-lg">
          {/* Left Section */}
          <div className="flex-[3] pr-4 w-full flex flex-col pl-1 py-1">
            {/* First Item - 25% Height */}
            <div className="flex-[1] w-[240px] mb-0">
              <div className="flex flex-col gap-4 h-full">
                {/* Row 1 */}
                <div className="flex justify-between items-center font-bold text-base sm:text-base">
                  <span>Date:</span>
                  <span>1 Jan 2023</span>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between items-center font-bold text-base sm:text-base">
                  <span>Products:</span>
                  <span>{productDetails?.productName || "Hp Victus"}</span>{" "}
                </div>

                {/* Row 3 */}
                <div className="flex justify-between items-center font-bold text-sm sm:text-base">
                  <span>Product ID:</span>
                  <span>{productDetails?.code || "2456"}</span>{" "}
                </div>

                {/* Row 4 */}
                <div className="flex justify-between items-center font-bold text-sm sm:text-base">
                  <span>Warehouse:</span>
                  <span className="text-yellow-300">{warehouseType}</span>{" "}
                </div>

                {/* Row 5 */}
                <div className="flex justify-between items-center font-bold text-sm sm:text-base">
                  <span>Status:</span>
                  <span className="text-yellow-300">
                    {productDetails?.status || "Low In Stock"}
                  </span>{" "}
                </div>
              </div>
            </div>

            {/* Second Item - 75% Height */}
            <div className="flex-[3] flex flex-col gap-4">
              <div className="shadow-lg rounded-lg p-4 flex-grow flex flex-col justify-between h-[190px]">
                {productDetails?.inStock > 0 ? (
                  <>
                    <p className="text-yellow-400 font-bold">In Stock</p>
                    <div className="flex items-center justify-between mt-4">
                      <GrCompliance
                        className="text-4xl text-[#24FF00]"
                        size={80}
                      />
                      <b>{productDetails?.inStock}</b>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-red-400 font-bold">Out of Stock</p>
                    <div className="flex items-center justify-between mt-4">
                      <HiOutlineInbox
                        className="text-4xl text-[#7A5800]"
                        size={80}
                      />
                      <b>0</b>
                    </div>
                  </>
                )}
              </div>

              <div className="shadow-lg rounded-lg p-4 flex-grow flex flex-col justify-between h-[190px]">
                <p className="text-yellow-400 font-bold">
                  Required for <br />
                  <span>Fulfill the Stock</span>
                </p>
                <div className="flex items-center justify-between mt-4">
                  <BiSolidLike color="blue" className="text-4xl" size={80} />
                  <b>30</b>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-[7] pl-0 w-full flex flex-col gap-4 pr-1 py-1">
            {/* Top Selling Products - 50% Height */}
            <div
              className="flex-[1] h-1/2 p-4 w-full flex flex-col"
              style={{
                border: "1px solid #81858866",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              <p className="font-bold mb-2">Top Selling Products</p>

              {/* Search and Actions Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center w-full max-w-xs">
                  <input
                    className="w-full h-8 px-3 text-sm rounded border focus:outline-none"
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <CiSearch className="ml-1 text-gray-500 text-lg" />
                </div>
                <button className="flex items-center px-5 py-1 text-xs bg-[#56AAC5] text-white rounded">
                  <TfiExport className="mr-1" />
                  Export
                </button>
              </div>

              {/* Table Section */}
              <div className="overflow-y-auto flex-grow">
                <Table
                  dataSource={topSellingProducts?.products}
                  columns={topSellingProductsColumns}
                  pagination={false}
                />
              </div>
            </div>

            {/* Replenishment Forecast Charts - 50% Height */}
            <div
              className="flex-[1] h-1/2 p-4 w-full flex flex-col"
              style={{
                border: "1px solid #81858866",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold">Replenishment Forecast Charts</p>
                <button
                  onClick={() => setshowmodal(true)}
                  className="flex items-center px-4 py-2 bg-[#56AAC5] text-xs font-semibold text-white rounded"
                >
                  <MdOutlineShoppingCart className="mr-2" size={18} />
                  Create
                </button>
              </div>

              {/* Separator */}
              <div className="w-full bg-red-500 h-px mb-4"></div>

              {/* Metrics Section */}
              <div className="flex items-center mb-4">
                <p className="font-bold text-xs">₹ 15,569.00</p>
                <span className="bg-red-300 text-xs px-2 py-1 ml-4 rounded-xl flex items-center">
                  <GoArrowDownRight />
                  <span className="ml-1">223.5%</span>
                </span>
              </div>
              <div className="text-xs mb-4">week/month/year</div>

              {/* Chart Section - Scrollable */}
              <div className="flex-grow overflow-y-auto">
                <div className="flex">
                  <Chart />
                  <div className="ml-auto flex flex-col items-end gap-4">
                    <div className="bg-blue-700 h-3 w-[25px] flex items-center justify-center">
                      <p className="pt-2.5 ps-0.5 text-xs">
                        <b>Sell</b>
                      </p>
                    </div>
                    <div className="bg-yellow-700 h-3 w-[25px] flex items-center justify-center">
                      <p className="pt-2.5 ps-0.5 text-xs">
                        <b>Inventory</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Newreplenishment
          isvisible={showmodal}
          onClose={() => setshowmodal(false)}
          className="fixed top-[50px] left-[100px]"
        >
          <div className="w-[200px] rounded-lg  h-[370px]">
            <div className="bg-slate-400 w-[501px] mt-[-8px] mx-[-9px]   h-[60px] ">
              <p
                className="ps-4 text-2xl py-3"
                style={{
                  backgroundImage: `url(${cardimg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <b>Creating New Replenishment</b>
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex">
                <div className="flex pt-10 ps-5">
                  <span>Product&nbsp;ID</span>

                  <input
                    type="text"
                    className="w-[200px] shadow-lg border border-red-500 ms-[60px]"
                    name="productId"
                    id="productId"
                    value={formik.values.productId}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex pt-6 ps-5">
                  <span>Product</span>

                  <input
                    type="text"
                    className="w-[200px] border shadow-lg border-red-500 ms-[80px]"
                    name="product"
                    id="product"
                    value={formik.values.product}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex pt-6 ps-5">
                  <span>Quantity</span>

                  <input
                    type="number"
                    className="w-[200px] shadow-lg border border-red-500 ms-[85px]"
                    name="quantity"
                    id="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex ps-40 pt-11">
                <div className="ps-10">
                  <p>Amount</p>
                </div>
                <div className="ps-4">
                  <input
                    type="number"
                    className="outline-none shadow-lg border-0 border-gray-500 border-b-[2px]"
                    name="amount"
                    id="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-5  ms-56 pt-10">
                <button
                  type="submit"
                  onClick={() => setorderplace(true)}
                  className=" px-6 py-1 drop-shadow-xl cursor-pointer text-white w-[110px] active:bg-gray-700 bg-gray-400"
                >
                  <b>Proceed</b>
                </button>
                <div
                  onClick={() => setshowmodal(false)}
                  className=" px-6 text-black cursor-pointer active:bg-slate-300 drop-shadow-xl w-[110px] bg-white"
                >
                  <b>Cancel</b>
                </div>
              </div>
            </form>
          </div>
        </Newreplenishment>
      </div>
      <div>
        {/* {orderplace && <Order onClose={setorderplace} onSec={setshowmodal} />} */}
      </div>
    </div>
  );
};

export default Replenishment;

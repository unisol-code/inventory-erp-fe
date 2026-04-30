import Horizontal3DBarGraph from "../../../components/3DbarGraph";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import totalInventoryIcon from "../../../assets/icons/rupees.png";
import totalOrders from "../../../assets/icons/total orders.png";
import pendingOrders from "../../../assets/icons/pending orders.png";
import recentOrdersLogo from "../../../assets/icons/recent orders.png";
//import lowStockAlert from "../../../assets/icons/low stock alert.jpg";
import replenishmentActionsLogo from "../../../assets/icons/replenishment actions.jpg";
import AddNewProductDialog from "../../../components/Dialog/AddNewProductDialog";
import { useEffect, useState } from "react";
import CreateNewOrderDialog from "../../../components/Dialog/CreateNewOrderDialog";
import useDashboard from "../../../hooks/dashboard/useDashboard";
import { useTheme } from "../../../hooks/theme/useTheme";
import PieChart from "../../../components/DonutPieChart";
import { GoAlert } from "react-icons/go";
import { RiMistFill } from "react-icons/ri";
import { Menu, MenuItem } from "@mui/material";
import FilterByDateRange from "../../../components/FilterByDateRange";
import useProductManagement from "../../../hooks/product/useProductManagement";
import AddNewPurchaseDialog from "../../../components/Dialog/AddNewPurchaseDialog";
import SellsReports from "../reports/SellsReports";
import { useNavigate } from "react-router-dom";
const InventoryDashboard = () => {
  const [isAddNewPurchaseDialogOpen, setIsAddNewPurchaseDialogOpen] =
    useState(false);
  /* const [activeColumn, setActiveColumn] = useState([]);
  const [activeList, setActiveList] = useState([]); */

  const [timeframe, setTimeframe] = useState("Monthly");
  const [activities, setActivities] = useState("latestTenders");
  const [graphToggle, setGraphToggle] = useState("inventoryLevels");
  const [productPage, setProductPage] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const [quotationPage, setQuotationPage] = useState(1);
  const [quotationLimit, setQuotationLimit] = useState(5);
  const [tenderPage, setTenderPage] = useState(1);
  const [tenderLimit, setTenderLimit] = useState(5);
  const navigate = useNavigate();

  const {
    fetchAllCompany,
    fetchTotalInventoryValue,
    fetchTotalOrder,
    fetchRecentOrders,
    fetchReplenishmentActions,
    fetchLowInventoryProduct,
    fetchLatestQuotation,
    fetchLatestTender,
    fetchWarehousePercentages,
    allCompany,
    totalInventoryValue,
    totalOrder,
    recentOrders,
    replenishmentActions,
    lowInventoryProduct,
    latestQuotation,
    latestTender,
    warehousePercentages,
  } = useDashboard();
  const { fetchAllProducts, allProducts } = useProductManagement();
  const { switchTheme, theme } = useTheme();
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isCreateOrderDialogOpen, setIsCreateOrderDialogOpen] = useState(false);
  const [totalOrderFilters, setTotalOrderFilters] = useState({
    fromDate: "",
    toDate: "",
  });
  const [recentOrderFilters, setRecentOrderFilters] = useState({
    fromDate: "",
    toDate: "",
  });
  const [lowInventoryProductFilters, setLowInventoryProductFilters] = useState({
    fromDate: "",
    toDate: "",
  });
  const [replenishmentActionsFilters, setReplenishmentActionsFilters] =
    useState({
      fromDate: "",
      toDate: "",
    });
  useEffect(() => {
    fetchTotalOrder(totalOrderFilters);
    fetchRecentOrders(recentOrderFilters);
    fetchReplenishmentActions(replenishmentActionsFilters);
    fetchLowInventoryProduct(lowInventoryProductFilters);
    fetchLatestQuotation(quotationPage, quotationLimit);
    fetchLatestTender(tenderPage, tenderLimit);
    fetchAllProducts(productPage, productLimit);
  }, []);

  useEffect(() => {
    fetchAllCompany();
    fetchTotalInventoryValue();
    //fetchWarehousePercentages();
  }, []);

  console.log("totalOrder : ", totalOrder);
  console.log("totalInventoryValue :", totalInventoryValue);
  console.log("recentOrders :", recentOrders);
  console.log("replenishmentActions :", replenishmentActions);
  console.log("latestQuotation :", latestQuotation);
  console.log("latestTender :", latestTender);
  console.log("allProducts :", allProducts);
  //console.log("warehousePercentages :", warehousePercentages);

  const onProductPageChange = (data) => {
    console.log("data", data);
    setProductPage(data);
    fetchAllProducts(data, productLimit);
  };

  const onProductItemsPerPageChange = (data) => {
    setProductLimit(data);
    fetchAllProducts(productPage, data);
  };

  const barData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const productColumns = [
    {
      key: "srNo",
      label: "Product Id",
      minWidth: 60,
      minHeight: 40,
      align: "center",
    },
    {
      key: "productName",
      label: "Product Name",
      minWidth: 60,
      minHeight: 40,
      align: "center",
    },
    {
      key: "quantity",
      label: "Quantity",
      minWidth: 60,
      minHeight: 40,
      align: "center",
    },
    {
      key: "date",
      label: "Date",
      minWidth: 60,
      minHeight: 40,
      align: "center",
    },
    {
      key: "companyPrice",
      label: "Price",
      minWidth: 60,
      minHeight: 40,
      align: "center",
    },
  ];

  const quotationColumns = [
    {
      key: "quotationNo",
      label: "Quotation ID",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "quotationDate",
      label: "Date",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "productName",
      label: "Product Name",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "quantity",
      label: "Quantity",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "companyAddress",
      label: "Location",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
  ];

  const tenderColumns = [
    {
      key: "tenderID",
      label: "Tender ID",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "issueDate",
      label: "Date",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "stockName",
      label: "Product Name",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "quantity",
      label: "Quantity",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
    {
      key: "location",
      label: "Location",
      minWidth: 60,
      minHeight: 70,
      align: "center",
    },
  ];

  const handleSelectorChange = (e) => {
    setTimeframe(e.target.value);
    console.log("timeframe", timeframe);
  };

  const handleGraphToggle = (value) => {
    setGraphToggle(value);
  };

  const handleActivities = (value) => {
    setActivities(value);
  };

  const handleCompanySelect = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const newCompanyId = selectedOption.id;
    console.log("newCompanyId", newCompanyId);
    console.log("e.target.value", e.target.value);
    sessionStorage.setItem("theme", e.target.value);
    switchTheme(sessionStorage.getItem("theme"));
    console.log("theme :", theme);
  };

  const onFilterChange = (filterName, selectedDates) => {
    if (filterName === "totalOrder") {
      let updatedFilters;

      if (!selectedDates.fromDate && !selectedDates.toDate) {
        // Reset filters when no dates are selected
        updatedFilters = { fromDate: "", toDate: "" };
      } else {
        // Use selected dates
        updatedFilters = {
          ...totalOrderFilters,
          ...selectedDates,
        };
      }
      fetchTotalOrder(updatedFilters);
      setTotalOrderFilters(updatedFilters);
    }
    if (filterName === "recentOrder") {
      const updatedFilters = {
        ...recentOrderFilters,
        ...selectedDates,
      };

      // Fetch immediately with updated filters
      fetchRecentOrders(updatedFilters);

      // Update the state for UI consistency
      setRecentOrderFilters(updatedFilters);
    }
    if (filterName === "lowInventoryProduct") {
      setLowInventoryProductFilters((prev) => ({
        ...prev,
        ...selectedDates,
      }));
      fetchLowInventoryProduct(lowInventoryProductFilters);
    }
    if (filterName === "replenishmentActions") {
      setReplenishmentActionsFilters((prev) => ({
        ...prev,
        ...selectedDates,
      }));
      fetchReplenishmentActions(replenishmentActionsFilters);
    }
  };

  const onPageChange = async (data) => {
    console.log("data", data);
    if (activities === "latestQuotations") {
      setQuotationPage(data);
      await fetchLatestQuotation(data, quotationLimit);
    }

    if (activities === "latestTenders") {
      setQuotationPage(data);
      await fetchLatestTender(data, tenderLimit);
    }
  };

  const onItemsPerPageChange = async (data) => {
    if (activities === "latestQuotations") {
      setQuotationLimit(data);
      await fetchLatestQuotation(quotationPage, data);
    }

    if (activities === "latestTenders") {
      setQuotationLimit(data);
      await fetchLatestTender(tenderPage, data);
    }
  };

  const handleGraphButton = () => {
    navigate("/reports/sellsreports");
  };

  return (
    <div className="space-y-3 pb-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-end">
          <h2 className="font-bold text-[22px]">Inventory Dashboard</h2>
          <p className="font-medium">Hi, Welcome !</p>
        </div>
        <div>
          <h1 className="text-xs ">Company</h1>
          <select
            name="companyList"
            id="companyList"
            className="py-2 px-4 rounded-xl w-[200px] h-[45px]"
            onChange={(e) => handleCompanySelect(e)}
          >
            <option value="" disabled>
              Select Company
            </option>
            {allCompany?.map((c) => (
              <option key={c?._id} id={c?._id} value={c?.name}>
                {c?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* top cards */}

      <div className="flex justify-between items-center">
        <div className=" flex flex-col items-center gap-1 bg-[#F6F6F6] border-2 border-[#ECEEF6] p-3 rounded-md w-[160px]">
          <img
            src={totalInventoryIcon}
            alt="img"
            className="h-[36px] w-[36px] object-cover"
          />
          <h3 className="text-xs font-bold">Total Inventory Value</h3>
          <h2 className="text-xl font-bold">
            {totalInventoryValue?.totalValue}
          </h2>
        </div>
        <div className="relative flex flex-col items-center gap-1 bg-[#F6F6F6] border-2 border-[#ECEEF6] p-3 rounded-md w-[160px]">
          <img
            src={totalOrders}
            alt="img"
            className="h-[36px] w-[36px] object-cover"
          />
          <h3 className="text-xs font-bold">Total Orders</h3>
          <h2 className="text-xl font-bold">{totalOrder?.totalOrder}</h2>
          <FilterByDateRange
            filterName="totalOrder"
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="relative flex flex-col items-center gap-1 bg-[#F6F6F6] border-2 border-[#ECEEF6] p-3 rounded-md w-[160px]">
          <img
            src={pendingOrders}
            alt="img"
            className="h-[36px] w-[36px] object-cover"
          />
          <h3 className="text-xs font-bold">Pending Orders</h3>
          <h2 className="text-xl font-bold">1,234,567</h2>
          <FilterByDateRange
            filterName="pendingOrder"
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="relative flex flex-col items-center gap-1 bg-[#F6F6F6] border-2 border-[#ECEEF6] p-3 rounded-md w-[160px]">
          <img
            src={recentOrdersLogo}
            alt="img"
            className="h-[36px] w-[36px] object-cover"
          />
          <h3 className="text-xs font-bold">Recent Orders</h3>
          <h2 className="text-xl font-bold">{recentOrders?.data}</h2>
          <FilterByDateRange
            filterName="recentOrder"
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="relative flex flex-col items-center gap-1 bg-[#F6F6F6] border-2 border-[#ECEEF6] p-3 rounded-md w-[160px]">
          {/* <img
            src={lowStockAlert}
            alt="img"
            className="h-[36px] w-[36px] object-cover"
          /> */}
          <GoAlert className="text-[36px] animate-pulse text-red-600" />
          <h3 className="text-xs font-bold">Low Stock Alerts</h3>
          <h2 className="text-xl font-bold">{lowInventoryProduct?.data}</h2>
          <FilterByDateRange
            filterName="lowInventoryProduct"
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="relative flex flex-col items-center gap-1 bg-[#F6F6F6] border-2 border-[#ECEEF6] p-3 rounded-md w-[160px]">
          <img
            src={replenishmentActionsLogo}
            alt="img"
            className="h-[36px] w-[36px] object-cover"
          />
          <h3 className="text-xs font-bold">Replenishment Actions</h3>
          <h2 className="text-xl font-bold">
            {replenishmentActions?.replenishablestock}
          </h2>
          <FilterByDateRange
            filterName="replenishmentActions"
            onFilterChange={onFilterChange}
          />
        </div>
      </div>

      {/* Data Visualizations and Quick Actions */}

      <div className="grid grid-cols-5 gap-2">
        <div className="w-full flex flex-col col-span-3">
          <p className="text-[#878684]">Data Visualizations</p>
          <div className="relative border border-[#A2A1A833] h-[329px] rounded-xl pt-2 pr-2">
            <Horizontal3DBarGraph />
            <div className="w-full absolute top-3 left-6 px-6 flex items-center gap-3">
              <button
                className={`${
                  graphToggle === "inventoryLevels"
                    ? "bg-[#1A2B88] text-white"
                    : "bg-[#E5E4E0]"
                } border border-[#000000] max-w-[154px] w-full rounded-md h-[22px] text-center text-xs hover:shadow-md`}
                onClick={() => handleGraphToggle("inventoryLevels")}
              >
                Inventory Levels
              </button>
              <button
                className={`${
                  graphToggle === "orderTrends"
                    ? "bg-[#1A2B88] text-white"
                    : "bg-[#E5E4E0]"
                } border border-[#000000] max-w-[154px] w-full rounded-md h-[22px] text-center text-xs hover:shadow-md`}
                onClick={() => handleGraphToggle("orderTrends")}
              >
                Order Trends
              </button>{" "}
              <span className="flex-1"></span>
              <select
                name="filter"
                id=""
                className="rounded-lg h-[26px] px-2 w-[100px] border border-[#A2A1A833] "
                value={timeframe}
                onChange={handleSelectorChange}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col col-span-2">
          <p className="text-[#878684]">Quick Actions</p>
          <div className="w-full flex flex-col gap-2 bg-[#F7F7F7] border border-[#ECEEF6] h-[329px] rounded-xl py-2">
            <div className="w-full px-6 flex justify-start items-center gap-3">
              <button
                className="bg-[#E5E4E0] max-w-[120px] w-full rounded-md py-1 text-center text-xs shadow-md"
                onClick={() => setIsAddProductDialogOpen(true)}
              >
                Add New Product{" "}
              </button>
              {isAddProductDialogOpen && (
                <AddNewProductDialog
                  onClose={() => setIsAddProductDialogOpen(false)}
                />
              )}
              <button
                className="bg-[#E5E4E0] max-w-[130px] w-full rounded-md py-1 text-center text-xs shadow-md"
                onClick={() => setIsAddNewPurchaseDialogOpen(true)}
              >
                Create New Order{" "}
              </button>
              {isAddNewPurchaseDialogOpen && (
                <AddNewPurchaseDialog
                  onClose={() => setIsAddNewPurchaseDialogOpen(false)} // Corrected this line
                />
              )}
              <span className="flex-1"></span>
              <button
                className="bg-[#E5E4E0] max-w-[130px] w-full rounded-md py-1 text-center text-xs shadow-md"
                onClick={handleGraphButton}
              >
                Generate Report{" "}
              </button>
            </div>
            <div className="w-full h-[220px]">
              <Table columns={productColumns} data={allProducts?.products} />
            </div>
            <Pagination
              currentPage={allProducts?.pagination?.currentPage}
              totalPages={allProducts?.pagination?.totalPages}
              onPageChange={onProductPageChange}
              onItemsPerPageChange={onProductItemsPerPageChange}
            />
          </div>
        </div>
      </div>
      <p className="text-[#878684]"> Activities </p>
      <div className=" grid grid-cols-4 gap-2 h-[290px]">
        <div className="relative w-full flex flex-col col-span-3 bg-[#F7F7F7] rounded-xl">
          <div className="w-full px-6 flex items-center gap-3 h-[40px]">
            <button
              className={`${
                activities === "latestTenders"
                  ? "bg-[#1A2B88] text-white"
                  : "bg-[#E5E4E0]"
              } max-w-[154px] w-full rounded-md h-[22px] text-center text-xs hover:shadow-md`}
              onClick={() => handleActivities("latestTenders")}
            >
              Latest Tenders
            </button>
            <button
              className={`${
                activities === "latestQuotations"
                  ? "bg-[#1A2B88] text-white"
                  : "bg-[#E5E4E0]"
              } max-w-[154px] w-full rounded-md h-[22px] text-center text-xs hover:shadow-md`}
              onClick={() => handleActivities("latestQuotations")}
            >
              Latest Quotations
            </button>{" "}
            <span className="flex-1"></span>
          </div>
          <div className="h-[245px] pt-1 px-3">
            {/* tabel */}
            <div className="w-full h-full overflow-auto">
              <table className="border-collapse w-full overflow-y-scroll">
                <thead
                  style={{
                    height: "30px", // Height for the entire <thead>
                  }}
                >
                  <tr
                    style={{
                      borderBottom: "2px solid #E0E0E0",
                    }}
                  >
                    {(activities === "latestTenders"
                      ? tenderColumns
                      : quotationColumns
                    )?.map((column, i) => (
                      <th
                        key={i}
                        align={column?.align || "left"}
                        style={{
                          minWidth: column?.minWidth || "120px",
                          minHeight: column?.minHeight || "60px",
                          fontWeight: 500,
                          color: "#949494",
                          fontSize: "12px",
                          position: "sticky",
                          top: "0",
                          zIndex: 10,
                          backgroundColor: "#F7F7F7",
                        }}
                      >
                        {column?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(activities === "latestTenders"
                    ? latestTender?.data?.tenders
                    : latestQuotation?.data
                  )?.map((row, index) => {
                    return (
                      <tr
                        tabIndex={-1}
                        key={index}
                        style={{
                          borderBottom: "1px solid #E0E0E0",
                          minHeight: "50px",
                        }}
                      >
                        {(activities === "latestTenders"
                          ? tenderColumns
                          : quotationColumns
                        )?.map((column, j) => {
                          let content;

                          if (
                            (column.key === "productName" ||
                              column.key === "quantity") &&
                            Array.isArray(row?.products)
                          ) {
                            content = row?.products ? (
                              <ul className="relative py-1">
                                {row?.products
                                  .slice(0, 3)
                                  ?.map((product, k) => (
                                    <li key={k}>{product[column?.key]}</li>
                                  ))}
                                <p className="absolute right-0 font-medium text-blue-600">
                                  {Array.isArray(row?.products) &&
                                    row?.products?.length - 2 > 0 && (
                                      <span>
                                        + {row?.products?.length - 2} more
                                      </span>
                                    )}
                                </p>
                              </ul>
                            ) : (
                              "not found"
                            );
                          } else if (
                            (column.key === "stockName" ||
                              column.key === "quantity") &&
                            Array.isArray(row?.stockItems)
                          ) {
                            content = row?.stockItems ? (
                              <ul className="relative py-1">
                                {row?.stockItems
                                  .slice(0, 2)
                                  ?.map((product, k) => (
                                    <li key={k}>{product[column?.key]}</li>
                                  ))}
                                <p className="absolute -right-2 font-medium text-blue-600">
                                  {Array.isArray(row?.stockItems) &&
                                    row?.stockItems?.length - 2 > 0 && (
                                      <span>
                                        + {row?.stockItems?.length - 2} more
                                      </span>
                                    )}
                                </p>
                              </ul>
                            ) : (
                              "not found"
                            );
                          } else {
                            content = row[column?.key];
                          }
                          return (
                            <td
                              key={j}
                              align={column?.align || "left"}
                              className="text-xs"
                              style={{
                                paddingTop: "5px",
                                paddingBottom: "5px",
                                height: "70px",
                              }}
                            >
                              {content}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={
              activities === "latestTenders"
                ? latestTender?.data?.pagination?.currentPage
                : latestQuotation?.currentPage
            }
            totalPages={
              activities === "latestTenders"
                ? latestTender?.data?.pagination?.totalPages
                : latestQuotation?.totalPages
            }
            onPageChange={onPageChange}
            onFilterChange={onItemsPerPageChange}
          />
        </div>

        <div className="bg-[#F7F7F7] rounded-xl flex flex-col h-[350px]">
          <h2 className="font-semibold text-[18px] px-4 py-4">
            Warehouse Utilization
          </h2>
          <PieChart />
          {/* <WarehousePieChart /> */}
          {/* <PolarChart /> */}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;

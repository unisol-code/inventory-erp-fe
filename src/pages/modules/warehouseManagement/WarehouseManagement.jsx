import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AddNewWarehouse from "../../../components/Dialog/AddNewWarehouse";
import AllInventoryManagement from "../../../components/Dialog/AllInventoryManagement";
import AllOrders from "../../../components/Dialog/AllOrders";
import AllShipmentList from "../../../components/Dialog/AllShipmentList";
import useWarehouseManagement from "../../../hooks/warehouseManagement/useWarehouseManagement";

const line = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const onPieEnter = (pieData, index) => {
  console.log("Hovered on Pie Slice:", pieData, index);
};

const inventorycolumns = [
  { key: "productName", label: "Item Name", minWidth: 60, align: "center" },
  { key: "quantity", label: "Quantity", minWidth: 60, align: "center" },
  { key: "status", label: "Status", minWidth: 60, align: "center" },
];

const ordersColumns = [
  { key: "orderId", label: "Order Id", minWidth: 60, align: "center" },
  {
    key: "customerName",
    label: "Customer Name",
    minWidth: 60,
    align: "center",
  },
  { key: "orderDate", label: "Order Date", minWidth: 60, align: "center" },
  { key: "status", label: "Status", minWidth: 60, align: "center" },
  { key: "totalItems", label: "Total Items", minWidth: 60, align: "center" },
];

const shipmentColumns = [
  { key: "trackingId", label: "Tracking ID", minWidth: 60, align: "center" },
  { key: "destination", label: "Destination ", minWidth: 60, align: "center" },
  {
    key: "shipmentDate",
    label: "Shipment Date",
    minWidth: 60,
    align: "center",
  },
  { key: "status", label: "Status", minWidth: 60, align: "center" },
  { key: "totalItems", label: "Total Items", minWidth: 60, align: "center" },
];

const shipmentsData = [
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
  {
    trackingId: "S002",
    destination: "Warehouse B",
    shipmentDate: "2024-08-11",
    status: "Delivered",
    totalItems: "35",
  },
  {
    trackingId: "S001",
    destination: "Warehouse A",
    shipmentDate: "2024-08-10",
    status: "In-Transit",
    totalItems: "20",
  },
];
const WarehouseManagement = () => {
  const [warehouse, setWarehouse] = useState(false);
  const [allInventory, setAllInventory] = useState(false);
  const [allOrder, setAllOrder] = useState(false);
  const [allShipment, setAllShipment] = useState(false);
  const [warehouseType, setWarehouseType] = useState();
  const {
    fetchAllWareHouses,
    allWareHouse,
    fetchinventoryManagement,
    inventoryManagement,
    fetchOrdersAndShipmentsTypes,
    ordersAndShipments,
    fetchShipmentList,
    shipmentsList,
    fetchWarehouseInventoryStats,
    inventoryLevel,
  } = useWarehouseManagement();

  useEffect(() => {
    fetchAllWareHouses();
    fetchinventoryManagement();
    fetchOrdersAndShipmentsTypes();
    fetchShipmentList();
    fetchWarehouseInventoryStats(warehouseType);
  }, []);
  console.log("inventory: ", inventoryLevel);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selected value:", selectedValue);
    setWarehouseType(selectedValue);
  };

  const data = [
    { name: "Low Stock", value: inventoryLevel?.stats?.lowStock },
    { name: "High Stock", value: inventoryLevel?.stats?.highStock },
    { name: "Out of Stock", value: inventoryLevel?.stats?.outOfStock },
  ];
  const barColors = ["#5DADE2", "#58D68D", "#EC7063"];

  return (
    <div className="w-full">
      <div className="w-full bg-white">
        <div className="flex justify-between  py-4">
          <div className="w-full flex px-4 gap-12 ">
            <h1 className="">Warehouse Management :</h1>
            <select
              onChange={handleSelectChange}
              className="border border-[#BDC3C9] w-[111px] text-[13px] px-1 text-black font-bold rounded-3xl"
            >
              <option disabled value="">
                Select Warehouse
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
          <div className="px-16">
            <button
              onClick={() => setWarehouse(true)}
              className="flex items-center p-1 gap-2 w-[134px] border border-[#BDC3C9] rounded-3xl text-[#00B2FF] text-[13px] font-bold "
            >
              <MdAddCircleOutline size={15} /> New Warehouse
            </button>
          </div>
          {warehouse && <AddNewWarehouse onClose={() => setWarehouse(false)} />}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white text-black pl-2">
            <h1 className="px-2">Current Inventory Levels :</h1>
            <div className="h-[50px] bg-[#D6B5B061] rounded-t-[10px] mt-2 flex items-center justify-center">
              <div className=" flex space-x-8">
                <div className="text-xs">
                  <p>Total Items - {inventoryLevel?.stats?.totalItems} items</p>
                  <p>Low Stock - {inventoryLevel?.stats?.lowStock} items</p>
                </div>
                <div className="text-xs">
                  <p>High Stock - {inventoryLevel?.stats?.highStock} items</p>
                  <p>
                    Out Of Stock - {inventoryLevel?.stats?.outOfStock} items
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[305px] shadow-md rounded-md mb-3 p-4 space-y-2">
              <p className="text-xs font-semibold text-[#222529AB]">
                Inventory Distribution by Stock Level
              </p>

              <select className="w-[98px] border border-[#E1E7EC] py-[8px] px-[12px]">
                <option value="">Today</option>
              </select>

              <div className="w-full flex justify-center items-center">
                <BarChart
                  width={400}
                  height={235}
                  data={data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 10,
                      fontWeight: "bold",
                      fill: "#333",
                    }}
                  />

                  <YAxis
                    tick={{
                      fontSize: 10,
                      fontWeight: "bold",
                      fill: "#333",
                    }}
                    label={{
                      value: "Number of Items",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 12,
                      fontWeight: "bold",
                      fill: "#666",
                    }}
                  />

                  <Tooltip />

                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ fontSize: 10 }}
                    formatter={(value) => (
                      <span
                        style={{
                          fontSize: 10,
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                  <Bar dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index]} />
                    ))}

                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={(value) =>
                        new Intl.NumberFormat("en-US").format(value)
                      }
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        fill: "#333",
                      }}
                    />
                  </Bar>
                </BarChart>
              </div>
            </div>
          </div>

          <div className="bg-white text-black ">
            <h1 className="px-2">Order Status :</h1>
            <div className="h-[50px] bg-[#D6B5B061] rounded-t-[10px] mt-2 flex items-center justify-center">
              <div>
                <div className="flex text-xs space-x-12">
                  <p>Pending Orders - 15</p>
                  <p>Progress Orders - 30</p>
                </div>
                <div className="text-xs flex justify-center">
                  <p>Completed Orders - 85</p>
                </div>
              </div>
            </div>
            <div className="h-[305px] shadow-md rounded-md mb-3">
              <div className="flex flex-col p-4 space-y-2">
                <p className="text-xs font-semibold text-[#222529AB]">
                  Daily Order Trends for the Month
                </p>
                <select className="w-[98px] border border-[#E1E7EC] py-[8px] px-[12px]">
                  <option value="">Today</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height="70%">
                <LineChart
                  width={600}
                  height={300}
                  data={line}
                  margin={{
                    top: 3,
                    right: 10,
                    left: 2,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white text-black pr-2">
            <h1 className="px-2">Tracking Item Status :</h1>
            <div className="h-[50px] bg-[#D6B5B061] rounded-t-[10px] mt-2 flex items-center justify-center">
              <div>
                <div className="flex text-xs space-x-12">
                  <p>Pending Shipments - 5</p>
                  <p>In-Transit Shipments - 12 </p>
                </div>
                <div className="text-xs flex justify-center">
                  <p>Delivery Shipments - 45</p>
                </div>
              </div>
            </div>
            <div className="h-[305px] shadow-md rounded-md mb-3">
              {/* Header Section */}
              <div className="flex flex-col p-4 space-y-2">
                <p className="text-xs font-semibold text-[#222529AB]">
                  Distribution of Shipment Status
                </p>
                <select className="w-[98px] border border-[#E1E7EC] py-[8px] px-[12px] rounded-md text-xs">
                  <option value="">Today</option>
                </select>
              </div>

              <div className="flex items-center justify-between  px-10 py-2">
                {/* Pie Chart Section */}
                <div className="flex-shrink-0">
                  <PieChart width={150} height={150}>
                    <Pie
                      data={pieData}
                      cx={75}
                      cy={75}
                      innerRadius={40}
                      outerRadius={70}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                {/* Legend Section */}
                <div className="flex flex-col space-y-2">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span className="text-xs text-gray-700 font-medium">
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd part */}
      <div className="w-full bg-white mt-2">
        <div className="p-2">
          <p className="pl-4 pb-1 text-[13px] font-semibold">
            Inventory Management :
          </p>
          <div className="flex bg-[#a9b2e475] w-full p-4 rounded-lg shadow-md">
            <table className="w-full table-fixed border-collapse">
              <thead className="border-b-2 border-gray-400">
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2 flex justify-between items-center">
                    <span>Status</span>
                    <button
                      onClick={() => setAllInventory(true)}
                      className="text-blue-400 text-xs font-medium hover:underline"
                    >
                      See All &raquo;
                    </button>
                    {allInventory && (
                      <AllInventoryManagement
                        data={inventoryManagement?.data}
                        columns={inventorycolumns}
                        onClose={() => setAllInventory(false)}
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {/* slice(0,2) take only two rows */}
                {inventoryManagement?.data?.slice(0, 2).map((item, index) => (
                  <tr key={index} className="border-b border-gray-400">
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-2">
          <p className="pl-4 pb-1 text-[13px] font-semibold">
            Orders and Shipments Table
          </p>
          <div className="flex bg-[#a9b2e475] w-full p-4 rounded-lg shadow-md">
            <table className="w-full table-fixed border-collapse">
              <thead className="border-b-2 border-gray-400">
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-4 py-2">Order ID </th>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Order Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 flex justify-between items-center">
                    <span>Total Items</span>
                    <button
                      onClick={() => setAllOrder(true)}
                      className="text-blue-400 text-xs font-medium hover:underline"
                    >
                      See All &raquo;
                    </button>
                    {allOrder && (
                      <AllOrders
                        data={ordersAndShipments?.data?.ordersandshipments}
                        columns={ordersColumns}
                        onClose={() => setAllOrder(false)}
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {ordersAndShipments?.data?.ordersandshipments
                  ?.slice(0, 2)
                  .map((item, index) => (
                    <tr key={index} className="border-b border-gray-400">
                      <td className="px-4 py-2">{item.orderId}</td>
                      <td className="px-4 py-2">{item.customerName}</td>
                      <td className="px-4 py-2">
                        {item.orderDate.split("T")[0]}
                      </td>
                      <td className="px-4 py-2">{item.status}</td>
                      <td className="px-4 py-2">{item.totalItems}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-2">
          <p className="pl-4 pb-1 text-[13px] font-semibold">
            Shipment List :{" "}
          </p>
          <div className="flex bg-[#a9b2e475] w-full p-4 rounded-lg shadow-md">
            <table className="w-full table-fixed border-collapse">
              <thead className="border-b-2 border-gray-400">
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-4 py-2">Order ID </th>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Order Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 flex justify-between items-center">
                    <span>Total Items</span>
                    <button
                      onClick={() => setAllShipment(true)}
                      className="text-blue-400 text-xs font-medium hover:underline"
                    >
                      See All &raquo;
                    </button>
                    {allShipment && (
                      <AllShipmentList
                        data={shipmentsData}
                        columns={shipmentColumns}
                        onClose={() => setAllShipment(false)}
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {shipmentsData?.slice(0, 2).map((item, index) => (
                  <tr key={index} className="border-b border-gray-400">
                    <td className="px-4 py-2">{item.trackingId}</td>
                    <td className="px-4 py-2">{item.destination}</td>
                    <td className="px-4 py-2">
                      {item.shipmentDate.split("T")[0]}
                    </td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">{item.totalItems}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseManagement;

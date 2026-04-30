import React, { useState } from "react";
import { Edit, Box, User, ArrowRight, Package, Truck, X } from "lucide-react";
import { IoMdClose } from "react-icons/io";

import tracking from "../../assets/images/tracking.png";
import vectorImg_1 from "../../assets/images/Vector1.png";
import vectorImg_2 from "../../assets/images/Vector2.png";
import vectorImg_3 from "../../assets/images/Vector3.png";
import vectorImg_4 from "../../assets/images/Vector4.png";
import vectorImg_5 from "../../assets/images/Vector5.png";



const InventoryTrackingDialog = ({ open, onOpenChange }) => {

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(4); // 1 to 5 for tracking progress

  const trackingSteps = [
    { icon: vectorImg_1, label: "Order Placement", step: 1 },
    { icon: vectorImg_2, label: "Pick Inventory", step: 2 },
    { icon: vectorImg_3, label: "Sorting", step: 3 },
    { icon: vectorImg_4, label: "Packing", step: 4 },
    { icon: vectorImg_5, label: "Shipping", step: 5 },
  ];

  // Sample order data
  const orderData = {
    id: "50012",
    name: "Lantus (100 Units)",
    loadQuantity: "100 Items",
    loadWeight: "100 g",
    loadVolume: "10/40*100",
    currentInventory: 57,
    replenishmentAmount: "₹ 15,569.00",
    pharmacy: "IN Pharmacies",
    outOfStock: 11,
    underStock: 0,
  };

  const orderHistory = [
    {
      id: "89622",
      lastOrderDate: "21.06.2024",
      orderedQty: "256",
      warehouse: "89622",
      deliveryDate: "30.07.2024",
    },
    {
      id: "89622",
      lastOrderDate: "21.06.2024",
      orderedQty: "120",
      warehouse: "89622",
      deliveryDate: "30.07.2024",
    },
    {
      id: "89622",
      lastOrderDate: "21.06.2024",
      orderedQty: "692",
      warehouse: "89622",
      deliveryDate: "30.07.2024",
    },
    {
      id: "89622",
      lastOrderDate: "21.06.2024",
      orderedQty: "145",
      warehouse: "89622",
      deliveryDate: "30.07.2024",
    },
    {
      id: "89622",
      lastOrderDate: "21.06.2024",
      orderedQty: "610",
      warehouse: "89622",
      deliveryDate: "30.07.2024",
    },
  ];

  if (!open) return null;

  const EditDialog = () => {
    if (!editDialogOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        style={{ backdropFilter: "blur(1px)" }}
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit</h2>
            <button onClick={() => setEditDialogOpen(false)}>
              <X className="w-6 h-6" strokeWidth={10} />
            </button>
          </div>

          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-base">{step.label}</span>
                <div className="w-6 h-6 border rounded-sm bg-gray-100">
                  {index < currentStatus && (
                    <div className="w-full h-full flex items-center justify-center bg-sky-200">
                      <svg
                        className="w-4 h-4 text-sky-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-between gap-4 mt-6">
              <button
                className="flex-1 bg-sky-400 hover:bg-sky-500 text-white py-2 rounded-md"
                onClick={() => setEditDialogOpen(false)}
              >
                Update
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-md"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 overflow-hidden">
      <div className="flex items-center justify-center bg-transparent p-6 rounded-lg">
        <div className="bg-white rounded-lg p-6 w-full m-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}


          <button
          onClick={() => onOpenChange(false)}
          className="ml-[58%]">
              <IoMdClose size={32} className="cursor-pointer -mt-6 mr-8 flex justify-end ml-96" />
        </button> 
          <div className="flex justify-between items-center mb-6">
         
            {/* <button
              onClick={() => setEditDialogOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Edit className="w-8 h-8"/>
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Info Card */}
              <div className="bg-white rounded-lg border p-2 pb-6 w-80 -mt-8 shadow-md">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{orderData.name}</h3>
                      <p className="text-sm text-gray-500">
                        Id: {orderData.id}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">

                    <div>
                      <p className="text-gray-500">Load Quantity</p>
                      <p>{orderData.loadQuantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Load Weight</p>
                      <p>{orderData.loadWeight}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Load Volume</p>
                      <p>{orderData.loadVolume}</p>
                    </div>
                  </div>
                  <div className=" ml-10 p-4 shadow-lg rounded-lg w-48">
                    <img src={tracking} alt="" />
                    
                  </div>
                </div>
              </div>

              {/* Warehouse Inventory Card */}
              <div className="bg-white rounded-lg border p-2 pb-6 w-80 shadow-md">
                <div className="flex -ml-2 -mt-2 p-2 pb-2 w-[317px] ring-2 ring-gray-500 ring-offset-0 shadow-xl">
                <h3 className="font-medium text-start mb-2">Warehouse Inventory</h3>
                </div>
                <div className="text-center mb-6">
                  
                  <div className="text-sm font-medium text-black pt-8 pb-6">
                    Current Inventory Count
                  </div>
                  <div className="text-4xl font-bold mb-4">
                    {orderData.currentInventory}
                  </div>
                  <hr/>
                </div>
                <div className="space-y-2">
                <h1 className="text-start pb-6 font-medium">Replenishment Recomendation</h1>
                  <div className="flex flex-col items-start p-6 pt-2">
               
                    <span className="text-lg font-medium">
                      {orderData.replenishmentAmount}
                    </span>
                    <span className="text-sm text-gray-500">
                      {orderData.pharmacy}
                    </span>
                  </div>
                  <div className="flex justify-around text-sm">
                    <span className="text-gray-600">
                      {orderData.outOfStock} Out of Stock
                    </span>
                    <span className="text-gray-600">
                      {orderData.underStock} Under Stock
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Progress Tracker */}
               
               <div className="relative border p-6 bg-white shadow-lg rounded-lg mt-4 mb-22 -ml-36 w-[650px]">
               <h2 className="text-xl font-semibold flex justify-start">Live Tracking Of Order</h2>
               <button
              onClick={() => setEditDialogOpen(true)}
              className="p-2 -mt-10 hover:bg-gray-100 rounded-full flex ml-[95%] mb-8"
            >
              <Edit className="w-8 h-8"/>
            </button>
                <div className="flex justify-between mb-8">
                  {trackingSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      {/* <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
                      ${
                        index < currentStatus
                          ? "bg-sky-100 text-sky-600"
                          : "bg-gray-100 text-gray-400"
                      }`}> */}
                        {/* <step.icon className="w-6 h-6" /> */}
                        {/* <img src={step.icon} alt={step.label} className="w-12 h-12" />
                      </div> */}

                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                        {/* <step.icon className="w-6 h-6" /> */}
                        <img src={step.icon} alt={step.label} className="w-12 h-12" />
                      </div>
                     
                     
                      <span className="w-6 h-6 rounded-full z-10  bg-sky-400  text-white text-xs flex items-center justify-center mt-6">
                        {index + 1}
                      </span>
                      <span className="text-xs mt-4">{step.label}</span>
                    </div>
                  ))}
                  {/* <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200"> */}
                  <div className="absolute top-44 left-16 w-[550px] rounded right-0 h-3 bg-gray-200">
                    <div
                      // className="absolute h-full bg-sky-400 transition-all duration-500"
                      className="absolute h-full bg-sky-400 rounded-md transition-all duration-500"
                      style={{ width: `${(currentStatus - 1) * 25}%` }}
                    />
                  </div>
                </div>
              </div>
             

              {/* Order History Table */}
              <div className="bg-white rounded-lg border p-6 -ml-36 w-[650px] h-[400px]">
                <h3 className="font-medium text-left mb-4">Product Order History</h3>
                <div className="overflow-x-auto" >
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-500 bg-gray-200">
                        <th className="text-center p-4">ID</th>
                        <th className="text-center p-4">Last Order Date</th>
                        <th className="text-center p-4">Ordered QTY.</th>
                        <th className="text-center p-4">Warehouse</th>
                        <th className="text-center p-4">Delivery Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderHistory.map((order, index) => (
                        <tr key={index} className="text-sm">
                          <td className=" p-4">{order.id}</td>
                          <td>{order.lastOrderDate}</td>
                          <td>{order.orderedQty}</td>
                          <td>{order.warehouse}</td>
                          <td>{order.deliveryDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <EditDialog />
        </div>
      </div>
    </div>
  );
};

export default InventoryTrackingDialog;

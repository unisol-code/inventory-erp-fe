import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import usePurchase from "../../hooks/product/usePurchaseManagement";
import cardimg from "../../assets/images/cardimg.png";

const AddNewProductDialog = ({ onClose }) => {
  const {
    fetchSrNoPurchase,
    srNoPurchase,
    createPurchaseOrder,
    fetchPurchaseOrderTerms,
    purchaseOrderTerms,
  } = usePurchase();

  useEffect(() => {
    fetchSrNoPurchase();
  }, []);
  useEffect(() => {
    fetchPurchaseOrderTerms();
  }, []);

  const validationSchema = Yup.object().shape({
    poOrderNo: Yup.string().required("PO Order No. is required"),
    poDate: Yup.date().required("PO Date is required"),
    shipAndBillToAddress: Yup.object().shape({
      clientName: Yup.string().required("Client Name is required"),
      address: Yup.string().required("Address is required"),
      cityStateZip: Yup.string().required("City, State, Zip is required"),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits")
        .length(10, "Contact must be exactly 10 digits")
        .required("Contact is required"),
    }),
    purchaseForm: Yup.object().shape({
      vendorName: Yup.string().required("Vendor Name is required"),
      address1: Yup.string().required("Vendor Address1 is required"),
      address2: Yup.string().required("Vendor Address2 is required"),
      cityStateZip: Yup.string().required(
        "Vendor City, State, Zip is required"
      ),
    }),
    orderDetails: Yup.array().of(
      Yup.object().shape({
        itemNo: Yup.string().required("Item No is required"),
        //item: Yup.string().required("Item name is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .integer("Quantity must be a whole number")
          .min(1, "Quantity must be at least 1"),
        unitPrice: Yup.number()
          .required("Unit Price is required")
          .positive("Unit Price must be positive"),
        sgstRate: Yup.number()
          .required("SGST Rate is required")
          .min(0, "SGST Rate cannot be negative")
          .max(100, "SGST Rate cannot exceed 100"),
        taxableTotalValue: Yup.number()
          .required("Taxable Total Value is required")
          .min(0, "Taxable Total Value cannot be negative"),
      })
    ),
    name: Yup.string().required("Name is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Contact must contain only numeric digits")
      .length(10, "Contact must be exactly 10 digits")
      .required("Contact is required"),
  });

  const formik = useFormik({
    initialValues: {
      poOrderNo: srNoPurchase?.srNo || "",
      poDate: new Date().toISOString().split("T")[0],
      shipAndBillToAddress: {
        clientName: "",
        address: "",
        cityStateZip: "",
        contact: "",
      },
      purchaseForm: {
        vendorName: "",
        address1: "",
        address2: "",
        cityStateZip: "",
      },
      orderDetails: [
        {
          itemNo: "1",
          //item: "lala",
          quantity: "1",
          unitPrice: "",
          total: 0,
          sgstRate: 9,
          sgstAmount: 0,
          taxableTotalValue: 0,
        },
      ],
      subTotal: 0,
      shippingHandling: 0,
      taxes: 0,
      netAmount: 0,
      expiryTerms: "30 days",
      paymentTerms: "Net 30",
      deliveryTerms: "FOB",
      returnPolicy: "30 days return policy",
      name: "",
      designation: "",
      email: "",
      contact: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Form Submitted:", values);
        await createPurchaseOrder(values);
        setSubmitting(false);
        onClose();
      } catch (error) {
        console.error("Submission Error:", error);
        setSubmitting(false);
      }
    },
  });

  const calculateTaxableTotal = (quantity, unitPrice) => {
    return Number(quantity || 0) * Number(unitPrice || 0);
  };

  const calculateSGSTAmount = (taxableTotalValue, sgstRate) => {
    return (Number(taxableTotalValue || 0) * Number(sgstRate || 0)) / 100;
  };

  const calculateTotal = (taxableTotalValue, sgstAmount) => {
    return Number(taxableTotalValue || 0) + Number(sgstAmount || 0);
  };

  console.log("Formik Values:", formik.values);
  console.log("Formik Errors:", formik.errors);

  return (
    <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-6xl max-h-[90vh] overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 flex items-center justify-between border-b shrink-0"
          style={{
            backgroundImage: `url(${cardimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-semibold text-center flex-1">
            Create New Order
          </h1>
          <button onClick={onClose}>
            <IoMdClose size={32} className="cursor-pointer mr-8" />
          </button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="h-[600px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto"
        >
          <div className="flex justify-between items-start gap-6 mb-8 font-bold text-base">
            {/* PO Order No */}
            <div className="space-y-4">
              <label htmlFor="poOrderNo" className="w-32">
                PO Order No.:
              </label>
              <input
                id="poOrderNo"
                name="poOrderNo"
                type="text"
                value={formik.values.poOrderNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`flex-1 border p-2 ${
                  formik.errors.poOrderNo && formik.touched.poOrderNo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.poOrderNo && formik.touched.poOrderNo && (
                <div className="text-red-500 text-sm">
                  {formik.errors.poOrderNo}
                </div>
              )}
            </div>

            {/* PO Date */}
            <div className="space-y-4">
              <label htmlFor="poDate" className="w-32">
                PO Date:
              </label>
              <input
                id="poDate"
                name="poDate"
                type="date"
                value={formik.values.poDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border max-w-lg p-2 ${
                  formik.errors.poDate && formik.touched.poDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.poDate && formik.touched.poDate && (
                <div className="text-red-500 text-sm">
                  {formik.errors.poDate}
                </div>
              )}
            </div>
          </div>

          {/* Ship & Bill to Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Ship To Section */}
            <div className="space-y-4 text-base font-bold">
              <h2 className="font-semibold text-xl">Ship To</h2>
              <div className="space-y-3 pl-6">
                {/* Client Name */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Client Name:</label>
                  <input
                    id="clientName"
                    name="shipAndBillToAddress.clientName"
                    type="text"
                    value={formik.values.shipAndBillToAddress.clientName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.shipAndBillToAddress?.clientName &&
                      formik.touched.shipAndBillToAddress?.clientName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.shipAndBillToAddress?.clientName &&
                    formik.touched.shipAndBillToAddress?.clientName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.shipAndBillToAddress.clientName}
                      </div>
                    )}
                </div>

                {/* Address */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Address:</label>
                  <input
                    id="address"
                    name="shipAndBillToAddress.address"
                    type="text"
                    value={formik.values.shipAndBillToAddress.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.shipAndBillToAddress?.address &&
                      formik.touched.shipAndBillToAddress?.address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.shipAndBillToAddress?.address &&
                    formik.touched.shipAndBillToAddress?.address && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.shipAndBillToAddress.address}
                      </div>
                    )}
                </div>

                {/* City, State, Zip */}
                <div className="flex items-center gap-2">
                  <label className="w-32">City, State (zip code):</label>
                  <input
                    id="cityStateZip"
                    name="shipAndBillToAddress.cityStateZip"
                    type="text"
                    value={formik.values.shipAndBillToAddress.cityStateZip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.shipAndBillToAddress?.cityStateZip &&
                      formik.touched.shipAndBillToAddress?.cityStateZip
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.shipAndBillToAddress?.cityStateZip &&
                    formik.touched.shipAndBillToAddress?.cityStateZip && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.shipAndBillToAddress.cityStateZip}
                      </div>
                    )}
                </div>

                {/* Contact */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Contact:</label>
                  <input
                    id="contact"
                    name="shipAndBillToAddress.contact"
                    type="tel"
                    maxLength={10}
                    value={formik.values.shipAndBillToAddress.contact}
                    onChange={(e) => {
                      const { value } = e.target;
                      const numericValue = value
                        .replace(/[^0-9]/g, "") // Allow only numeric input
                        .slice(0, 10); // Limit the length to 10 digits
                      formik.setFieldValue(
                        "shipAndBillToAddress.contact",
                        numericValue
                      ); // Update Formik state with the numeric value
                    }}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.shipAndBillToAddress?.contact &&
                      formik.touched.shipAndBillToAddress?.contact
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.shipAndBillToAddress?.contact &&
                    formik.errors.shipAndBillToAddress?.contact && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.shipAndBillToAddress.contact}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-4 text-base font-bold">
              <h2 className="font-semibold text-xl">Bill To</h2>
              <div className="space-y-3 pr-6 text-right">
                {/* Vendor Name */}
                <div className="flex items-center gap-2">
                  <label className="w-32 text-right">Vendor Name:</label>
                  <input
                    id="vendorName"
                    name="purchaseForm.vendorName"
                    type="text"
                    value={formik.values.purchaseForm.vendorName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.purchaseForm?.vendorName &&
                      formik.touched.purchaseForm?.vendorName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.purchaseForm?.vendorName &&
                    formik.touched.purchaseForm?.vendorName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.purchaseForm.vendorName}
                      </div>
                    )}
                </div>

                {/* Address Line 1 */}
                <div className="flex items-center gap-2">
                  <label className="w-32 text-right">Address Line 1:</label>
                  <input
                    id="address1"
                    name="purchaseForm.address1"
                    type="text"
                    value={formik.values.purchaseForm.address1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.purchaseForm?.address1 &&
                      formik.touched.purchaseForm?.address1
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.purchaseForm?.address1 &&
                    formik.touched.purchaseForm?.address1 && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.purchaseForm.address1}
                      </div>
                    )}
                </div>

                {/* Address Line 2 */}
                <div className="flex items-center gap-2">
                  <label className="w-32 text-right">Address Line 2:</label>
                  <input
                    id="address2"
                    name="purchaseForm.address2"
                    type="text"
                    value={formik.values.purchaseForm.address2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.purchaseForm?.address2 &&
                      formik.touched.purchaseForm?.address2
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.purchaseForm?.address2 &&
                    formik.touched.purchaseForm?.address2 && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.purchaseForm.address2}
                      </div>
                    )}
                </div>

                {/* City, State, Zip */}
                <div className="flex items-center gap-2">
                  <label className="w-32 text-right">
                    City, State (zip code):
                  </label>
                  <input
                    id="cityStateZip"
                    name="purchaseForm.cityStateZip"
                    type="text"
                    value={formik.values.purchaseForm.cityStateZip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.errors.purchaseForm?.cityStateZip &&
                      formik.touched.purchaseForm?.cityStateZip
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.purchaseForm?.cityStateZip &&
                    formik.touched.purchaseForm?.cityStateZip && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.purchaseForm.cityStateZip}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Item No</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Taxable Total Value</th>
                  <th className="border p-2">SGST Rate (%)</th>
                  <th className="border p-2">SGST Amt (Rs.)</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {formik.values.orderDetails.map((item, index) => (
                  <tr key={index}>
                    {/* Item No */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].itemNo`}
                        value={formik.values.orderDetails[index].itemNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full border p-1 ${
                          formik.errors.orderDetails?.[index]?.itemNo &&
                          formik.touched.orderDetails?.[index]?.itemNo
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.errors.orderDetails?.[index]?.itemNo &&
                        formik.touched.orderDetails?.[index]?.itemNo && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.orderDetails[index].itemNo}
                          </div>
                        )}
                    </td>

                    {/* Quantity */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].quantity`}
                        type="number"
                        value={formik.values.orderDetails[index].quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10) || 0;

                          // Prevent value from going below 1
                          const adjustedValue = value < 1 ? 1 : value;

                          const unitPrice =
                            formik.values.orderDetails[index].unitPrice;
                          const taxableTotalValue = calculateTaxableTotal(
                            adjustedValue,
                            unitPrice
                          );
                          const sgstRate =
                            formik.values.orderDetails[index].sgstRate;
                          const sgstAmount = calculateSGSTAmount(
                            taxableTotalValue,
                            sgstRate
                          );
                          const total = calculateTotal(
                            taxableTotalValue,
                            sgstAmount
                          );

                          formik.setFieldValue(
                            `orderDetails[${index}].quantity`,
                            adjustedValue
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].taxableTotalValue`,
                            taxableTotalValue
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].sgstAmount`,
                            sgstAmount
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].total`,
                            total
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className={`w-full border p-1 ${
                          formik.errors.orderDetails?.[index]?.quantity &&
                          formik.touched.orderDetails?.[index]?.quantity
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.errors.orderDetails?.[index]?.quantity &&
                        formik.touched.orderDetails?.[index]?.quantity && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.orderDetails[index].quantity}
                          </div>
                        )}
                    </td>

                    {/* Unit Price */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].unitPrice`}
                        type="number"
                        value={formik.values.orderDetails[index].unitPrice}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10) || 0;

                          // Prevent value from going below 1
                          const adjustedValue = value < 1 ? 1 : value;

                          const quantity =
                            formik.values.orderDetails[index].quantity;
                          const taxableTotalValue = calculateTaxableTotal(
                            quantity,
                            adjustedValue
                          );
                          const sgstRate =
                            formik.values.orderDetails[index].sgstRate;
                          const sgstAmount = calculateSGSTAmount(
                            taxableTotalValue,
                            sgstRate
                          );
                          const total = calculateTotal(
                            taxableTotalValue,
                            sgstAmount
                          );

                          formik.setFieldValue(
                            `orderDetails[${index}].unitPrice`,
                            adjustedValue
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].taxableTotalValue`,
                            taxableTotalValue
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].sgstAmount`,
                            sgstAmount
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].total`,
                            total
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full border p-1"
                      />
                    </td>

                    {/* Taxable Total */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].taxableTotalValue`}
                        type="number"
                        value={
                          formik.values.orderDetails[index].taxableTotalValue
                        }
                        disabled
                        className="w-full border p-1 bg-gray-100"
                      />
                    </td>

                    {/* SGST Rate */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].sgstRate`}
                        type="number"
                        value={formik.values.orderDetails[index].sgstRate}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Prevent negative values and cap SGST Rate at 100
                          const validValue =
                            value < 0 ? 0 : value > 100 ? 100 : value;

                          const taxableTotalValue =
                            formik.values.orderDetails[index].taxableTotalValue;
                          const sgstAmount = calculateSGSTAmount(
                            taxableTotalValue,
                            validValue
                          );
                          const total = calculateTotal(
                            taxableTotalValue,
                            sgstAmount
                          );

                          formik.setFieldValue(
                            `orderDetails[${index}].sgstRate`,
                            validValue
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].sgstAmount`,
                            sgstAmount
                          );
                          formik.setFieldValue(
                            `orderDetails[${index}].total`,
                            total
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full border p-1"
                      />
                    </td>

                    {/* SGST Amount */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].sgstAmount`}
                        type="number"
                        value={formik.values.orderDetails[index].sgstAmount}
                        disabled
                        className="w-full border p-1 bg-gray-100"
                      />
                    </td>

                    {/* Total */}
                    <td className="border p-2">
                      <input
                        name={`orderDetails[${index}].total`}
                        type="number"
                        value={formik.values.orderDetails[index].total}
                        disabled
                        className="w-full border p-1 bg-gray-100"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add New Line */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("orderDetails", [
                    ...formik.values.orderDetails,
                    {
                      itemNo: "",
                      quantity: "",
                      unitPrice: "",
                      taxableTotalValue: 0,
                      sgstRate: 0,
                      sgstAmount: 0,
                      total: 0,
                    },
                  ])
                }
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
              >
                <IoMdAdd className="mr-2" /> Add New Line
              </button>
            </div>
          </div>

          {/* Terms & Conditions and Summary Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Terms & Conditions */}
            <div>
              <div className="p-4 bg-gray-400">
                <h3 className="font-semibold mb-4">Terms & Conditions</h3>
                <div className="space-y-2">
                  <p>
                    1.{" "}
                    {formik.values.termsConditions?.warranty ||
                      purchaseOrderTerms?.expiryTerms}
                  </p>
                  <p>
                    2.{" "}
                    {formik.values.termsConditions?.deliveryTime ||
                      purchaseOrderTerms?.paymentTerms}
                  </p>
                  <p>
                    3.{" "}
                    {formik.values.termsConditions?.paymentTerms ||
                      purchaseOrderTerms?.deliveryTime}
                  </p>
                  <p>
                    4.{" "}
                    {formik.values.termsConditions?.paymentTerms ||
                      purchaseOrderTerms?.warranty}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div>
              <div className="p-4">
                <div className="space-y-3">
                  {(() => {
                    // Use useMemo to memoize calculations
                    const subtotal = useMemo(
                      () =>
                        formik.values.orderDetails.reduce(
                          (sum, item) =>
                            sum +
                            Number(item.unitPrice || 0) *
                              Number(item.quantity || 0),
                          0
                        ),
                      [formik.values.orderDetails]
                    );

                    const totalTax = useMemo(
                      () =>
                        formik.values.orderDetails.reduce((total, item) => {
                          const taxableTotalValue = Number(
                            item.taxableTotalValue || 0
                          );
                          return (
                            total +
                            (taxableTotalValue * Number(item.sgstRate || 0)) /
                              100
                          );
                        }, 0),
                      [formik.values.orderDetails]
                    );

                    const netAmount = useMemo(() => {
                      const shippingHandling = Number(
                        formik.values.shippingHandling || 0
                      );
                      return subtotal + totalTax + shippingHandling;
                    }, [subtotal, totalTax, formik.values.shippingHandling]);

                    // Use useEffect to set field values to prevent re-renders
                    useEffect(() => {
                      formik.setFieldValue("subTotal", subtotal);
                      formik.setFieldValue("taxes", totalTax);
                      formik.setFieldValue("netAmount", netAmount);
                    }, [subtotal, totalTax, netAmount]);

                    return (
                      <>
                        {/* Subtotal */}
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{subtotal.toFixed(2)}</span>
                        </div>

                        {/* Shipping & Handling Charges */}
                        <div className="flex justify-between">
                          <span>Shipping & Handling Charges:</span>
                          <input
                            name="shippingHandling"
                            type="number"
                            value={formik.values.shippingHandling || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="border p-1 w-20 text-right"
                          />
                        </div>

                        {/* Total Taxes */}
                        <div className="flex justify-between">
                          <span>Total Taxes:</span>
                          <span>{totalTax.toFixed(2)}</span>
                        </div>

                        {/* Net Amount */}
                        <div className="flex justify-between font-semibold">
                          <span>Net Amount:</span>
                          <span>{netAmount.toFixed(2)}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Authorize Signatory Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="space-y-4 text-base font-bold">
              <h2 className="font-semibold text-xl">
                Authorize Signatory and Date
              </h2>
              <div className="space-y-3 pl-6">
                {/* Name */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Name:</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                {/* Designation */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Designation:</label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.touched.designation && formik.errors.designation
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.designation && formik.errors.designation && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.designation}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Email:</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                {/* Contact */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Contact:</label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    maxLength="10"
                    value={formik.values.contact}
                    onChange={(e) => {
                      const { value } = e.target;
                      const numericValue = value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      formik.setFieldValue("contact", numericValue);
                    }}
                    onBlur={formik.handleBlur}
                    className={`flex-1 border p-2 max-w-[325px] h-8 ${
                      formik.touched.contact && formik.errors.contact
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.touched.contact && formik.errors.contact && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.contact}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-end justify-end space-x-2">
              <div className="flex items-center justify-end space-x-2 gap-8">
                <button
                  type="submit"
                  className="bg-[#56AAC5] text-white font-semibold py-2 px-8 rounded-md border border-[#BDC3C9] shadow-[1px_3px_4px_0px_#00000040]"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#56AAC5] text-white font-semibold py-2 px-8 rounded-md border border-[#BDC3C9] shadow-[1px_3px_4px_0px_#00000040]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProductDialog;

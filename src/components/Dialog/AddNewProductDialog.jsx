import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import useProductManagement from "../../hooks/product/useProductManagement";
import useTender from "../../hooks/tender/useTender";
import useClientManagement from "../../hooks/clientManagement/useClientManagement";
import useWarehouseManagement from "../../hooks/warehouseManagement/useWarehouseManagement";
import cardimg from "../../assets/images/cardimg.png";

const validationSchema = Yup.object().shape({
  srNo: Yup.string().required("srNo is required"),
  productName: Yup.string().required("productName is required"),
  model: Yup.string().required("model is required"),
  productType: Yup.string().required("productType is required"),
  skuCode: Yup.string()
    .matches(/^[A-Z0-9]{1,8}$/, "SKU Code must be a maximum of 8 characters")
    .required("SKU Code is required"),
  amcCmc: Yup.string().required("amcCmc is required"),
  companyName: Yup.string().required("companyName is required"),
  availableModelNos: Yup.string().required("availableModelNos is required"),
  proposedCompany: Yup.string().required("proposedCompany is required"),
  hsnOrSacCode: Yup.string()
    .matches(
      /^\d{1,8}$/,
      "HSN/SAC Code must be a numeric string with a maximum of 8 digits"
    )
    .required("HSN/SAC Code is required"),
  warranty: Yup.string()
    .matches(
      /^[^+\-*/%=]*$/,
      "Warranty cannot contain operators or special characters"
    )
    .required("Warranty is required"),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .test(
      "expiryDate-greater-than-endDate",
      "Expiry date must be after End date",
      function (value) {
        const { endDate } = this.parent; // Access sibling fields
        return value && endDate ? new Date(value) > new Date(endDate) : true;
      }
    )
    .test(
      "is-today-or-future",
      "Expiry date must be today or in the future",
      function (value) {
        if (!value) return true; // Skip validation if the field is empty (required handles this)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight
        const inputDate = new Date(value);
        return inputDate >= today; // Ensure expiryDate is today or in the future
      }
    ),
  startDate: Yup.date()
    .required("Start date is required")
    .test(
      "startDate-less-than-endDate",
      "Start date must be before End date",
      function (value) {
        const { endDate } = this.parent;
        return value && endDate ? new Date(value) < new Date(endDate) : true;
      }
    ),
  endDate: Yup.date().required("End date is required"),
  productDescription: Yup.string().required("productDescription is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be a whole number")
    .min(0, "Quantity must be at least 1"),
  companyPrice: Yup.number()
    .typeError("Company Price must be a number")
    .required("Company Price is required")
    .positive("Company Price must be positive"),
  gstRate: Yup.number()
    .typeError("gstRate must be a number")
    .required("gstRate is required"),
  amount: Yup.number()
    .typeError("amount must be a number")
    .required("amount is required"),
  // applicableTaxesAmount: Yup.number()
  //   .typeError("applicableTaxesAmount must be a number")
  //   .required("applicableTaxesAmount is required"),
  date: Yup.date()
    .required("Date is required")
    .test(
      "is-today-or-future",
      "Date must be today or in the future",
      function (value) {
        if (!value) return true; // Skip validation if the field is empty (required handles this)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for an accurate comparison
        const inputDate = new Date(value);
        return inputDate >= today; // Check if the input date is today or later
      }
    ),
  warehouse: Yup.string().required("warehouse is required"),
  subTotal: Yup.string().required("subTotal is required"),
  freight: Yup.string().required("freight is required"),
  netAmount: Yup.string().required("netAmount is required"),
  taxes: Yup.string().required("taxes is required"),
  approvedBy: Yup.string().required("approvedBy is required"),
  dimensions: Yup.string().required("dimensions is required"),
  materials: Yup.string().required("materials is required"),
  performance: Yup.string().required("performance is required"),
  technicalSpecification: Yup.string().required(
    "technicalSpecification is required"
  ),
  productImage: Yup.string().required("productImage is required"),
  productBrochure: Yup.string().required("productBrochure is required"),
  pptAvailable: Yup.string().required("pptAvailable is required"),
  coveringLetter: Yup.string().required("coveringLetter is required"),
  isoCertificate: Yup.string().required("isoCertificate is required"),
});

const AddNewProductDialog = ({ onClose }) => {
  const [filePreview, setFilePreview] = useState({});
  const {
    fetchSrNoProduct,
    createProduct,
    fetchProductTypes,
    fetchModelName,
    fetchProposedCompany,
    fetchAMCCMCList,
    srNoProduct,
    addProduct,
    productTypes,
    modelName,
    AMCCMCList,
    proposedCompany,
  } = useProductManagement();
  const { fetchStockName, stockName } = useTender();
  const { fetchAllWareHouses, allWareHouse } = useWarehouseManagement();
  const { fetchApplicableGst, applicableGst } = useClientManagement();

  useEffect(() => {
    fetchSrNoProduct();
    fetchProductTypes();
    fetchModelName();
    fetchStockName();
    fetchSrNoProduct();
    fetchProposedCompany();
    fetchAMCCMCList();
    fetchApplicableGst();
    fetchAllWareHouses();
  }, []);

  const formik = useFormik({
    initialValues: {
      srNo: srNoProduct?.srNo,
      date: "",
      productName: "",
      companyName: "",
      warehouse: "",
      model: "",
      availableModelNos: "",
      productType: "",
      proposedCompany: "",
      skuCode: "",
      hsnOrSacCode: "",
      amcCmc: "",
      warranty: "",
      expiryDate: "",
      startDate: "",
      endDate: "",
      productDescription: "",
      productImage: "",
      quantity: 0,
      companyPrice: 0,
      gstRate: "",
      applicableTaxesAmount: "",
      amount: "",
      productBrochure: "",
      pptAvailable: "",
      coveringLetter: "",
      isoCertificate: "",
      technicalSpecification: "",
      dimensions: "",
      materials: "",
      performance: "",
      subTotal: 0,
      freight: 0,
      taxes: 0,
      netAmount: 0,
      approvedBy: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        // Append form values
        Object.keys(values).forEach((key) => {
          const value = values[key];
          if (value instanceof File) {
            formData.append(key, value);
          } else if (Array.isArray(value)) {
            // Handle array values
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, value);
          }
        });

        console.log("FormData Entries:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        // Send FormData via API call
        await createProduct(formData);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      // console.log("values", values);
      // await createProduct(values);
    },
  });
  console.log("formik.values", formik.values);
  console.log("formik.error", formik.errors);

  const handleModelChange = (event) => {
    console.log("event.target.name :", event.target.name);
    const selectedValue = event.target.value;
    const selectedObject = modelName?.data?.find(
      (model) => model.modelNo === selectedValue
    );
    //setSelectedModelName(selectedObject?.modelName);
    //setSelectedModel(selectedObject?.modelNo);
    formik.setFieldValue("model", selectedObject?.modelName || "");
    formik.setFieldValue("availableModelNos", selectedObject?.modelNo || "");
  };

  const handleDocUploadChange = (event) => {
    const file = event.currentTarget.files[0];
    console.log("file :", file);
    if (file) {
      formik.setFieldValue(event.target.name, event.currentTarget.files[0]);
    }
    setFilePreview((prevfiles) => ({
      ...prevfiles,
      [event.target.name]: URL.createObjectURL(file).toString(),
    }));
    console.log("filePreview", filePreview);
  };

  const calculateAfterTaxAmount = () => {
    const taxesAmount =
      (formik.values.quantity *
        formik.values.companyPrice *
        formik.values.gstRate) /
      100;
    formik.values.applicableTaxesAmount = taxesAmount;
    return taxesAmount;
  };

  const calculateAmount = () => {
    const amount =
      formik.values.quantity * formik.values.companyPrice +
      (formik.values.quantity *
        formik.values.companyPrice *
        formik.values.gstRate) /
        100;

    formik.values.amount = amount;
    return amount;
  };

  const calculateSubTotal = () => {
    const amount =
      formik.values.quantity * formik.values.companyPrice +
      (formik.values.quantity *
        formik.values.companyPrice *
        formik.values.gstRate) /
        100;
    formik.values.subTotal = amount;
    return amount;
  };

  const calculateNetAmount = () => {
    const netAmount =
      formik.values.subTotal +
      formik.values.freight +
      (formik.values.subTotal * formik.values.taxes) / 100;
    formik.values.netAmount = netAmount;
    return netAmount;
  };

  const [dates, setDates] = useState({
    date: formik.values.date,
    startDate: formik.values.startDate,
    endDate: formik.values.endDate,
    expiryDate: formik.values.expiryDate,
  });

  // Sync Formik values with state
  useEffect(() => {
    setDates({
      date: formik.values.date,
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
      expiryDate: formik.values.expiryDate,
    });
  }, [formik.values]);

  const handleDateChange = (fieldName) => (event) => {
    let value = event.target.value;

    // Split the date into parts
    const dateParts = value.split("-");

    // Check if the year part exists and is more than 4 digits
    if (dateParts[0] && dateParts[0].length > 4) {
      // Truncate the year to 4 digit
      dateParts[0] = dateParts[0].slice(0, 4);
      value = dateParts.join("-");
    }

    // Additional check to ensure year is not greater than 9999
    if (dateParts[0] && Number(dateParts[0]) > 9999) {
      return;
    }

    setDates((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    formik.setFieldValue(fieldName, value);
  };

  return (
    <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className=" bg-white rounded-2xl shadow-md w-[1000px]">
        <div
          className="w-full flex rounded-t-2xl items-center justify-between h-[60px]"
          style={{
            backgroundImage: `url(${cardimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-[#000000] ml-10 text-opacity-22 text-2xl font-semibold">
            Add New Product
          </h1>

          <button onClick={onClose}>
            <IoMdClose size={32} className="cursor-pointer mr-8" />
          </button>
        </div>

        <div className="h-[500px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Sr No. : </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="srNo"
                  value={srNoProduct?.srNo}
                  disabled
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Date:</label>
                <input
                  type="date"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="date"
                  value={dates.date}
                  onChange={handleDateChange("date")}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="text-xs text-red-500">
                    {formik.errors.date}
                  </div>
                )}
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Product Name : </label>{" "}
                <select
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                >
                  <option>Product Name</option>
                  {stockName?.products?.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Company Name : </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">WareHouse : </label>{" "}
                <select
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="warehouse"
                  value={formik.values.warehouse}
                  onChange={formik.handleChange}
                >
                  <option value="">Select WareHouse</option>
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
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Model : </label>{" "}
                <select
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="model"
                  value={formik.values.model}
                  onChange={handleModelChange}
                >
                  <option value="" disabled>
                    Select Model
                  </option>
                  {modelName?.data?.map((model, index) => (
                    <option key={index} value={model?.modelNo}>
                      {model?.modelName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Available Model Nos : </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="availableModelNos"
                  value={formik.values.availableModelNos}
                  readOnly
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Product Type : </label>{" "}
                <select
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="productType"
                  value={formik.values.productType}
                  onChange={formik.handleChange}
                >
                  <option>Select Product Type </option>
                  {productTypes?.productTypes?.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Proposed Company : </label>{" "}
                <select
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="proposedCompany"
                  value={formik.values.proposedCompany}
                  onChange={formik.handleChange}
                >
                  <option>Select Proposed Company</option>
                  {proposedCompany?.proposedCompanies?.map((company, index) => (
                    <option key={index} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">SKU Code : </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="skuCode"
                  maxLength={8}
                  value={formik.values.skuCode}
                  onChange={(e) => {
                    const uppercasedValue = e.target.value.toUpperCase(); // Ensure all characters are uppercase
                    formik.setFieldValue("skuCode", uppercasedValue);
                  }}
                />
                {formik.touched.skuCode && formik.errors.skuCode && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.skuCode}
                  </p>
                )}
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="hsnOrSacCode">HSN/SAC Code : </label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="hsnOrSacCode"
                  maxLength={8} // Restrict the input to a max of 8 characters
                  value={formik.values.hsnOrSacCode}
                  onChange={(e) => {
                    // Allow only numeric input
                    if (/^\d{0,8}$/.test(e.target.value)) {
                      formik.handleChange(e);
                    }
                  }}
                />
                {formik.touched.hsnOrSacCode && formik.errors.hsnOrSacCode && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.hsnOrSacCode}
                  </p>
                )}
              </div>

              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">AMC/CMC : </label>{" "}
                <select
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="amcCmc"
                  value={formik.values.amcCmc}
                  onChange={formik.handleChange}
                >
                  <option>Select AMC/CMC</option>
                  {AMCCMCList?.AMCCMCList?.map((list, index) => (
                    <option key={index} value={list}>
                      {list}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="">Warranty :</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name="warranty"
                  value={formik.values.warranty}
                  onChange={(e) => {
                    // Allow only valid characters (letters, digits, spaces, etc.)
                    const filteredValue = e.target.value.replace(
                      /[+\-*/%=!@#$^&)}{[(]/g,
                      ""
                    );
                    formik.setFieldValue("warranty", filteredValue);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.warranty && formik.errors.warranty && (
                  <div className="text-xs text-red-500">
                    {formik.errors.warranty}
                  </div>
                )}
              </div>

              <div className="col-span-1 flex flex-col items-center w-full">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                  type="date"
                  className={`border ${
                    formik.touched.expiryDate && formik.errors.expiryDate
                      ? "border-red-500"
                      : "border-gray-400"
                  } rounded-full w-[65%] h-[35px] px-2`}
                  name="expiryDate"
                  value={dates.expiryDate}
                  onChange={handleDateChange("expiryDate")}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <div className="text-xs text-red-500">
                    {formik.errors.expiryDate}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-1 grid grid-cols-2 justify-center ">
                <div className="col-span-1 flex flex-col items-center w-full">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    className={`border ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-full w-[80%] h-[35px] px-2`}
                    name="startDate"
                    value={dates.startDate}
                    onChange={handleDateChange("startDate")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.startDate}
                    </p>
                  )}
                </div>

                <div className="col-span-1 flex flex-col items-center w-full">
                  <label htmlFor="">End Date</label>
                  <input
                    type="date"
                    className={`border ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-full w-[80%] h-[35px] px-2`}
                    name="endDate"
                    value={dates.endDate}
                    onChange={handleDateChange("endDate")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 flex flex-col items-start w-full">
                <label htmlFor="">Product Description :</label>{" "}
                <textarea
                  type="text"
                  className="border border-gray-400 rounded-md w-full h-[120px] px-2"
                  placeholder="Write Here ..."
                  name="productDescription"
                  value={formik.values.productDescription}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-2 flex flex-col items-start w-full h-full">
                <label htmlFor="">Product Image : </label>{" "}
                <div className="w-full h-full flex flex-col justify-center gap-3">
                  <input
                    id="productImage"
                    type="file"
                    className="border border-gray-400 rounded-md w-full h-[120px] px-2 hidden"
                    placeholder="Write Here ..."
                    name="productImage"
                    // value={formik.values.productImage}
                    // onChange={formik.handleChange}
                    onChange={(e) => handleDocUploadChange(e)}
                  />
                  <label
                    htmlFor="productImage"
                    className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                  >
                    Choose File
                  </label>
                  <p className="text-[#818181] text-xs">Max File size : 5 MB</p>
                  <p className="text-[#818181] text-xs">
                    Allowed File : jpeg, doc, docx, csv, pdf
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-col px-4 gap-4 py-2">
              <label htmlFor="" className="text-[19px] py-6">
                Product & Pricing :
              </label>
              <div className="grid grid-cols-3">
                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  <label htmlFor="">Quantity :</label>
                  <input
                    type="number"
                    className={`border border-gray-400 rounded-full w-[80%] h-[35px] px-2 ${
                      formik.errors.quantity && formik.touched.quantity
                        ? "border-red-500"
                        : ""
                    }`}
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10) || 0;
                      const adjustedValue = value < 0 ? 0 : value;

                      // Update the formik field value
                      formik.setFieldValue("quantity", adjustedValue);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.quantity && formik.touched.quantity && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.quantity}
                    </div>
                  )}
                </div>

                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  <label htmlFor="">Company Price :</label>
                  <input
                    type="number"
                    className={`border border-gray-400 rounded-full w-[80%] h-[35px] px-2 ${
                      formik.errors.companyPrice && formik.touched.companyPrice
                        ? "border-red-500"
                        : ""
                    }`}
                    name="companyPrice"
                    value={formik.values.companyPrice}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;

                      // Prevent the value from going below 1
                      const adjustedValue = value < 1 ? 1 : value;

                      // Update the formik field value
                      formik.setFieldValue("companyPrice", adjustedValue);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.companyPrice &&
                    formik.touched.companyPrice && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.companyPrice}
                      </div>
                    )}
                </div>

                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  <label htmlFor="">Aplicable GST :</label>{" "}
                  <select
                    className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                    name="gstRate"
                    value={formik.values.gstRate}
                    onChange={formik.handleChange}
                  >
                    <option>Aplicable GST </option>
                    {applicableGst?.applicableGst?.map((gst, index) => (
                      <option key={index} value={gst}>
                        {gst}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex-col px-4 gap-4">
              <label htmlFor="" className="text-[19px] py-6">
                Documentation :
              </label>
              <div className="grid grid-cols-4">
                <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                  <label htmlFor="">Product Brochure : </label>{" "}
                  <div className="w-full h-full flex flex-col justify-center gap-3">
                    <input
                      id="productBrochure"
                      type="file"
                      className="border border-gray-400 rounded-md w-full h-[120px] px-2 hidden"
                      placeholder="Write Here ..."
                      name="productBrochure"
                      onChange={(e) => handleDocUploadChange(e)}
                    />
                    <label
                      htmlFor="productBrochure"
                      className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                    >
                      Choose File
                    </label>
                    <div className="flex justify-between pr-6">
                      <p className="text-[#818181] text-xs">
                        {" "}
                        Max File size : 5 MB
                      </p>
                      {filePreview["productBrochure"] && (
                        <img
                          src={filePreview["productBrochure"]}
                          alt="File Preview"
                          className="max-h-[40px] w-[40px] object-contain"
                        />
                      )}
                    </div>
                    <p className="text-[#818181] text-xs">
                      Allowed File : jpeg, doc, docx, csv, pdf
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                  <label htmlFor="">PPT available : </label>{" "}
                  <div className="w-full h-full flex flex-col justify-center gap-3">
                    <input
                      id="pptAvailable"
                      type="file"
                      className="border border-gray-400 rounded-md w-full h-[120px] px-2 hidden"
                      placeholder="Write Here ..."
                      name="pptAvailable"
                      onChange={(e) => handleDocUploadChange(e)}
                    />
                    <label
                      htmlFor="pptAvailable"
                      className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                    >
                      Choose File
                    </label>
                    <div className="flex justify-between pr-6">
                      <p className="text-[#818181] text-xs">
                        {" "}
                        Max File size : 5 MB
                      </p>
                      {filePreview["pptAvailable"] && (
                        <img
                          src={filePreview["pptAvailable"]}
                          alt="File Preview"
                          className="max-h-[40px] w-[40px] object-contain"
                        />
                      )}
                    </div>
                    <p className="text-[#818181] text-xs">
                      Allowed File : jpeg, doc, docx, csv, pdf
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                  <label htmlFor="">Covering Letter : </label>{" "}
                  <div className="w-full h-full flex flex-col justify-center gap-3">
                    <input
                      id="coveringLetter"
                      type="file"
                      className="border border-gray-400 rounded-md w-full h-[120px] px-2 hidden"
                      placeholder="Write Here ..."
                      name="coveringLetter"
                      onChange={(e) => handleDocUploadChange(e)}
                    />
                    <label
                      htmlFor="coveringLetter"
                      className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                    >
                      Choose File
                    </label>
                    <div className="flex justify-between pr-6">
                      <p className="text-[#818181] text-xs">
                        {" "}
                        Max File size : 5 MB
                      </p>
                      {filePreview["coveringLetter"] && (
                        <img
                          src={filePreview["coveringLetter"]}
                          alt="File Preview"
                          className="max-h-[40px] w-[40px] object-contain"
                        />
                      )}
                    </div>
                    <p className="text-[#818181] text-xs">
                      Allowed File : jpeg, doc, docx, csv, pdf
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                  <label htmlFor="">ISO Certificate : </label>{" "}
                  <div className="w-full h-full flex flex-col justify-center gap-3">
                    <input
                      id="isoCertificate"
                      type="file"
                      className="border border-gray-400 rounded-md w-full h-[120px] px-2 hidden"
                      placeholder="Write Here ..."
                      name="isoCertificate"
                      onChange={(e) => handleDocUploadChange(e)}
                    />
                    <label
                      htmlFor="isoCertificate"
                      className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                    >
                      Choose File
                    </label>
                    <div className="flex justify-between pr-6">
                      <p className="text-[#818181] text-xs">
                        {" "}
                        Max File size : 5 MB
                      </p>
                      {filePreview["isoCertificate"] && (
                        <img
                          src={filePreview["isoCertificate"]}
                          alt="File Preview"
                          className="max-h-[40px] w-[40px] object-contain"
                        />
                      )}
                    </div>
                    <p className="text-[#818181] text-xs">
                      Allowed File : jpeg, doc, docx, csv, pdf
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 py-3">
              <div className="col-span-3 flex flex-col items-start w-full gap-4">
                <label htmlFor="" className="text-[19px]">
                  Technical Specification :
                </label>{" "}
                <textarea
                  type="text"
                  className="border border-gray-400 rounded-md w-full h-[100px] px-2"
                  placeholder="Write Here ..."
                  // name="technicalSpecification"
                  // value={formik.values.technicalSpecification}
                  // onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-2 flex flex-col items-start w-full h-full">
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <input
                    id="technicalSpecificationImage"
                    type="file"
                    placeholder="Write Here ..."
                    className="hidden"
                    name="technicalSpecification"
                    value={formik.values.technicalSpecification}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="technicalSpecificationImage"
                    className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[120px] flex justify-center items-center"
                  >
                    Upload
                  </label>
                  <span>{formik.values.technicalSpecification}</span>
                </div>
              </div>
            </div>
            <div className="flex-col px-4 gap-4 py-2">
              <div className="grid grid-cols-3">
                <div className="col-span-1 flex flex-col items-start w-full  gap-[4px]">
                  <label htmlFor="">Dimension :</label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[80%] h-[35px] px-2"
                    name="dimensions"
                    value={formik.values.dimensions}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  <label htmlFor="">Materials :</label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[80%] h-[35px] px-2"
                    name="materials"
                    value={formik.values.materials}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  <label htmlFor="">Performance :</label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[80%] h-[35px] px-2"
                    name="performance"
                    value={formik.values.performance}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4">
              <label htmlFor="">Cost Estimation</label>
              <div className="w-full grid grid-cols-4 border rounded-xl">
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4">Quantity</h3>
                  </div>

                  <div className="h-[100px] flex justify-center items-center">
                    {formik.values.quantity}
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4">MRP</h3>
                  </div>
                  <div className="h-[100px] flex justify-center items-center">
                    {formik.values.companyPrice}
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px] w-full flex flex-col items-center">
                    <h3 className="pt-2">Aplicable Taxes</h3>
                    <div className="w-full grid grid-cols-2">
                      <p className="col-span-1 flex justify-center items-center w-full">
                        Rate %
                      </p>
                      <p className="col-span-1 flex justify-center items-center w-full">
                        Amt (Rs)
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <div className="h-[100px] col-span-1 flex justify-center items-center">
                      <input
                        type="number"
                        name="gstRate"
                        value={formik.values.gstRate}
                        id=""
                        className="w-[60px] border border-gray-400"
                      />
                    </div>

                    <div className="h-[100px] col-span-1 flex justify-center items-center">
                      {calculateAfterTaxAmount()}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4">Amount</h3>
                  </div>
                  <div className="h-[100px] flex justify-center items-center">
                    {calculateAmount()}
                    {/* {formik.values.subTotal} */}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 py-[30px]">
              <div className="flex flex-col">
                <div className="py-3">
                  <h2 className="font-bold text-[18px]">Approved By</h2>
                </div>
                <input
                  type="text"
                  placeholder="Enter Name..."
                  className="px-2 border border-gray-400 w-[70%] rounded-md py-1"
                  name="approvedBy"
                  value={formik.values.approvedBy}
                  onChange={formik.handleChange}
                />
                <h2 className="font-medium">Purchase Manager Uni Sol</h2>
              </div>
              <div className="flex flex-col gap-1 w-[70%]">
                <div className="flex justify-between gap-4">
                  <h2 className="py-2">Subtotal</h2>
                  <h2 className="py-2">{calculateSubTotal()}</h2>
                </div>
                <div className="flex justify-between gap-4">
                  <h2>Freight</h2>
                  <input
                    type="number"
                    name="freight"
                    value={formik.values.freight}
                    onChange={formik.handleChange}
                    className="w-[60px] border border-gray-400 rounded-md"
                  ></input>
                </div>
                <div className="flex justify-between gap-4">
                  <h2>Taxes</h2>{" "}
                  <input
                    type="number"
                    name="taxes"
                    value={formik.values.taxes}
                    onChange={formik.handleChange}
                    className="w-[60px] border border-gray-400 rounded-md"
                  ></input>
                </div>
                <div className="flex justify-between gap-4">
                  <h2 className="font-bold text-[20px]">NetAmount</h2>
                  <h2 className="font-bold text-[20px]">
                    {calculateNetAmount()}
                  </h2>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end items-center gap-4 py-4 px-[100px]">
              <button
                type="submit"
                className="border border-white text-white bg-[#56AAC5]  px-4 py-2 rounded-md shadow-md hover w-[120px] hover:bg-[#36a4c9]"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#f14138a4] border border-white text-white px-4 py-2 rounded-md shadow-md hover w-[120px]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductDialog;

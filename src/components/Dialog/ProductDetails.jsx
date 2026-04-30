import { useState, useEffect } from "react";
import { IoMdClose, IoMdDownload } from "react-icons/io";
import { Edit } from "lucide-react";
import { useFormik } from "formik";
import PASTEL from "../../assets/images/newWarehouse-pastel.png";
import * as Yup from "yup";
import useProductManagement from "../../hooks/product/useProductManagement";
import { toast } from "react-toastify";
import conf from "../../config/index";
import { useNavigate } from "react-router-dom";
import useClientManagement from "../../hooks/clientManagement/useClientManagement";

const validationSchema = Yup.object().shape({
  srNo: Yup.string().optional(),
  productName: Yup.string().optional(),
  model: Yup.string().required("model is required"),
  productType: Yup.string().optional(),
  skuCode: Yup.string()
    .matches(/^[A-Z0-9]{1,8}$/, "SKU Code must be a maximum of 8 characters")
    .required("SKU Code is required"),
  availableModelNos: Yup.string().required("availableModelNos is required"),
  hsnOrSacCode: Yup.string()
    .matches(
      /^\d{1,8}$/,
      "HSN/SAC Code must be a numeric string with a maximum of 8 digits"
    )
    .required("HSN/SAC Code is required"),
  warranty: Yup.string().optional(),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .test(
      "expiryDate-greater-than-endDate",
      "Expiry date must be after End date",
      function (value) {
        const { endDate } = this.parent;
        return value && endDate ? new Date(value) > new Date(endDate) : true;
      }
    )
    .test(
      "is-today-or-future",
      "Expiry date must be today or in the future",
      function (value) {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
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
  productDescription: Yup.string().optional(),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be a whole number")
    .min(0, "Quantity must be at least 1"),
  companyPrice: Yup.number()
    .typeError("Company Price must be a number")
    .required("Company Price is required")
    .positive("Company Price must be positive"),
  productImage: Yup.mixed()
    /*.test("fileSize", "File too large", (value) => {
      if (!value) return true; // Skip if no file
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    })*/
    .test("fileType", "Unsupported file type", (value) => {
      if (!value) return true; // Skip if no file
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    }),
  productBrochure: Yup.mixed().optional(),
  pptAvailable: Yup.mixed().optional(),
  coveringLetter: Yup.mixed().optional(),
  isoCertificate: Yup.mixed().optional(),
  amount: Yup.number().optional(),
  freight: Yup.number().optional(),
  taxes: Yup.number().optional(),
  netAmount: Yup.number().optional(),
  approvedBy: Yup.string().optional(),
  dimensions: Yup.string().optional(),
  materials: Yup.string().optional(),
  performance: Yup.string().optional(),
  technicalSpecification: Yup.string().optional(),
  gstRate: Yup.number()
    .typeError("gstRate must be a number")
    .required("gstRate is required"),
});

function ProductDetails({ data, openViewDetails, onClose, selectedId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { updatedProductDetails, updateProductdetail } = useProductManagement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchApplicableGst, applicableGst } = useClientManagement();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchSrNoProduct();
    fetchProductTypes();
    fetchModelName();
    fetchProposedCompany();
    fetchAMCCMCList();
    fetchApplicableGst();
  }, []);

  if (!openViewDetails) return null;
  const formik = useFormik({
    initialValues: {
      srNo: data?.srNo || "",
      productName: data?.productName || "",
      model: data?.model || "",
      productType: data?.productType || "",
      skuCode: data?.skuCode || "",
      availableModelNos: data?.availableModelNos || "",
      hsnOrSacCode: data?.hsnOrSacCode || "",
      warranty: data?.warranty || "",
      expiryDate: data?.expiryDate
        ? new Date(data.expiryDate).toISOString().split("T")[0]
        : "",
      startDate: data?.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : "",
      endDate: data?.endDate
        ? new Date(data.endDate).toISOString().split("T")[0]
        : "",
      productDescription: data?.productDescription || "",
      quantity: data?.quantity || "",
      companyPrice: data?.companyPrice ? Number(data.companyPrice) : "",
      productImage: data?.productImage
        ? typeof data.productImage === "string"
          ? data.productImage
          : null
        : null,
      gstRate: data?.gstRate || "",
      applicableTaxesAmount: "",
      productBrochure: data?.productBrochure || null,
      pptAvailable: data?.pptAvailable || null,
      coveringLetter: data?.coveringLetter || null,
      isoCertificate: data?.isoCertificate || null,
      amount: data?.amount || calculateAmount(),
      freight: data?.freight || "",
      taxes: data?.taxes || "",
      netAmount: data?.netAmount || "",
      approvedBy: data?.approvedBy || "",
      dimensions: data?.dimensions || "",
      materials: data?.materials || "",
      performance: data?.performance || "",
      technicalSpecification: data?.technicalSpecification || "",
    },
    validationSchema: validationSchema,
  });

  const handleCloseModal = () => {
    onClose(); // This will close the modal
    // Optional: navigate if you want to go back to products page
    navigate("/product");
  };

  const handleModelChange = (event) => {
    const selectedModelNo = event.target.value;

    const selectedModel = modelName?.data?.find(
      (model) => model.modelNo === selectedModelNo
    );

    if (selectedModel) {
      console.log("Selected Model:", selectedModel); // Debug: Check the object

      formik.setFieldValue("model", selectedModel?.modelName || ""); // Set modelName
      formik.setFieldValue("availableModelNos", selectedModel?.modelNo || ""); // Set modelNo
    }
  };

  const handlEdit = async () => {
    try {
      // Ensure all calculations are up-to-date
      const calculatedAmount = calculateAmount();
      const subTotal = calculateSubTotal();
      const netAmount = calculateNetAmount();
      const applicableTaxesAmount = calculateAfterTaxAmount();

      // Construct payload explicitly to ensure accuracy
      const payload = {
        // Numeric fields
        companyPrice: Number(formik.values.companyPrice),
        availableModelNos: Number(formik.values.availableModelNos),
        quantity: Number(formik.values.quantity),
        gstRate: Number(formik.values.gstRate),

        // Financial fields
        amount: calculatedAmount, // Explicitly calculated
        applicableTaxesAmount,
        subTotal,
        freight: Number(formik.values.freight),
        taxes: Number(formik.values.taxes),
        netAmount,

        // String fields
        productName: formik.values.productName,
        materials: formik.values.materials,
        performance: formik.values.performance,
        productDescription: formik.values.productDescription,
        productType: formik.values.productType,
        model: formik.values.model,
        warranty: formik.values.warranty,
        skuCode: formik.values.skuCode,
        hsnOrSacCode: formik.values.hsnOrSacCode,
        expiryDate: formik.values.expiryDate,
        productImage: formik.values.productImage,
        dimensions: formik.values.dimensions,
        technicalSpecification: formik.values.technicalSpecification,
        startDate: formik.values.startDate,
        endDate: formik.values.endDate,
      };

      // Log the payload for debugging
      console.log("Payload to API:", payload);

      // Update API call
      const updatedProduct = await updatedProductDetails(data._id, payload);
      console.log("API Response:", updatedProduct);

      if (updatedProduct) {
        console.log("Updated Product Details:", updatedProduct);
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update product");
    }
  };

  useEffect(() => {
    const amount = calculateAmount();
    formik.setFieldValue("amount", amount);
  }, [
    formik.values.quantity,
    formik.values.companyPrice,
    formik.values.gstRate,
  ]);

  console.log("Updated Product Details", updateProductdetail);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Set the file in Formik
      formik.setFieldValue("productImage", file);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const renderPreview = (file) => {
    if (!file) return null;

    // If it's a string (existing image path)
    if (typeof file === "string") {
      // Ensure full URL is constructed
      return file.startsWith("http") ? file : `${conf.apiBaseUrl}${file}`;
    }

    // If it's a new File object
    return URL.createObjectURL(file);
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
    // Ensure all values are numbers
    const quantity = Number(formik.values.quantity);
    const companyPrice = Number(formik.values.companyPrice);
    const gstRate = Number(formik.values.gstRate);

    // Calculate amount with explicit rounding to avoid floating-point issues
    const amount =
      Math.round(quantity * companyPrice * (1 + gstRate / 100) * 100) / 100;

    // Set the field value immediately
    formik.setFieldValue("amount", amount);

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
    startDate: formik.values.startDate,
    endDate: formik.values.endDate,
    expiryDate: formik.values.expiryDate,
  });

  // Sync Formik values with local state
  useEffect(() => {
    setDates({
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
      expiryDate: formik.values.expiryDate,
    });
  }, [formik.values]);

  // Handle Date Change with Validation
  const handleDateChange = (fieldName) => (event) => {
    let value = event.target.value;

    // Split the date into parts
    const dateParts = value.split("-");

    // Ensure the year is 4 digits and not more than 9999
    if (dateParts[0] && dateParts[0].length > 4) {
      dateParts[0] = dateParts[0].slice(0, 4); // Truncate the year
      value = dateParts.join("-");
    }
    if (dateParts[0] && Number(dateParts[0]) > 9999) {
      return; // Prevent invalid years
    }

    setDates((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    formik.setFieldValue(fieldName, value);
  };

  return (
    <>
      <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
        <div className=" bg-white rounded-2xl shadow-md w-[1000px]">
          <div
            style={{ backgroundImage: `url(${PASTEL})` }}
            className="w-full flex rounded-t-2xl items-center justify-between h-[60px] "
          >
            <h1 className="text-[#000000] ml-[45%] text-opacity-22 text-2xl  font-semibold">
              {isEditing ? "Update Product" : "Products Details"}
            </h1>

            <button onClick={onClose}>
              <IoMdClose size={32} className="cursor-pointer mr-8" />
            </button>
          </div>
          <div className="h-[500px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* left  */}
              <div className="space-y-4">
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">SR No :</b>
                  ) : (
                    <label htmlFor="">SR No : </label>
                  )}
                  <input
                    type="number"
                    // className={`px-4 ml-2 border-b-2 ${
                    //   isEditing ? "border-black" : "border-gray-400"
                    // }  mr-32`}
                    className={`px-4 ml-2 border-b-2 ${
                      isEditing ? "border-black" : "border-gray-400"
                    } mr-32 text-black`}
                    name="srNo"
                    value={formik.values.srNo}
                    onChange={formik.handleChange}
                    disabled
                  />
                </div>

                <div className="col-span-1 flex flex-col justify-between items-start w-full">
                  {isEditing ? (
                    <>
                      <b className="text-black">Product Image:</b>
                      <input
                        type="file"
                        className={`border mt-2 ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        } w-full`}
                        name="productImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={!isEditing}
                      />
                      {/* Preview of selected image */}
                      {formik.values.productImage && (
                        <img
                          src={renderPreview(formik.values.productImage)}
                          alt="Product Preview"
                          className="w-[181px] h-[154px] object-cover border rounded mt-2"
                        />
                      )}
                    </>
                  ) : (
                    <div className="mt-2">
                      <img
                        src={renderPreview(formik.values.productImage)}
                        alt="Product Preview"
                        className="w-[181px] h-[154px] object-cover border rounded"
                      />
                    </div>
                  )}
                </div>

                {/* <div className="col-span-1 flex justify-between items-center w-full">
                    <label htmlFor="">Product Image : </label>{" "}
                    <input
                      type="text"
                      className={border mt-24 ${
                        isEditing ? "border-black" : "border-gray-400"
                      } w-[181px] h-[154px] mr-32}
                      name="productImage"
                      value={formik.values.productImage}
                      onChange={formik.handleChange}
                      disabled={!isEditing}
                    />
                  </div> */}

                <div className="col-span-3 flex flex-col items-start w-full">
                  {isEditing ? (
                    <b className="text-black">Product Description:</b>
                  ) : (
                    <label htmlFor="">Product Description :</label>
                  )}
                  <textarea
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-md w-full h-[120px] px-2`}
                    placeholder="Write Here ..."
                    name="productDescription"
                    value={formik.values.productDescription}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex-col px-4 gap-4 py-2">
                  {isEditing ? (
                    <b className="text-black">Product & Pricing :</b>
                  ) : (
                    <label
                      htmlFor=""
                      className="text-[19px] py-6 flex align-middle"
                    >
                      Product & Pricing :
                    </label>
                  )}
                  <div className="grid grid-cols-3">
                    <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                      {isEditing ? (
                        <b className="text-black">Quantity :</b>
                      ) : (
                        <label htmlFor="">Quantity :</label>
                      )}
                      <input
                        type="number"
                        className={`border ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        } rounded-full w-[80%] h-[35px] px-2 ${
                          formik.errors.quantity && formik.touched.quantity
                            ? "border-red-500"
                            : ""
                        }`}
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10) || 0;
                          const adjustedValue = value < 0 ? 0 : value;

                          // Update formik state
                          formik.setFieldValue("quantity", adjustedValue);
                        }}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                      />
                      {formik.errors.quantity && formik.touched.quantity && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.quantity}
                        </div>
                      )}
                    </div>

                    <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                      {isEditing ? (
                        <b className="text-black">Company Price :</b>
                      ) : (
                        <label htmlFor="">Company Price :</label>
                      )}
                      <input
                        type="number"
                        className={`border ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        } rounded-full w-[80%] h-[35px] px-2 ${
                          formik.errors.companyPrice &&
                          formik.touched.companyPrice
                            ? "border-red-500"
                            : ""
                        }`}
                        name="companyPrice"
                        value={formik.values.companyPrice}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;

                          // Prevent value from going below 1
                          const adjustedValue = value < 1 ? 1 : value;

                          // Update formik state
                          formik.setFieldValue("companyPrice", adjustedValue);
                        }}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                      />
                      {formik.errors.companyPrice &&
                        formik.touched.companyPrice && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.companyPrice}
                          </div>
                        )}
                    </div>

                    <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                      {isEditing ? (
                        <b className="text-black">Applicable GST :</b>
                      ) : (
                        <label htmlFor="">Applicable GST :</label>
                      )}
                      {isEditing ? (
                        <select
                          className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                          name="gstRate"
                          value={formik.values.gstRate}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select GST</option>
                          {applicableGst?.applicableGst?.map((gst, index) => (
                            <option key={index} value={gst}>
                              {gst}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2 flex items-center">
                          {formik.values.gstRate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* right  */}
              <div className="space-y-4">
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">Product Name:</b>
                  ) : (
                    <label htmlFor="">Product Name:</label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2`}
                    name="productName"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </div>
                {/* Model */}
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">Model: </b>
                  ) : (
                    <label htmlFor="model">Model: </label>
                  )}
                  {isEditing ? (
                    <select
                      className="border border-black rounded-full w-[65%] h-[35px] px-2 text-black"
                      name="model"
                      value={formik.values.availableModelNos} // Bound to 'modelNo'
                      onChange={handleModelChange} // Update 'model' and 'availableModelNos'
                    >
                      <option value="" disabled>
                        Select Model
                      </option>
                      {modelName?.data?.map((model, index) => (
                        <option key={index} value={model?.modelNo}>
                          {" "}
                          {/* Use modelNo as value */}
                          {model?.modelName} {/* Display modelName */}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                      name="model"
                      value={formik.values.model}
                      disabled
                    />
                  )}
                </div>

                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <>
                      <b className="text-black">Product Type : </b>
                      <select
                        className="border border-black rounded-full w-[65%] h-[35px] px-2 text-black"
                        name="productType"
                        value={formik.values.productType}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          Select Product Type
                        </option>
                        {productTypes?.productTypes?.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label htmlFor="productType">Product Type : </label>
                      <input
                        type="text"
                        className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                        name="productType"
                        value={formik.values.productType}
                        disabled
                      />
                    </>
                  )}
                </div>

                {/* Available Model Nos */}
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">Available Model Nos: </b>
                  ) : (
                    <label htmlFor="availableModelNos">
                      Available Model Nos:{" "}
                    </label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2`}
                    name="availableModelNos"
                    value={formik.values.availableModelNos}
                    readOnly
                  />
                </div>

                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">SKU Code :</b>
                  ) : (
                    <label htmlFor="">SKU Code :</label>
                  )}
                  <input
                    type="text"
                    maxLength={8}
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2 ${
                      formik.touched.skuCode && formik.errors.skuCode
                        ? "border-red-500"
                        : ""
                    }`}
                    name="skuCode"
                    value={formik.values.skuCode}
                    onChange={(e) => {
                      const uppercasedValue = e.target.value.toUpperCase(); // Ensure all characters are uppercase
                      formik.setFieldValue("skuCode", uppercasedValue);
                    }}
                    disabled={!isEditing}
                  />
                  {formik.touched.skuCode && formik.errors.skuCode && (
                    <div className="text-xs text-red-500">
                      {formik.errors.skuCode}
                    </div>
                  )}
                </div>

                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">HSN/SAC code :</b>
                  ) : (
                    <label htmlFor="hsnOrSacCode">HSN/SAC code :</label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2 ${
                      formik.touched.hsnOrSacCode && formik.errors.hsnOrSacCode
                        ? "border-red-500"
                        : ""
                    }`}
                    name="hsnOrSacCode"
                    value={formik.values.hsnOrSacCode}
                    onChange={(e) => {
                      // Allow only numeric input and restrict to 8 digits
                      if (/^\d{0,8}$/.test(e.target.value)) {
                        formik.setFieldValue("hsnOrSacCode", e.target.value);
                      }
                    }}
                    disabled={!isEditing} // Only editable if isEditing is true
                  />
                  {formik.touched.hsnOrSacCode &&
                    formik.errors.hsnOrSacCode && (
                      <div className="text-xs text-red-500">
                        {formik.errors.hsnOrSacCode}
                      </div>
                    )}
                </div>

                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">AMC Valid From :</b>
                  ) : (
                    <label htmlFor="">AMC Valid From :</label>
                  )}
                  <input
                    type="date"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2 ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "border-red-500"
                        : ""
                    }`}
                    name="startDate"
                    value={dates.startDate}
                    onChange={handleDateChange("startDate")}
                    onBlur={formik.handleBlur}
                    disabled={!isEditing}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="text-xs text-red-500">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>

                {/* AMC Valid To */}
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">AMC Valid To :</b>
                  ) : (
                    <label htmlFor="">AMC Valid To :</label>
                  )}
                  <input
                    type="date"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2 ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "border-red-500"
                        : ""
                    }`}
                    name="endDate"
                    value={dates.endDate}
                    onChange={handleDateChange("endDate")}
                    onBlur={formik.handleBlur}
                    disabled={!isEditing}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="text-xs text-red-500">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">Warranty : </b>
                  ) : (
                    <label htmlFor="">Warranty : </label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2`}
                    name="warranty"
                    value={formik.values.warranty}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(
                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
                        ""
                      ); // Remove operators
                      formik.setFieldValue("warranty", sanitizedValue);
                    }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-span-1 flex justify-between items-center w-full">
                  {isEditing ? (
                    <b className="text-black">Expire Date :</b>
                  ) : (
                    <label htmlFor="">Expire Date :</label>
                  )}
                  <input
                    type="date"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } rounded-full w-[65%] h-[35px] px-2 ${
                      formik.touched.expiryDate && formik.errors.expiryDate
                        ? "border-red-500"
                        : ""
                    }`}
                    name="expiryDate"
                    value={dates.expiryDate}
                    onChange={handleDateChange("expiryDate")}
                    onBlur={formik.handleBlur}
                    disabled={!isEditing}
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate && (
                    <div className="text-xs text-red-500">
                      {formik.errors.expiryDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-col px-4 gap-4 mt-6 mb-6">
              {isEditing ? (
                <b className="text-black">Documentation :</b>
              ) : (
                <label htmlFor="" className="text-[19px] py-6">
                  Documentation :
                </label>
              )}
              <div className="grid grid-cols-4 mt-6">
                {isEditing ? (
                  <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                    {isEditing ? (
                      <b className="text-black">Product Brochure : </b>
                    ) : (
                      <label htmlFor="">Product Brochure : </label>
                    )}
                    <div className="w-full h-full flex flex-col justify-center gap-3">
                      <input
                        // id="productImage"
                        type="file"
                        className={`border ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        }  rounded-md w-full h-[120px] px-2 hidden`}
                        placeholder="Write Here ..."
                        name="productBrochure"
                        // value={formik.values.productBrochure}
                        // onChange={formik.handleChange}
                        onChange={(e) => handleFileChange("productBrochure", e)}
                        disabled={!isEditing}
                      />
                      <label
                        htmlFor="productImage"
                        className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                      >
                        Choose File
                      </label>
                      <p className="text-[#818181] text-xs">
                        Max File size : 5 MB
                      </p>
                      <p className="text-[#818181] text-xs">
                        Allowed File : jpeg, doc, docx, csv, pdf
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    {isEditing ? (
                      <b className="text-black">Product Brochure</b>
                    ) : (
                      <label htmlFor="">Product Brochure</label>
                    )}
                    <img
                      src={renderPreview(formik.values.productBrochure)}
                      // src={formik.values.productBrochure}
                      alt=""
                      className="h-[250px] w-[160px] object-contain"
                    />
                  </div>
                )}

                {isEditing ? (
                  <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                    {isEditing ? (
                      <b className="text-black">PPT available : </b>
                    ) : (
                      <label htmlFor="">PPT available : </label>
                    )}
                    <div className="w-full h-full flex flex-col justify-center gap-3">
                      <input
                        id="productImage"
                        type="file"
                        className={`border ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        }  rounded-md w-full h-[120px] px-2 hidden`}
                        placeholder="Write Here ..."
                        name="pptAvailable"
                        // value={formik.values.pptAvailable}
                        // onChange={formik.handleChange}
                        onChange={(e) => handleFileChange("pptAvailable", e)}
                        disabled={!isEditing}
                      />
                      <label
                        htmlFor="productImage"
                        className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                      >
                        Choose File
                      </label>
                      <p className="text-[#818181] text-xs">
                        Max File size : 5 MB
                      </p>
                      <p className="text-[#818181] text-xs">
                        Allowed File : jpeg, doc, docx, csv, pdf
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    {isEditing ? (
                      <b className="text-black">PPT available </b>
                    ) : (
                      <label htmlFor="">PPT available </label>
                    )}
                    <img
                      src={renderPreview(formik.values.pptAvailable)}
                      // src={formik.values.pptAvailable}
                      alt=""
                      className="h-[250px] w-[160px] object-contain"
                    />
                  </div>
                )}

                {isEditing ? (
                  <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                    {isEditing ? (
                      <b className="text-black">Coverring Letter : </b>
                    ) : (
                      <label htmlFor="">Coverring Letter : </label>
                    )}
                    <div className="w-full  h-full flex flex-col justify-center gap-3">
                      <input
                        id="productImage"
                        type="file"
                        className={`border ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        }  rounded-md w-full h-[120px] px-2 hidden`}
                        placeholder="Write Here ..."
                        name="coveringLetter"
                        // value={formik.values.coveringLetter}
                        // onChange={formik.handleChange}
                        onChange={(e) => handleFileChange("coveringLetter", e)}
                        disabled={!isEditing}
                      />
                      <label
                        htmlFor="isoCertificate"
                        className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                      >
                        Choose File
                      </label>
                      <p className="text-[#818181] text-xs">
                        Max File size : 5 MB
                      </p>
                      <p className="text-[#818181] text-xs">
                        Allowed File : jpeg, doc, docx, csv, pdf
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    {isEditing ? (
                      <b className="text-black">Covering Letter : </b>
                    ) : (
                      <label htmlFor="">Covering Letter : </label>
                    )}
                    <img
                      // src={formik.values.coveringLetter}
                      src={renderPreview(formik.values.coveringLetter)}
                      alt=""
                      className="h-[250px] w-[160px] object-contain"
                    />
                  </div>
                )}

                {isEditing ? (
                  <div className="col-span-1 flex flex-col items-start w-full h-full gap-3">
                    {isEditing ? (
                      <b className="text-black">ISO Certificate : </b>
                    ) : (
                      <label htmlFor="">ISO Certificate : </label>
                    )}
                    <div className="w-full  h-full flex flex-col justify-center gap-3">
                      <input
                        id="productImage"
                        type="file"
                        className={`border ${
                          isEditing
                            ? "border-black text-black"
                            : "border-gray-400"
                        }  rounded-md w-full h-[120px] px-2 hidden`}
                        placeholder="Write Here ..."
                        name="isoCertificate"
                        // value={formik.values.isoCertificate}
                        // onChange={formik.handleChange}
                        onChange={(e) => handleFileChange("isoCertificate", e)}
                        disabled={!isEditing}
                      />
                      <label
                        htmlFor="isoCertificate"
                        className="bg-[#E5E4E0] px-4 rounded-full py-[2px] w-[150px] flex justify-center items-center"
                      >
                        Choose File
                      </label>
                      <p className="text-[#818181] text-xs">
                        Max File size : 5 MB
                      </p>
                      <p className="text-[#818181] text-xs">
                        Allowed File : jpeg, doc, docx, csv, pdf
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col">
                    {isEditing ? (
                      <b className="text-black">ISO Certificate</b>
                    ) : (
                      <label htmlFor="">ISO Certificate</label>
                    )}
                    <img
                      // src={formik.values.isoCertificate}
                      src={renderPreview(formik.values.isoCertificate)}
                      alt=""
                      className="h-[250px] w-[160px] object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 py-3">
              <div className="col-span-3 flex flex-col items-start w-full gap-4">
                {isEditing ? (
                  <b className="text-black"> Technical Specification :</b>
                ) : (
                  <label htmlFor="" className="text-[19px]">
                    Technical Specification :
                  </label>
                )}
                <textarea
                  type="text"
                  className={`border ${
                    isEditing ? "border-black text-black" : "border-gray-400"
                  }  rounded-md w-full h-[100px] px-2`}
                  placeholder="Write Here ..."
                  name="technicalSpecification"
                  value={formik.values.technicalSpecification}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="flex-col px-4 gap-4 py-2">
              <div className="grid grid-cols-3">
                <div className="col-span-1 flex flex-col items-start w-full  gap-[4px]">
                  {isEditing ? (
                    <b className="text-black">Dimension :</b>
                  ) : (
                    <label htmlFor="">Dimensions :</label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    }  rounded-full w-[80%] h-[35px] px-2`}
                    name="dimensions"
                    value={formik.values.dimensions}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  {isEditing ? (
                    <b className="text-black">Materials :</b>
                  ) : (
                    <label htmlFor="">Materials :</label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    }  rounded-full w-[80%] h-[35px] px-2`}
                    name="materials"
                    value={formik.values.materials}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-span-1 flex flex-col items-start w-full gap-[4px]">
                  {isEditing ? (
                    <b className="text-black">Performance :</b>
                  ) : (
                    <label htmlFor="">Performance :</label>
                  )}
                  <input
                    type="text"
                    className={`border ${
                      isEditing ? "border-black text-black" : "border-gray-400"
                    } border-gray-400 rounded-full w-[80%] h-[35px] px-2`}
                    name="performance"
                    value={formik.values.performance}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/*<div className="flex flex-col w-full gap-4">
              {isEditing ? (
                <b className="text-black">Cost Estimation</b>
              ) : (
                <label htmlFor="">Cost Estimation</label>
              )}
              <div className="w-full grid grid-cols-4 border rounded-xl">
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4 text-black">Quantity</h3>
                  </div>

                  <div className="h-[100px] text-black flex justify-center items-center">
                    quantity
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 text-black py-4">MRP</h3>
                  </div>
                  <div className="h-[100px] text-black flex justify-center items-center">
                    MRP
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px] w-full flex flex-col items-center">
                    <h3 className="pt-2 text-black">Aplicable Taxes</h3>
                    <div className="w-full grid grid-cols-2">
                      <p className="col-span-1 text-black flex justify-center items-center w-full">
                        Rate %
                      </p>
                      <p className="col-span-1 flex text-black justify-center items-center w-full">
                        Amt (Rs)
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <div className="h-[100px] col-span-1 text-black flex justify-center items-center">
                      taxes
                    </div>

                    <div className="h-[100px] text-black col-span-1 flex justify-center items-center">
                      taxes
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 text-black py-4">Amount</h3>
                  </div>
                  <div className="h-[100px]  text-black flex justify-center items-center">
                    amount
                  </div>
                </div>
              </div>
            </div>*/}

            <div className="flex flex-col w-full gap-4">
              {isEditing ? (
                <b className="text-black">Cost Estimation</b>
              ) : (
                <label htmlFor="">Cost Estimation</label>
              )}
              <div className="w-full grid grid-cols-4 border rounded-xl">
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px] flex justify-between]">
                    <h3 className="pt-2 py-4 text-black">Quantity</h3>
                  </div>
                  <div className="h-[100px] text-black flex justify-center items-center">
                    {formik.values.quantity}
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px] flex justify-between]">
                    <h3 className="pt-2 text-black py-4">MRP</h3>
                  </div>
                  <div className="h-[100px] text-black flex justify-center items-center">
                    {formik.values.companyPrice}
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px] w-full flex flex-col items-center">
                    <h3 className="pt-2 text-black">Applicable Taxes</h3>
                    <div className="w-full grid grid-cols-2">
                      <p className="col-span-1 text-black flex justify-center items-center w-full">
                        Rate %
                      </p>
                      <p className="col-span-1 flex text-black justify-center items-center w-full">
                        Amt (Rs)
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <div className="h-[100px] col-span-1 text-black flex justify-center items-center">
                      {isEditing ? (
                        <input
                          type="number"
                          name="gstRate"
                          value={formik.values.gstRate}
                          onChange={formik.handleChange}
                          className="w-[60px] border border-gray-400"
                          disabled={!isEditing}
                        />
                      ) : (
                        formik.values.gstRate
                      )}
                    </div>
                    <div className="h-[100px] text-black col-span-1 flex justify-center items-center">
                      {formik.values.applicableTaxesAmount ||
                        calculateAfterTaxAmount()}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <div className="h-[50px] flex justify-between]">
                    <h3 className="pt-2 text-black py-4">Amount</h3>
                  </div>
                  <div className="h-[100px] text-black flex justify-center items-center">
                    {/*calculateAmount()*/}
                    {formik.values.amount}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 py-[30px]">
              <div className="flex flex-col">
                <div className="py-3">
                  <h2 className="font-medium text-black">Approved By</h2>
                </div>
                <h2 className="font-medium text-black">Mayur Bansal</h2>
                <h2 className="font-medium text-black">
                  Purchase Manager Uni Sol
                </h2>
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
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <h2>Taxes</h2>
                  <input
                    type="number"
                    name="taxes"
                    value={formik.values.taxes}
                    onChange={formik.handleChange}
                    className="w-[60px] border border-gray-400 rounded-md"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <h2 className="font-bold text-[20px]">NetAmount</h2>
                  <h2 className="font-bold text-[20px]">
                    {calculateNetAmount()}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              {isEditing ? (
                <button
                  type="button"
                  onClick={() => {
                    formik.validateForm().then((errors) => {
                      console.log("Validation Errors:", errors);
                      if (Object.keys(errors).length === 0) {
                        handlEdit();
                      } else {
                        toast.error(
                          "Please fix the form errors before updating."
                        );
                      }
                    });
                  }}
                  className="text-white bg-[#56AAC5] px-4 mx-2 rounded-md shadow-md py-1 hover:scale-[1.1] transition duration-300"
                >
                  <span className="mr-2 flex">
                    <b>Update</b>
                  </span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    className="bg-[#27e256] hover:bg-[#62e984] text-black px-4 mx-2 rounded-md shadow-md py-1 hover:scale-[1.1] transition duration-300"
                  >
                    <span className="mr-2 flex">
                      <>
                        Edit <Edit className="ms-2 mt-1" size={15} />
                      </>
                    </span>
                  </button>
                </>
              )}

              <button className="flex items-center pt-2 pb-2 pl-4 pr-4 bg-pink-200 rounded">
                <span className="mr-2">PDF</span>
                <IoMdDownload className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

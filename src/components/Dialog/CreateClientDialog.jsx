import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useClientManagement from "../../hooks/clientManagement/useClientManagement";
const CreateClientDialog = ({
  onClose,
  applicableGst,
  mouValidity,
  stockName,
  manufacturerName,
}) => {
  const [filePreview, setFilePreview] = useState({});
  const { CreateNewClient, getNewSrNumber, newSrNo } = useClientManagement();

  useEffect(() => {
    getNewSrNumber();
  }, []);
  console.log("newSrNo :", newSrNo);

  const validationSchema = Yup.object().shape({
    srNo: Yup.string().required("SrNo is required"),
    dealerName: Yup.string().required("Dealer Name is required"),
    date: Yup.date().required("Date is required"),
    manufacturerName: Yup.string().required("Manufacturer Name is required"),
    productName: Yup.string().required("Product Name is required"),
    productCode: Yup.string().required("Product Code is required"),
    description: Yup.string().required("Description is required"),
    hsnCode: Yup.string().required("Hsn Code is required"),
    companyPrice: Yup.string().required("Company Price is required"),
    applicableGst: Yup.string().required("Applicable Gst is required"),
    buyingPrice: Yup.string().required("Buying Price is required"),
    sellingPrice: Yup.string().required("Selling Price is required"),
    mouValidity: Yup.string().required("MOU Validity is required"),
    teritaryAuthFile: Yup.string().required("TeritaryAuthFile is required"),
    pptFile: Yup.string().required("pptFile is required"),
    coverLetterFile: Yup.string().required("Cover Letter is required"),
    productCertificate: Yup.string().required(
      "Product Certificate is required"
    ),
    isoCertificate: Yup.string().required("ISO Certificate is required"),
    brochureFile: Yup.string().required("Brochure is required"),
  });

  const formik = useFormik({
    initialValues: {
      srNo: newSrNo?.srNo,
      date: "",
      dealerName: "",
      manufacturerName: "",
      productName: "",
      productCode: "",
      description: "",
      hsnCode: "",
      companyPrice: "",
      applicableGst: "",
      buyingPrice: "",
      sellingPrice: "",
      mouValidity: "",
      teritaryAuthFile: "",
      pptFile: "",
      coverLetterFile: "",
      productCertificate: "",
      isoCertificate: "",
      brochureFile: "",
      technicalSpecification: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        console.log("form values : ", values);
        const formData = new FormData();

        /* Object.keys(values).forEach((key) => {
          if (values[key] instanceof File) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }); */

        formData.append("srNo", values.srNo);
        formData.append("date", values.date);
        formData.append("dealerName", values.dealerName);
        formData.append("manufacturerName", values.manufacturerName);
        formData.append("productName", values.productName);
        formData.append("productCode", values.productCode);
        formData.append("description", values.description);
        formData.append("hsnCode", values.hsnCode);
        formData.append("companyPrice", values.companyPrice);
        formData.append("applicableGst", values.applicableGst);
        formData.append("buyingPrice", values.buyingPrice);
        formData.append("sellingPrice", values.sellingPrice);
        formData.append("mouValidity", values.mouValidity);
        formData.append("teritaryAuthFile", values.teritaryAuthFile);
        formData.append("pptFile", values.pptFile);
        formData.append("coverLetterFile", values.coverLetterFile);
        formData.append("productCertificate", values.productCertificate);
        formData.append("isoCertificate", values.isoCertificate);
        formData.append("brochureFile", values.brochureFile);
        formData.append(
          "technicalSpecification",
          values.technicalSpecification
        );

        for (let [key, value] of formData.entries()) {
          console.log(`Key: ${key},value:${value}`);
        }

        CreateNewClient(formData);
        onClose();
        console.log(formData);
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    },
  });

  console.log("formik.values", formik.values);
  const handleDocUploadChange = (event) => {
    console.log("event.target.name :", event.target.name);
    console.log("event.target.value :", event.target.value);
    //formik.setFieldValue("document", file);
    const fieldName = event.target.name;

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

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 modal">
      <div className="bg-white w-full sm:w-[700px] max-h-[calc(100vh-100px)] cards overflow-y-scroll rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b cardheader">
          <span className="text-lg font-semibold cardtitle flex-grow text-center">
            Create/Add Clients
          </span>
          <button
            className="text-gray-600 hover:text-gray-900 closeicon"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={formik.handleSubmit}>
            {/* Header Section */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex justify-start items-center mb-4">
                <label className="text-sm font-medium">Sr. No</label>
                <input
                  type="text"
                  value={formik.values.srNo}
                  name="srNo"
                  readOnly
                  className="border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex justify-end items-center mb-4">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-0"
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.date && formik.touched.date && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.date}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">Dealer Name</label>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="dealerName"
                    value={formik.values.dealerName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.dealerName && formik.touched.dealerName && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.dealerName}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Manufacturer Name
                </label>
                <div className="w-2/3">
                  <select
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="manufacturerName"
                    value={formik.values.manufacturerName}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled>
                      Select Manufacturer Name
                    </option>
                    {manufacturerName?.manufacturerNames?.map(
                      (manufacturer, index) => (
                        <option key={index} value={manufacturer}>
                          {manufacturer}
                        </option>
                      )
                    )}
                  </select>
                  {formik.errors.manufacturerName &&
                    formik.touched.manufacturerName && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.manufacturerName}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Product Name
                </label>
                <div className="w-2/3">
                  <select
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="productName"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {/* Add options here */}
                    {stockName?.products?.map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                  {formik.errors.productName && formik.touched.productName && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.productName}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Product Code
                </label>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="productCode"
                    value={formik.values.productCode}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.productCode && formik.touched.productCode && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.productCode}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="w-1/3 text-sm font-medium">Description</label>
              <div className="w-2/3 ">
                <textarea
                  className="w-full border border-gray-300 rounded px-4 py-1"
                  rows="3"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">HSN Code</label>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="hsnCode"
                    value={formik.values.hsnCode}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.hsnCode && formik.touched.hsnCode && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.hsnCode}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Company Price
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="companyPrice"
                    value={formik.values.companyPrice}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.companyPrice &&
                    formik.touched.companyPrice && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.companyPrice}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Application GST
                </label>
                <div className="w-2/3">
                  <select
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="applicableGst"
                    value={formik.values.applicableGst}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled>
                      Select Application GST
                    </option>
                    {/* Add options here */}
                    {applicableGst?.applicableGst?.map((gst, index) => (
                      <option key={index} value={gst}>
                        {gst}
                      </option>
                    ))}
                  </select>
                  {formik.errors.applicableGst &&
                    formik.touched.applicableGst && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.applicableGst}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Buying Price
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="buyingPrice"
                    value={formik.values.buyingPrice}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.buyingPrice && formik.touched.buyingPrice && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.buyingPrice}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Selling Price
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="sellingPrice"
                    value={formik.values.sellingPrice}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.sellingPrice &&
                    formik.touched.sellingPrice && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.sellingPrice}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  MOU Validity
                </label>
                <div className="w-2/3">
                  <select
                    className="w-full border border-gray-300 rounded px-4 py-1"
                    name="mouValidity"
                    value={formik.values.mouValidity}
                    onChange={formik.handleChange}
                  >
                    <option value="" disabled>
                      Select MOU Validity
                    </option>
                    {/* Add options here */}
                    {mouValidity?.mouValidity?.map((mou, index) => (
                      <option key={index} value={mou}>
                        {mou}{" "}
                      </option>
                    ))}
                  </select>
                  {formik.errors.mouValidity && formik.touched.mouValidity && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.mouValidity}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 file">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Teritary Authorization:
                </label>
                <input
                  type="file"
                  className="border-none rounded-xl py-2 file-input"
                  name="teritaryAuthFile"
                  onChange={(e) => handleDocUploadChange(e)}
                />
                {formik.errors.teritaryAuthFile &&
                  formik.touched.teritaryAuthFile && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.teritaryAuthFile}
                    </div>
                  )}
                <span>Max File Size: 5 MB</span>
                <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  PPT available:
                </label>
                <input
                  type="file"
                  className="border-none rounded-xl py-2 file-input"
                  name="pptFile"
                  onChange={(e) => handleDocUploadChange(e)}
                />
                {formik.errors.pptFile && formik.touched.pptFile && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.pptFile}
                  </div>
                )}
                <span>Max File Size: 5 MB</span>
                <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Covering Latter:
                </label>
                <input
                  type="file"
                  className="border-none rounded-xl py-2 file-input"
                  name="coverLetterFile"
                  onChange={(e) => handleDocUploadChange(e)}
                />
                {formik.errors.coverLetterFile &&
                  formik.touched.coverLetterFile && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.coverLetterFile}
                    </div>
                  )}
                <span>Max File Size: 5 MB</span>
                <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Product Certificate :
                </label>
                <input
                  type="file"
                  className="border-none rounded-xl py-2 file-input"
                  name="productCertificate"
                  onChange={(e) => handleDocUploadChange(e)}
                />
                {formik.errors.productCertificate &&
                  formik.touched.productCertificate && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.productCertificate}
                    </div>
                  )}
                <span>Max File Size: 5 MB</span>
                <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  ISO Certificate :
                </label>
                <input
                  type="file"
                  className="border-none rounded-xl py-2 file-input"
                  name="isoCertificate"
                  onChange={(e) => handleDocUploadChange(e)}
                />
                {formik.errors.isoCertificate &&
                  formik.touched.isoCertificate && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.isoCertificate}
                    </div>
                  )}
                <span>Max File Size: 5 MB</span>
                <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Brochure Available :
                </label>
                <input
                  type="file"
                  className="border-none rounded-xl py-2 file-input"
                  name="brochureFile"
                  onChange={(e) => handleDocUploadChange(e)}
                />
                {formik.errors.brochureFile && formik.touched.brochureFile && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.brochureFile}
                  </div>
                )}
                <span>Max File Size: 5 MB</span>
                <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 ">
              <div className="flex flex-col">
                <span className="techhead text-sm font-medium mb-2">
                  Technical Specification
                </span>
                <div className="flex items-start w-full gap-2">
                  <textarea
                    id="uploadedFileTextArea"
                    className="border border-gray-300 rounded px-4 py-2 flex-grow w-[70%]"
                    rows="3"
                    //readOnly
                    name="technicalSpecification"
                    value={formik.values.technicalSpecification}
                    onChange={formik.handleChange}
                    // placeholder="Uploaded file details will appear here..."
                  />
                  <input type="file" id="uploadDocText" className="hidden" />
                  <label
                    htmlFor="uploadDocText"
                    className="cursor-pointer h-[28px] rounded-full border text-blue-600 border-blue-600 hover:text-blue-800 hover:border-blue-800  px-2 gap-2 flex justify-center items-center w-[120px]"
                  >
                    Browse File
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#56AAC5] hover:bg-[#35a1c5] text-white px-3 mx-2 py-1 rounded-md shadow-md hover:scale-[1.1] transition duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-[#f64c36] hover:bg-[#f07362] text-white px-4 mx-2 rounded-md shadow-md py-1 hover:scale-[1.1] transition duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientDialog;

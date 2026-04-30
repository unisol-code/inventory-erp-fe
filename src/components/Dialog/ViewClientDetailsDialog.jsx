import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useClientManagement from "../../hooks/clientManagement/useClientManagement";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const ViewClientDetailsDialog = ({
  onClose,
  data,
  applicableGst,
  mouValidity,
  stockName,
  manufacturerName,
}) => {
  const [filePreview, setFilePreview] = useState({});
  const { UpdateClientDetailsById } = useClientManagement();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const validationSchema = Yup.object().shape({
    srNo: Yup.string().required("SrNo is required"),
    date: Yup.string().required("Date is required"),
    dealerName: Yup.date().required("DealerName is required"),
    manufacturerName: Yup.date().required("ManufacturerName is required"),
    productName: Yup.string().required("ProductName is required"),
    productCode: Yup.string().required("ProductCode is required"),
    description: Yup.string().required("Description is required"),
    hsnCode: Yup.string().required("hSN Code is required"),
    companyPrice: Yup.string().required("Company Price is required"),
    applicableGst: Yup.string().required("Applicable Gst is required"),
    buyingPrice: Yup.string().required("Buying Price is required"),
    sellingPrice: Yup.date().required("Selling Price is required"),
    mouValidity: Yup.date().required("MOU Validity is required"),
    teritaryAuthFile: Yup.string().required("TeritaryAuthFile is required"),
    pptFile: Yup.string().required("PptFile is required"),
    coverLetterFile: Yup.string().required("Cover Letter is required"),
    productCertificate: Yup.string().required(
      "Product Certificate is required"
    ),
    isoCertificate: Yup.string().required("ISO Certificate is required"),
    brochureFile: Yup.string().required("Brochure is required"),
    technicalSpecification: Yup.string().required(
      "TechnicalSpecification is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      srNo: data ? data?.client?.srNo : "",
      date: data ? data?.client?.date.split("T")[0] : "",
      dealerName: data ? data?.client?.dealerName : "",
      manufacturerName: data ? data?.client?.manufacturerName : "",
      productName: data ? data?.client?.productName : "",
      productCode: data ? data?.client?.productCode : "",
      description: data ? data?.client?.description : "",
      hsnCode: data ? data?.client?.hsnCode : "",
      companyPrice: data ? data?.client?.companyPrice : "",
      applicableGst: data ? data?.client?.applicableGst : "",
      buyingPrice: data ? data?.client?.buyingPrice : "",
      sellingPrice: data ? data?.client?.sellingPrice : "",
      mouValidity: data ? data?.client?.mouValidity : "",
      teritaryAuthFile: data ? data?.client?.teritaryAuthFile : "",
      pptFile: data ? data?.client?.pptFile : "",
      coverLetterFile: data ? data?.client?.coverLetterFile : "",
      productCertificate: data ? data?.client?.productCertificate : "",
      isoCertificate: data ? data?.client?.isoCertificate : "",
      brochureFile: data ? data?.client?.brochureFile : "",
      technicalSpecification: data ? data?.client?.technicalSpecification : "",
    },

    //validationSchema: validationSchema,

    onSubmit: (values) => {
      try {
        console.log("form values : ", formik.values);
        UpdateClientDetailsById(data?.client?._id, values);
        onClose();
      } catch (error) {
        console.error("Error during updating client:", error);
      }
    },
  });

  const handleDocUploadChange = (event) => {
    console.log("event.target.name :", event.target.name);
    console.log("event.target.name :", event.target.value);
    const file = event.currentTarget.files[0];

    formik.setFieldValue(event.target.name, event.currentTarget.files[0]);
    setFilePreview((prevfiles) => ({
      ...prevfiles,
      [event.target.name]: URL.createObjectURL(file).toString(),
    }));
    console.log("filePreview", filePreview);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file : ", file);

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "pdf") {
        console.log("file reading");
        const reader = new FileReader();

        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;

          let pdfText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
              .map((item) => item.str)
              .join(" ");
            pdfText += pageText + "\n";
          }
          setText(pdfText);
          console.log("text :", text);
          formik.setFieldValue("technicalSpecification", pdfText);
        };

        reader.readAsArrayBuffer(file);
      }
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleEditClick = (event) => {
    event.preventDefault(); // Prevent any default behavior
    setIsEditing(true); // Enable editing mode
  };

  return (
    <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className=" bg-white rounded-2xl shadow-md w-[900px]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b cardheader">
          {isEditing ? (
            <span className="text-lg font-semibold cardtitle flex-grow text-center">
              Update Details
            </span>
          ) : (
            <span className="text-lg font-semibold cardtitle flex-grow text-center">
              View Details
            </span>
          )}

          <button
            className="text-gray-600 hover:text-gray-900 closeicon"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="h-[500px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto">
          {/* Header Section */}
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex justify-start items-center mb-4">
                <label className="text-sm font-medium">Sr. No</label>
                <input
                  type="text"
                  readOnly
                  className="border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-0"
                  name="srNo"
                  value={formik.values.srNo}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex justify-end items-center mb-4">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-0"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    📅
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">Dealer Name</label>
                <input
                  type="text"
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="dealerName"
                  value={formik.values.dealerName}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Manufacturer Name
                </label>
                <select
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="manufacturerName"
                  value={formik.values.manufacturerName}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                >
                  <option value="" disabled>
                    Select Manufacturer
                  </option>

                  {manufacturerName?.manufacturerNames?.map(
                    (manufacturer, index) => (
                      <option key={index} value={manufacturer}>
                        {manufacturer}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Product Name
                </label>

                <select
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                >
                  <option value="" disabled>
                    Product Name{" "}
                  </option>
                  // Add options here
                  {stockName?.products?.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Product Code
                </label>
                <input
                  type="text"
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="productCode"
                  value={formik.values.productCode}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="w-1/3 text-sm font-medium">Description</label>
              <textarea
                className="w-2/3 border border-gray-300 rounded px-4 py-1"
                rows="3"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">HSN Code</label>
                <input
                  type="text"
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="hsnCode"
                  value={formik.values.hsnCode}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Company Price
                </label>
                <input
                  type="number"
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="companyPrice"
                  value={formik.values.companyPrice}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Application GST
                </label>
                <select
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="applicableGst"
                  value={formik.values.applicableGst}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                >
                  <option value="" disabled>
                    Application GST
                  </option>
                  {applicableGst?.applicableGst?.map((gst, index) => (
                    <option key={index} value={gst}>
                      {gst}
                    </option>
                  ))}
                  <option />
                  {/* Add options here
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Buying Price
                </label>
                <input
                  type="number"
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="buyingPrice"
                  value={formik.values.buyingPrice}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  Selling Price
                </label>
                <input
                  type="number"
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="sellingPrice"
                  value={formik.values.sellingPrice}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <label className="w-1/3 text-sm font-medium">
                  MOU Validity
                </label>
                <select
                  className="w-2/3 border border-gray-300 rounded px-4 py-1"
                  name="mouValidity"
                  value={formik.values.mouValidity}
                  onChange={formik.handleChange}
                  disabled={!isEditing}
                >
                  <option value="" disabled>
                    MOU Validity
                  </option>
                  {mouValidity?.mouValidity?.map((mou) => (
                    <option key={mou} value="">
                      {mou}
                    </option>
                  ))}
                  <option />
                  {/* Add options here */}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 file">
              {isEditing ? (
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
                  <span>Max File Size: 5 MB</span>
                  <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src="https://officetemplatesonline.com/wp-content/uploads/2021/04/critical-review-assignment-cover-page-template-for-ms-word.jpg"
                    alt=""
                    className="h-[250px] w-[160px] object-contain"
                  />
                </div>
              )}
              {isEditing ? (
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
                  <span>Max File Size: 5 MB</span>
                  <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src="https://officetemplatesonline.com/wp-content/uploads/2021/04/critical-review-assignment-cover-page-template-for-ms-word.jpg"
                    alt=""
                    className="h-[250px] w-[160px] object-contain"
                  />
                </div>
              )}
              {isEditing ? (
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Covering Latter:{" "}
                  </label>
                  <input
                    type="file"
                    className="border-none rounded-xl py-2 file-input"
                    name="coverLetterFile"
                    onChange={(e) => handleDocUploadChange(e)}
                  />
                  <span>Max File Size: 5 MB</span>
                  <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src="https://officetemplatesonline.com/wp-content/uploads/2021/04/critical-review-assignment-cover-page-template-for-ms-word.jpg"
                    alt=""
                    className="h-[250px] w-[160px] object-contain"
                  />
                </div>
              )}
              {isEditing ? (
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
                  <span>Max File Size: 5 MB</span>
                  <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src="https://officetemplatesonline.com/wp-content/uploads/2021/04/critical-review-assignment-cover-page-template-for-ms-word.jpg"
                    alt=""
                    className="h-[250px] w-[160px] object-contain"
                  />
                </div>
              )}
              {isEditing ? (
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    ISO Certificate :{" "}
                  </label>
                  <input
                    type="file"
                    className="border-none rounded-xl py-2 file-input"
                    name="isoCertificate"
                    onChange={(e) => handleDocUploadChange(e)}
                  />
                  <span>Max File Size: 5 MB</span>
                  <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src="https://officetemplatesonline.com/wp-content/uploads/2021/04/critical-review-assignment-cover-page-template-for-ms-word.jpg"
                    alt=""
                    className="h-[250px] w-[160px] object-contain"
                  />
                </div>
              )}
              {isEditing ? (
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Brochure Available :{" "}
                  </label>
                  <input
                    type="file"
                    className="border-none rounded-xl py-2 file-input"
                    name="brochureFile"
                    onChange={(e) => handleDocUploadChange(e)}
                  />
                  <span>Max File Size: 5 MB</span>
                  <span>Allowed File: jpeg, doc. , docx , csv ,pdf</span>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src="https://officetemplatesonline.com/wp-content/uploads/2021/04/critical-review-assignment-cover-page-template-for-ms-word.jpg"
                    alt=""
                    className="h-[250px] w-[160px] object-contain"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 ">
              <div className="flex flex-col">
                <span className="techhead text-sm font-medium mb-2">
                  Technical Specification
                </span>
                <div className="flex items-start">
                  <textarea
                    id="uploadedFileTextArea"
                    className="border border-gray-300 rounded px-4 py-2 flex-grow w-[70%]"
                    rows="3"
                    readOnly
                    name="technicalSpecification"
                    value={formik.values.technicalSpecification}
                    // placeholder="Uploaded file details will appear here..."
                  />
                  <input
                    type="file"
                    name="uploadDocText"
                    id="uploadDocText"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                  />
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
            <div className="flex justify-center items-center gap-2">
              {isEditing ? (
                <button
                  type="submit"
                  className="text-white bg-[#56AAC5] px-4 mx-2 rounded-md shadow-md py-1 hover:scale-[1.1] transition duration-300"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button" // Explicitly set type to avoid unintended submit
                  className="bg-[#27e256] hover:bg-[#62e984] text-black px-4 mx-2 rounded-md shadow-md py-1 hover:scale-[1.1] transition duration-300"
                  onClick={handleEditClick} // Enables editing mode
                >
                  Edit
                </button>
              )}

              <button
                type="button"
                className="bg-[#f64c36] hover:bg-[#f07362] text-white px-4 mx-2 rounded-md shadow-md py-1 hover:scale-[1.1] transition duration-300"
                onClick={onClose}
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

export default ViewClientDetailsDialog;

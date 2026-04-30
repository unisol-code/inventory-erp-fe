import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { purchaseOrderByIdAtom } from "../../../../state/product/purchaseManagementState";
import usePurchase from "../../../../hooks/product/usePurchaseManagement";
import UnisolServiceImg from "../../../../assets/images/unisolservices.png";
import { Download, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as Yup from "yup";
import { useFormik } from "formik";

const ViewDetailsPurchase = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const { id } = useParams();
  const {
    fetchPurchaseOrderById,
    loading,
    fetchPurchaseOrderTerms,
    purchaseOrderTerms,
    UpdatePurchaseOrderDetailsById,
  } = usePurchase();
  const setPurchaseOrderData = useSetRecoilState(purchaseOrderByIdAtom);
  const purchaseData = useRecoilValue(purchaseOrderByIdAtom);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    expiryTerms: Yup.string().required("Expiry Terms are required"),
    paymentTerms: Yup.string().required("Payment Terms are required"),
    deliveryTerms: Yup.string().required("Delivery Terms are required"),
    returnPolicy: Yup.string().required("Return Policy is required"),
    name: Yup.string().required("Name is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
      .required("Contact number is required"),
  });

  useEffect(() => {
    if (id && (!purchaseData || purchaseData._id !== id)) {
      fetchPurchaseOrderById(id);
    }
  }, [id, fetchPurchaseOrderById, purchaseData]);

  useEffect(() => {
    fetchPurchaseOrderTerms();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: purchaseData?.name || "",
      designation: purchaseData?.designation || "",
      email: purchaseData?.email || "",
      contact: purchaseData?.contact || "",
      expiryTerms: purchaseData?.expiryTerms || "",
      paymentTerms: purchaseData?.paymentTerms || "",
      deliveryTerms: purchaseData?.deliveryTerms || "",
      returnPolicy: purchaseData?.returnPolicy || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Use async/await to handle the update
        const updatedData = await UpdatePurchaseOrderDetailsById(id, values);

        // Directly update the Recoil atom with the new data
        if (updatedData) {
          setPurchaseOrderData((prevData) => ({
            ...prevData,
            ...updatedData,
          }));

          // Exit editing mode
          setIsEditing(false);

          // Optional: Show success message
          toast.success("Purchase order updated successfully");
        }
      } catch (error) {
        console.error("Error updating purchase order:", error);
        // Optional: Show error message
        toast.error("Failed to update purchase order");
      }
    },
  });

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!purchaseData) {
    return <div>No purchase order data found</div>;
  }

  const handleViewDetails = async () => {
    navigate("/product/product-order");
  };

  const handleDownloadPDF = async () => {
    const targetDiv = document.getElementById("pdf-content");

    if (!targetDiv) {
      alert("Div not found!");
      return;
    }

    try {
      // Capture the content of the div as a canvas with reduced quality
      const canvas = await html2canvas(targetDiv, {
        scale: 1.8, // Reduced from 2 to decrease resolution
        useCORS: true,
        logging: false, // Disable logging
        imageTimeout: 0, // Remove timeout
        allowTaint: true, // Allow cross-origin images
        quality: 0.9, // Reduce image quality (0-1 range)
      });

      // Convert the canvas to a compressed image
      const imageData = canvas.toDataURL("image/jpeg", 0.7); // Lower quality JPEG

      // Create a new PDF instance in landscape mode
      const pdf = new jsPDF("l", "mm", "a4");

      // Get landscape A4 dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit the page
      const imageAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;
      if (imageAspectRatio > pdfAspectRatio) {
        // Image is wider relative to height
        finalWidth = pdfWidth;
        finalHeight = pdfWidth / imageAspectRatio;
      } else {
        // Image is taller relative to width
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * imageAspectRatio;
      }

      // Calculate positioning to center the image
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      // Add the compressed image to the PDF with lower quality
      pdf.addImage(
        imageData,
        "JPEG",
        x,
        y,
        finalWidth,
        finalHeight,
        undefined,
        "FAST" // Faster compression
      );

      // Generate filename using customer name
      const filename = `${purchaseData?.name || "PurchaseOrder"}_Purchase.pdf`;

      // Save the PDF with compression
      pdf.save(filename);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF");
    }
  };

  const renderEditableField = (label, name) => (
    <div className="flex items-center mb-2">
      <label className="w-1/3 text-sm font-medium">{label}:</label>
      <div className="w-2/3">
        {isEditing ? (
          <input
            type="text"
            name={name}
            className="w-full border border-gray-300 rounded px-4 py-1"
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        ) : (
          <div className="px-4 py-1">{purchaseData?.[name] || "N/A"}</div>
        )}
        {isEditing && formik.touched[name] && formik.errors[name] && (
          <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
        )}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div
        className="bg-white shadow-md p-4 pt-5 pb-1 rounded-lg"
        style={{
          width: "1820px",
          height: "1130px",
          overflow: "auto",
        }}
      >
        <div
          id="pdf-content"
          className="border-t border-l border-r border-black"
        >
          {/* Row 1: Header */}
          <div
            className="flex items-center border-b border-black"
            style={{ height: "98.26px" }}
          >
            {/* Column 1: Image */}
            <div
              className="flex justify-start items-center border-r border-black"
              style={{
                width: "689.39px",
                height: "100px",
                boxSizing: "border-box",
              }}
            >
              <img
                src={UnisolServiceImg}
                alt="Unisol Services"
                style={{
                  maxHeight: "120%",
                  maxWidth: "140%",
                  marginLeft: "30px",
                }}
              />
            </div>
            {/* Column 2: Title */}
            <div
              className="flex justify-center items-center text-xl font-bold"
              style={{
                width: "calc(1820px - 689.39px)",
                boxSizing: "border-box",
              }}
            >
              Purchase Order
            </div>
          </div>

          {/* Row 2: Details */}
          <div
            className="flex border-b border-black"
            style={{
              height: "284.96px",
              boxSizing: "border-box",
            }}
          >
            {/* Column 1: Ship Details */}
            <div
              className="border-r border-black p-2 font-semibold"
              style={{
                width: "436.22px",
                boxSizing: "border-box",
              }}
            >
              <div className="font-bold mb-0">Ship & Bill to Address,</div>
              <div className="text-base">
                {purchaseData?.shipAndBillToAddress?.clientName}
              </div>
              <div>{purchaseData?.shipAndBillToAddress?.address}</div>
              <div>{purchaseData?.shipAndBillToAddress?.cityStateZip}</div>
              <div>{purchaseData?.shipAndBillToAddress?.contact}</div>
            </div>

            {/* Column 2: Purchase From*/}
            <div
              className="border-r border-black p-2 pl-4 font-semibold text-left"
              style={{
                width: "248.18px",
                boxSizing: "border-box",
              }}
            >
              <div className="font-bold">Purchase From:</div>
              <div>{purchaseData?.purchaseForm?.vendorName}</div>
              <div className="font-normal">
                {purchaseData?.purchaseForm?.address1}
              </div>
              <div className="font-normal">
                {purchaseData?.purchaseForm?.address2}
              </div>
              <div className="font-normal">
                {purchaseData?.purchaseForm?.cityStateZip}
              </div>
            </div>

            {/* Column 3: Static Details */}
            <div
              className="border-r border-black p-2 text-base"
              style={{
                width: "542.33px",
                wordWrap: "break-word",
                boxSizing: "border-box",
              }}
            >
              <div className="font-bold text-base">
                Complete Details | Surg Sol Healthcare Solutions Pvt Ltd
              </div>
              <div className="font-normal">
                <span className="font-semibold">Company Registration No:</span>{" "}
                U74999MH2017PTC296731
              </div>
              <div className="font-normal">
                <span className="font-semibold">GSTIN No:</span> 27AAYC58073LIZH
              </div>
              <div className="font-normal">
                <span className="font-semibold">TAN No:</span> MUMS950100
              </div>
              <div className="font-normal">
                <span className="font-semibold">DRUG LIC:</span> Form 208:
                MH-M26-226033 Form 218
              </div>
              <div className="font-normal">
                <span className="font-semibold">Form 20D:</span> MH-M26-228934
              </div>
              <div className="font-normal">
                <span className="font-semibold">PAN No:</span> AAYC58073
              </div>
            </div>

            {/* Column 4: Quotation Details */}
            <div
              className="p-2 text-left"
              style={{
                width: "579.10px",
                boxSizing: "border-box",
              }}
            >
              <div className="font-semibold">
                <span className="">PO Order No.:</span>{" "}
                {purchaseData?.poOrderNo}
              </div>
              <div className="">
                <span className="font-semibold">PO Date:</span>{" "}
                {new Date(purchaseData?.poDate).toLocaleDateString()}
              </div>
              <div className="font-semibold">
                <span className="">Delivery Terms:</span>{" "}
                {purchaseData?.deliveryTerms}
              </div>
            </div>
          </div>

          {/* Row 3: Table Header */}
          <div
            className="border-t border-black table"
            style={{
              height: "93.3px",
              boxSizing: "border-box",
              display: "table",
              width: "100%",
            }}
          >
            <div className="table-row">
              {/* Column Group 1 */}
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "133.29px",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                Sr No.
              </div>
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "284.95px",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                Item Code & Description
              </div>
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "calc(689.39px - (133.29px + 288.95px))",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                QTY
              </div>

              {/* Column Group 2 */}
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "calc(542.33px / 3)",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                Packaging
              </div>
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "calc(542.33px / 3)",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                Unit Rate
              </div>
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "calc(542.33px - (542.33px / 3 * 2))",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                Taxable Total Value (Rs.)
              </div>

              {/* Column Group 3 */}
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "calc(579.10px / 3)",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                GST Rate (%)
              </div>
              <div
                className="table-cell border-r border-black text-center font-bold"
                style={{
                  width: "calc(579.10px / 3)",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                GST Amount (Rs.)
              </div>
              <div
                className="table-cell border-black text-center font-bold"
                style={{
                  width: "calc(579.10px - (579.10px / 3 * 2))",
                  boxSizing: "border-box",
                  verticalAlign: "middle",
                }}
              >
                Total (Rs.)
              </div>
            </div>
          </div>

          {/* Row 4: Table Body */}
          <div
            className="border-t border-black table"
            style={{
              height: "162.14px",
              boxSizing: "border-box",
              display: "table",
              width: "100%",
            }}
          >
            {purchaseData?.orderDetails?.map((item, index) => (
              <div className="table-row" key={item._id}>
                {/* Column 1: Sr No. */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "133.29px",
                    boxSizing: "border-box",
                  }}
                >
                  {index + 1}
                </div>

                {/* Column 2: Item Code & Description */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "285.95px",
                    boxSizing: "border-box",
                  }}
                >
                  {item.itemNo || ""}
                </div>

                {/* Column 3: Quantity */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "calc(689.39px - (133.59px + 288.95px))",
                    boxSizing: "border-box",
                  }}
                >
                  {item.quantity || ""}
                </div>

                {/* Column 4: Packaging */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "calc(544.33px / 3)",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Add logic if packaging information is available */}
                </div>

                {/* Column 5: Unit Rate */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "calc(542.33px / 3)",
                    boxSizing: "border-box",
                  }}
                >
                  {item.unitPrice || ""}
                </div>

                {/* Column 6: Taxable Total Value */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "calc(542.33px - (542.33px / 3 * 2))",
                    boxSizing: "border-box",
                  }}
                >
                  {item.taxableTotalValue || ""}
                </div>

                {/* Column 7: GST Rate */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "calc(579.10px / 3)",
                    boxSizing: "border-box",
                  }}
                >
                  {item.sgstRate || ""}
                </div>

                {/* Column 8: GST Amount */}
                <div
                  className="table-cell border-r border-black text-center"
                  style={{
                    width: "calc(579.10px / 3)",
                    boxSizing: "border-box",
                  }}
                >
                  {item.sgstAmount || ""}
                </div>

                {/* Column 9: Total */}
                <div
                  className="table-cell text-center"
                  style={{
                    width: "calc(579.10px - (579.10px / 3 * 2))",
                    boxSizing: "border-box",
                  }}
                >
                  {item.total || ""}
                </div>
              </div>
            ))}
          </div>

          {/* Row 5: Empty Table Row */}
          <div
            className="border-t border-black table"
            style={{
              height: "93.3px",
              boxSizing: "border-box",
              display: "table",
              width: "100%",
            }}
          >
            <div className="table-row">
              {/* Column 1: Sr No. */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "133.29px",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 2: Item Code & Description */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "285px",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 3: Quantity */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(689.39px - (133.29px + 289.95px))",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 4: Packaging */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(542.33px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 5: Unit Rate */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(542.33px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 6: Taxable Total Value */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(542.33px - (542.33px / 3 * 2))",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 7: GST Rate */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(579.10px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 8: GST Amount */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(579.10px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 9: Total */}
              <div
                className="table-cell text-center"
                style={{
                  width: "calc(579.10px - (579.10px / 3 * 2))",
                  boxSizing: "border-box",
                }}
              ></div>
            </div>
          </div>

          {/* Row 6: In Words and Empty Columns */}
          <div
            className="border-t border-black table"
            style={{
              height: "103px",
              boxSizing: "border-box",
              display: "table",
              width: "100%",
            }}
          >
            <div className="table-row">
              {/* Column 1: In Words */}
              <div
                className="table-cell border-r border-black text-center font-semibold"
                style={{
                  width: "864.83px",
                  boxSizing: "border-box",
                }}
              >
                In Words
              </div>

              {/* Column 2: Unit Rate */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(542.33px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 3: Taxable Total Value */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(542.33px - (542.33px / 3 * 2))",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 4: GST Rate */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(579.10px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 5: GST Amount */}
              <div
                className="table-cell border-r border-black text-center"
                style={{
                  width: "calc(579.10px / 3)",
                  boxSizing: "border-box",
                }}
              ></div>

              {/* Column 6: Total */}
              <div
                className="table-cell text-center"
                style={{
                  width: "calc(579.10px - (579.10px / 3 * 2))",
                  boxSizing: "border-box",
                }}
              ></div>
            </div>
          </div>

          {/* Row 7: Signatures, Terms, and Stamp */}
          <div
            className="border-t border-b border-black table"
            style={{
              height: "224.9px",
              boxSizing: "border-box",
              display: "table",
              width: "100%",
            }}
          >
            <div className="table-row">
              {/* Column 1: Authorised Signatory */}
              <div
                className="table-cell border-r border-black p-2 text-left font-semibold"
                style={{
                  width: "205px", // Width from Sr No. to Item Code and Description
                  boxSizing: "border-box",
                }}
              >
                <div>Authorised Signatory & Date:</div>
                <div>{renderEditableField("Name", "name")}</div>
                <div>{renderEditableField("Designation", "designation")}</div>
                <div>{renderEditableField("Email", "email")}</div>
                <div>{renderEditableField("Contact Number", "contact")}</div>
              </div>

              {/* Column 2: Terms and Conditions */}
              <div
                className="table-cell border-r border-black p-2 text-left font-semibold"
                style={{
                  width: "404px", // Width from Qty. to Taxable Total Value
                  boxSizing: "border-box",
                }}
              >
                <div>{renderEditableField("Expiry Terms", "expiryTerms")}</div>
                <div>
                  {renderEditableField("Payment Terms", "paymentTerms")}
                </div>
                <div>
                  {renderEditableField("Delivery Terms", "deliveryTerms")}
                </div>
                <div>
                  {renderEditableField("Return Policy", "returnPolicy")}
                </div>
              </div>

              {/* Column 3: Signature and Stamp */}
              <div
                className="table-cell p-2 text-left font-semibold"
                style={{
                  width: "287.5px", // Width from GST Rate to Total
                  boxSizing: "border-box",
                }}
              >
                <div>Signature and Stamp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Row: Action Buttons */}
        {/* Action Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-4">
            {!isEditing ? (
              <button
                type="button"
                className="w-20 flex items-center justify-center gap-2 px-1 py-1 bg-[#CFFFCF] text-black font-bold rounded-lg shadow-md hover:bg-[#BFFFBF] text-sm"
                onClick={handleEditClick}
              >
                Edit <SquarePen className="text-black font-bold" size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="w-20 flex items-center justify-center gap-2 px-1 py-1 bg-[#56AAC5] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                Save
              </button>
            )}

            <button
              type="button"
              className="w-20 flex items-center justify-center gap-2 px-1 py-1 bg-[#FFCFCF] text-black font-bold rounded-lg shadow-md hover:bg-[#FFBFBF] text-sm"
              onClick={handleDownloadPDF}
            >
              PDF <Download className="font-bold" size={14} />
            </button>
          </div>

          <div className="flex gap-4">
            {/* OK Button */}
            <button
              type="button"
              className={`text-white py-1 px-10 rounded-lg ${
                isEditing
                  ? "bg-[#56AAC5] hover:bg-opacity-90"
                  : "bg-[#56AAC5] hover:bg-opacity-90"
              }`}
              disabled={isEditing}
              onClick={() => {
                handleViewDetails();
                setIsOkClicked(true); // Mark OK button as clicked
              }}
            >
              OK
            </button>

            {/* Cancel/Back Button */}
            <button
              type="button"
              className="bg-[#56AAC5] text-white py-1 px-7 rounded-lg hover:bg-opacity-90"
              onClick={() => {
                if (isEditing) {
                  formik.resetForm();
                  setIsEditing(false);
                } else {
                  handleViewDetails();
                }
              }}
            >
              {isEditing ? "Cancel" : isOkClicked ? "Back" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ViewDetailsPurchase;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuotation } from "../../../../hooks/inventory/useQuotation";
import UnisolServiceImg from "../../../../assets/images/unisolservices.png";
import { Download, SquarePen } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewDetailsQuotation = () => {
  const { id } = useParams();
  const { fetchQuotationById, quotationDetails, loading } = useQuotation();
  const navigate = useNavigate();
  console.log("quotationDetails", quotationDetails);

  useEffect(() => {
    if (id && (!quotationDetails || quotationDetails._id !== id)) {
      fetchQuotationById(id);
    }
  }, [id, fetchQuotationById, quotationDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quotationDetails) {
    return <div>No quotation data found</div>;
  }
  const handleViewDetails = async () => {
    navigate("/inventory/quotation");
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
      const filename = `${quotationDetails.to.customerName || "Quotation"
        }_Quotation.pdf`;

      // Save the PDF with compression
      pdf.save(filename);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF");
    }
  };

  return (
    <div
      className="bg-white shadow-md p-4 pb-1 rounded-lg"
      style={{
        width: "1857px",
        height: "957px",
        overflow: "auto",
      }}
    >
      <div id="pdf-content" className="border-t border-l border-r border-black">
        {/* Row 1: Header */}
        <div
          className="flex items-center border-b border-black"
          style={{ height: "100px" }}
        >
          {/* Column 1: Image */}
          <div
            className="flex justify-center items-center border-r border-black"
            style={{
              width: "414.5px",
              height: "100px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={UnisolServiceImg}
              alt="Unisol Services"
              style={{ maxHeight: "120%", maxWidth: "140%" }}
            />
          </div>
          {/* Column 2: Title */}
          <div
            className="flex justify-center items-center text-xl font-bold"
            style={{
              width: "calc(1857px - 413.33px)",
              boxSizing: "border-box",
            }}
          >
            Name of the Quotation
          </div>
        </div>

        {/* Row 2: Details */}
        <div
          className="flex border-b border-black"
          style={{
            height: "219px",
            boxSizing: "border-box",
          }}
        >
          {/* Column 1: To Details */}
          <div
            className="border-r border-black p-2 font-semibold"
            style={{
              width: "413.3px",
              boxSizing: "border-box",
            }}
          >
            <div className="font-bold mb-0">To,</div>
            <div className="text-base">{quotationDetails.to.customerName}</div>
            <div>{quotationDetails.to.address}</div>
            <div>{quotationDetails.to.cityStateZip}</div>
            <div>{quotationDetails.to.email}</div>
            <div>{quotationDetails.to.mobile}</div>
          </div>

          {/* Column 2: From Details */}
          <div
            className="border-r border-black p-2 pl-4 font-semibold text-left"
            style={{
              width: "413.33px",
              boxSizing: "border-box",
            }}
          >
            <div className="font-bold">From : </div>
            <div>{quotationDetails.from.companyName}</div>
            <div className="font-normal">
              <span className="font-semibold">Country:</span>{" "}
              {quotationDetails.from.companyCountry}
            </div>
            <div className="font-normal">
              <span className="font-semibold">State:</span>{" "}
              {quotationDetails.from.companyState}
            </div>
            <div className="font-normal">
              <span className="font-semibold">City:</span>{" "}
              {quotationDetails.from.companyCity}
            </div>
            <div className="font-normal">
              <span className="font-semibold">Address:</span>{" "}
              {quotationDetails.from.companyAddress},
            </div>
            <div className="font-normal">
              <span className="font-semibold">Email:</span>{" "}
              {quotationDetails.from.companyEmail}
            </div>
            <div className="font-normal">
              <span className="font-medium">Mobile:</span>{" "}
              {quotationDetails.from.companyMobile}
            </div>
          </div>

          {/* Column 3: Static Details */}
          <div
            className="border-r border-black p-2 text-base"
            style={{
              width: "413.33px",
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
              width: "calc(1857px - (416px + 413.33px + 413.33px))",
              boxSizing: "border-box",
            }}
          >
            <div className="font-semibold">
              <span className="">Quotation No.:</span>{" "}
              {quotationDetails.quotationNo}
            </div>
            <div className="">
              <span className="font-semibold">Quotation Date:</span>{" "}
              {new Date(quotationDetails.quotationDate).toLocaleDateString()}
            </div>
            <div className="font-semibold">
              <span className="">Validity of Quotation:</span>{" "}
              {(() => {
                const quotationDate = new Date(quotationDetails.quotationDate);
                const validityDate = new Date(quotationDetails.validity);
                const diffTime = Math.abs(validityDate - quotationDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays >= 365) {
                  const years = Math.floor(diffDays / 365);
                  const remainingDays = diffDays % 365;
                  return `${years} year(s)${remainingDays > 0 ? ` and ${remainingDays} day(s)` : ""
                    }`;
                } else if (diffDays >= 30) {
                  const months = Math.floor(diffDays / 30);
                  const remainingDays = diffDays % 30;
                  return `${months} month(s)${remainingDays > 0 ? ` and ${remainingDays} day(s)` : ""
                    }`;
                } else {
                  return `${diffDays} day(s)`;
                }
              })()}
            </div>
            <div className="font-bold">Terms & Conditions:</div>
            <div className="">
              <span className="font-semibold">Warranty:</span>{" "}
              {quotationDetails.termsAndConditions.warranty}
            </div>
            <div className="">
              <span className="font-semibold">Order Size:</span>{" "}
              {quotationDetails.termsAndConditions.orderSize}
            </div>
            <div>
              <span className="font-semibold">Payment Terms:</span>{" "}
              {quotationDetails.termsAndConditions.paymentTerms}
            </div>
          </div>
        </div>

        {/*Row 3: Table Header */}
        <div
          className="border-t border-black table"
          style={{
            height: "76px",
            boxSizing: "border-box",
            display: "table",
            width: "100%",
          }}
        >
          <div className="table-row">
            {/* First Set of Columns */}
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "42px", boxSizing: "border-box" }}
            >
              Sr No.
            </div>
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "141.5px", boxSizing: "border-box" }}
            >
              Product Code
            </div>
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "229px", boxSizing: "border-box" }}
            >
              Item Code Description of Goods
            </div>

            {/* Second Set of Columns */}
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "108.6px", boxSizing: "border-box" }}
            >
              Order Qty./Unit
            </div>
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "120.3px", boxSizing: "border-box" }}
            >
              UoM (Qty)
            </div>
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "183.7px", boxSizing: "border-box" }}
            >
              Special Price Taxable Value (Rs.)
            </div>

            {/* Third Set of Columns */}
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "137.7px", boxSizing: "border-box" }}
            >
              CGST Rate (%)
            </div>
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "137.7px", boxSizing: "border-box" }}
            >
              CGST Amt. (Rs.)
            </div>

            {/* Fourth Set of Columns */}
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "258px", boxSizing: "border-box" }}
            >
              SGST Rate (%)
            </div>
            <div
              className="table-cell border-r border-black text-center font-bold"
              style={{ width: "238.8px", boxSizing: "border-box" }}
            >
              SGST Amt (Rs.)
            </div>
            {/* Fourth Set of Columns */}
            {quotationDetails.from.companyState === "Maharashtra" && (
              <>
                <div
                  className="table-cell border-r border-black text-center font-bold"
                  style={{ width: "258px", boxSizing: "border-box" }}
                >
                  IGST Rate (%)
                </div>
                <div
                  className="table-cell border-r border-black text-center font-bold"
                  style={{ width: "238.8px", boxSizing: "border-box" }}
                >
                  IGST Amt (Rs.)
                </div>
              </>
            )}
            <div
              className="table-cell text-center font-bold"
              style={{ width: "119px", boxSizing: "border-box" }}
            >
              Total (Rs.) (Eaches)
            </div>
          </div>
        </div>

        {/*Row 4: Table Body */}
        <div
          className="border-t border-black table"
          style={{
            height: "182.25px",
            boxSizing: "border-box",
            display: "table",
            width: "100%",
          }}
        >
          {quotationDetails.items.map((item, index) => (
            <div className="table-row" key={item._id}>
              {/* 1st Column: Sr No. */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "42px", boxSizing: "border-box" }}
              >
                {index + 1}
              </div>

              {/* 2nd Column: Product Code (Unavailable, kept empty) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "142px", boxSizing: "border-box" }}
              >
                {/* Empty if not provided */}
              </div>

              {/* 3rd Column: Item Code Description of Goods (Unavailable, kept empty) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "230.5px", boxSizing: "border-box" }}
              >
                {/* Empty if not provided */}
              </div>

              {/* 4th Column: Order Qty./Unit */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "110px", boxSizing: "border-box" }}
              >
                {item.quantity || ""}
              </div>

              {/* 5th Column: UoM (Qty) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "120.8px", boxSizing: "border-box" }}
              >
                {/* Assuming unit is unavailable */}
              </div>

              {/* 6th Column: Special Price Taxable Value (Rs.) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "183px", boxSizing: "border-box" }}
              >
                {item.unitPrice || ""}
              </div>

              {/* 8th Column: CGST Rate (%) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "137.7px", boxSizing: "border-box" }}
              >
                {item.cgstRate || ""}
              </div>

              {/* 9th Column: CGST Amt (Rs.) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "137.7px", boxSizing: "border-box" }}
              >
                {item.cgstAmount || ""}
              </div>

              {/* 10th Column: SGST Rate (%) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "257.5px", boxSizing: "border-box" }}
              >
                {item.sgstRate || ""}
              </div>

              {/* 11th Column: SGST Amt (Rs.) */}
              <div
                className="table-cell border-r border-black text-center"
                style={{ width: "238.8px", boxSizing: "border-box" }}
              >
                {item.sgstAmount || ""}
              </div>

              {quotationDetails.from.companyState === "Maharashtra" && (
                <>
                  <div
                    className="table-cell border-r border-black text-center"
                    style={{ width: "258px", boxSizing: "border-box" }}
                  >
                    {item.igstRate || ""}
                  </div>
                  <div
                    className="table-cell border-r border-black text-center"
                    style={{ width: "238.8px", boxSizing: "border-box" }}
                  >
                    {item.igstAmount || ""}
                  </div>
                </>
              )}

              {/* 12th Column: Total (Rs.) (Eaches) */}
              <div
                className="table-cell text-center"
                style={{ width: "119.11px", boxSizing: "border-box" }}
              >
                {item.total || ""}
              </div>
            </div>
          ))}
        </div>

        {/*Row 5: Summary/Additional Info Row */}
        <div
          className="border-t border-black table"
          style={{
            height: "20.25px",
            boxSizing: "border-box",
            display: "table",
            width: "100%",
          }}
        >
          <div className="table-row">
            {/* 1st Column: Sr No. */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "42px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 2nd Column: Product Code */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "142.9px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 3rd Column: Item Code Description of Goods */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "230.4px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 4th Column: Order Qty./Unit */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "110.2px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 5th Column: UoM (Qty) */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "120.7px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 6th Column: Special Price Taxable Value (Rs.) */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "183px", boxSizing: "border-box" }}
            >
              {quotationDetails.subtotal || ""}
            </div>

            {/* 7th Column: Total */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "138.2px", boxSizing: "border-box" }}
            >
              {quotationDetails.netAmount || ""}
            </div>

            {/* 8th Column: CGST Rate (%) */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "138.2px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 9th Column: CGST Amt (Rs.) */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "137.8px", boxSizing: "border-box" }}
            >
              {quotationDetails.taxes ? quotationDetails.taxes / 2 : ""}
            </div>

            {/* 10th Column: SGST Rate (%) */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "257.5px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 11th Column: SGST Amt (Rs.) */}
            <div
              className="table-cell border-r border-black text-center"
              style={{ width: "238.3px", boxSizing: "border-box" }}
            >
              {quotationDetails.taxes ? quotationDetails.taxes / 2 : ""}
            </div>

            {/* 12th Column: Total (Rs.) (Eaches) */}
            <div
              className="table-cell text-center"
              style={{ width: "119.11px", boxSizing: "border-box" }}
            >
              {quotationDetails.netAmount || ""}
            </div>
          </div>
        </div>

        {/*Row 6: Summary Row with "In Words" and "Total (Tax Inclusive)" */}
        <div
          className="border-t border-black table"
          style={{
            height: "40.5px",
            boxSizing: "border-box",
            display: "table",
            width: "100%",
          }}
        >
          <div className="table-row">
            {/* 1st Column: "In Words (only)" */}
            <div
              className="table-cell border-r border-black text-right font-semibold"
              style={{
                width: "643.1px",
                boxSizing: "border-box",
                paddingRight: "10px",
              }}
            >
              In Words (only)
            </div>

            {/* 2nd Column: Empty */}
            <div
              className="table-cell border-r border-black"
              style={{ width: "322px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>

            {/* 3rd Column: "Total (Tax Inclusive)" */}
            <div
              className="table-cell border-r border-black text-center font-semibold"
              style={{ width: "770px", boxSizing: "border-box" }}
            >
              Total (Tax Inclusive)
            </div>

            {/* 4th Column: Empty */}
            <div
              className="table-cell"
              style={{ width: "119.11px", boxSizing: "border-box" }}
            >
              {/* Empty */}
            </div>
          </div>
        </div>

        {/*Row 7: Footer with "Authorised Signatory", "Bank Detail:", and "Other Services" */}
        <div
          className="border-t border-black table"
          style={{
            height: "53.17px",
            boxSizing: "border-box",
            display: "table",
            width: "100%",
          }}
        >
          <div className="table-row">
            {/* 1st Column: "Authorised Signatory" */}
            <div
              className="table-cell border-r border-black text-center font-semibold align-middle"
              style={{ width: "381.5px", boxSizing: "border-box" }}
            >
              Authorised Signatory
            </div>

            {/* 2nd Column: "Bank Detail:" */}
            <div
              className="table-cell border-r border-black text-center font-semibold align-middle"
              style={{ width: "513px", boxSizing: "border-box" }}
            >
              Bank Detail:
            </div>

            {/* 3rd Column: "Other Services" */}
            <div
              className="table-cell text-center font-semibold align-middle"
              style={{ width: "823.9px", boxSizing: "border-box" }}
            >
              Other Services
            </div>
          </div>
        </div>

        {/*Row 8: Footer with Bank Details and Additional Points */}
        <div
          className="border-t border-b border-black table"
          style={{
            height: "195.83px",
            boxSizing: "border-box",
            display: "table",
            width: "100%",
          }}
        >
          <div className="table-row">
            {/* 1st Column: Empty */}
            <div
              className="table-cell border-r border-black"
              style={{ width: "381.5px", boxSizing: "border-box" }}
            ></div>

            {/* 2nd Column: Bank Details */}
            <div
              className="table-cell border-r border-black p-2"
              style={{
                width: "512.5px",
                boxSizing: "border-box",
                whiteSpace: "pre-line",
              }}
            >
              <div className="">
                Name of the Bank: {quotationDetails.bankDetails.bankName}
              </div>
              <div>{quotationDetails.bankDetails.location || ""}</div>
              <div>Account Type: <span>{quotationDetails.bankDetails.accountType || ""}</span></div>
              <div>Account No. <span>{quotationDetails.bankDetails.accountNumber || ""}</span></div>
              <div>IFSC Code: {quotationDetails.bankDetails.ifscCode || ""}</div>
              <div> Branch Name: {quotationDetails.bankDetails.branchName || ""}</div>
              {/* <div> Bank Address:{" "}{quotationDetails.bankDetails.address || ""}</div> */}
            </div>

            {/* 3rd Column: Additional Points */}
            <div
              className="table-cell p-2"
              style={{
                width: "823.9px",
                boxSizing: "border-box",
                whiteSpace: "pre-line",
              }}
            >
              <div>
                <span className="font-semibold">1. Complaint:</span>For any out
                of box complaint please cast within 3 hours hum the stock record
                the mentioned numbers and email id on invoice.
              </div>
              <div>
                <span className="font-semibold">2. Product Training:</span>
                During installation of the machine, nominees will be trained on
                Handing Techniques and System operations at the customer site.
                If required, periodic training of the OR staff can be arranged.
              </div>
              <div>
                <span className="font-semibold">3. Stock Return:</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Last Row: Action Buttons */}
      <div
        className="border-l border-white flex justify-between items-center"
        style={{
          height: "40px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Left Side: PDF and Edit Buttons */}
        <div className="flex gap-4">
          {/* Edit Button */}
          <button className="w-20 flex items-center justify-center gap-2 px-1 py-1 bg-[#CFFFCF] text-black font-bold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#BFFFBF] text-sm">
            Edit <SquarePen className="text-black font-bold" size={14} />
          </button>
          {/* PDF Button */}
          <button
            className="w-20 flex items-center justify-center gap-2 px-1 py-1 bg-[#FFCFCF] text-black font-bold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#FFBFBF] text-sm"
            onClick={handleDownloadPDF}
          >
            PDF <Download className="font-bold" size={14} />
          </button>
        </div>

        {/* Right Side: OK and Cancel Buttons */}
        <div className="flex gap-4">
          {/* OK Button */}
          <button className="bg-[#56AAC5] text-white py-1 px-10 rounded-lg">
            OK
          </button>

          {/* Cancel Button */}
          {/*<NavLink to="/inventory/quotation" className="cursor-pointer">
            <button
              className="bg-[#56AAC5] text-white py-1 px-7 rounded-lg"
              onClick={handleViewDetails}
            >
              Cancel
            </button>
          </NavLink>*/}
          <button
            className="bg-[#56AAC5] text-white py-1 px-7 rounded-lg"
            onClick={handleViewDetails}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsQuotation;

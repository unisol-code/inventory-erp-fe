import { ChevronDown, Download, FileSpreadsheet, SquarePen, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useReports from "../../../hooks/reports/useReports";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DataTable from "react-data-table-component";

const columns = [
  { name: "Sales Person", selector: (row) => row.name, sortable: true },
  { name: "Distributer", selector: (row) => row.distributer, sortable: true },
  { name: "Product", selector: (row) => row.Product, sortable: true },
  { name: "Date", selector: (row) => row.date, sortable: false, },
  { name: "No. of Products Sold", selector: (row) => row.noOfProduct, sortable: false, },
  { name: "Region", selector: (row) => row.region, sortable: true },
  { name: "Company", selector: (row) => row.company, sortable: true },
];

const Reports = () => {
  const { fetchAllReports, allReport } = useReports();
  const navigate = useNavigate();
  console.log("allReport", allReport);

  useEffect(() => {
    fetchAllReports();
  }, []);

  const [sortedData, setSortedData] = useState(allReport);

  const handleSort = (column, sortDirection) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[column.selector(a)] < b[column.selector(b)]) return sortDirection === 'asc' ? -1 : 1;
      if (a[column.selector(a)] > b[column.selector(b)]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  };

  const handleGraphButton = () => {
    navigate("/reports/sellsreports");
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
      pdf.addImage(imageData, "JPEG", x, y, finalWidth, finalHeight,
      );

      const filename = `${allReport.map((r) => r.name).join(", ")}-sales-reports.pdf`;
      pdf.save(filename || "sales-reports.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF");
    }
  };

  return (
    <div
      className="p-2 min-h-screen"
      style={{ backgroundColor: "rgb(229, 228, 224)" }}
    >
      {/* Header Section */}
      <div className="p-4 rounded-lg bg-white">
        <div className="flex justify-between items-center gap-4">
          {/* First Item: Heading */}
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-black">All Reports</h1>
          </div>

          {/* Second Item: Button */}
          <div className="flex-1 flex justify-center">
            <button
              className="px-4 py-2 bg-[#56AAC5] text-white rounded font-semibold"
              onClick={handleGraphButton}
            >
              View in Graph
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div id="pdf-content" className="bg-white rounded-lg shadow mb-0 mt-3 pb-1 p-4">
        <DataTable
          title="All Reports"
          columns={columns}
          data={sortedData}
          onSort={handleSort}
          pagination
          highlightOnHover
        />
      </div>

      {/* Footer Section */}
      <div
        className="p-4 rounded-lg bg-white"
        style={{ backgroundColor: "rgb(229, 228, 224)" }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {/* PDF Button */}
            <button className="flex items-center justify-center gap-2 px-2 py-1 bg-[#FFCFCF] text-black font-semibold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#FFBFBF] text-sm"
             onClick={handleDownloadPDF}
            >
              PDF <Download className="font-bold" size={14} />
            </button>

            {/* Print Button */}
            <button className="flex items-center justify-center gap-2 px-2 py-1 bg-[#A6F7AE]/80 text-black font-semibold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#92E29C]/80 text-sm">
              Print <Printer size={14} />
            </button>
          </div>

          <div className="flex items-center bg-white rounded-lg">
            {/* Previous Button */}
            <button className="px-2 py-1 border border-gray-300 text-gray-500 bg-white rounded-bl-md rounded-tl-md text-sm">
              &lt;
            </button>

            {/* Page Numbers */}
            {[1, 2, 3, "...", 8, 9, 10].map((item, index) => (
              <button
                key={index}
                className={`px-2 py-1 text-sm
        ${item === 1 // Replace `1` with the dynamic selected page
                    ? "border border-blue-500 text-blue-600 bg-blue-500/40"
                    : "border border-gray-300 text-gray-500 bg-white"
                  }`}
              >
                {item}
              </button>
            ))}

            {/* Next Button */}
            <button className="px-2 py-1 border border-gray-300 text-gray-500 bg-white rounded-tr-md rounded-br-md text-sm">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

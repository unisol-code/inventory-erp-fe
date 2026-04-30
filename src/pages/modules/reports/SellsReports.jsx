import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronLeft,
  Download,
  Printer,
  Share2,
  FilterIcon,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useReports from "../../../hooks/reports/useReports";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SellsReports = () => {
  const {
    salesByCompany,
    fetchSalesByCompany,
    fetchSalesByProduct,
    salesByProduct,
    fetchSalesByRegion,
    salesByRegion,
    loading,
    fetchSaleBySalesPerson,
    saleBySalesPerson,
  } = useReports();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalesByCompany();
    fetchSalesByProduct();
    fetchSalesByRegion();
    fetchSaleBySalesPerson();
  }, []);

  const handleNavigateToReports = () => {
    navigate(-1);
  };

  const [isModalOpenSalesPerson, setIsModalOpenSalesPerson] = useState(false);
  const toggleModalSalesPerson = () => {
    setIsModalOpenSalesPerson(!isModalOpenSalesPerson);
  };

  const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
  const toggleModalProduct = () => {
    setIsModalOpenProduct(!isModalOpenProduct);
  };

  const [isModalOpenRegion, setIsModalOpenRegion] = useState(false);
  const toggleModalRegion = () => {
    setIsModalOpenRegion(!isModalOpenRegion);
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

      const filename = "sellsReports.pdf";

      // Save the PDF with compression
      pdf.save(filename);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF");
    }
  };

  const handleSharePDF = async () => {
    const targetDiv = document.getElementById("pdf-content");

    if (!targetDiv) {
      alert("Div not found!");
      return;
    }

    try {
      // Capture the content of the div as a canvas
      const canvas = await html2canvas(targetDiv, {
        scale: 1.8,
        useCORS: true,
      });

      // Convert the canvas to an image
      const imageData = canvas.toDataURL("image/jpeg");

      // Create a new PDF instance
      const pdf = new jsPDF("l", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imageAspectRatio = canvas.width / canvas.height;
      let finalWidth, finalHeight;

      if (imageAspectRatio > pdfWidth / pdfHeight) {
        finalWidth = pdfWidth;
        finalHeight = pdfWidth / imageAspectRatio;
      } else {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * imageAspectRatio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imageData, "JPEG", x, y, finalWidth, finalHeight);
      const blob = pdf.output("blob");

      // Use Web Share API
      if (navigator.share) {
        const file = new File([blob], "sellsReports.pdf", {
          type: "application/pdf",
        });

        await navigator.share({
          files: [file],
          title: "Sells Report",
          text: "Check out this sells report!",
        });
      } else {
        alert("Web Share API is not supported on your browser.");
      }
    } catch (error) {
      console.error("Failed to share PDF", error);
      alert("Failed to share PDF");
    }
  };

  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        @page {
          size: auto;
          margin: 15mm;
        }
        
        /* Expand the main content area */
        body,
        main,
        .container,
        .content-wrapper {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Target the grid container */
        .grid {
          display: grid !important;
          width: 1200px !important;
          max-width: 1200px !important;
          grid-auto-rows: auto !important;
        }
        
        /* Target first and third cards to span full width */
        .grid > div:first-child,
        .grid > div:last-child {
          grid-column: 1 / -1 !important;
          width: 100% !important;
        }
        
        /* Target middle two cards to be side by side */
        .grid > div:nth-child(2),
        .grid > div:nth-child(3) {
          grid-column: span 1 !important;
          width: 100% !important;
        }
        
        /* Scale content */
        body {
          transform: scale(0.8);
          transform-origin: top left;
        }
        
        /* Hide print button */
        button {
          display: none !important;
        }
        
        /* Ensure all content is visible */
        * {
          overflow: visible !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="pt-2 p-6 min-h-screen"
      style={{ backgroundColor: "rgb(229, 228, 224)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* First Item: Title with Chevron (Stacked Vertically) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNavigateToReports}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">All Sells Report</h1>
        </div>

        {/* Second Item: Date Range and Company */}
        <div className="flex flex-col items-center gap-3">
          {/* First Sub-item: Date Range */}
          <div className="flex items-center gap-4">
            <span className="text-sm">From</span>
            <input type="date" className="border rounded px-2 py-1" />
            <span className="text-sm">To</span>
            <input type="date" className="border rounded px-2 py-1" />
          </div>

          {/* Second Sub-item: ABC Global */}
          <div className="flex gap-4 mr-20">
            <div className="border border-black bg-white px-6 py-1 rounded text-lg">
              ABC Global
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-6 gap-6" id="pdf-content">
        {/* First Item: All Charts */}
        <div className="col-span-6 space-y-6">
          {/* Sales Trend Chart - Takes up full width */}
          <div className="bg-white p-4 px-8 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {new Date().getFullYear()} Sells Trends
              </h2>
              <h2 className="text-xl font-semibold">Sales by Company</h2>
              <h2 className="text-lg font-semibold w-[110px]"></h2>
            </div>
            <div className="w-full overflow-x-auto scrollbar-hide">
              <LineChart
                width={1200}
                height={250}
                data={salesByCompany}
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
              >
                <XAxis dataKey="month" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2196F3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </div>
          </div>

          {/* Container for the other charts, using 2 columns */}
          <div className="grid grid-cols-2 gap-6">
            {/* Sales by SalesPerson Chart */}
            <div className="bg-white p-4 rounded-lg shadow relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-center font-medium flex-grow">
                  Sales by SalesPerson
                </h2>
                <button
                  onClick={toggleModalSalesPerson}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Expand chart"
                >
                  <Maximize2 size={20} />
                </button>
              </div>

              {/* Main Bar Chart */}
              <BarChart
                width={450}
                height={300}
                data={saleBySalesPerson}
                layout="vertical"
                margin={{ right: 30 }}
              >
                <XAxis type="number" axisLine={false} tick={false} />
                <YAxis
                  dataKey="salesPerson"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{
                    textAnchor: "start",
                    dx: -70,
                    fontSize: 13,
                    fontWeight: 500,
                    fill: "#333",
                  }}
                />
                <Tooltip />
                <Bar dataKey="sales" fill="#70AD46">
                  <LabelList
                    dataKey="sales"
                    position="right"
                    formatter={(value) =>
                      new Intl.NumberFormat("en-US").format(value)
                    }
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fill: "#333",
                    }}
                    offset={5}
                  />
                </Bar>
              </BarChart>

              {/* Modal */}
              {isModalOpenSalesPerson && (
                <div
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={toggleModalSalesPerson}
                >
                  <div
                    className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="sticky top-0 bg-white z-10 p-4 border-b">
                      <div className="relative flex items-center justify-center">
                        <h2 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                          Sales by SalesPerson
                        </h2>
                        <button
                          onClick={toggleModalSalesPerson}
                          className="text-gray-600 hover:text-gray-900 ml-auto"
                          aria-label="Close modal"
                        >
                          <Minimize2 size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="w-full flex justify-center">
                        <BarChart
                          width={800}
                          height={600}
                          data={saleBySalesPerson}
                          layout="vertical"
                          margin={{ right: 30 }}
                        >
                          <XAxis type="number" axisLine={false} tick={false} />
                          <YAxis
                            dataKey="salesPerson"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={150}
                            tick={{
                              textAnchor: "start",
                              dx: -70,
                              fontSize: 14,
                              fontWeight: 500,
                              fill: "#333",
                            }}
                          />
                          <Tooltip />
                          <Bar dataKey="sales" fill="#70AD46">
                            <LabelList
                              dataKey="sales"
                              position="right"
                              formatter={(value) =>
                                new Intl.NumberFormat("en-US").format(value)
                              }
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fill: "#333",
                              }}
                              offset={5}
                            />
                          </Bar>
                        </BarChart>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <style jsx global>{`
                .overflow-y-auto {
                  scrollbar-width: none; /* Firefox */
                  -ms-overflow-style: none; /* Internet Explorer 10+ */
                }
                .overflow-y-auto::-webkit-scrollbar {
                  display: none; /* WebKit */
                }
              `}</style>
            </div>

            {/* Sales by Product Chart */}
            <div className="bg-white p-4 rounded-lg shadow relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-center font-medium flex-grow">
                  Sales by Product
                </h2>
                <button
                  onClick={toggleModalProduct}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Expand chart"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
              <BarChart
                width={450}
                height={300}
                data={salesByProduct}
                layout="vertical"
                margin={{ right: 30 }}
              >
                <XAxis type="number" axisLine={false} tick={false} />
                <YAxis
                  dataKey="product"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{
                    textAnchor: "start",
                    dx: -70,
                    fontSize: 13,
                    fontWeight: 500,
                    fill: "#333",
                  }}
                />
                <Tooltip />
                <Bar dataKey="sales" fill="#FDDA65">
                  <LabelList
                    dataKey="sales"
                    position="right"
                    formatter={(value) =>
                      new Intl.NumberFormat("en-US").format(value)
                    }
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fill: "#333",
                    }}
                    offset={5}
                  />
                </Bar>
              </BarChart>
              {/* Product Modal */}
              {isModalOpenProduct && (
                <div
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={toggleModalProduct}
                >
                  <div
                    className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="sticky top-0 bg-white z-10 p-4 border-b">
                      <div className="relative flex items-center justify-center">
                        <h2 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                          Sales by Product
                        </h2>
                        <button
                          onClick={toggleModalProduct}
                          className="text-gray-600 hover:text-gray-900 ml-auto"
                          aria-label="Close modal"
                        >
                          <Minimize2 size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="w-full flex justify-center">
                        <BarChart
                          width={800}
                          height={600}
                          data={salesByProduct}
                          layout="vertical"
                          margin={{ right: 30 }}
                        >
                          <XAxis type="number" axisLine={false} tick={false} />
                          <YAxis
                            dataKey="product"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            width={150}
                            tick={{
                              textAnchor: "start",
                              dx: -70,
                              fontSize: 14,
                              fontWeight: 500,
                              fill: "#333",
                            }}
                          />
                          <Tooltip />
                          <Bar dataKey="sales" fill="#FDDA65">
                            <LabelList
                              dataKey="sales"
                              position="right"
                              formatter={(value) =>
                                new Intl.NumberFormat("en-US").format(value)
                              }
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fill: "#333",
                              }}
                              offset={5}
                            />
                          </Bar>
                        </BarChart>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sales by Region Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-center flex-grow">
                Sales by Region
              </h2>
              <button
                onClick={toggleModalRegion}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Expand chart"
              >
                <Maximize2 size={20} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByRegion} margin={{ top: 20 }}>
                <XAxis
                  dataKey="region"
                  axisLine={true}
                  tickLine={false}
                  tick={{
                    fontSize: 13,
                    fontWeight: 500,
                    fill: "#333",
                  }}
                />
                <Tooltip />
                <Bar dataKey="sales" fill="#F4B184">
                  <LabelList
                    dataKey="sales"
                    position="top"
                    formatter={(value) =>
                      new Intl.NumberFormat("en-US").format(value)
                    }
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fill: "#333",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Region Modal */}
            {isModalOpenRegion && (
              <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={toggleModalRegion}
              >
                <div
                  className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 bg-white z-10 p-4 border-b">
                    <div className="relative flex items-center justify-center">
                      <h2 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                        Sales by Region
                      </h2>
                      <button
                        onClick={toggleModalRegion}
                        className="text-gray-600 hover:text-gray-900 ml-auto"
                        aria-label="Close modal"
                      >
                        <Minimize2 size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="w-full flex justify-center">
                      <ResponsiveContainer width="95%" height={600}>
                        <BarChart data={salesByRegion} margin={{ top: 20 }}>
                          <XAxis
                            dataKey="region"
                            axisLine={true}
                            tickLine={false}
                            tick={{
                              fontSize: 14,
                              fontWeight: 500,
                              fill: "#333",
                            }}
                          />
                          <Tooltip />
                          <Bar dataKey="sales" fill="#F4B184">
                            <LabelList
                              dataKey="sales"
                              position="top"
                              formatter={(value) =>
                                new Intl.NumberFormat("en-US").format(value)
                              }
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fill: "#333",
                              }}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center gap-4 mt-6">
            <button
              className="w-20 flex items-center justify-center gap-2 px-2 py-1 bg-[#FFCFCF] text-black font-semibold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#FFBFBF] text-sm"
              onClick={handleDownloadPDF}
            >
              PDF <Download size={14} />
            </button>
            <button
              className="w-20 flex items-center justify-center gap-2 px-2 py-1 bg-[#A6F7AE]/80 text-black font-semibold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#92E29C]/80 text-sm"
              onClick={handleSharePDF}
            >
              Share <Share2 size={14} />
            </button>
            <button
              className="w-20 flex items-center justify-center gap-2 px-2 py-1 bg-[#A6F7AE]/80 text-black font-semibold rounded-lg shadow-[0px_4px_4.2px_0px_#00000040] hover:bg-[#92E29C]/80 text-sm"
              onClick={handlePrint}
            >
              Print <Printer size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellsReports;

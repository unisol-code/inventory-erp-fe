import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import InventoryDashboard from "./pages/modules/dashboard/InventoryDashboard";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AllInventory from "./pages/modules/inventory/allInventory/AllInventory";
import WarehouseManagement from "./pages/modules/warehouseManagement/WarehouseManagement";
import ProductManagement from "./pages/modules/product/productManagement/ProductManagement";
import Replenishment from "./pages/modules/replenishment/Replenishment";
import VendorManagement from "./pages/modules/vendorManagement/VendorManagement";
import ClientManagement from "./pages/modules/clientManagement/ClientManagement";
import TenderManagement from "./pages/modules/tenderManagement/TenderManagement";
import InventoryTracking from "./pages/modules/inventory/inventoryTracking/InventoryTracking";
import Quotation from "./pages/modules/inventory/quotation/Quotation";
import ViewDetailsQuotation from "./pages/modules/inventory/quotation/ViewDetailsQuotation";
import Proposals from "./pages/modules/inventory/proposals/Proposals";
import PurchaseOrder from "./pages/modules/product/purchaseOrder/PurchaseOrder";
import ViewDetailsPurchase from "./pages/modules/product/purchaseOrder/ViewDetailsPurchase";
import Reports from "./pages/modules/reports/Reports";
import SellsReports from "./pages/modules/reports/SellsReports";
import ConfirmPassword from "./pages/auth/confirmPassword/confirmPassword";
import VerifyOtp from "./pages/auth/verifyOtp/verifyOtp";
import TenderDocuments from "./pages/modules/tenderManagement/TenderDocuments";
import ResetPassword from "./pages/auth/resetPassword/resetPassword";

function App() {
  const [activeTab, setActiveTab] = useState("/inventory-dashboard");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* -----Password Reset Page----- */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* -----Verify OTP Page----- */}
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* -----Password confirm Page----- */}
        <Route path="/confirm-password" element={<ConfirmPassword />} />

        <Route element={<ProtectedRoute />}>

          {/* inventory-dashboard */}
          <Route
            path="/inventory-dashboard"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <InventoryDashboard />
              </SuperAdminLayout>
            }
          />
          {/* inventory */}
          <Route
            path="/inventory"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <AllInventory />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/inventory/inventory-tracking"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <InventoryTracking />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/inventory/quotation"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <Quotation />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/inventory/quotations/:id"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <ViewDetailsQuotation />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/inventory/proposals"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <Proposals />
              </SuperAdminLayout>
            }
          />
          {/* WareHouse Management */}
          <Route
            path="/warehouse-management"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <WarehouseManagement />0
              </SuperAdminLayout>
            }
          />
          {/* Product */}
          <Route
            path="/product"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <ProductManagement />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/product/product-order"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <PurchaseOrder />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/product/product-order/:id"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <ViewDetailsPurchase />
              </SuperAdminLayout>
            }
          />
          {/* Replenishment */}
          <Route
            path="/replenishment"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <Replenishment />
              </SuperAdminLayout>
            }
          />
          {/* Vendor Management */}
          <Route
            path="/vendor-management"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <VendorManagement />
              </SuperAdminLayout>
            }
          />
          {/* Client Management */}
          <Route
            path="/client-management"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <ClientManagement />
              </SuperAdminLayout>
            }
          />
          {/* Tender Management */}
          <Route
            path="/tender-management"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <TenderManagement />
              </SuperAdminLayout>
            }
          />
          {/* --- Tender management View Documents --- */}
          <Route
            path="/tender-management-documents/:id"
            element={
              <SuperAdminLayout>
                <TenderDocuments />
              </SuperAdminLayout>
            }
          />
          {/* Reports */}
          <Route
            path="/reports"
            element={
              <SuperAdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                <Reports />
              </SuperAdminLayout>
            }
          />
          <Route
            path="/reports/sellsreports"
            element={
              <SuperAdminLayout hideSidebarAndHeader={true}>
                <SellsReports />
              </SuperAdminLayout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

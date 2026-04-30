import React from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config/index";
import { toast } from "react-toastify";
import {
  allProductsNoAtom,
  getSrNoForPurchaseAtom,
  purchaseAllOrderAtom,
  purchaseOrderByIdAtom,
  purchaseOrderTermsAtom,
  updatePurchaseOrderDetailsAtom,
} from "../../state/product/purchaseManagementState";

const usePurchase = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);

  const [srNoPurchase, setSrNoPurchases] = useRecoilState(
    getSrNoForPurchaseAtom
  );
  const [purchaseOrders, setPurchaseOrders] =
    useRecoilState(purchaseAllOrderAtom);
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useRecoilState(
    purchaseOrderByIdAtom
  );
  const [purchaseOrderTerms, setPurchaseOrderTerms] = useRecoilState(
    purchaseOrderTermsAtom
  );
  const [allProductsNo, setAllProductsNo] = useRecoilState(allProductsNoAtom);
  const [updatePurchaseOrderDetails, setUpdatePurchaseOrderDetails] =
    useRecoilState(updatePurchaseOrderDetailsAtom);

  const fetchSrNoPurchase = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}purchase-orders/getSrNoForPurchase`,
      });
      if (res) {
        setSrNoPurchases(res);
      }
    } catch (error) {
      console.error("Error while fetching Serial Number for Purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPurchaseOrders = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}purchase-orders/getAllPurchaseOrders?page=${page}&limit=${limit}`,
      });
      if (res?.data) {
        setPurchaseOrders(res.data);
        console.log("All Purchase Order Details:", res.data);
      }
    } catch (error) {
      console.error("Error while fetching purchase orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseOrderById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}purchase-orders/getOrderById/${id}`,
      });
      if (res) {
        setPurchaseOrderDetails(res);
        console.log("Purchase Order Details:", res);
      }
    } catch (error) {
      console.error("Error while fetching Purchase Order by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPurchaseOrder = async (data) => {
    setLoading(true);
    try {
      const response = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}purchase-orders/createPurchaseOrder`,
        data: data,
      });

      console.log("API Response:", response); // Log the response here

      if (response?.success) {
        const successMessage =
          success.response?.data?.message ||
          "Purchase Order Created Successfully";
        toast.success(successMessage);
        //toast.success(response?.message);
        fetchAllPurchaseOrders(); // Refresh purchase orders list
      } else {
        throw new Error(response?.message || "Failed to create purchase order");
      }
    } catch (error) {
      console.error("Error creating purchase order:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchPurchaseOrders = async (filters) => {
    setLoading(true);
    try {
      if (!filters) {
        throw new Error("No filters provided");
      }

      const params = new URLSearchParams(filters).toString();
      const url = `${conf.apiBaseUrl}purchase-orders/getAllPurchaseOrders?${params}`;

      const res = await fetchData({
        method: "GET",
        url: url,
      });

      if (res?.data) {
        setPurchaseOrders(res.data);
        console.log("Filtered Purchase Order Details:", res.data);
      } else {
        console.warn("No data found or unexpected response structure");
        setPurchaseOrders([]); // Clear the list if no results
      }
    } catch (error) {
      console.error("Error while searching purchase orders:", error);
      setPurchaseOrders([]); // Ensure list is cleared on error
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseOrderByOrderNo = async (orderNo) => {
    try {
      if (!orderNo) {
        throw new Error("No order number provided");
      }

      const url = `${conf.apiBaseUrl}purchase-orders/findOrdersByQueryParams?poOrderNo=${orderNo}`;

      const res = await fetchData({
        method: "GET",
        url: url,
      });

      if (res) {
        console.log("Specific Purchase Order Details:", res);
        // Optionally set specific order details if needed
        setPurchaseOrderDetails(res);
      } else {
        console.warn("No details found for the given order number");
      }
    } catch (error) {
      console.error("Error while fetching Specific Purchase Order:", error);
    }
  };

  const fetchPurchaseOrderTerms = async () => {
    setLoading(true);
    try {
      const url = `${conf.apiBaseUrl}purchase-orders/getTermsAndConditions`;
      const res = await fetchData({
        method: "GET",
        url: url,
      });

      if (res?.terms) {
        setPurchaseOrderTerms(res.terms);
        console.log("Purchase Order Terms:", res.terms);
        return res.terms;
      } else {
        console.warn("No terms and conditions found");
        setPurchaseOrderTerms([]);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching Purchase Order Terms:", error);
      setPurchaseOrderTerms([]);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProductSerialNo = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getAllSerialNumbers`,
      });
      if (res) {
        setAllProductsNo(res?.data);
      }
    } catch (error) {
      console.error("Error while fetching All Product Serial No:", error);
    } finally {
      setLoading(false);
    }
  };

  const UpdatePurchaseOrderDetailsById = async (id, data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}purchase-orders/updateOrder/${id}`,
        data: data,
      });
      if (res) {
        setLoading(false);
        setUpdatePurchaseOrderDetails(res);
        console.log("Updated Purchase Order Details:", res);
      }
    } catch (error) {
      console.error("Error while updating Purchase Order details:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchAllProductSerialNo,
    allProductsNo,
    fetchSrNoPurchase,
    srNoPurchase,
    fetchAllPurchaseOrders,
    purchaseOrders,
    fetchPurchaseOrderById,
    purchaseOrderDetails,
    fetchSearchPurchaseOrders,
    fetchPurchaseOrderByOrderNo,
    fetchPurchaseOrderTerms,
    purchaseOrderTerms,
    createPurchaseOrder,
    UpdatePurchaseOrderDetailsById,
    updatePurchaseOrderDetails,
  };
};

export default usePurchase;

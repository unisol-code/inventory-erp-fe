import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config/index";
import {
  allCompanyAtom,
  totalInventoryValueAtom,
  totalOrderAtom,
  recentOrdersAtom,
  replenishmentActionsAtom,
  lowInventoryProductAtom,
  latestQuotationAtom,
  latestTenderAtom,
  warehousePercentagesAtom,
} from "../../state/dashboard/dashboardState";
const useDashboard = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [allCompany, setAllCompany] = useRecoilState(allCompanyAtom);
  const [totalInventoryValue, setTotalInventoryValue] = useRecoilState(
    totalInventoryValueAtom
  );
  const [totalOrder, setTotalOrder] = useRecoilState(totalOrderAtom);
  const [recentOrders, setRecentOrders] = useRecoilState(recentOrdersAtom);
  const [replenishmentActions, setReplenishmentActions] = useRecoilState(
    replenishmentActionsAtom
  );
  const [lowInventoryProduct, setLowInventoryProduct] = useRecoilState(
    lowInventoryProductAtom
  );
  const [latestQuotation, setLatestQuotation] =
    useRecoilState(latestQuotationAtom);
  const [latestTender, setLatestTender] = useRecoilState(latestTenderAtom);
  const [warehousePercentages, setWarehousePercentages] = useRecoilState(
    warehousePercentagesAtom
  );

  const fetchAllCompany = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}company/getAllCompanies`,
      });
      if (res) {
        setLoading(false);
        setAllCompany(res);
      }
    } catch (error) {
      console.error("Error while fetching Company List:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalInventoryValue = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/totalInventoryValue`,
      });
      if (res) {
        setLoading(false);
        setTotalInventoryValue(res);
      }
    } catch (error) {
      console.error("Error while fetching InventoryValue:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalOrder = async (filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/totalOrder?${params}`,
      });
      if (res) {
        setLoading(false);
        setTotalOrder(res);
      }
    } catch (error) {
      console.error("Error while fetching TotalOrder:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async (filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/getRecentOrders?${params}`,
      });
      if (res) {
        setLoading(false);
        setRecentOrders(res);
      }
    } catch (error) {
      console.error("Error while fetching RecentOrders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplenishmentActions = async (filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/getReplenishmentActions?${params}`,
      });
      if (res) {
        setLoading(false);
        setReplenishmentActions(res);
      }
    } catch (error) {
      console.error("Error while getting ReplenishmentActions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLowInventoryProduct = async (filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/lowInventoryProduct?${params}`,
      });
      if (res) {
        setLoading(false);
        setLowInventoryProduct(res);
      }
    } catch (error) {
      console.error("Error while getting lowInventoryProduct:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestQuotation = async (page, limit) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/getLatestQuotation?${params}`,
      });
      if (res) {
        setLoading(false);
        setLatestQuotation(res);
      }
    } catch (error) {
      console.error("Error while fetching LatestQuotation:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestTender = async (page, limit) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}dashboard/getLatestTender?${params}`,
      });
      if (res) {
        setLoading(false);
        setLatestTender(res);
      }
    } catch (error) {
      console.error("Error while fetching LatestTender:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWarehousePercentages = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}warehouse/getWarehousePercentages`,
      });
      if (res) {
        console.log("warehouse percentage response", res);
        setLoading(false);
        setWarehousePercentages(res);
      }
    } catch (error) {
      console.error("Error while fetching WarehousePercentages:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchAllCompany,
    fetchTotalInventoryValue,
    fetchTotalOrder,
    fetchRecentOrders,
    fetchReplenishmentActions,
    fetchLowInventoryProduct,
    fetchLatestQuotation,
    fetchLatestTender,
    fetchWarehousePercentages,
    allCompany,
    totalInventoryValue,
    totalOrder,
    recentOrders,
    replenishmentActions,
    lowInventoryProduct,
    latestQuotation,
    latestTender,
    warehousePercentages,
  };
};

export default useDashboard;

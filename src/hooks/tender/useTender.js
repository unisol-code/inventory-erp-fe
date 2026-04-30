import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import conf from "../../config/index";
import { toast } from "react-toastify";
import {
  getTendersAtom,
  createTendersAtom,
  getTenderByIdAtom,
  getNewSrNumberAtom,
  getStockNameAtom,
  updateTenderAtom,
} from "../../state/tenderState/tenderStateAtom";

export const useTender = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [tenders, setTenders] = useRecoilState(getTendersAtom);
  const [stockName, setStockName] = useRecoilState(getStockNameAtom);
  const [create, setCreate] = useRecoilState(createTendersAtom);
  const [tenderById, setTenderById] = useRecoilState(getTenderByIdAtom);
  const [newSrNumber, setNewSrNumber] = useRecoilState(getNewSrNumberAtom);
  const [editTender, setEditTender] = useRecoilState(updateTenderAtom);

  const fetchTenderList = async (page = 1, limit = 10, searchTerm = "") => {
    console.log("hook data: ", searchTerm);
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
        ...(searchTerm && { tenderID: searchTerm }), // Conditionally add search parameter
      });

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}tenders/getAllTenders?${params}`,
      });

      if (res) {
        setTenders(res);
      }
    } catch (error) {
      console.error("Error while fetching Tender List:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockName = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getStockNames`,
      }).then((res) => {
        if (res) {
          setStockName(res);
        }
      });
    } catch (error) {
      console.error("Error while fetching Stock Name:", error);
      setLoading(false);
    }
  };

  const createTender = async (data) => {
    console.log("createTender Called with Data:", data);

    setLoading(true);
    try {
      console.log("Attempting to fetch data");

      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}tenders/createTender`,
        data: data,
      });

      console.log("API Response:", res);

      if (res?.success) {
        console.log("Tender Creation Successful");
        toast.success(res?.message);
        // Optional: Close modal or reset form
        //onClose && onClose();
      } else {
        console.error("Tender Creation Failed", res);
        toast.error(res?.message || "Failed to create tender");
      }
    } catch (error) {
      console.error("Error while Creating Tender:", error);
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchTenderById = async (id) => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}tenders/getTenderById/${id}`,
      }).then((res) => {
        if (res) {
          setTenderById(res);
        }
      });
    } catch (error) {
      console.error("Error while fetching Tender List:", error);
      setLoading(false);
    }
  };

  const fetchNewSrNumber = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}tenders/getSrNoForTender`,
      }).then((res) => {
        if (res) {
          setNewSrNumber(res);
        }
      });
    } catch (error) {
      console.error("Error while fetching Sr no. :", error);
      setLoading(false);
    }
  };

  const updateTender = async (id, data) => {
    setLoading(true);
    console.log("🔍 Update Tender - Input ID:", id);
    console.log("🔍 Update Tender - Input Data:", data);

    try {
      const cleanData = {
        ...data,
        tenderID: data.tenderID,
      };

      console.log("🧹 Clean Data Payload:", cleanData);

      fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}tenders/updateTender/${id}`,
        data: cleanData,
      }).then((res) => {
        setEditTender(res);
        console.log("🌟 API Full Response:", res);
        if (res?.success) {
          toast.success(res?.message);
        }
      });
    } catch (error) {
      console.error("Error updating:", error);
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "An unexpected error occurred"
      );
      setLoading(false);
    }
  };

  return {
    loading,
    fetchTenderList,
    tenders,
    createTender,
    create,
    fetchStockName,
    stockName,
    fetchTenderById,
    tenderById,
    fetchNewSrNumber,
    newSrNumber,
    updateTender,
    editTender,
  };
};

export default useTender;

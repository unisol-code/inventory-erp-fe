import { useState } from "react";
import { useRecoilState } from "recoil";
import conf from "../../config/index";
import useFetch from "../useFetch";
import { confirmAlert } from "../../utils/alertToast";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  bankDetailsAtom,
  bankNamesAtom,
  customerNameAtom,
  quotationByIdAtom,
  quotationListAtom,
  quotationSrNoAtom,
  termsConditionAtom,
} from "../../state/inventory/quotationState";

export const useQuotation = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [quotationsList, setQuotationsList] = useRecoilState(quotationListAtom);
  const [quotationDetails, setQuotationDetails] =
    useRecoilState(quotationByIdAtom);
  const [quotationSrNo, setQuotationSrNo] = useRecoilState(quotationSrNoAtom);
  const [customerName, setCustomerName] = useRecoilState(customerNameAtom);
  const [bankNames, setBankNames] = useRecoilState(bankNamesAtom);
  const [bankDetails, setBankDetails] = useRecoilState(bankDetailsAtom);
  const [termsCondition, setTermsCondition] =
    useRecoilState(termsConditionAtom);

  const fetchQuotationList = async (page = 1, limit = 10, searchTerm = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
        ...(searchTerm && { quotationName: searchTerm }), // Conditionally add search parameter
      });

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}quotations/getAllQuotation?${params}`,
      });

      if (res) {
        setQuotationsList(res?.data);
      }
    } catch (error) {
      console.error("Error while fetching Quotation List:", error);
    } finally {
      setLoading(false);
    }
  };

  /*const fetchSearchQuotation = async (filters) => {
    setLoading(true);
    try {
      if (!filters) {
        throw new Error("No filters provided");
      }
      const params = new URLSearchParams(filters).toString();
      const url = `${conf.apiBaseUrl}quotations/getAllQuotation?${params}`;
      const response = await fetchData({
        method: "GET",
        url: url,
      });
      if (response?.success) {
        setQuotationsList(response?.data);
      } else {
        throw new Error(response?.message || "Failed to fetch quotation list");
      }
    } catch (error) {
      console.error("Error while fetching Quotation List:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };*/

  const fetchQuotationSrNo = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}quotations/getSrNoForQuotation`,
      });
      if (res) {
        setQuotationSrNo(res);
      }
    } catch (error) {
      console.error("Error while fetching Quotation List:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotationById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}quotations/getQuotationById/${id}`,
      });
      if (res) {
        setQuotationDetails(res);
        console.log("QuotationId Details:", res);
      }
    } catch (error) {
      console.error("Error while fetching Quotation by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const createQuotation = async (data) => {
    setLoading(true);
    try {
      const response = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}quotations/createQuotation`,
        data: data,
      });
      if (response?.success) {
        toast.success(response?.message);
        fetchQuotationList();
      } else {
        // If not successful, throw an error
        throw new Error(response?.message || "Failed to create quotation");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const updateQuotation = async (id, data) => {
    setLoading(true);
    try {
      fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}quotations/updateQuotation/${id}`,
        data: data,
      }).then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating ", error);
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  const deleteQuotation = async (id) => {
    const result = await confirmAlert(
      "Do you really want to delete this quotation?"
    );

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "PUT",
          url: `${conf.apiBaseUrl}quotations/deleteQuotationById/${id}`,
        });
        if (res?.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            confirmButtonText: "Okay",
          });
          fetchQuotationList();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error while deleting Quotation:", error);
        toast.error(error?.response?.data?.error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetQuotation = () => {
    setQuotationDetails(null);
  };

  const fetchCustomerName = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}quotations/getCustomerNames`,
      });
      if (res?.success) {
        setCustomerName(res?.data);
      }
    } catch (error) {
      console.error("Error while fetching Quotation by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankName = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}bank/getBanksName`,
      });
      if (res?.success) {
        setBankNames(res?.banks);
      }
    } catch (error) {
      console.error("Error while fetching Quotation by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}bank/getBankById/${id}`,
      });
      if (res?.success) {
        setBankDetails(res?.bank);
      }
    } catch (error) {
      console.error("Error while fetching Quotation by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotationTermsCondtions = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}quotations/getTermsAndConditions`,
      });
      if (res?.success) {
        setTermsCondition(res?.terms);
      }
    } catch (error) {
      console.error("Error while fetching Quotation by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchQuotationList,
    fetchQuotationById,
    deleteQuotation,
    quotationsList,
    quotationDetails,
    //fetchSearchQuotation,
    fetchQuotationSrNo,
    quotationSrNo,
    createQuotation,
    updateQuotation,
    resetQuotation,
    fetchCustomerName,
    customerName,
    fetchBankName,
    bankNames,
    fetchBankDetails,
    bankDetails,
    termsCondition,
    fetchQuotationTermsCondtions,
  };
};

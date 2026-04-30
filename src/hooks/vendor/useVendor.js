import { useRecoilState } from "recoil";
import {
  createVendorAtom,
  getVendorsAtom,
  getVendorsByQueryAtom,
  updateVendor,
  vendorSrNo,
} from "../../state/vendorState/venderManagementState";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import conf from "../../config/index";
import { toast } from "react-toastify";

const useVendor = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useRecoilState(getVendorsAtom);
  const [vendorAllDetails, setvendorAllDetails] = useRecoilState(
    getVendorsByQueryAtom
  );
  const [vendorsrNo, setvendorsrNo] = useRecoilState(vendorSrNo);
  const [addVendor, setAddVendor] = useRecoilState(createVendorAtom);
  const [vendarUpdateById] = useRecoilState(updateVendor);

  const fetchVendorDetails = async (id) => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}vendor/getVendorById/${id}`,
      }).then((res) => {
        if (res) {
          console.log("vendor by query response : ", res);
          setVendor(res);
        }
      });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  const createVendor = async (values) => {
    console.log("createVendor Hook:", values);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}vendor/createVendor`,
        data: values,
      });
      if (res) {
        setAddVendor(res);
        toast.success(res?.message || "Vendor created successfully!");
      }
    } catch (error) {
      console.log("Error in createVendor:", error);
    }
  };

  const fetchVendorSrno = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}vendor/getSrNoForVendor`,
      });
      console.log("Vendor SR No:", res);
      if (res) {
        setvendorsrNo(res);
      }
    } catch (error) {
      console.error("Error fetching vendor SR number:", error);
    } finally {
      setLoading(false);
    }
  };

  //////////////Update Vendor//////////////////////////////////

  const UpdatedVendrById = async (id, values) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}vendor/updateVendor/${id}`,
        data: values,
      });
      if (res) {
        toast.success(res?.message || "Vendor updated successfully!");
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast.error(error?.response?.data?.message || "Failed to update vendor.");
    } finally {
      setLoading(false);
    }
  };

  //////////////// Get AllvendorDetails /////////////////////////

  const fetchVendorAllDetails = async (
    page = 1,
    limit = 10,
    searchTerm = ""
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
        ...(searchTerm && { vendorName: searchTerm }),
      });

      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}vendor/getVendorByQuery?${params}`,
      });

      if (res) {
        setvendorAllDetails(res);
      } else {
        console.error("Unexpected API response:", res);
        setvendorAllDetails([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setvendorAllDetails([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    ////getVendorByID
    fetchVendorDetails,
    vendor,

    ////getVendorAllDetails
    fetchVendorAllDetails,
    vendorAllDetails,

    ////createVendor
    createVendor,
    addVendor,

    ////fetchVendorSrNo
    fetchVendorSrno,
    vendorsrNo,

    ////updateVendorById
    UpdatedVendrById,
    vendarUpdateById,
  };
};

export default useVendor;

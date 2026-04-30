import React from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config/index";
import {
  createClientAtom,
  clientsByQueryAtom,
  clientByIdAtom,
  updateClientDetailsAtom,
  newSrNumberAtom,
  applicableGstAtom,
  mouValidityAtom,
  manufacturerNameAtom,
} from "../../state/clientManagementState/clientManagementState";
import { toast } from "react-toastify";

const useClientManagement = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [createClient, setCreateClient] = useRecoilState(createClientAtom);
  const [clientsByQuery, setClientsByQuery] =
    useRecoilState(clientsByQueryAtom);
  const [clientsById, setClientsById] = useRecoilState(clientByIdAtom);
  const [updateClientDetails, setUpdateClientDetails] = useRecoilState(
    updateClientDetailsAtom
  );
  const [newSrNo, setNewSrNo] = useRecoilState(newSrNumberAtom);
  const [applicableGst, setApplicableGst] = useRecoilState(applicableGstAtom);
  const [mouValidity, setMouValidity] = useRecoilState(mouValidityAtom);
  const [manufacturerName, setManufacturerName] =
    useRecoilState(manufacturerNameAtom);

  const CreateNewClient = async (data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}client/createClient`,
        data: data,
      });
      if (res?.success) {
        setLoading(false);
        toast.success(res?.message);
        setCreateClient(res);
      }
    } catch (error) {
      console.error("Error while fetching Client List:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientListByQuery = async (page, limit, search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
        dealerName: search,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/findClientByQuery?${params}`,
      });
      if (res) {
        setLoading(false);
        setClientsByQuery(res);
      }
    } catch (error) {
      console.error("Error while fetching Client List:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientDetailsById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getClientById/${id}`,
      });
      if (res) {
        setLoading(false);
        setClientsById(res);
      }
    } catch (error) {
      console.error("Error while fetching Client details:", error);
    } finally {
      setLoading(false);
    }
  };

  /*const UpdateClientDetailsById = async (id, data) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}client/updateClient/${id}`,
        data: data,
      });
      if (res) {
        setLoading(false);
        setUpdateClientDetails(res);
      }
    } catch (error) {
      console.error("Error while update Client details:", error);
    } finally {
      setLoading(false);
    }
  };*/

  const UpdateClientDetailsById = async (id, data) => {
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}client/updateClient/${id}`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Explicitly check for successful response
      if (res && res.status === 200) {
        // Update local state or trigger any necessary updates
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error while updating Client details:", error);
      return false;
    }
  };

  const getNewSrNumber = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getSrNumberForClient`,
      });
      if (res) {
        setLoading(false);
        setNewSrNo(res);
      }
    } catch (error) {
      console.error("Error while getting Client SrNo:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicableGst = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getApplicableGst`,
      });
      if (res) {
        setLoading(false);
        setApplicableGst(res);
      }
    } catch (error) {
      console.error("Error while getting Client SrNo:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMouValidity = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getMouValidity`,
      });
      if (res) {
        setLoading(false);
        setMouValidity(res);
      }
    } catch (error) {
      console.error("Error while getting Client SrNo:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchManufacturerName = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getManufacturerName`,
      });
      if (res) {
        setLoading(false);
        setManufacturerName(res);
      }
    } catch (error) {
      console.error("Error while getting Client SrNo:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFetchClientDetailsById = () => {
    setClientsById(null);
  };

  return {
    loading,
    CreateNewClient,
    fetchClientListByQuery,
    fetchClientDetailsById,
    resetFetchClientDetailsById,
    UpdateClientDetailsById,
    getNewSrNumber,
    fetchApplicableGst,
    fetchMouValidity,
    fetchManufacturerName,
    createClient,
    clientsByQuery,
    clientsById,
    updateClientDetails,
    newSrNo,
    applicableGst,
    mouValidity,
    manufacturerName,
  };
};

export default useClientManagement;

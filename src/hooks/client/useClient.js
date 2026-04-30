import React from 'react'
import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import conf from "../../config/index";
import { createClient, getClientById } from '../../state/clientState/clientManagementState';


const useClient = () => {
    const [fetchData] = useFetch();

    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useRecoilState(getClientById);
    // const [createClientData, setCreateClientData] = useRecoilState(createClient);
    

  const fetchClientList = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getClientById/${id}`
      });
      if (res) {
        setClients(res);
      }
    } catch (error) {
      console.error("Error while fetching Client List:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchClientByQuery = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}client/getClientById/${id}`
      });
      if (res) {
        setClients(res);
      }
    } catch (error) {
      console.error("Error while fetching Client List:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    fetchClientList,
    clients,
  };
};


export default useClient

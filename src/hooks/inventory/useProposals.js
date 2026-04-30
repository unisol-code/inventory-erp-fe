import { useRecoilState } from "recoil";
import conf from "../../config/index";
import { useState } from "react";
import useFetch from "../useFetch";
import { confirmAlert } from '../../utils/alertToast';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { assignedToAtom, clientNamesAtom, proposalDetailsAtom, proposalListAtom, proposalSrNoAtom, proposalTypeAtom, responsibleDepartmentsAtom } from "../../state/inventory/proposalState";

const useProposals = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [proposalList, setProposalList] = useRecoilState(proposalListAtom);
  const [proposalDetails, setProposalDetails] = useRecoilState(proposalDetailsAtom);
  const [proposalSrNo, setProposalSrNo] = useRecoilState(proposalSrNoAtom);
  const [proposalType, setProposalType] = useRecoilState(proposalTypeAtom);
  const [responsibleDepartments, setResponsibleDepartments] = useRecoilState(responsibleDepartmentsAtom);
  const [clientNames, setClientNames] = useRecoilState(clientNamesAtom);
  const [assignedTo, setAssignedTo] = useRecoilState(assignedToAtom);

  const fetchPropsalList = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getAllProposals`,
      }).then((res) => {
        if (res) {
          setProposalList(res?.data);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const fetchSearchAllInventory = async (filters) => {
    setLoading(true);
    try {
      if (!filters) {
        throw new Error("No filters provided");
      }
      const params = new URLSearchParams(filters).toString();
      const url = `${conf.apiBaseUrl}proposals/getAllProposals?${params}`;
      const response = await fetchData({
        method: "GET",
        url: url,
      });
      if (response?.success) {
        setProposalList(response?.data);
      } else {
        throw new Error(response?.message || "Failed to fetch quotation list");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  }

  const fetchProposalById = async (id) => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getProposalById/${id}`,
      }).then((res) => {
        if (res) {
          setProposalDetails(res);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const fetchProposalSrNo = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getSrNoForProposal`,
      }).then((res) => {
        if (res) {
          setProposalSrNo(res?.srNo);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const createProposal = async (data) => {
    setLoading(true);
    try {
      fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}proposals/createProposal`,
        data: data,
      }).then((res) => {
        if (res?.success) {
          // setAddProposal(res);
          toast.success(res?.message);
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating:", error);
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  const updateProposal = async (id, data) => {
    setLoading(true);
    try {
      fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}proposals/updateProposal/${id}`,
        data: data,
      }).then((res) => {
        if (res?.success) {
          toast.success(res?.message);
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating ", error);
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  const deleteProposal = async (id) => {
    const result = await confirmAlert('Do you really want to delete this proposal?');

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "PUT",
          url: `${conf.apiBaseUrl}proposals/deleteProposal/${id}`,
        });

        if (res?.success) {
          Swal.fire({
            title: 'Deleted!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          fetchPropsalList();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error updating email template:", error);
        toast.error(error?.response?.data?.error);
        setLoading(false);
      } finally {
        setLoading(false); // Ensure loading state is cleared after operation
      }
    }
  };

  const fetchProposalTypes = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getProposalType`,
      }).then((res) => {
        if (res) {
          setProposalType(res?.proposalTypes);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const fetchResponsibleDepartments = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getResponsibleDepartments`,
      }).then((res) => {
        if (res) {
          setResponsibleDepartments(res?.responsibleDepartments);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const fetchClientNames = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getClientNames`,
      }).then((res) => {
        if (res) {
          setClientNames(res?.clientNames);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const fetchAssignedTo = async () => {
    setLoading(true);
    try {
      fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}proposals/getAssignedTo`,
      }).then((res) => {
        if (res) {
          setAssignedTo(res?.assignedTo);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating email template:", error);
      setLoading(false);
    }
  };

  const resetProposal = () => {
    setProposalDetails(null);
  }

  return {
    loading, errors, setErrors, proposalList, fetchPropsalList, createProposal,
    fetchSearchAllInventory, fetchProposalById, proposalDetails, resetProposal, deleteProposal,
    proposalType, fetchProposalTypes, fetchResponsibleDepartments, responsibleDepartments,
    fetchClientNames, clientNames, fetchAssignedTo, assignedTo, updateProposal, proposalSrNo, fetchProposalSrNo
   };
}

export default useProposals;
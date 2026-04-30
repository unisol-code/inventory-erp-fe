import { useRecoilState, useSetRecoilState } from "recoil";
import conf from "../../config/index";
import { useState, useCallback, useEffect } from "react";
import useFetch from "../useFetch";
import { debounce } from "lodash";
import {
  topSellingProductsAtom,
  ReplenishmentProductByIdAtom,
} from "../../state/replenishment/replenishmentState";
import { toast } from "react-toastify";
const useReplenishment = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [topSellingProducts, setTopSellingProducts] = useRecoilState(
    topSellingProductsAtom
  );
  const [replenishmentProductById, setReplenishmentProductById] =
    useRecoilState(ReplenishmentProductByIdAtom);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTopSellingProducts = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}replenishment/getTopSellingProducts?productName=${searchTerm}`,
        });
        if (res) {
          setTopSellingProducts(res);
        }
      } catch (error) {
        console.log("error while fetching TopSellingProducts");
      } finally {
        setLoading(false);
      }
    }, 500),
    [searchTerm]
  );

  const fetchReplenishmentProductById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}replenishment/getReplenishmentProductById/${id}`,
      });
      if (res) {
        setReplenishmentProductById(res);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error while fetching ReplenishmentProductById");
      //setErrors(error?.response?.data?.error);
    } finally {
      setLoading(false); // Ensure loading state is cleared after operation
    }
  };

  const createReplenishment = async (data) => {
    setLoading(true);
    try {
      fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}replenishment/AddNewReplenishment`,
        data: data,
      }).then((res) => {
        setLoading(false);
        if (res?.success) {
          // setAddProposal(res);
          toast.success(res?.message);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating:", error);
      toast.error(error?.response?.data?.error);
      setLoading(false);
    }
  };

  return {
    fetchTopSellingProducts,
    fetchReplenishmentProductById,
    createReplenishment,
    loading,
    topSellingProducts,
    replenishmentProductById,
    setSearchTerm,
    searchTerm,
  };
};
export default useReplenishment;

import { useRecoilState, useSetRecoilState } from "recoil";
import conf from "../../config/index";
import { useState } from "react";
import { fixProductsByIDAtom, similarProductsAtom } from "../../state/inventory/allInventoryState";
import useFetch from "../useFetch";

const useAllInventory = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [fixProductsByID, setFixProductsByID] = useRecoilState(fixProductsByIDAtom);
  const [similarProducts, setSimilarProducts] = useRecoilState(similarProductsAtom);
  const fetchFixProductsByID = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}inventory/getProductById/${id}`,
      });
      if (res) {
        setFixProductsByID(res?.product);
        setSimilarProducts(res);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setErrors(error?.response?.data?.error);
    } finally {
      setLoading(false); // Ensure loading state is cleared after operation
    }
  };

  return {
    loading, errors, fixProductsByID, fetchFixProductsByID,
    similarProducts
  };
}

export default useAllInventory
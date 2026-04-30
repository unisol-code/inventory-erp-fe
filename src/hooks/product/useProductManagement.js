import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../useFetch";
import conf from "../../config/index";
import { toast } from "react-toastify";
import {
  getSrNoForProductAtom,
  emergencyRequiredItemAtom,
  getProductsAtom,
  getProductByIdAtom,
  getProductDetailsAtom,
  createProductAtom,
  productTypesAtom,
  allTopSellingProductsAtom,
  modelNameAtom,
  proposedCompanyAtom,
  AMCCMCListAtom,
  updateProductDetails,
} from "../../state/product/productMangementState";

const useProductManagement = () => {
  const [fetchData] = useFetch();
  const [loading, setLoading] = useState(false);
  const [srNoProduct, setSrNoProduct] = useRecoilState(getSrNoForProductAtom);
  const [emergencyRequiredItem, setEmergencyRequiredItem] = useRecoilState(
    emergencyRequiredItemAtom
  );
  const [allProducts, setAllProducts] = useRecoilState(getProductsAtom);
  const [productById, setProductById] = useRecoilState(getProductByIdAtom);
  const [productDetails, setProductDetails] = useRecoilState(
    getProductDetailsAtom
  );
  const [addProduct, setAddProduct] = useRecoilState(createProductAtom);
  const [productTypes, setProductTypes] = useRecoilState(productTypesAtom);
  const [topSellingProducts, setTopSellingProducts] = useRecoilState(
    allTopSellingProductsAtom
  );
  const [modelName, setModelName] = useRecoilState(modelNameAtom);
  const [proposedCompany, setProposedCompany] =
    useRecoilState(proposedCompanyAtom);
  const [AMCCMCList, setAMCCMCList] = useRecoilState(AMCCMCListAtom);
  const [updateProductdetail, setupdateProductdetail] =
    useRecoilState(updateProductDetails);

  const fetchSrNoProduct = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getSrNoForProduct`,
      });
      if (res) {
        setSrNoProduct(res);
      }
    } catch (error) {
      console.error("Error while fetching srNo for product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmergencyRequiredItem = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/emergency-required`,
      });
      if (res) {
        setEmergencyRequiredItem(res);
      }
    } catch (error) {
      console.error("Error while fetching emergency required item:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchAllProducts = async (filters) => {
    setLoading(true);
    try {
      if (!filters) {
        throw new Error("No filters provided");
      }
      /* const params = new URLSearchParams({
        productName: filters,
      }); */
      const params = new URLSearchParams(filters).toString();
      const url = `${conf.apiBaseUrl}products/getProducts?${params}`;
      const response = await fetchData({
        method: "GET",
        url: url,
      });
      if (response) {
        setLoading(false);
        setAllProducts(response);
      } else {
        setLoading(false);
        setAllProducts([]);
      }
    } catch (error) {
      console.error("Error while fetching Product List:", error);
      setAllProducts([]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async (page, limit) => {
    console.log("page", page, "+", "limit", limit);
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
      });
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getProducts?${params}`,
      });
      if (res) {
        setAllProducts(res);
      }
    } catch (error) {
      console.error("Error while fetching Product List:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/product-details`,
      });
      if (res) {
        setProductDetails(res);
      }
    } catch (error) {
      console.error("Error while fetching Product List:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data) => {
    setLoading(true);
    console.log("use Hook: ", data);
    try {
      fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}products/createProduct`,
        data: data,
      }).then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          // setAddProduct(res);
        } else {
          toast.error("Failed to create new product");
        }
      });
    } catch (error) {
      console.error("Error while creating new product:", error);
      setLoading(false);
      toast.error("Error while creating new product");
    }
  };

  const fetchProductById = async (id) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getProductById/${id}`,
      });
      if (res) {
        setProductById(res?.product);
      }
    } catch (error) {
      console.error("Error while fetching product by id:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductTypes = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getProductTypes`,
      });
      if (res) {
        setProductTypes(res);
      }
    } catch (error) {
      console.error("Error while fetching Product Types:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopSellingProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getTopSellingProducts`,
      });
      if (res) {
        setTopSellingProducts(res);
      }
    } catch (error) {
      console.error("Error while fetching TopSellingProducts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModelName = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getModelName`,
      });
      if (res) {
        setModelName(res);
      }
    } catch (error) {
      console.error("Error while fetching ModelName:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProposedCompany = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getProposedCompany`,
      });
      if (res) {
        setProposedCompany(res);
      }
    } catch (error) {
      console.error("Error while fetching ProposedCompany:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAMCCMCList = async () => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}products/getAMCCMCList`,
      });
      if (res) {
        setAMCCMCList(res);
      }
    } catch (error) {
      console.error("Error while fetching AMCCMCList:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const updatedProductDetails = async (id, values) => {
    setLoading(true);
    try {
      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}products/updateProduct/${id}`,
        data: {
          // Spread all values to include all fields
          ...values,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res && res.success) {
        // Update UI state
        if (typeof setupdateProductdetail === "function") {
          setupdateProductdetail(res.updatedProduct);
        }

        // Optional: Exit editing mode
        if (typeof setIsEditing === "function") {
          setIsEditing(false);
        }

        return res.updatedProduct;
      } else {
        toast.error("Update failed: " + (res?.message || "Unknown error"));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update product."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetProductById = () => {
    setProductById(null);
  };

  return {
    loading,
    fetchSearchAllProducts,
    fetchSrNoProduct,
    fetchEmergencyRequiredItem,
    fetchAllProducts,
    fetchProductById,
    fetchProductDetails,
    createProduct,
    fetchProductTypes,
    fetchTopSellingProducts,
    fetchModelName,
    fetchProposedCompany,
    fetchAMCCMCList,
    resetProductById,
    addProduct,
    allProducts,
    productById,
    srNoProduct,
    emergencyRequiredItem,
    productDetails,
    productTypes,
    topSellingProducts,
    modelName,
    proposedCompany,
    AMCCMCList,
    updatedProductDetails,
    updateProductdetail,
  };
};

export default useProductManagement;

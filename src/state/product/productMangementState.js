import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const getSrNoForProductAtom = atom(
  createPersistedAtom("srNoProduct", null)
);

export const getProductDetailsAtom = atom(
  createPersistedAtom("getProductDetails", null)
);

export const emergencyRequiredItemAtom = atom(
  createPersistedAtom("emergencyRequiredItem", null)
);

export const getProductsAtom = atom(
  createPersistedAtom("getProducts", [])
);

export const createProductAtom = atom(
  createPersistedAtom("createProduct", null)
);

export const getProductByIdAtom = atom(
  createPersistedAtom("getProductById", null)
);

export const productTypesAtom = atom(
  createPersistedAtom("productTypes", null)
);

export const allTopSellingProductsAtom = atom(
  createPersistedAtom("allTopSellingProducts", null)
);

export const modelNameAtom = atom(
  createPersistedAtom("modelName", null)
);

export const proposedCompanyAtom = atom(
  createPersistedAtom("proposedCompany", null)
);

export const AMCCMCListAtom = atom(
  createPersistedAtom("AMCCMCList", null)
);

export const updateProductDetails=atom(
  createPersistedAtom("updateProductDetails", null)
)

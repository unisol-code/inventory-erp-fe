import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getSrNoForProductAtom = atom({
  key: "srNoProduct",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const getProductDetailsAtom = atom({
  key: "getProductDetails",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const emergencyRequiredItemAtom = atom({
  key: "emergencyRequiredItem",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const getProductsAtom = atom({
  key: "getProducts",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const createProductAtom = atom({
  key: "createProduct",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const getProductByIdAtom = atom({
  key: "getProductById",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const productTypesAtom = atom({
  key: "productTypes",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const allTopSellingProductsAtom = atom({
  key: "allTopSellingProducts",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const modelNameAtom = atom({
  key: "modelName",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const proposedCompanyAtom = atom({
  key: "proposedCompany",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const AMCCMCListAtom = atom({
  key: "AMCCMCList",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const updateProductDetails=atom({
  key: "updateProductDetails",
  default: null,
  effects_UNSTABLE: [persistAtom],
})

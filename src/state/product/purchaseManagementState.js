import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getSrNoForPurchaseAtom = atom({
  key: "srNoPurchase",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const purchaseAllOrderAtom = atom({
  key: "purchaseAllOrder",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const purchaseOrderByIdAtom = atom({
  key: "purchaseOrderById",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const purchaseOrderTermsAtom = atom({
  key: "purchaseOrderTerms",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const allProductsNoAtom = atom({
  key: "allProductsNo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const updatePurchaseOrderDetailsAtom = atom({
  key: "updatePurchaseOrderDetails",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

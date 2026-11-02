import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const getSrNoForPurchaseAtom = atom(
  createPersistedAtom("srNoPurchase", null)
);

export const purchaseAllOrderAtom = atom(
  createPersistedAtom("purchaseAllOrder", [])
);

export const purchaseOrderByIdAtom = atom(
  createPersistedAtom("purchaseOrderById", null)
);

export const purchaseOrderTermsAtom = atom(
  createPersistedAtom("purchaseOrderTerms", [])
);

export const allProductsNoAtom = atom(
  createPersistedAtom("allProductsNo", [])
);

export const updatePurchaseOrderDetailsAtom = atom(
  createPersistedAtom("updatePurchaseOrderDetails", null)
);

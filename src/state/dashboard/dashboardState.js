import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const allCompanyAtom = atom({
  key: "allCompany",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const totalInventoryValueAtom = atom({
  key: "totalInventoryValue",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const totalOrderAtom = atom({
  key: "totalOrder",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const recentOrdersAtom = atom({
  key: "recentOrders",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const replenishmentActionsAtom = atom({
  key: "replenishmentActions",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const lowInventoryProductAtom = atom({
  key: "lowInventoryProduct",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const latestQuotationAtom = atom({
  key: "latestQuotation",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const latestTenderAtom = atom({
  key: "latestTender",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const warehousePercentagesAtom = atom({
  key: "warehousePercentages",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

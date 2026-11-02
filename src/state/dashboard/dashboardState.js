import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const allCompanyAtom = atom(createPersistedAtom("allCompany", null));

export const totalInventoryValueAtom = atom(createPersistedAtom("totalInventoryValue", null));

export const totalOrderAtom = atom(createPersistedAtom("totalOrder", null));

export const recentOrdersAtom = atom(createPersistedAtom("recentOrders", null));

export const replenishmentActionsAtom = atom(createPersistedAtom("replenishmentActions", null));

export const lowInventoryProductAtom = atom(createPersistedAtom("lowInventoryProduct", null));

export const latestQuotationAtom = atom(createPersistedAtom("latestQuotation", null));

export const latestTenderAtom = atom(createPersistedAtom("latestTender", null));

export const warehousePercentagesAtom = atom(createPersistedAtom("warehousePercentages", null));

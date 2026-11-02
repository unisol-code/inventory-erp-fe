import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const topSellingProductsAtom = atom(createPersistedAtom("topSellingProducts", null));

export const ReplenishmentProductByIdAtom = atom(createPersistedAtom("replenishmentProductById", null));

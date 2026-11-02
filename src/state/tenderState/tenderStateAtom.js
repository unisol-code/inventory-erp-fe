import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const getTendersAtom = atom(createPersistedAtom("getTenders", null));

export const getStockNameAtom = atom(createPersistedAtom("getStockName", null));

export const createTendersAtom = atom(createPersistedAtom("createTenders", null));

export const getTenderByIdAtom = atom(createPersistedAtom("getTenderById", null));

export const getNewSrNumberAtom = atom(createPersistedAtom("getNewSrNumber", null));

export const updateTenderAtom = atom(createPersistedAtom("updateTender", null));

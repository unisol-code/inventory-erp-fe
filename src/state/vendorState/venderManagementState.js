import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const getVendorByQueryAtom = atom(createPersistedAtom("getVendorByQuery", null));

export const getVendorByIdAtom = atom(createPersistedAtom("getVendorById", null));

export const createVendorAtom = atom(createPersistedAtom("createVendor", null));

export const vendorSrNo=atom(createPersistedAtom("vendorSrNo", null));

export const updateVendor=atom(createPersistedAtom("updateVendor", null));

export const getVendorsAtom = atom(createPersistedAtom("getVendors", null));
  
export const getVendorsByQueryAtom = atom(createPersistedAtom("getVendorsByQuery", null));

export const postVendorsAtom = atom(createPersistedAtom("postVendors", null));

export const putVendorsAtom = atom(createPersistedAtom("putVendors", null));

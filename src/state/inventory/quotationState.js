import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const quotationListAtom = atom(
  createPersistedAtom("quotationsList", [])
);

export const quotationByIdAtom = atom(
  createPersistedAtom("quotationById", null)
);

export const quotationSrNoAtom = atom(
  createPersistedAtom("quotationSrNo", null)  
);

export const customerNameAtom = atom(
  createPersistedAtom("customerNames", [])
);

export const bankNamesAtom = atom(
  createPersistedAtom("bankName", [])
);

export const bankDetailsAtom = atom(
  createPersistedAtom("bankDetail", null)
);

export const termsConditionAtom = atom(
  createPersistedAtom("termsCondition", null)
);

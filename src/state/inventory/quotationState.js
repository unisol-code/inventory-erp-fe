import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const quotationListAtom = atom({
  key: "quotationsList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const quotationByIdAtom = atom({
  key: "quotationById",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const quotationSrNoAtom = atom({
  key: "quotationSrNo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const customerNameAtom = atom({
  key: "customerNames",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const bankNamesAtom = atom({
  key: "bankName",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const bankDetailsAtom = atom({
  key: "bankDetail",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const termsConditionAtom = atom({
  key: "termsCondition",
  default: null,
  effects_UNSTABLE: [persistAtom],
});


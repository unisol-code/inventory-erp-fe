import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getTendersAtom = atom({
  key: "getTenders", // unique ID (with respect to other atoms/selectors)
  default: null,
  effects_UNSTABLE: [persistAtom], // default theme
});

export const getStockNameAtom = atom({
  key: "getStockName", // unique ID (with respect to other atoms/selectors)
  default: null,
  effects_UNSTABLE: [persistAtom], // default theme
});

export const createTendersAtom = atom({
  key: "createTenders",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const getTenderByIdAtom = atom({
  key: "getTenderById",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const getNewSrNumberAtom = atom({
  key: "getNewSrNumber",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const updateTenderAtom = atom({
  key: "updateTender",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

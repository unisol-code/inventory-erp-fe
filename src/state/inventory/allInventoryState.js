import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const fixProductsByIDAtom = atom({
  key: "fixProductsByID",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const similarProductsAtom = atom({
    key: "similarProducts",
    default: [],
    effects_UNSTABLE: [persistAtom],
  });
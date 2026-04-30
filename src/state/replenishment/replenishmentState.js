import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const topSellingProductsAtom = atom({
  key: "topSellingProducts",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const ReplenishmentProductByIdAtom = atom({
  key: "replenishmentProductById",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

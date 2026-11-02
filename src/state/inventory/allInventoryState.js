import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const fixProductsByIDAtom = atom(
  createPersistedAtom("fixProductsByID", null)
);

export const similarProductsAtom = atom(
  createPersistedAtom("similarProducts", [])
);
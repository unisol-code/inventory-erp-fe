import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const clientByIdAtom = atom({
  key: "getClient",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const createClientAtom = atom({
  key: "createClient",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

export const clientsByQueryAtom = atom({
  key: "clientsByQuery",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

export const updateClientDetailsAtom = atom({
  key: "updateClient",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

export const newSrNumberAtom = atom({
  key: "newSrNumber",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

export const mouValidityAtom = atom({
  key: "mouValidity",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

export const applicableGstAtom = atom({
  key: "applicableGst",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

export const manufacturerNameAtom = atom({
  key: "manufacturerName",
  default: null, // Use an empty array instead of null
  effects_UNSTABLE: [persistAtom],
});

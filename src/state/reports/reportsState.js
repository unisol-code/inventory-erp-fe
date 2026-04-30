import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const salesByCompanyAtom = atom({
  key: "salesByCompanys", 
  default: [],
  effects_UNSTABLE: [persistAtom], 
});

export const salesByProductAtom = atom({
    key: "salesByProducts",
    default: [],
    effects_UNSTABLE: [persistAtom], 
})

export const salesByRegionAtom = atom({
    key: "salesByRegions",
    default: [],
    effects_UNSTABLE: [persistAtom]
}) 

export const saleBySalesPersonAtom = atom({
    key: "saleBySalesPersons",
    default: [],
    effects_UNSTABLE: [persistAtom]
}) 

export const allReportsAtom = atom({
    key: "allReports",
    default: [],
    effects_UNSTABLE: [persistAtom]
}) 
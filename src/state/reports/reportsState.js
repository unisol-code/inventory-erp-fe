import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const salesByCompanyAtom = atom(createPersistedAtom("salesByCompanys", []));

export const salesByProductAtom = atom(createPersistedAtom("salesByProducts", []));

export const salesByRegionAtom = atom(createPersistedAtom("salesByRegions", []));

export const saleBySalesPersonAtom = atom(createPersistedAtom("saleBySalesPersons", []));

export const allReportsAtom = atom(createPersistedAtom("allReports", []));
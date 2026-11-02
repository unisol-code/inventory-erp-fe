import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const allWareHousesAtom = atom(createPersistedAtom("allWareHouse", null));

export const createWareHouseAtom = atom(createPersistedAtom("createWareHouse", null));

export const getNewIDNumberAtom = atom(createPersistedAtom("getNewIDNumber", null));

export const warehouseTypesAtom = atom(createPersistedAtom("warehouseTypes", null));

export const inventoryManagementAtom = atom(createPersistedAtom("inventoryManagement", null));

export const ordersAndShipmentsAtom = atom(createPersistedAtom("ordersAndShipments", null));

export const shipmentsListAtom = atom(createPersistedAtom("shipmentsList", null));

export const warehouseInventoryStatsAtom = atom(createPersistedAtom("warehouseInventoryStats", null));
 
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const allWareHousesAtom = atom({
    key: "allWareHouse",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const createWareHouseAtom = atom({
    key: "createWareHouse",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const getNewIDNumberAtom = atom({
    key: "getNewIDNumber",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const warehouseTypesAtom = atom({
    key: "warehouseTypes",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const inventoryManagementAtom = atom({
    key: "inventoryManagement",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const ordersAndShipmentsAtom = atom({
    key: "orderAndShipments",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const shipmentsListAtom = atom({
    key: "shipmentsList",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const warehouseInventoryStatsAtom = atom({
    key: "warehouseInventoryStats",
    default: null,
    effects_UNSTABLE: [persistAtom],
}); 
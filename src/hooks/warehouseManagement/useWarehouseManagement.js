import { useRecoilState } from "recoil";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import conf from "../../config/index";
import { toast } from 'react-toastify';
import {
    allWareHousesAtom, createWareHouseAtom, getNewIDNumberAtom, warehouseTypesAtom, inventoryManagementAtom,
    ordersAndShipmentsAtom, shipmentsListAtom, warehouseInventoryStatsAtom,
} from "../../state/warehouseState/warehouseManagementState";

const useWarehouseManagement = () => {
    const [fetchData] = useFetch();
    const [loading, setLoading] = useState(false);
    const [allWareHouse, setAllWarehouse] = useRecoilState(allWareHousesAtom);
    const [idNumber, setIdNumber] = useRecoilState(getNewIDNumberAtom);
    const [addWareHouse, setAddWarehouse] = useRecoilState(createWareHouseAtom);
    const [warehouseType, setWarehouseType] = useRecoilState(warehouseTypesAtom);
    const [inventoryManagement, setinventoryManagement] = useRecoilState(inventoryManagementAtom);
    const [ordersAndShipments, setOrdersAndShipments] = useRecoilState(ordersAndShipmentsAtom);
    const [shipmentsList, setShipmentsList] = useRecoilState(shipmentsListAtom);
    const [inventoryLevel, setInventoryLevel] = useRecoilState(warehouseInventoryStatsAtom);


    const fetchAllWareHouses = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}warehouse/getAllWareHouses`,
            }).then((res) => {
                if (res) {
                    setAllWarehouse(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching Sr no. :", error);
            setLoading(false);
        }
    };


    const fetchNewIdNumber = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}warehouse/getNewIDNumber`,
            }).then((res) => {
                if (res) {
                    setIdNumber(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching Sr no. :", error);
            setLoading(false);
        }
    };

    const createWareHouse = async (data) => {
        setLoading(true);
        try {
            fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}warehouse/createWarehouse`,
                data: data,
            }).then((res) => {
                setAddWarehouse(res);
                if (res?.success) {
                    toast.success(res?.message);
                }
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error while Creating:", error);
            toast.error(error?.response?.data?.error);
            setLoading(false);
        }
    };


    const fetchWarehouseTypes = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}warehouse/getWarehouseTypes`,
            }).then((res) => {
                if (res) {
                    setWarehouseType(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching Sr no. :", error);
            setLoading(false);
        }
    };

    const fetchinventoryManagement = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}warehouse/getInventoryManagement`,
            }).then((res) => {
                if (res) {
                    setinventoryManagement(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching inventory Management :", error);
            setLoading(false);
        }
    };

    const fetchOrdersAndShipmentsTypes = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}warehouse/getOrdersAndShipments`,
            }).then((res) => {
                if (res) {
                    setOrdersAndShipments(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching orders and shipments :", error);
            setLoading(false);
        }
    };

    const fetchShipmentList = async () => {
        setLoading(true);
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}`,
            }).then((res) => {
                if (res) {
                    setShipmentsList(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching shipment list :", error);
            setLoading(false);
        }
    };

    const fetchWarehouseInventoryStats = async (value) => {
        setLoading(true);
        console.log("hooks val:", value)
        try {
            fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}warehouse/getWarehouseInventoryStats?warehouse=${value}`,
            }).then((res) => {
                if (res) {
                    setInventoryLevel(res);
                }
            });
        } catch (error) {
            console.error("Error while fetching shipment list :", error);
            setLoading(false);
        }
    };

    return {
        loading, fetchAllWareHouses, allWareHouse, fetchNewIdNumber, idNumber, createWareHouse, addWareHouse,
        fetchWarehouseTypes, warehouseType, fetchinventoryManagement, inventoryManagement, fetchOrdersAndShipmentsTypes,
        ordersAndShipments, fetchShipmentList, shipmentsList, fetchWarehouseInventoryStats, inventoryLevel,
    }
}

export default useWarehouseManagement
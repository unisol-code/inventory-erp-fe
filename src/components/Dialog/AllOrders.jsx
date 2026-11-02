import React, { useEffect, useState } from 'react'
import Table from '../common/Table'
import { IoMdClose } from "react-icons/io";
import useWarehouseManagement from '../../hooks/warehouseManagement/useWarehouseManagement';
import Pagination from "../../components/common/Pagination";

const AllOrders = ({ data, columns, onClose }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);


    const { fetchOrdersAndShipmentsTypes, ordersAndShipments } = useWarehouseManagement()

    useEffect(() => {
        fetchOrdersAndShipmentsTypes();
    }, []);

    const onPageChange = (data) => {
        console.log("data", data);
        setPage(data);
        fetchOrdersAndShipmentsTypes(data, limit, searchTerm);
    };

    const onItemsPerPageChange = (data) => {
        setLimit(data);
        fetchOrdersAndShipmentsTypes(page, data, searchTerm);
    };

    return (
        <div className="fixed inset-0 justify-center z-50 ">
            <div className="h-full w-screen flex justify-center items-center">
                <div className=" rounded-xl bg-white shadow-lg w-[1106px] mx-auto">
                    <div className='flex justify-between items-center px-8 h-[62px] bg-[#CED2E7]'>
                        <h1 className='text-xl font-semibold text-[#000000]'>Order and Shipping Table</h1>
                        <button
                            onClick={onClose}>
                            <IoMdClose size={28} />
                        </button>
                    </div>
                    <div className='overflow-y-auto max-h-[calc(650px-62px)]'>
                        <Table data={data} columns={columns}>
                        </Table>
                    </div>
                    <Pagination
                        currentPage={ordersAndShipments?.data?.pagination?.currentPage}
                        totalPages={ordersAndShipments?.data?.pagination?.totalPages}
                        onPageChange={onPageChange}
                        onItemsPerPageChange={onItemsPerPageChange}
                    />
                </div>
            </div>
        </div>
    )
}


export default AllOrders
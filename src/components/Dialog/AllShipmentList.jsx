import React, { useEffect, useState } from 'react'
import Table from '../Table'
import { IoMdClose } from "react-icons/io";
import Pagination from "../../components/Pagination";
import useWarehouseManagement from '../../hooks/warehouseManagement/useWarehouseManagement';

const AllShipmentList = ({ data, columns, onClose }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { fetchShipmentList, shipmentsList } = useWarehouseManagement()

    useEffect(() => {
        fetchShipmentList();
    }, []);

    const onPageChange = (data) => {
        console.log("data", data);
        setPage(data);
        fetchShipmentList(data, limit, searchTerm);
    };

    const onItemsPerPageChange = (data) => {
        setLimit(data);
        fetchShipmentList(page, data, searchTerm);
    };
    return (
        <div className="fixed inset-0 justify-center z-50 ">
            <div className="h-full w-screen flex justify-center items-center">
                <div className=" rounded-xl bg-white shadow-lg w-[1106px] mx-auto">
                    <div className='flex justify-between items-center px-8 h-[62px] bg-[#CED2E7]'>
                        <h1 className='text-xl font-semibold text-[#000000]'>Shipment List</h1>
                        <button
                            onClick={onClose}>
                            <IoMdClose size={28} />
                        </button>
                    </div>
                    <div className='overflow-y-auto max-h-[calc(650px-62px)]'>
                        <Table data={data} columns={columns}>
                        </Table>
                    </div>
                    {/* Pagination */}
                    <Pagination
                        currentPage={shipmentsList?.data?.pagination?.currentPage}
                        totalPages={shipmentsList?.data?.pagination?.totalPages}
                        onPageChange={onPageChange}
                        onItemsPerPageChange={onItemsPerPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default AllShipmentList
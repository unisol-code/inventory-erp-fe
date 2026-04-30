import React, { useEffect, useState } from 'react'
import Table from '../Table'
import { IoMdClose } from "react-icons/io";
import Pagination from "../../components/Pagination";
import useWarehouseManagement from '../../hooks/warehouseManagement/useWarehouseManagement';

const AllInventoryManagement = ({ data, columns, onClose }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { fetchinventoryManagement, inventoryManagement } = useWarehouseManagement()

    useEffect(() => {
        fetchinventoryManagement()
    }, [])

    const onPageChange = (data) => {
        console.log("data", data);
        setPage(data);
        fetchinventoryManagement(data, limit, searchTerm);
    };

    const onItemsPerPageChange = (data) => {
        setLimit(data);
        fetchinventoryManagement(page, data, searchTerm);
    };


    return (
        <div className="fixed inset-0 justify-center z-50 ">
            <div className="h-full w-screen flex justify-center items-center">
                <div className=" rounded-xl bg-white shadow-lg w-[700px] mx-auto">
                    <div className='flex justify-between items-center px-8 h-[62px] bg-[#CED2E7]'>
                        <h1 className='text-xl font-semibold text-[#000000]'>Inventory Management</h1>
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
                        currentPage={inventoryManagement?.data?.pagination?.currentPage}
                        totalPages={inventoryManagement?.data?.pagination?.totalPages}
                        onPageChange={onPageChange}
                        onItemsPerPageChange={onItemsPerPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default AllInventoryManagement
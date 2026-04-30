import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, FieldArray } from "formik";
import { IoIosArrowBack } from "react-icons/io";
import { useTender } from '../../../hooks/tender/useTender';
import { FaEye } from 'react-icons/fa';
import { IoMdDownload } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const TenderDocuments = () => {
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    console.log("ID: ", id)

    const { fetchTenderById, tenderById, updateTender, editTender } = useTender()
    console.log("Doc:", tenderById?.data?.tenderCopy)
    console.log("Res for Edit:", editTender)

    useEffect(() => {
        fetchTenderById(id)
    }, [])

    const initialValues = {
        tenderCopy: tenderById?.data?.tenderCopy || "",
        technicalDocuments: tenderById?.data?.technicalDocuments || "",
        tenderFees: tenderById?.data?.tenderFees || "",
        emdCopy: tenderById?.data?.emdCopy || "",
        boq: tenderById?.data?.boq || "",
        pricing: tenderById?.data?.pricing || "",
        performanceGuarantee: tenderById?.data?.performanceGuarantee || "",
        mou: tenderById?.data?.mou || "",
        other: tenderById?.data?.other || "",
    }

    return (
        <div className='w-full overflow-x-hidden bg-white'>
            <div className='flex items-center p-4'>
                <div onClick={() => navigate(-1)}>
                    <IoIosArrowBack size={24} />
                </div>
                <div className='pl-8 text-2xl font-normal'>Uploaded Document</div>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    updateTender(values, id);
                    console.log("Values: ", id)
                }}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>

                        <div className='flex flex-wrap gap-5 pl-8'>

                            <div className="relative p-4">
                                <h1 className="font-normal text-left text-lg">Tender Copy</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="tenderCopy"
                                            // value={values.tenderCopy}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.tenderCopy}
                                            alt="Tender Copy preview"
                                            className="w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4">
                                <h1 className="font-normal text-left text-lg">Technical Document</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="technicalDocuments"
                                            // value={values.technicalDocuments || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.technicalDocuments}
                                            alt="Technical Document preview"
                                            className="w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4">
                                <h1 className="font-normal text-left text-lg">Tender Fees</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="tenderFees"
                                            // value={values.tenderFees || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.tenderFees}
                                            alt="Tender Fees Preview"
                                            className="relative w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4">
                                <h1 className="font-normal text-left text-lg">EMD Copy</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="emdCopy"
                                            // value={values.emdCopy || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.emdCopy}
                                            alt="EMD Copy Preview"
                                            className="relative w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4">
                                <h1 className="font-normal text-left text-lg">BOQ</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="boq"
                                            // value={values.boq || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.boq}
                                            alt="BOQ Preview"
                                            className="relative w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4 pt-10">
                                <h1 className="font-normal text-left text-lg">Pricing</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="pricing"
                                            // value={values.pricing || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.pricing}
                                            alt="Pricing Preview"
                                            className="relative w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4 pt-10">
                                <h1 className="font-normal text-left text-lg">Performance Guarantee</h1>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="performanceGuarantee"
                                            // value={values.performanceGuarantee || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.performanceGuarantee}
                                            alt="Performance Guarantee Preview"
                                            className="relative w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative p-4 pt-10">
                                <h1 className="font-normal text-left text-lg">MOU</h1>
                                {/* File Input or Image Display */}
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="mou"
                                            // value={values.mou || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.mou}
                                            alt="Image preview"
                                            className="w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        {/* Action Icons */}
                                        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="relative p-4 pt-10">
                                <h1 className="font-normal text-left text-lg">Other</h1>
                                {/* Image or File Input */}
                                {isEditing ? (
                                    <>
                                        <input
                                            type="file"
                                            accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                                            className="text-xs py-4"
                                            name="other"
                                            // value={values.other || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <p className="pt-2 text-xs">Max File Size: 5 MB</p>
                                        <p className="pt-2 text-xs">Allowed File Types: jpeg, doc, docx, csv, pdf</p>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={tenderById?.data?.other}
                                            alt="Image with eyes"
                                            className="w-[175.31px] h-[284.73px] rounded-lg"
                                        />
                                        {/* Icons */}
                                        <div className="absolute bottom-1 right-0 flex items-center space-x-4 pr-4 pt-4">
                                            <FaEye className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                            <IoMdDownload className="text-[#0194FF] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className='flex justify-between pt-10'>
                            <div className='flex space-x-3 pl-12'>
                                {!isEditing &&
                                    <button className='bg-[#3ba831] w-[60px] h-[20px] rounded-md text-white text-sm font-medium flex items-center justify-center'
                                        onClick={() => setIsEditing(true)}>
                                        Edit
                                        <span className="ml-2">
                                            <FaEdit />
                                        </span>
                                    </button>
                                }
                            </div>
                            <div className='flex space-x-5 pr-10 mb-4'>
                                {isEditing ? (
                                    <button
                                        type='submit'
                                        className='bg-[#56AAC5] w-[80px] h-[40px] rounded-md text-white text-lg font-medium'>
                                        Update
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate(-1)}
                                        className='bg-[#56AAC5] w-[80px] h-[40px] rounded-md text-white text-lg font-medium'>
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TenderDocuments
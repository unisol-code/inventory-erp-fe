import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import PASTEL from "../../assets/images/newWarehouse-pastel.png";
import { IoMdClose } from "react-icons/io";
import useWarehouseManagement from "../../hooks/warehouseManagement/useWarehouseManagement";

const validationSchema = Yup.object().shape({
  warehouseID: Yup.string().required("Warehouse ID is required"),
  warehouseName: Yup.string().required("Warehouse Name is required"),
  contactPerson1Name: Yup.string().required(
    "Contact Person 1 Name is required"
  ),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]{10}$/, "Contact Number must be exactly 10 digits"),
  alternateNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Alternate Number must be exactly 10 digits")
    .nullable()
    .test(
      "not-same-as-contact",
      "Alternate number cannot be the same as Contact number",
      function (value) {
        return value !== this.parent.contactNumber;
      }
    ),
  location: Yup.string().required("Location is required"),
  contactPerson2Name: Yup.string().nullable(),
  officialEmail: Yup.string()
    .email("Invalid email address")
    .required("Official Email is required"),
  personalEmail: Yup.string()
    .email("Invalid email address")
    .nullable()
    .test(
      "not-same-as-official",
      "Personal Email cannot be the same as Official Email",
      function (value) {
        return value !== this.parent.officialEmail;
      }
    ),
  postalAddress: Yup.string().nullable(),
  type: Yup.string().required("Warehouse Type is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  storedMaterials: Yup.array()
    .of(
      Yup.object().shape({
        storedMaterialName: Yup.string().required("Material Name is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .positive("Quantity must be a positive number")
          .integer("Quantity must be an integer"),
      })
    )
    .min(1, "At least one stored material is required"),
});

function AddNewWarehouse({ onClose }) {
  const [materials, setMaterials] = useState([{ name: "", quantity: "" }]);

  const {
    fetchNewIdNumber,
    idNumber,
    createWareHouse,
    addWareHouse,
    fetchWarehouseTypes,
    warehouseType,
  } = useWarehouseManagement();
  console.log("Res new warehouse: ", addWareHouse);
  console.log("Res warehouse type: ", warehouseType);

  useEffect(() => {
    fetchNewIdNumber();
    fetchWarehouseTypes();
  }, []);
  console.log("idNumber: ", idNumber?.ID);

  const initialValues = {
    warehouseID: idNumber?.ID,
    warehouseName: "",
    contactPerson1Name: "",
    contactPerson2Name: "",
    contactNumber: "",
    officialEmail: "",
    alternateNumber: "",
    personalEmail: "",
    location: "",
    postalAddress: "",
    pincode: "",
    type: "",
    storedMaterials: [
      {
        storedMaterialName: "",
        quantity: "",
      },
    ],
  };

  return (
    <div className="fixed inset-0 ml-[140px] z-50 ">
      <div className="h-full w-screen flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg w-[1106px] mx-auto">
          <div
            className="w-full flex items-center justify-between h-[53px] rounded-t-xl"
            style={{ backgroundImage: `url(${PASTEL})` }}
          >
            <h1 className="text-black ml-10 text-2xl font-semibold">
              New Warehouse
            </h1>
            <button onClick={onClose}>
              <IoMdClose size={32} className="cursor-pointer mr-8" />
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Values: ", values);
              createWareHouse(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="max-h-[600px] overflow-y-auto scrollbar-hide bg-white shadow-lg rounded-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pl-4">
                    <div className="flex flex-col gap-y-6">
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Warehouse ID:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="warehouseId"
                          value={values.warehouseID}
                          disabled
                        />
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Warehouse Name:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="warehouseName"
                          value={values.warehouseName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title && (
                          <div className="text-red-500 text-xs">
                            {errors.title}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Contact Person 1:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="contactPerson1Name"
                          value={values.contactPerson1Name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.contactPerson1Name &&
                          touched.contactPerson1Name && (
                            <div className="text-red-500 text-xs">
                              {errors.contactPerson1Name}
                            </div>
                          )}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Contact Number:
                        </label>
                        <input
                          type="text"
                          maxLength="10" // Restricts input to 10 characters at the browser level
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="contactNumber"
                          value={values.contactNumber}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) handleChange(e); // Allows up to 10 digits only
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.contactNumber && touched.contactNumber && (
                          <div className="text-red-500 text-xs">
                            {errors.contactNumber}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Alternate Number:
                        </label>
                        <input
                          type="text"
                          maxLength="10" // Restricts input to 10 characters at the browser level
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="alternateNumber"
                          value={values.alternateNumber}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) handleChange(e); // Allows up to 10 digits only
                          }}
                          onBlur={handleBlur}
                        />
                        {errors.alternateNumber && touched.alternateNumber && (
                          <div className="text-red-500 text-xs">
                            {errors.alternateNumber}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Location:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="location"
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.location && touched.location && (
                          <div className="text-red-500 text-xs">
                            {errors.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-6">
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Contact Person 2:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="contactPerson2Name"
                          value={values.contactPerson2Name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.contactPerson2Name &&
                          touched.contactPerson2Name && (
                            <div className="text-red-500 text-xs">
                              {errors.contactPerson2Name}
                            </div>
                          )}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Official Email:
                        </label>
                        <input
                          type="email"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="officialEmail"
                          value={values.officialEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.officialEmail && touched.officialEmail && (
                          <div className="text-red-500 text-xs">
                            {errors.officialEmail}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Personal Email:
                        </label>
                        <input
                          type="email"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="personalEmail"
                          value={values.personalEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.personalEmail && touched.personalEmail && (
                          <div className="text-red-500 text-xs">
                            {errors.personalEmail}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Postal Address:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="postalAddress"
                          value={values.postalAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.postalAddress && touched.postalAddress && (
                          <div className="text-red-500 text-xs">
                            {errors.postalAddress}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Type:
                        </label>
                        <select
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="type"
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>Select Type</option>
                          {warehouseType?.data?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.type && touched.type && (
                          <div className="text-red-500 text-xs">
                            {errors.type}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center">
                        <label className="font-normal text-black text-base w-[136px]">
                          Pincode:
                        </label>
                        <input
                          type="text"
                          className="w-full md:w-[350px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                          name="pincode"
                          value={values.pincode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.pincode && touched.pincode && (
                          <div className="text-red-500 text-xs">
                            {errors.pincode}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <h2 className="text-xl text-[#000000] font-normal mb-4">
                      Stored Material Name
                    </h2>
                    <FieldArray name="storedMaterials">
                      {({ insert, remove, push }) => (
                        <>
                          {values.storedMaterials.map((material, index) => (
                            <div
                              key={index}
                              className="flex flex-wrap items-center space-x-16 mb-4"
                            >
                              {/* Stored Material Name */}
                              <div className="flex items-center space-x-8">
                                <p>Stored Material Name :</p>
                                <Field
                                  type="text"
                                  name={`storedMaterials[${index}].storedMaterialName`}
                                  className="w-full md:w-[450px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                                  placeholder="Material Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.storedMaterials?.[index]
                                  ?.storedMaterialName &&
                                  touched.storedMaterials?.[index]
                                    ?.storedMaterialName && (
                                    <div className="text-red-500 text-xs">
                                      {
                                        errors.storedMaterials[index]
                                          .storedMaterialName
                                      }
                                    </div>
                                  )}
                              </div>

                              {/* Quantity */}
                              <div className="flex items-center space-x-8">
                                <p>Quantity :</p>
                                <Field
                                  type="number"
                                  name={`storedMaterials[${index}].quantity`}
                                  className="w-full md:w-[175px] h-[40px] text-sm border rounded-full border-gray-300 px-4"
                                  placeholder="N-number"
                                  onChange={(e) => {
                                    const value =
                                      parseInt(e.target.value, 10) || 0;

                                    // Prevent quantity from going below 0
                                    const adjustedValue = value < 1 ? 1 : value;

                                    handleChange({
                                      target: {
                                        name: `storedMaterials[${index}].quantity`,
                                        value: adjustedValue,
                                      },
                                    });
                                  }}
                                  onBlur={handleBlur}
                                />
                                {errors.storedMaterials?.[index]?.quantity &&
                                  touched.storedMaterials?.[index]
                                    ?.quantity && (
                                    <div className="text-red-500 text-xs">
                                      {errors.storedMaterials[index].quantity}
                                    </div>
                                  )}
                              </div>

                              {/* Remove Button */}
                              <button
                                type="button"
                                className="text-[#FF0000] font-semibold text-base ml-4"
                                onClick={() => remove(index)} // Remove this row
                              >
                                Remove
                              </button>
                            </div>
                          ))}

                          {/* Add New Line Button */}
                          <button
                            type="button"
                            className="flex items-center mt-4 text-[#00B2FF] font-semibold text-base"
                            onClick={() =>
                              push({ storedMaterialName: "", quantity: "" })
                            } // Add a new row
                          >
                            <span className="text-2xl">+</span> Add New Line
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  <div className="flex justify-end space-x-10 mt-10">
                    <button
                      type="submit"
                      className="bg-[#56AAC5] text-white px-6 py-2 rounded-lg "
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-gray-300 text-black px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddNewWarehouse;

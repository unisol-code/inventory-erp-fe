import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import useVendor from "../../hooks/vendor/useVendor";
import { useEffect, useState } from "react";
import PASTEL from "../../assets/images/newWarehouse-pastel.png";
import useProductManagement from "../../hooks/product/useProductManagement";
import { useTender } from "../../hooks/tender/useTender";

const Dialog = ({ openDialog, closeDialog, vendo }) => {
  const { createVendor } = useVendor();
  const { UpdatedVendrById } = useVendor();
  const { fetchStockName, stockName } = useTender();
  const { fetchProductTypes, productTypes } = useProductManagement();
  const { fetchVendorSrno, vendorsrNo } = useVendor();
  const [modifiedFields, setModifiedFields] = useState({
    contactNumber: false,
    contactEmail: false,
  });

  useEffect(() => {
    fetchVendorSrno();
    fetchStockName();
    fetchProductTypes();
  }, []);

  if (!openDialog) return null;

  const validationSchema = Yup.object({
    /*vendorId: Yup.string()
      .required("Vendor ID is required")
      .min(1, "Vendor ID must be at least 2 characters"),*/
    date: Yup.date().required("Date is required"),
    vendorName: Yup.string()
      .required("Vendor Name is required")
      .min(3, "Vendor Name must be at least 3 characters"),
    contactNumber: Yup.string().when("_modifiedContactNumber", {
      is: true,
      then: () =>
        Yup.string()
          .required("Contact Number is required")
          .matches(/^[0-9]+$/, "Contact Number must contain only numbers")
          .min(10, "Contact Number must be at least 10 digits"),
    }),
    category: Yup.string().required("Category is required"),

    alternateNumber: Yup.string()
      .required("Alternate Number is required")
      .matches(/^[0-9]+$/, "Alternate Number must contain only numbers")
      .min(10, "Alternate Number must be at least 10 digits")
      .test(
        "unique-alternate-number",
        "Alternate Number must be different from Contact Number",
        function (value) {
          const { contactNumber } = this.parent;
          return value !== contactNumber;
        }
      ),
    contactEmail: Yup.string().when("_modifiedContactEmail", {
      is: true,
      then: () =>
        Yup.string()
          .required("Contact Email is required")
          .email("Invalid email format"),
    }),
    alternateEmail: Yup.string()
      .required("Alternate Email is required")
      .email("Invalid email format")
      .test(
        "unique-alternate-email",
        "Alternate Email must be different from Contact Email",
        function (value) {
          // Compare alternateEmail with contactEmail
          const { contactEmail } = this.parent;
          return value !== contactEmail;
        }
      ),
    productOrService: Yup.string().required("Product/Services is required"),

    productManufacture: Yup.string().required(
      "Product Manufacture is required"
    ),
    additionalInfo: Yup.string().required("Additional Information is required"),
    bankName: Yup.string().required("Bank Name is required"),
    branchName: Yup.string().required("Branch Name is required"),
    ifscCode: Yup.string()
      .required("IFSC Code is required")
      .matches(/^[A-Za-z]{4}[0-9]{7}$/, "Invalid IFSC Code"),
    bankingName: Yup.string().required("Banking Name is required"),
  });

  const initialValues = {
    ...vendo?.vendor,
    _modifiedContactNumber: false,
    _modifiedContactEmail: false,
    vendorId: vendo?.vendor?.vendorId || vendorsrNo?.srNo,
    date: vendo?.vendor?.date.split("T")[0] || "",
    vendorName: vendo?.vendor?.vendorName || "",
    contactNumber: vendo?.vendor?.contactNumber || "",
    alternateNumber: vendo?.vendor?.alternateNumber || "",
    contactEmail: vendo?.vendor?.contactEmail || "",
    alternateEmail: vendo?.vendor?.alternateEmail || "",
    productOrService: vendo?.vendor?.productOrService || "",
    category: vendo?.vendor?.category || "",
    productManufacture: vendo?.vendor?.productManufacture || "",
    additionalInfo: vendo?.vendor?.additionalInfo || "",
    bankName: vendo?.vendor?.bankName || "",
    branchName: vendo?.vendor?.branchName || "",
    ifscCode: vendo?.vendor?.ifscCode || "",
    bankingName: vendo?.vendor?.bankingName || "",
  };

  return (
    <>
      <div className="fixed  w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
        <div className="bg-white h-[600px] pb-10 overflow-y-scroll scrollbar-hide rounded-2xl shadow-md w-[1000px]">
          <div
            style={{ backgroundImage: `url(${PASTEL})` }}
            className="w-full py-[30px] flex rounded-t-2xl items-center justify-between h-[50px] relative"
          >
            <h1 className="text-[#000000]  ml-96 text-opacity-22 text-2xl font-semibold">
              {vendo ? "Update Vender" : " Create/Add Vender"}
            </h1>

            <button onClick={closeDialog}>
              <IoMdClose size={32} className="cursor-pointer mr-8" />
            </button>
          </div>

          {/* Form  */}

          <div className="pl-20">
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={async (values, { setErrors }) => {
                const submitValues = { ...values };
                delete submitValues._modifiedContactNumber;
                delete submitValues._modifiedContactEmail;
                try {
                  const submitValues = { ...values };

                  if (vendo) {
                    delete submitValues.vendorId;
                    if (
                      submitValues.contactNumber === vendo.vendor.contactNumber
                    ) {
                      delete submitValues.contactNumber;
                    }
                    if (
                      submitValues.contactEmail === vendo.vendor.contactEmail
                    ) {
                      delete submitValues.contactEmail;
                    }

                    try {
                      const response = await UpdatedVendrById(
                        vendo?.vendor?._id,
                        submitValues
                      );

                      console.log("Full Update Response:", response);
                      closeDialog();
                    } catch (error) {
                      console.error("Detailed Error:", {
                        status: error.response?.status,
                        data: error.response?.data,
                        message: error.message,
                      });

                      if (error.response) {
                        const errorData = error.response.data;
                        const formikErrors = {};

                        if (typeof errorData === "object") {
                          Object.keys(errorData).forEach((key) => {
                            if (key in submitValues) {
                              formikErrors[key] = errorData[key];
                            }
                          });
                        } else if (typeof errorData === "string") {
                          alert(errorData);
                        }

                        setErrors(formikErrors);
                      } else {
                        alert("An error occurred during update");
                      }
                    }
                  } else {
                    await createVendor(values);
                    closeDialog();
                  }
                } catch (error) {
                  console.error("Unexpected submission error:", error);
                  alert("Unexpected error during submission");
                }
              }}
            >
              {({ values, errors, touched, setErrors, setFieldValue }) => (
                <Form>
                  <div className="flex space-x-4 mb-4 gap-32 mt-2">
                    {/* Vender Id  */}
                    {(vendo || vendorsrNo) && (
                      <div className="flex space-x-4 mb-4 gap-32 mt-2">
                        <div className="flex-1">
                          <label
                            htmlFor="VenderId"
                            className="text-lg w-48 font-semibold"
                          >
                            Vendor ID
                          </label>
                          <Field
                            name="vendorId"
                            type="text"
                            disabled
                            value={vendo?.vendor?.vendorId || vendorsrNo?.srNo}
                            className="px-4 ml-2 border-b-2 border-gray-300"
                          />
                          {/* Remove ErrorMessage for vendorId */}
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex-1">
                      <label
                        htmlFor="Date"
                        className="text-lg w-48 font-semibold"
                      >
                        Date
                      </label>
                      <Field
                        name="date"
                        type="date"
                        className=" px-4 ml-2 border-b-2 border-gray-300"
                      />

                      <ErrorMessage
                        name="date"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Vendor Name */}
                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Vendor Name
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="vendorName"
                        type="text"
                        className="w-[600px] h-[30px] px-4  border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="vendorName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Contact Number
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="contactNumber"
                        type="text" // Change to 'text' to prevent issues with leading zeros
                        onChange={(e) => {
                          const value = e.target.value;

                          // Allow only numbers and restrict to 10 characters
                          if (/^\d*$/.test(value) && value.length <= 10) {
                            setFieldValue("contactNumber", value);
                            setFieldValue("_modifiedContactNumber", true);
                          }
                        }}
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="contactNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Alternate Number */}
                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Alternate Number
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="alternateNumber"
                        type="text" // Changed to 'text' for consistency with Contact Number
                        onChange={(e) => {
                          const value = e.target.value;

                          // Allow only numbers and restrict to 10 characters
                          if (/^\d*$/.test(value) && value.length <= 10) {
                            setFieldValue("alternateNumber", value); // Set the value
                          }
                        }}
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="alternateNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Email */}
                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Contact Email
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="contactEmail"
                        type="email"
                        onChange={(e) => {
                          // Set the value
                          setFieldValue("contactEmail", e.target.value);
                          // Mark as modified
                          setFieldValue("_modifiedContactEmail", true);
                        }}
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="contactEmail"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Alternate Email */}
                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Alternate Email
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="alternateEmail"
                        type="email"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="alternateEmail"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Product/Services */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Product/Services
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="productOrService"
                        as="select"
                        className="w-[600px] h-[30px] px-4  border border-gray-300 rounded-md"
                      >
                        <option value="" disabled selected>
                          Product/Service
                        </option>
                        {stockName?.products?.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="productOrService"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Category
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="category"
                        as="select"
                        className="w-[600px] h-[30px] px-4  border border-gray-300 rounded-md"
                      >
                        <option value="" disabled>
                          Select a Category
                        </option>
                        {productTypes?.productTypes?.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* productManufacture */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Product Manufacture
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="productManufacture"
                        type="text"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="productManufacture"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Aditional Information  */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Aditional Informations
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="additionalInfo"
                        type="text"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="additionalInfo"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Bank Information  */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Bank Name
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="bankName"
                        type="text"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="bankName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Branch Name  */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Branch Name
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="branchName"
                        type="text"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="branchName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* IFSC Code  */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      IFSC Code
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="ifscCode"
                        type="text"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="ifscCode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Banking Name  */}

                  <div className="mb-4 flex gap-10">
                    <label className="text-lg w-48 font-semibold">
                      Banking Name
                    </label>
                    <div className="flex flex-col">
                      <Field
                        name="bankingName"
                        type="text"
                        className="w-[600px] h-[30px] px-4 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="bankingName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 space-x-4 ">
                    {/* BUTTONS  */}
                    <button
                      type="submit"
                      className="px-8 py-2 border-2 bg-[#56AAC5] font-bold text-black rounded-lg shadow-lg"
                    >
                      {vendo ? "Update" : "ADD"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrors({});
                        closeDialog();
                      }}
                      className="px-8 py-2 border-2 font-bold text-black rounded-lg shadow-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;

import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import { Plus } from "lucide-react";
import cardimg from "../../assets/images/cardimg.png";
import { useEffect, useState } from "react";
import useLocation from "../../hooks/location/useLocation";
import { useQuotation } from "../../hooks/inventory/useQuotation";
import usePurchase from "../../hooks/product/usePurchaseManagement";

const validationSchema = Yup.object({
  // Quotation Details
  quotationNo: Yup.string().required("Quotation number is required"),
  quotationName: Yup.string().required("Quotation name is required"),
  quotationDate: Yup.date().required("Quotation date is required"),
  validity: Yup.date()
    .min(Yup.ref("quotationDate"), "Validity date must be after quotation date")
    .required("Validity date is required"),

  // From (Company) Details
  from: Yup.object({
    companyName: Yup.string().required("Company name is required"),
    companyAddress: Yup.string().required("Company address is required"),
    companyCountry: Yup.string().required("Company country is required"),
    companyState: Yup.string().required("Company state is required"),
    companyCity: Yup.string().required("Company city is required"),
    companyZipcode: Yup.number()
      .typeError("Zip code must be a number")
      .required("Company zip code is required"),
    companyEmail: Yup.string()
      .email("Invalid email")
      .required("Company email is required"),
    companyMobile: Yup.string().required("Company mobile number is required"),
  }),

  // To (Customer) Details
  to: Yup.object({
    customerName: Yup.string().required("Customer name is required"),
    customerAddress: Yup.string().required("Customer address is required"),
    customerCountry: Yup.string().required("Customer country is required"),
    customerState: Yup.string().required("Customer state is required"),
    customerCity: Yup.string().required("Customer city is required"),
    customerZipcode: Yup.number()
      .typeError("Zip code must be a number")
      .required("Customer zip code is required"),
    customerEmail: Yup.string()
      .email("Invalid email")
      .required("Customer email is required"),
    customerMobile: Yup.number().required("Customer mobile number is required"),
  }),

  // Bank Details
  bankDetails: Yup.object({
    bankName: Yup.string().required("Bank name is required"),
    accountNumber: Yup.string().required("Account number is required"),
    accountType: Yup.string().required("Account type is required"),
    ifscCode: Yup.string().required("IFSC code is required"),
    branchName: Yup.string().required("Branch name is required"),
    address: Yup.string().required("Bank address is required"),
  }),

  // Quotation Items
  items: Yup.array().of(
    Yup.object().shape({
      itemNo: Yup.number().required("Item number is required"),
      quantity: Yup.number()
        .typeError("Quantity must be a number")
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
      unitPrice: Yup.number()
        .typeError("Unit price must be a number")
        .required("Unit price is required")
        .min(0, "Unit price must be at least 0"),
      discountPercentage: Yup.number()
        .typeError("Discount percentage must be a number")
        .min(0, "Discount percentage cannot be negative")
        .max(100, "Discount percentage cannot exceed 100"),
      discountAmount: Yup.number()
        .typeError("Discount amount must be a number")
        .min(0, "Discount amount cannot be negative"),
      sgstRate: Yup.number()
        .typeError("SGST rate must be a number")
        .min(0, "SGST rate cannot be negative"),
      sgstAmount: Yup.number()
        .typeError("SGST amount must be a number")
        .min(0, "SGST amount cannot be negative"),
      cgstRate: Yup.number()
        .typeError("CGST rate must be a number")
        .min(0, "CGST rate cannot be negative"),
      cgstAmount: Yup.number()
        .typeError("CGST amount must be a number")
        .min(0, "CGST amount cannot be negative"),
      total: Yup.number()
        .typeError("Total must be a number")
        .min(0, "Total cannot be negative"),
    })
  ),
  // Summary
  subtotal: Yup.number()
    .typeError("Subtotal must be a number")
    .min(0, "Subtotal cannot be negative"),
  totalDiscountPercentage: Yup.number()
    .typeError("Total discount percentage must be a number")
    .min(0, "Total discount percentage cannot be negative")
    .max(100, "Total discount percentage cannot exceed 100"),
  taxes: Yup.number()
    .typeError("Taxes must be a number")
    .min(0, "Taxes cannot be negative"),
  netAmount: Yup.number()
    .typeError("Net amount must be a number")
    .min(0, "Net amount cannot be negative"),
});

const CreateNewQuotationDialog = ({ onClose }) => {
  const {
    fetchCountryLocation,
    fetchCityLocation,
    fetchStateLocation,
    stateLocation,
    countryLocation,
    cityLocation,
  } = useLocation();
  const {
    fetchCustomerName,
    customerName,
    fetchBankName,
    bankNames,
    fetchQuotationSrNo,
    quotationSrNo,
    createQuotation,
    fetchBankDetails,
    bankDetails,
    termsCondition,
    fetchQuotationTermsCondtions,
  } = useQuotation();
  const { fetchAllProductSerialNo, allProductsNo } = usePurchase();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    fetchCountryLocation();
    fetchCustomerName();
    fetchQuotationSrNo();
    fetchBankName();
    fetchQuotationTermsCondtions();
    fetchAllProductSerialNo();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStateLocation(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCityLocation(selectedCountry, selectedState);
    }
  }, [selectedCountry, selectedState]);

  const formik = useFormik({
    initialValues: {
      //quotationNo: quotationSrNo?.srNo,
      quotationNo: "22",
      quotationName: "",
      quotationDate: "",
      validity: "",
      from: {
        companyName: quotationSrNo?.companyName,
        companyAddress: quotationSrNo?.address,
        companyCountry: quotationSrNo?.country,
        companyState: quotationSrNo?.state,
        companyCity: quotationSrNo?.city,
        companyZipcode: quotationSrNo?.zipCode,
        companyEmail: quotationSrNo?.email,
        companyMobile: quotationSrNo?.mobile,
      },
      to: {
        customerName: "",
        customerAddress: "",
        customerCountry: "",
        customerState: "",
        customerCity: "",
        customerZipcode: 0,
        customerEmail: "",
        customerMobile: 0,
      },
      bankDetails: {
        bankName: bankDetails?.bankName || "",
        accountNumber: bankDetails?.accountNumber || 0,
        accountType: bankDetails?.accountType || "",
        ifscCode: bankDetails?.ifscCode || "",
        branchName: bankDetails?.branchName || 0,
        address: bankDetails?.address || "",
      },
      items: [
        {
          itemNo: "",
          quantity: "",
          unitPrice: "",
          discountPercentage: "",
          discountAmount: "",
          sgstRate: "",
          sgstAmount: "",
          cgstRate: "",
          cgstAmount: "",
          total: "",
          igstRate: "",
          igstAmount: "",
        },
      ],
      termsAndConditions: {
        warranty: termsCondition?.warranty,
        orderSize: termsCondition?.deliveryTime,
        paymentTerms: termsCondition?.paymentTerms,
      },
      subtotal: 0,
      totalDiscountPercentage: 0,
      taxes: 0,
      netAmount: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      createQuotation(values);
      onClose();
    },
  });

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    formik.setFieldValue("to.customerCountry", countryCode);
    setSelectedCountry(countryCode);
    setSelectedState("");
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    formik.setFieldValue("to.customerState", stateCode);
    setSelectedState(stateCode);

    const isMaharashtra = stateCode === "MH";
    const updatedItems = formik.values.items.map((item) => {
      if (!isMaharashtra) {
        // If the state is not Maharashtra, add IGST fields
        item.igstRate = item.igstRate || 0;
        item.igstAmount = item.igstAmount || 0;
      } else {
        // If the state is Maharashtra, remove IGST fields (set to 0)
        item.igstRate = 0;
        item.igstAmount = 0;
      }
      return item;
    });

    // Update formik with the new items
    formik.setFieldValue("items", updatedItems);
  };

  const handleBankChange = (event) => {
    const bankID = event.target.value;
    const selectedBank = bankNames.find((bank) => bank._id === bankID);

    if (selectedBank) {
      formik.setFieldValue("bankDetails.bankName", selectedBank.bankName);
      formik.setFieldValue("bankDetails.bankId", bankID);

      fetchBankDetails(bankID);
    } else {
      formik.setFieldValue("bankDetails.bankName", "");
      formik.setFieldValue("bankDetails.bankId", "");
    }
  };

  console.log("Formik Values:", formik.values);
  console.log("Formik Errors:", formik.errors);

  const addNewLine = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      {
        itemNo: "",
        quantity: "",
        unitPrice: "",
        discountPercentage: "",
        discountAmount: "",
        sgstRate: "",
        sgstAmount: "",
        cgstRate: "",
        cgstAmount: "",
        total: "",
      },
    ]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formik.values.items];
    updatedItems[index][field] = value; // Update specific field
    // Recalculate dependent fields
    const baseAmount =
      updatedItems[index].quantity * updatedItems[index].unitPrice;
    updatedItems[index].discountAmount =
      (baseAmount * updatedItems[index].discountPercentage) / 100;
    const afterDiscount = baseAmount - updatedItems[index].discountAmount;

    // If the state is "MH", calculate SGST and CGST
    if (selectedState === "MH") {
      updatedItems[index].sgstAmount =
        (afterDiscount * updatedItems[index].sgstRate) / 100;
      updatedItems[index].cgstAmount =
        (afterDiscount * updatedItems[index].cgstRate) / 100;
      updatedItems[index].igstAmount = 0;
      updatedItems[index].total =
        afterDiscount +
        updatedItems[index].sgstAmount +
        updatedItems[index].cgstAmount;
    } else {
      // For non-MH, calculate IGST
      updatedItems[index].sgstAmount =
        (afterDiscount * updatedItems[index].sgstRate) / 100;
      updatedItems[index].cgstAmount =
        (afterDiscount * updatedItems[index].cgstRate) / 100;
      updatedItems[index].igstAmount =
        (afterDiscount * updatedItems[index].igstRate) / 100;
      updatedItems[index].total =
        afterDiscount +
        updatedItems[index].sgstAmount +
        updatedItems[index].cgstAmount +
        updatedItems[index].igstAmount;
    }

    formik.setFieldValue("items", updatedItems);
  };

  const calculateSubtotal = () => {
    return formik.values.items.reduce(
      (sum, item) => sum + Number(item.unitPrice * item.quantity),
      0
    );
  };

  const calculateTotalDiscount = () => {
    return formik.values.items.reduce(
      (sum, item) => sum + Number(item.discountAmount) || 0,
      0
    );
  };

  const calculateAverageDiscountPercentage = () => {
    const subtotal = calculateSubtotal();
    const totalDiscount = calculateTotalDiscount();

    return subtotal > 0 ? (totalDiscount / subtotal) * 100 : 0;
  };

  const calculateTotalTax = () => {
    return formik.values.items.reduce((total, item) => {
      // Ensure all necessary values are numbers and default to 0 if not
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      const discountPercentage = Number(item.discountPercentage) || 0;
      const sgstRate = Number(item.sgstRate) || 0;
      const cgstRate = Number(item.cgstRate) || 0;
      const igstRate = Number(item.igstRate) || 0;

      const baseAmount = quantity * unitPrice;
      const afterDiscount = baseAmount * (1 - discountPercentage / 100);
      const sgstAmount = (afterDiscount * sgstRate) / 100;
      const cgstAmount = (afterDiscount * cgstRate) / 100;
      const igstAmount = (afterDiscount * igstRate) / 100;
      return total + sgstAmount + cgstAmount + igstAmount;
    }, 0);
  };

  const calculateNetAmount = () => {
    // Add similar defensive programming to other calculation functions
    const subtotal = calculateSubtotal() || 0;
    const totalDiscount = calculateTotalDiscount() || 0;
    const totalTax = calculateTotalTax() || 0;

    return subtotal - totalDiscount + totalTax;
  };

  useEffect(() => {
    // Wrap in try-catch to prevent breaking the entire effect
    try {
      formik.setFieldValue("subtotal", calculateSubtotal());
      formik.setFieldValue(
        "totalDiscountPercentage",
        calculateAverageDiscountPercentage()
      );
      formik.setFieldValue("taxes", calculateTotalTax());
      formik.setFieldValue("netAmount", calculateNetAmount());
    } catch (error) {
      console.error("Error updating financial calculations:", error);
    }
  }, [formik.values.items]);

  const [dates, setDates] = useState({
    quotationDate: formik.values.quotationDate,
    validity: formik.values.validity,
  });

  // Sync Formik values with state
  useEffect(() => {
    setDates({
      quotationDate: formik.values.quotationDate,
      validity: formik.values.validity,
    });
  }, [formik.values]);

  const handleDateChange = (fieldName) => (event) => {
    let value = event.target.value;

    // Split the date into parts
    const dateParts = value.split("-");

    // Check if the year part exists and is more than 4 digits
    if (dateParts[0] && dateParts[0].length > 4) {
      // Truncate the year to 4 digits
      dateParts[0] = dateParts[0].slice(0, 4);
      value = dateParts.join("-");
    }

    // Additional check to ensure year is not greater than 9999
    if (dateParts[0] && Number(dateParts[0]) > 9999) {
      return;
    }

    setDates((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    formik.setFieldValue(fieldName, value);
  };

  return (
    <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div
          className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 flex items-center justify-between border-b shrink-0"
          style={{
            backgroundImage: `url(${cardimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-semibold text-center flex-1">
            Create New Quotation
          </h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <IoMdClose size={32} />
          </button>
        </div>

        <div className="h-[500px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            {/* Quotation Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-bold text-base">
              <div className="space-y-4">
                <div className="flex items-center gap-4 font-bold">
                  <label className="w-15">QUOTATION NO:</label>
                  <input
                    type="text"
                    name="quotationNo"
                    disabled
                    className="flex-1 border p-2 max-w-[200px] max-h-8"
                    value={formik.values.quotationNo}
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="w-32 whitespace-nowrap">
                    QUOTATION Name:
                  </label>
                  <input
                    type="text"
                    name="quotationName"
                    className="flex-1 border p-2 max-w-lg max-h-8"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.quotationName &&
                  formik.errors.quotationName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.quotationName}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-end">
                  <label className="w-40 text-right">QUOTATION DATE:</label>
                  <input
                    type="date"
                    name="quotationDate"
                    value={dates.quotationDate}
                    className="border max-w-[230px] p-2 text-sm font-normal"
                    onChange={handleDateChange("quotationDate")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.quotationDate &&
                  formik.errors.quotationDate ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.quotationDate}
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <label className="w-40 text-right whitespace-nowrap">
                    Validity of Quotation:
                  </label>
                  <input
                    type="date"
                    name="validity"
                    value={dates.validity}
                    className="border max-w-[230px] p-2 text-sm font-normal"
                    onChange={handleDateChange("validity")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.validity && formik.errors.validity ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.validity}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* From/To Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* From Section */}
              <div className="space-y-4 text-base font-bold">
                <h2 className="font-semibold text-xl">From</h2>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center gap-2">
                    <label className="w-32">Company Name:</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formik.values.from.companyName}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-32">Address:</label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formik.values.from.companyAddress}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="w-32">Country:</label>
                    <input
                      name="companyCountry"
                      value={formik.values.from.companyCountry}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="w-32">State:</label>
                    <input
                      type="text"
                      name="companyState"
                      value={formik.values.from.companyState}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="w-32">City:</label>
                    <input
                      type="text"
                      name="companyCity"
                      value={formik.values.from.companyCity}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="w-32">Zip Code:</label>
                    <input
                      type="number"
                      name="companyZipcode"
                      value={formik.values.from.companyZipcode}
                      disabled
                      className="flex-1 border p-2 max-w-[325px] h-8"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-32">Email:</label>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formik.values.from.companyEmail}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-32">Mobile:</label>
                    <input
                      type="text"
                      name="companyMobile"
                      value={formik.values.from.companyMobile}
                      className="flex-1 border p-2 max-w-[325px] h-8"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* To Section */}
              <div className="space-y-4 flex justify-end w-full">
                <div className="w-full">
                  <h2 className="font-semibold text-xl mb-3 text-left">TO</h2>{" "}
                  {/* Align heading to the left */}
                  <div className="space-y-3 pr-6 text-base font-bold text-right">
                    <div className="flex items-center gap-2">
                      <label className="w-32">Customer Name:</label>
                      <select
                        className="w-full px-2 py-2 border-2 border-gray-400 rounded-lg"
                        name="to.customerName"
                        value={formik.values.to.customerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" label="Select Customer" />
                        {customerName?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {formik.touched.to?.customerName &&
                      formik.errors.to?.customerName ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerName}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32 text-right">Address:</label>
                      <input
                        type="text"
                        name="to.customerAddress"
                        className="flex-1 border p-2 h-8 max-w-[325px]"
                        value={formik.values.to.customerAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.to?.customerAddress &&
                      formik.errors.to?.customerAddress ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerAddress}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32">Country:</label>
                      <select
                        className="w-full px-2 py-2 border-2 border-gray-400 rounded-lg"
                        name="to.customerCountry"
                        value={formik.values.to.customerCountry}
                        onChange={handleCountryChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" label="Select Country" />
                        {countryLocation?.map((dept, index) => (
                          <option key={index} value={dept.isoCode}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.to?.customerCountry &&
                      formik.errors.to?.customerCountry ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerCountry}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32">State:</label>
                      <select
                        as="select"
                        className="w-full px-2 py-2 border-2 border-gray-400 rounded-lg"
                        name="to.customerState"
                        value={formik.values.to.customerState}
                        onChange={handleStateChange}
                        onBlur={formik.handleBlur}
                        disabled={!selectedCountry}
                      >
                        <option value="" label="Select State" />
                        {stateLocation?.map((state, index) => (
                          <option key={index} value={state.isoCode}>
                            {state?.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.to?.customerState &&
                      formik.errors.to?.customerState ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerState}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32">City:</label>
                      <select
                        className="w-full px-2 py-2 border-2 border-gray-400 rounded-lg"
                        name="to.customerCity"
                        value={formik.values.to.customerCity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!selectedState}
                      >
                        <option value="" disabled>
                          Select City
                        </option>
                        {cityLocation?.map((city, index) => (
                          <option key={index} value={city?.name}>
                            {city?.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.customerCity &&
                      formik.errors.customerCity ? (
                        <div className="text-red-500">
                          {formik.errors.customerCity}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32">Zip Code:</label>
                      <input
                        type="number"
                        name="to.customerZipcode"
                        className="flex-1 border p-2 max-w-[325px] h-8"
                        value={formik.values.to?.customerZipcode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.to?.customerZipcode &&
                      formik.errors.to?.customerZipcode ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerZipcode}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32 text-right">Email:</label>
                      <input
                        type="email"
                        name="to.customerEmail"
                        className="flex-1 border p-2 h-8 max-w-[325px]"
                        value={formik.values.to?.customerEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.to?.customerEmail &&
                      formik.errors.to?.customerEmail ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerEmail}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="w-32 text-right">Mobile:</label>
                      <input
                        type="number"
                        name="to.customerMobile"
                        className="flex-1 border p-2 h-8 max-w-[325px]"
                        value={formik.values.to?.customerMobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.to?.customerMobile &&
                      formik.errors.to?.customerMobile ? (
                        <div className="text-red-500">
                          {formik.errors.to?.customerMobile}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="p-0 mb-8">
              <h2 className="font-semibold text-xl mb-4">Bank Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 text-base font-bold">
                {/* Bank Name */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Name of Bank:</label>
                  <select
                    className="w-full px-2 py-2 border-2 border-gray-400 rounded-lg"
                    name="bankDetails.bankName"
                    value={formik.values.bankDetails.bankName}
                    onChange={handleBankChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" label="Select Bank">
                      Select Bank
                    </option>
                    {bankNames?.map((dept, index) => (
                      <option key={index} value={dept?._id}>
                        {dept?.bankName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.bankDetails?.bankName &&
                  formik.errors.bankDetails?.bankName ? (
                    <div className="text-red-500">
                      {formik.errors.bankDetails?.bankName}
                    </div>
                  ) : null}
                </div>

                {/* Account Number */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Account Number:</label>
                  <input
                    type="number"
                    name="bankDetails.accountName"
                    className="flex-1 border p-2 max-w-[325px] h-8"
                    value={bankDetails?.accountNumber}
                    onChange={handleBankChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                </div>

                {/* Account Type (Aligned to the right) */}
                <div className="flex items-center gap-2 justify-end">
                  <label className="w-32 text-right">Account Type:</label>
                  <input
                    type="text"
                    name="bankDetails.accountType"
                    className="flex-1 border p-2 max-w-[325px] h-8"
                    value={bankDetails?.accountType}
                    onChange={handleBankChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                </div>

                {/* IFSC Code */}
                <div className="flex items-center gap-2">
                  <label className="w-32">IFSC Code:</label>
                  <input
                    type="text"
                    name="bankDetails.ifscCode"
                    className="flex-1 border p-2 max-w-[325px] h-8"
                    value={bankDetails?.ifscCode}
                    onChange={handleBankChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                </div>

                {/* Branch Name */}
                <div className="flex items-center gap-2">
                  <label className="w-32">Branch Name:</label>
                  <input
                    type="text"
                    name="bankDetails.branchName"
                    className="flex-1 border p-2 max-w-[325px] h-8"
                    value={bankDetails?.branchName}
                    onChange={handleBankChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                </div>

                {/* Bank Location (Aligned to the right) */}
                <div className="flex items-center gap-2 justify-end">
                  <label className="w-32 text-right">Address:</label>
                  <input
                    type="text"
                    name="bankDetails.address"
                    className="flex-1 border p-2 max-w-[325px] h-8"
                    value={bankDetails?.address}
                    onChange={handleBankChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Quotation Details Table */}
            <div className="mb-8">
              <h2 className="font-semibold text-xl mb-4">Quotation Details</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    {/* Header Row */}
                    <tr>
                      <th className="p-2 font-normal text-sm" rowSpan="2">
                        Item No
                      </th>
                      <th className="p-2 font-normal text-sm" rowSpan="2">
                        Quantity
                      </th>
                      <th className="p-2 font-normal text-sm" rowSpan="2">
                        Unit Price
                      </th>
                      <th className="p-2 font-normal text-sm" rowSpan="2">
                        Discount %
                      </th>
                      <th className="p-2 font-normal text-sm" rowSpan="2">
                        Discount AMT
                      </th>
                      <th className="p-2 font-normal text-sm" colSpan="2">
                        SGST
                      </th>
                      <th className="p-2 font-normal text-sm" colSpan="2">
                        CGST
                      </th>
                      {selectedState !== "MH" && (
                        <th className="p-2 font-normal text-sm" colSpan="2">
                          IGST
                        </th>
                      )}
                      <th className="p-2 font-normal text-sm" rowSpan="2">
                        Total
                      </th>
                    </tr>
                    <tr>
                      <th className="p-2 font-normal text-xs">Rate (%)</th>
                      <th className="p-2 font-normal text-xs">Amt.</th>
                      <th className="p-2 font-normal text-xs">Rate (%)</th>
                      <th className="p-2 font-normal text-xs">Amt.</th>
                      {selectedState !== "MH" && (
                        <>
                          <th className="p-2 font-normal text-xs">Rate (%)</th>
                          <th className="p-2 font-normal text-xs">Amt.</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.items.map((item, index) => (
                      <tr
                        key={index}
                        className="rounded-md border border-gray-300 overflow-hidden mb-2"
                      >
                        <td className="p-0 border-r border-gray-300">
                          <select
                            name={`items.${index}.itemNo`}
                            className="w-full"
                            value={item.itemNo}
                            onChange={(e) =>
                              handleItemChange(index, "itemNo", e.target.value)
                            }
                          >
                            <option value="" disabled>
                              Item
                            </option>
                            {allProductsNo.map((productNo) => (
                              <option key={productNo} value={productNo}>
                                {productNo}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            name={`items.${index}.quantity`}
                            className="w-full"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = +e.target.value;
                              const adjustedValue = value < 1 ? 1 : value; // Prevent quantity from being less than 1
                              handleItemChange(
                                index,
                                "quantity",
                                adjustedValue
                              );
                            }}
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            name={`items.${index}.unitPrice`}
                            className="w-full"
                            value={item.unitPrice}
                            onChange={(e) => {
                              const value = +e.target.value;
                              const adjustedValue = value < 1 ? 1 : value; // Prevent unit price from being less than 1
                              handleItemChange(
                                index,
                                "unitPrice",
                                adjustedValue
                              );
                            }}
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            name={`items.${index}.discountPercentage`}
                            className="w-full p-1 border rounded"
                            value={item.discountPercentage}
                            onChange={(e) => {
                              const value = +e.target.value;
                              const adjustedValue =
                                value < 0 ? 0 : value > 100 ? 100 : value; // Prevent negative or above 100%
                              handleItemChange(
                                index,
                                "discountPercentage",
                                adjustedValue
                              );
                            }}
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            name={`items.${index}.discountAmount`}
                            className="w-full"
                            value={Number(item.discountAmount).toFixed(2)}
                            readOnly
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            name={`items.${index}.sgstRate`}
                            className="w-full"
                            value={item.sgstRate}
                            onChange={(e) => {
                              const value = +e.target.value;
                              const adjustedValue =
                                value < 0 ? 0 : value > 100 ? 100 : value; // Restrict SGST rate
                              handleItemChange(
                                index,
                                "sgstRate",
                                adjustedValue
                              );
                            }}
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            className="w-full"
                            value={Number(item.sgstAmount).toFixed(2)}
                            readOnly
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            name={`items.${index}.cgstRate`}
                            className="w-full"
                            value={item.cgstRate}
                            onChange={(e) => {
                              const value = +e.target.value;
                              const adjustedValue =
                                value < 0 ? 0 : value > 100 ? 100 : value; // Restrict CGST rate
                              handleItemChange(
                                index,
                                "cgstRate",
                                adjustedValue
                              );
                            }}
                          />
                        </td>
                        <td className="p-2 border-r border-gray-300">
                          <input
                            type="number"
                            className="w-full"
                            value={Number(item.cgstAmount).toFixed(2)}
                            readOnly
                          />
                        </td>
                        {/* IGST Fields */}
                        {selectedState !== "MH" && (
                          <>
                            <td className="p-2 border-r border-gray-300">
                              <input
                                type="number"
                                name={`items.${index}.igstRate`}
                                className="w-full"
                                value={item.igstRate}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const adjustedValue =
                                    value < 0 ? 0 : value > 100 ? 100 : value; // Restrict IGST rate
                                  handleItemChange(
                                    index,
                                    "igstRate",
                                    adjustedValue
                                  );
                                }}
                              />
                            </td>
                            <td className="p-2 border-r border-gray-300">
                              <input
                                type="number"
                                className="w-full"
                                value={Number(item.igstAmount).toFixed(2)}
                                readOnly
                              />
                            </td>
                          </>
                        )}
                        {/* Total */}
                        <td className="p-2">
                          <input
                            type="number"
                            className="w-full"
                            value={Number(item.total).toFixed(2)}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add New Line Button */}
            <button
              type="button"
              onClick={addNewLine}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <Plus size={20} />
              Add New Line
            </button>

            {/* Summary Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="p-4 bg-gray-400">
                  <h3 className="font-semibold mb-4">Terms & Conditions</h3>
                  <div className="space-y-2">
                    <p>1. {termsCondition?.warranty}</p>
                    <p>2. {termsCondition?.deliveryTime}</p>
                    <p>3.{termsCondition?.paymentTerms}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Discount %:</span>
                      <span>
                        {calculateAverageDiscountPercentage().toFixed(2)}
                        {`%`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Taxes:</span>
                      <span>
                        {isNaN(calculateTotalTax())
                          ? "0.00"
                          : calculateTotalTax().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Net Amount:</span>
                      <span>
                        {isNaN(calculateNetAmount())
                          ? "0.00"
                          : calculateNetAmount().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewQuotationDialog;

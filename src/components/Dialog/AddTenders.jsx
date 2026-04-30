import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import PASTEL from "../../assets/images/newWarehouse-pastel.png";
import { IoMdClose } from "react-icons/io";
import { useTender } from "../../hooks/tender/useTender";
import useProductManagement from "../../hooks/product/useProductManagement";

const validationSchema = Yup.object().shape({
  tenderID: Yup.string().required("Tender ID is required"),
  tenderName: Yup.string().required("Tender Name is required"),
  title: Yup.string().required("Title is required"),
  issueDate: Yup.date()
    .required("Issue Date is required")
    .test(
      "is-today-or-future",
      "Issue Date must be today or in the future",
      function (value) {
        if (!value) return true; // Skip if value is not provided, handled by "required"
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time for accurate comparison
        const inputDate = new Date(value);
        return inputDate >= today; // Ensure date is today or in the future
      }
    ),
  tenderFloatingDate: Yup.date()
    .required("Tender Floating Date is required")
    .test(
      "is-after-issue-date",
      "Tender Floating Date must be after the Issue Date",
      function (value) {
        const { issueDate } = this.parent; // Access issueDate for comparison
        if (!value || !issueDate) return true; // Skip validation if either is missing
        const inputDate = new Date(value);
        const issueDateValue = new Date(issueDate);
        return inputDate > issueDateValue; // Ensure tenderFloatingDate is after issueDate
      }
    )
    .test(
      "is-today-or-future",
      "Tender Floating Date must be today or in the future",
      function (value) {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(value);
        return inputDate >= today; // Ensure date is today or in the future
      }
    ),
  description: Yup.string().required("Description is required"),
  bidderName: Yup.string().required("Bidder Name is required"),
  documentDownloadStartDate: Yup.date()
    .required("Document Download Start Date is required")
    .test(
      "is-today-or-future",
      "Document Download Start Date must be today or in the future",
      function (value) {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(value);
        return inputDate >= today;
      }
    ),
  documentDownloadEndDate: Yup.date()
    .required("Document Download End Date is required")
    .test(
      "is-after-start-date",
      "Document Download End Date must be after the Start Date",
      function (value) {
        const { documentDownloadStartDate } = this.parent;
        if (!value || !documentDownloadStartDate) return true;
        const endDate = new Date(value);
        const startDate = new Date(documentDownloadStartDate);
        return endDate > startDate;
      }
    ),
  bidSubmissionStartDate: Yup.date()
    .required("Bid Submission Start Date is required")
    .test(
      "is-today-or-future",
      "Bid Submission Start Date must be today or in the future",
      function (value) {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(value);
        return inputDate >= today;
      }
    ),
  bidSubmissionEndDate: Yup.date()
    .required("Bid Submission End Date is required")
    .test(
      "is-after-start-date",
      "Bid Submission End Date must be after the Start Date",
      function (value) {
        const { bidSubmissionStartDate } = this.parent;
        if (!value || !bidSubmissionStartDate) return true;
        const endDate = new Date(value);
        const startDate = new Date(bidSubmissionStartDate);
        return endDate > startDate;
      }
    ),
  bidValidity: Yup.string().required("Bid Validity is required"),
  prebidMeetingAddressPortal: Yup.string().required(
    "Prebid Meeting Address Portal is required"
  ),
  technicalBidOpeningDate: Yup.date()
    .required("Technical Bid Opening Date is required")
    .test(
      "is-today-or-future",
      "Technical Bid Opening Date must be today or in the future",
      function (value) {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight
        const inputDate = new Date(value);
        return inputDate >= today; // Ensure the date is today or in the future
      }
    ),
  periodOfWork: Yup.number().required("Period of Work is required"),
  location: Yup.string().required("Location is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Invalid Pincode")
    .required("Pincode is required"),
  bidOpeningPlace: Yup.string().required("Bid Opening Place is required"),
  productCategory: Yup.string().required("Product Category is required"),
  natureOfWork: Yup.string().required("Nature of Work is required"),
  proposalsInvitedBy: Yup.string().required("Proposals Invited By is required"),
  dateOfOpeningFinancialProposals: Yup.date()
    .required("Date of Opening Financial Proposals is required")
    .test(
      "is-today-or-future",
      "Date of Opening Financial Proposals must be today or in the future",
      function (value) {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight
        const inputDate = new Date(value);
        return inputDate >= today; // Ensure the date is today or in the future
      }
    ),
  modeOfSubmittingProposals: Yup.string().required(
    "Mode of Submitting Proposals is required"
  ),
  tenderWebsite: Yup.string()
    .url("Invalid URL")
    .required("Tender Website is required"),
  costOfRPFDocument: Yup.number().required("Cost of RPF Document is required"),
  earnestMoneyDeposit: Yup.number().required(
    "Earnest Money Deposit is required"
  ),
  modeOfPayment: Yup.string().required("Mode of Payment is required"),
  amount: Yup.number().required("Amount is required"),
  bankName: Yup.string().required("Bank Name is required"),
  performanceSecurity: Yup.string().required(
    "Performance Security is required"
  ),
  methodOfSelection: Yup.string().required("Method of Selection is required"),
  objectionCharges: Yup.string().required("Objection Charges are required"),
  stockItems: Yup.array().of(
    Yup.object().shape({
      stockName: Yup.string().required("Stock Name is required"),
      description: Yup.string().required("Description is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
      unit: Yup.number().required("Unit is required"),
      Rate: Yup.number().required("Rate is required"),
    })
  ),
  projectBidTotal: Yup.number()
    .required("Project Bid Total is required")
    .min(1, "Must be greater than 0"),

  authorizedManager: Yup.string().required("Authorized Manager is required"),
  authorizedPerson: Yup.string().required("Authorized Person is required"),
});

const AddTenders = ({ onClose }) => {
  const {
    fetchStockName,
    stockName,
    createTender,
    create,
    fetchNewSrNumber,
    newSrNumber,
  } = useTender();
  const { fetchProductTypes, productTypes } = useProductManagement();

  useEffect(() => {
    fetchNewSrNumber();
    fetchStockName();
    fetchProductTypes();
  }, []);
  console.log("stock name:", productTypes);
  console.log("Create Res:", create);

  const initialValues = {
    tenderID: newSrNumber?.srNo,
    tenderName: "",
    title: "",
    issueDate: "",
    tenderFloatingDate: "",
    description: "",
    bidderName: "",
    documentDownloadStartDate: "",
    documentDownloadEndDate: "",
    bidSubmissionStartDate: "",
    bidSubmissionEndDate: "",
    bidValidity: "",
    prebidMeetingAddressPortal: "",
    technicalBidOpeningDate: "",
    periodOfWork: "",
    location: "",
    pincode: "",
    bidOpeningPlace: "",
    productCategory: "",
    natureOfWork: "",
    proposalsInvitedBy: "",
    dateOfOpeningFinancialProposals: "",
    modeOfSubmittingProposals: "",
    tenderWebsite: "",
    costOfRPFDocument: "",
    earnestMoneyDeposit: "",
    modeOfPayment: "",
    amount: "",
    bankName: "",
    performanceSecurity: "",
    methodOfSelection: "",
    objectionCharges: "",
    stockItems: [
      {
        stockName: "",
        description: "",
        quantity: "",
        unit: "",
        Rate: "",
      },
    ],
    projectBidTotal: "",
    tenderCopy: "",
    technicalDocuments: "",
    tenderFees: "",
    emdCopy: "",
    boq: "",
    pricing: "",
    performanceGuarantee: "",
    mou: "",
    other: "",
    authorizedManager: "",
    authorizedPerson: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Multiple debugging logs
    console.log("🚀 SUBMIT FUNCTION CALLED");
    console.log("📝 Submitted Values:", values);

    try {
      // Explicit error handling
      if (!values.tenderName) {
        console.error("❌ Tender Name is required");
        return;
      }

      // Call your create tender function
      createTender(values);

      // Reset form and close modal
      resetForm();
      onClose && onClose();
    } catch (error) {
      console.error("❌ Submission Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const [dates, setDates] = useState({
    issueDate: initialValues.issueDate,
    tenderFloatingDate: initialValues.tenderFloatingDate,
    documentDownloadStartDate: initialValues.documentDownloadStartDate,
    documentDownloadEndDate: initialValues.documentDownloadEndDate,
    bidSubmissionStartDate: initialValues.bidSubmissionStartDate,
    bidSubmissionEndDate: initialValues.bidSubmissionEndDate,
    technicalBidOpeningDate: initialValues.technicalBidOpeningDate,
    dateOfOpeningFinancialProposals:
      initialValues.dateOfOpeningFinancialProposals,
  });

  /*useEffect(() => {
    setDates({
      issueDate: formik.values.issueDate,
      tenderFloatingDate: formik.values.tenderFloatingDate,
      documentDownloadStartDate: formik.values.documentDownloadStartDate,
      documentDownloadEndDate: formik.values.documentDownloadEndDate,
      bidSubmissionStartDate: formik.values.bidSubmissionStartDate,
      bidSubmissionEndDate: formik.values.bidSubmissionEndDate,
      technicalBidOpeningDate: formik.values.technicalBidOpeningDate,
      dateOfOpeningFinancialProposals:
        formik.values.dateOfOpeningFinancialProposals,
    });
  }, [formik.values]);

  const handleDateChange = (fieldName) => (event) => {
    let value = event.target.value;

    // Split the date into parts
    const dateParts = value.split("-");

    // Ensure year is not more than 4 digits
    if (dateParts[0] && dateParts[0].length > 4) {
      dateParts[0] = dateParts[0].slice(0, 4);
      value = dateParts.join("-");
    }

    // Prevent year greater than 9999
    if (dateParts[0] && Number(dateParts[0]) > 9999) {
      return;
    }

    setDates((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    formik.setFieldValue(fieldName, value);
  };*/

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("📝 Formik Submission - Values:", values);

        try {
          // Explicit validation before submission
          validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
              console.log("✅ Validation Successful");

              // Call create tender function
              createTender(values)
                .then((response) => {
                  console.log("🎉 Tender Creation Success:", response);
                  resetForm();
                  onClose && onClose();
                })
                .catch((error) => {
                  console.error("❌ Tender Creation Error:", error);
                });
            })
            .catch((validationError) => {
              console.error("❌ Validation Errors:", validationError.errors);
              setSubmitting(false);
            });
        } catch (error) {
          console.error("❌ Submission Error:", error);
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => {
        // Sync dates with Formik values
        useEffect(() => {
          setDates({
            issueDate: values.issueDate,
            tenderFloatingDate: values.tenderFloatingDate,
            documentDownloadStartDate: values.documentDownloadStartDate,
            documentDownloadEndDate: values.documentDownloadEndDate,
            bidSubmissionStartDate: values.bidSubmissionStartDate,
            bidSubmissionEndDate: values.bidSubmissionEndDate,
            technicalBidOpeningDate: values.technicalBidOpeningDate,
            dateOfOpeningFinancialProposals:
              values.dateOfOpeningFinancialProposals,
          });
        }, [values]);

        // Handle date changes
        const handleDateChange = (fieldName) => (event) => {
          let value = event.target.value;

          // Split the date into parts
          const dateParts = value.split("-");

          // Ensure year is not more than 4 digits
          if (dateParts[0] && dateParts[0].length > 4) {
            dateParts[0] = dateParts[0].slice(0, 4);
            value = dateParts.join("-");
          }

          // Prevent year greater than 9999
          if (dateParts[0] && Number(dateParts[0]) > 9999) {
            return;
          }

          setDates((prev) => ({
            ...prev,
            [fieldName]: value,
          }));

          setFieldValue(fieldName, value); // Use setFieldValue directly
        };

        return (
          <Form onSubmit={handleSubmit}>
            <div className="fixed inset-0 justify-center z-50 ">
              <div className="h-full w-screen flex justify-center items-center">
                <div className="bg-white rounded-xl shadow-lg w-[990px] mx-auto">
                  <div
                    className="w-full flex items-center h-[53px] rounded-t-xl"
                    style={{ backgroundImage: `url(${PASTEL})` }}
                  >
                    <div className="flex-1 flex justify-center text-black text-2xl font-semibold">
                      Create
                    </div>
                    <div className="pr-8">
                      <button onClick={onClose} className="flex items-center">
                        <IoMdClose size={28} className="cursor-pointer" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[600px] overflow-y-auto p-8 ml-10">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Tender ID:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="tenderID"
                          value={values.tenderID}
                          disabled
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Tender Name:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="tenderName"
                          value={values.tenderName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.tenderName && touched.tenderName && (
                          <div className="text-red-500 text-xs">
                            {errors.tenderName}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Title:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title && (
                          <div className="text-red-500 text-xs">
                            {errors.title}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Issue Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="issueDate"
                          value={dates.issueDate} // Sync with local state
                          onChange={handleDateChange("issueDate")} // Update state and Formik
                          onBlur={handleBlur}
                        />
                        {errors.issueDate && touched.issueDate && (
                          <div className="text-red-500 text-xs">
                            {errors.issueDate}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Tender Floating Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="tenderFloatingDate"
                          value={dates.tenderFloatingDate} // Sync with local state
                          onChange={handleDateChange("tenderFloatingDate")} // Update state and Formik
                          onBlur={handleBlur}
                        />
                        {errors.tenderFloatingDate &&
                          touched.tenderFloatingDate && (
                            <div className="text-red-500 text-xs">
                              {errors.tenderFloatingDate}
                            </div>
                          )}
                      </div>

                      <div className="flex items-start">
                        <label className="font-normal text-black text-base w-[350px]">
                          Description:
                        </label>
                        <textarea
                          className="w-[300px] h-[60px] text-sm border rounded-[3px] border-gray-300 px-4 py-2"
                          rows="3"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></textarea>
                        {errors.description && touched.description && (
                          <div className="text-red-500 text-xs">
                            {errors.description}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Bidder Name:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="bidderName"
                          value={values.bidderName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.bidderName && touched.bidderName && (
                          <div className="text-red-500 text-xs">
                            {errors.bidderName}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Document Download/Sale Start Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="documentDownloadStartDate"
                          value={dates.documentDownloadStartDate} // Sync with local state
                          onChange={handleDateChange(
                            "documentDownloadStartDate"
                          )} // Custom date handler
                          onBlur={handleBlur}
                        />
                        {errors.documentDownloadStartDate &&
                          touched.documentDownloadStartDate && (
                            <div className="text-red-500 text-xs">
                              {errors.documentDownloadStartDate}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Document Download/Sale End Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="documentDownloadEndDate"
                          value={dates.documentDownloadEndDate} // Sync with local state
                          onChange={handleDateChange("documentDownloadEndDate")} // Custom date handler
                          onBlur={handleBlur}
                        />
                        {errors.documentDownloadEndDate &&
                          touched.documentDownloadEndDate && (
                            <div className="text-red-500 text-xs">
                              {errors.documentDownloadEndDate}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Bid Submission Start Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="bidSubmissionStartDate"
                          value={dates.bidSubmissionStartDate} // Sync with local state
                          onChange={handleDateChange("bidSubmissionStartDate")} // Custom date handler
                          onBlur={handleBlur}
                        />
                        {errors.bidSubmissionStartDate &&
                          touched.bidSubmissionStartDate && (
                            <div className="text-red-500 text-xs">
                              {errors.bidSubmissionStartDate}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Bid Submission End Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="bidSubmissionEndDate"
                          value={dates.bidSubmissionEndDate} // Sync with local state
                          onChange={handleDateChange("bidSubmissionEndDate")} // Custom date handler
                          onBlur={handleBlur}
                        />
                        {errors.bidSubmissionEndDate &&
                          touched.bidSubmissionEndDate && (
                            <div className="text-red-500 text-xs">
                              {errors.bidSubmissionEndDate}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Bid Validity:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="bidValidity"
                          value={values.bidValidity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.bidValidity && touched.bidValidity && (
                          <div className="text-red-500 text-xs">
                            {errors.bidValidity}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Prebid meeting address Portal:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="prebidMeetingAddressPortal"
                          value={values.prebidMeetingAddressPortal}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.prebidMeetingAddressPortal &&
                          touched.prebidMeetingAddressPortal && (
                            <div className="text-red-500 text-xs">
                              {errors.prebidMeetingAddressPortal}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Technical Bid Opening Date:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="technicalBidOpeningDate"
                          value={dates.technicalBidOpeningDate} // Sync with local state
                          onChange={handleDateChange("technicalBidOpeningDate")} // Custom date handler
                          onBlur={handleBlur}
                        />
                        {errors.technicalBidOpeningDate &&
                          touched.technicalBidOpeningDate && (
                            <div className="text-red-500 text-xs">
                              {errors.technicalBidOpeningDate}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Period of work:
                        </label>
                        <input
                          type="number"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="periodOfWork"
                          value={values.periodOfWork}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.periodOfWork && touched.periodOfWork && (
                          <div className="text-red-500 text-xs">
                            {errors.periodOfWork}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Location:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
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

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Pincode:
                        </label>
                        <input
                          type="number"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
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

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Bid Opening Place:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="bidOpeningPlace"
                          value={values.bidOpeningPlace}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.bidOpeningPlace && touched.bidOpeningPlace && (
                          <div className="text-red-500 text-xs">
                            {errors.bidOpeningPlace}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Product Category:
                        </label>
                        <select
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="productCategory"
                          value={values.productCategory}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>Select Category</option>
                          {productTypes?.productTypes?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.productCategory && touched.productCategory && (
                          <div className="text-red-500 text-xs">
                            {errors.productCategory}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Nature of Work:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="natureOfWork"
                          value={values.natureOfWork}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.natureOfWork && touched.natureOfWork && (
                          <div className="text-red-500 text-xs">
                            {errors.natureOfWork}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Proposals Invited By:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="proposalsInvitedBy"
                          value={values.proposalsInvitedBy}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.proposalsInvitedBy &&
                          touched.proposalsInvitedBy && (
                            <div className="text-red-500 text-xs">
                              {errors.proposalsInvitedBy}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Date of Opening of Financial Proposals:
                        </label>
                        <input
                          type="date"
                          className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="dateOfOpeningFinancialProposals"
                          value={dates.dateOfOpeningFinancialProposals} // Sync with local state
                          onChange={handleDateChange(
                            "dateOfOpeningFinancialProposals"
                          )} // Custom date handler
                          onBlur={handleBlur}
                        />
                        {errors.dateOfOpeningFinancialProposals &&
                          touched.dateOfOpeningFinancialProposals && (
                            <div className="text-red-500 text-xs">
                              {errors.dateOfOpeningFinancialProposals}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Mode Of Submitting Proposals:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="modeOfSubmittingProposals"
                          value={values.modeOfSubmittingProposals}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.modeOfSubmittingProposals &&
                          touched.modeOfSubmittingProposals && (
                            <div className="text-red-500 text-xs">
                              {errors.modeOfSubmittingProposals}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Tender Website:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="tenderWebsite"
                          value={values.tenderWebsite}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.tenderWebsite && touched.tenderWebsite && (
                          <div className="text-red-500 text-xs">
                            {errors.tenderWebsite}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Cost of RPF document:
                        </label>
                        <input
                          type="number"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="costOfRPFDocument"
                          value={values.costOfRPFDocument}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.costOfRPFDocument &&
                          touched.costOfRPFDocument && (
                            <div className="text-red-500 text-xs">
                              {errors.costOfRPFDocument}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Earnest Money Deposit:
                        </label>
                        <input
                          type="number"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="earnestMoneyDeposit"
                          value={values.earnestMoneyDeposit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.earnestMoneyDeposit &&
                          touched.earnestMoneyDeposit && (
                            <div className="text-red-500 text-xs">
                              {errors.earnestMoneyDeposit}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Mode of Payment:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="modeOfPayment"
                          value={values.modeOfPayment}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.modeOfPayment && touched.modeOfPayment && (
                          <div className="text-red-500 text-xs">
                            {errors.modeOfPayment}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Amount:
                        </label>
                        <input
                          type="number"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="amount"
                          value={values.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.amount && touched.amount && (
                          <div className="text-red-500 text-xs">
                            {errors.amount}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Bank:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="bankName"
                          value={values.bankName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.bankName && touched.bankName && (
                          <div className="text-red-500 text-xs">
                            {errors.bankName}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Performance Security:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="performanceSecurity"
                          value={values.performanceSecurity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.performanceSecurity &&
                          touched.performanceSecurity && (
                            <div className="text-red-500 text-xs">
                              {errors.performanceSecurity}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Method of Selection:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="methodOfSelection"
                          value={values.methodOfSelection}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.methodOfSelection &&
                          touched.methodOfSelection && (
                            <div className="text-red-500 text-xs">
                              {errors.methodOfSelection}
                            </div>
                          )}
                      </div>

                      <div className="flex items-center">
                        <label className="font-normal text-black text-base w-[350px]">
                          Objection Charges:
                        </label>
                        <input
                          type="text"
                          className="w-[300px] h-[60px] text-sm border rounded-[3px] border-gray-300 px-4"
                          name="objectionCharges"
                          value={values.objectionCharges}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.objectionCharges &&
                          touched.objectionCharges && (
                            <div className="text-red-500 text-xs">
                              {errors.objectionCharges}
                            </div>
                          )}
                      </div>

                      {/* Tender Product List */}
                      <div className="pt-12">
                        <h1 className="text-lg font-semibold">
                          Tender Product List
                        </h1>
                        <FieldArray name="stockItems">
                          {({ push, remove }) => (
                            <>
                              {values.stockItems.map((item, index) => (
                                <div key={index} className="py-2">
                                  <div className="flex">
                                    <div className="flex flex-col space-y-2">
                                      <label className="font-normal text-black text-base">
                                        Stock Name:
                                      </label>
                                      <select
                                        name={`stockItems[${index}].stockName`}
                                        value={item.stockName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                                      >
                                        <option value="">Select</option>
                                        {stockName?.products?.map(
                                          (option, index) => (
                                            <option key={index} value={option}>
                                              {option}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {errors.stockItems?.[index]
                                        ?.stockName && (
                                        <div className="text-red-500 text-xs">
                                          {errors.stockItems[index].stockName}
                                        </div>
                                      )}
                                    </div>

                                    {/* Description */}
                                    <div className="flex flex-col space-y-2 px-4">
                                      <label className="font-normal text-black text-base">
                                        Description:
                                      </label>
                                      <input
                                        type="text"
                                        name={`stockItems[${index}].description`}
                                        value={item.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-[400px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                                      />
                                      {errors.stockItems?.[index]
                                        ?.description && (
                                        <div className="text-red-500 text-xs">
                                          {errors.stockItems[index].description}
                                        </div>
                                      )}
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex flex-col space-y-2">
                                      <label className="font-normal text-black text-base">
                                        Quantity:
                                      </label>
                                      <input
                                        type="number"
                                        name={`stockItems[${index}].quantity`}
                                        value={item.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-[200px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                                      />
                                      {errors.stockItems?.[index]?.quantity && (
                                        <div className="text-red-500 text-xs">
                                          {errors.stockItems[index].quantity}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Second row for Unit and Rate */}
                                  <div className="flex justify-end pr-6 py-2">
                                    <div className="flex flex-col space-y-2">
                                      <label className="font-normal text-black text-base">
                                        Unit:
                                      </label>
                                      <input
                                        type="number"
                                        name={`stockItems[${index}].unit`}
                                        value={item.unit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-[150px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                                      />
                                    </div>

                                    <div className="flex flex-col space-y-2 px-4">
                                      <label className="font-normal text-black text-base">
                                        Rate:
                                      </label>
                                      <input
                                        type="number"
                                        name={`stockItems[${index}].Rate`}
                                        value={item.Rate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-[150px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                                      />
                                    </div>
                                  </div>

                                  {/* Remove Button */}
                                  {values.stockItems.length > 1 && (
                                    <button
                                      type="button"
                                      className="text-red-500"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              ))}
                              {/* Add New Line Button */}
                              <div
                                className="text-blue-500 cursor-pointer"
                                onClick={() =>
                                  push({
                                    stockName: "",
                                    description: "",
                                    quantity: "",
                                    unit: "",
                                    Rate: "",
                                  })
                                }
                              >
                                <span className="text-2xl">+</span> Add New Line
                              </div>
                            </>
                          )}
                        </FieldArray>

                        <div className="flex justify-end space-x-2 pr-10 py-2">
                          <label className="text-black text-lg font-semibold">
                            Project Bid Total:
                          </label>
                          <input
                            type="number"
                            name="projectBidTotal"
                            className="w-[300px] h-[25px] text-sm border rounded-[3px] border-gray-300 px-4"
                            value={values.projectBidTotal}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {errors.projectBidTotal && touched.projectBidTotal && (
                          <div className="text-red-500 text-xs">
                            {errors.projectBidTotal}
                          </div>
                        )}
                      </div>

                      <div className=" pt-10 space-y-6">
                        <h1 className="text-lg font-semibold">
                          Required Documents
                        </h1>
                        <div className="flex pt-6 justify-between pr-16">
                          <div className="flex flex-col">
                            <label className="text-lg ">Tender Copy :</label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="tenderCopy"
                              value={values.tenderCopy}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-lg ">
                              Technical Documents :
                            </label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="technicalDocuments"
                              value={values.technicalDocuments}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-lg ">
                              Tender Fees (Screenshots) :
                            </label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="tenderFees"
                              value={values.tenderFees}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                        </div>
                        <div className="flex pt-6 justify-between pr-16">
                          <div className="flex flex-col">
                            <label className="text-lg ">EMD Copy :</label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4 "
                              name="emdCopy"
                              value={values.emdCopy}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-lg ">BOQ :</label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="boq"
                              value={values.boq}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-lg ">Pricing :</label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="pricing"
                              value={values.pricing}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                        </div>
                        <div className="flex pt-6 justify-between pr-16">
                          <div className="flex flex-col">
                            <label className="text-lg ">
                              Performance Guarantee :
                            </label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="performanceGuarantee"
                              value={values.performanceGuarantee}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-lg ">MOU :</label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="mou"
                              value={values.mou}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-lg ">Other :</label>
                            <input
                              type="file"
                              accept=".jpeg, .jpg, .png, .csv, .pdf, .doc, .docx"
                              className="text-xs py-4"
                              name="other"
                              value={values.other}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <p className="pt-2 text-xs">Max File Size : 5 MB</p>
                            <p className="pt-2 text-xs">
                              Allowed File : jpeg, doc., docx, csv, pdf
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end pt-8 space-y-3">
                        <div className="flex justify-end pr-6 space-x-3">
                          <label className="font-normal text-black text-base">
                            Authorised Manager :
                          </label>
                          <input
                            type="text"
                            name="authorizedManager"
                            className="w-[350px] h-[20px] text-sm border rounded-[3px] border-gray-300 px-4"
                            value={values.authorizedManager}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {errors.authorizedManager &&
                          touched.authorizedManager && (
                            <div className="text-red-500 text-xs">
                              {errors.authorizedManager}
                            </div>
                          )}
                        <div className="flex justify-end pr-6 space-x-3">
                          <label className="font-normal text-black text-base">
                            Authorised Person :
                          </label>
                          <input
                            type="text"
                            name="authorizedPerson"
                            className="w-[350px] h-[20px] text-sm border rounded-[3px] border-gray-300 px-4"
                            value={values.authorizedPerson}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {errors.authorizedPerson &&
                          touched.authorizedPerson && (
                            <div className="text-red-500 text-xs">
                              {errors.authorizedPerson}
                            </div>
                          )}
                      </div>

                      <div className="flex space-x-3 justify-end pr-6 pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-[60px] bg-[#56AAC5] text-white text-xl rounded-lg"
                        >
                          Ok
                        </button>
                        <button
                          type="reset"
                          className="w-[90px] bg-[#56AAC5] text-white text-xl rounded-lg"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddTenders;

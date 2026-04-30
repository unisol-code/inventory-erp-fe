import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import { Import } from "lucide-react";
import * as Yup from "yup";
import useProposals from "../../hooks/inventory/useProposals";
import cardimg from "../../assets/images/cardimg.png";
import CollectionsIcon from "@mui/icons-material/Collections";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  positionApplied: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const validationSchema = Yup.object({
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters long"),
  clientName: Yup.string()
    .required("Client Name is required")
    .min(2, "Client Name must be at least 2 characters long"),
  clientContactInfo: Yup.string()
    .required("Client Contact Info is required")
    .email("Enter a valid email address"),
  responsibleDepartment: Yup.string().required(
    "Responsible Department is required"
  ),
  proposalName: Yup.string().required("Proposal Name is required"),
  assignedTo: Yup.string().required("Assigned To is required"),
  proposalType: Yup.string().required("Proposal Type is required"),
  proposalDate: Yup.date()
    .required("Proposal Date is required")
    .typeError("Proposal Date must be a valid date"),
  dueDate: Yup.date()
    .required("Due Date is required")
    .typeError("Due Date must be a valid date")
    .min(Yup.ref("proposalDate"), "Due Date must be after Proposal Date"),
  introduction: Yup.string()
    .required("Introduction is required")
    .max(1000, "Introduction cannot exceed 1000 characters"),
  scopeOfWork: Yup.string().required("Scope of Work is required"),
  budgetEstimation: Yup.string().required("Budget Estimation is required"),
  timeline: Yup.string().required("Timeline is required"),
  comments: Yup.string().max(500, "Comments cannot exceed 500 characters"),
  deliverables: Yup.string().required("Deliverables are required"),
  termsConditions: Yup.string().required("Terms and Conditions are required"),
  coveringLetter: Yup.string().nullable(),
  specification: Yup.string().nullable(),
  quotation: Yup.string().nullable(),
});

const AddNewProposalDialog = ({ onClose, data }) => {
  const {
    createProposal,
    fetchAssignedTo,
    fetchClientNames,
    fetchResponsibleDepartments,
    fetchProposalTypes,
    proposalType,
    updateProposal,
    fetchProposalSrNo,
    proposalSrNo,
    assignedTo,
    clientNames,
    responsibleDepartments,
  } = useProposals();

  const [coveringLetterPreview, setCoveringLetterPreview] = useState(null);
  const [specificationPreview, setSpecificationPreview] = useState(null);
  const [quotationPreview, setQuotationPreview] = useState(null);

  useEffect(() => {
    fetchAssignedTo();
    fetchClientNames();
    fetchResponsibleDepartments();
    fetchProposalTypes();
    fetchProposalSrNo();
  }, []);
  console.log("proposalSrNo", proposalSrNo);

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  const formik = useFormik({
    initialValues: {
      subject: data?.subject || "",
      clientName: data?.clientName || "",
      clientContactInfo: data?.clientContactInfo || "",
      responsibleDepartment: data?.responsibleDepartment || "",
      proposalName: data?.proposalName || "",
      assignedTo: data?.assignedTo || "",
      proposalType: data?.proposalType || "",
      proposalDate: formatDate(data?.proposalDate) || "",
      dueDate: formatDate(data?.dueDate) || "",
      introduction: data?.introduction || "",
      scopeOfWork: data?.scopeOfWork || "",
      budgetEstimation: data?.budgetEstimation || "",
      timeline: data?.timeline || "",
      comments: data?.comments || "",
      deliverables: data?.deliverables || "",
      termsConditions: data?.termsConditions || "",
      coveringLetter: data?.coveringLetter || "",
      specification: data?.specification || "",
      quotation: data?.quotation || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const formData = new FormData();
        formData.append("subject", values.subject);
        formData.append("clientName", values.clientName);
        formData.append("clientContactInfo", values.clientContactInfo);
        formData.append("responsibleDepartment", values.responsibleDepartment);
        formData.append("proposalName", values.proposalName);
        formData.append("assignedTo", values.assignedTo);
        formData.append("proposalType", values.proposalType);
        formData.append("proposalDate", values.proposalDate);
        formData.append("dueDate", values.dueDate);
        formData.append("introduction", values.introduction);
        formData.append("scopeOfWork", values.scopeOfWork);
        formData.append("budgetEstimation", values.budgetEstimation);
        formData.append("timeline", values.timeline);
        formData.append("comments", values.comments);
        formData.append("deliverables", values.deliverables);
        formData.append("termsConditions", values.termsConditions);

        formData.append("coveringLetter", values.coveringLetter);
        formData.append("specification", values.specification);
        formData.append("quotation", values.quotation);
        if (!data?._id) {
          createProposal(formData);
        } else {
          updateProposal(data?._id, formData);
        }
        onClose();
      } catch (error) {
        console.error("Error while creating product:", error);
      }
    },
  });

  const handleFileChange = (event, field) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue(field, file);

      const filePreviewUrl = URL.createObjectURL(file);
      if (field === "coveringLetter") setCoveringLetterPreview(filePreviewUrl);
      if (field === "specification") setSpecificationPreview(filePreviewUrl);
      if (field === "quotation") setQuotationPreview(filePreviewUrl);
    }
  };

  return (
    <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className=" bg-white rounded-2xl shadow-md w-[1000px]">
        <div
          className="w-full flex rounded-t-2xl items-center justify-between h-[60px] relative"
          style={{
            backgroundImage: `url(${cardimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-[#000000] text-opacity-22 text-2xl font-semibold">
            {data?._id ? "Update Proposal" : "Create New Proposal"}
          </h1>

          <button onClick={onClose} className="absolute right-4">
            <IoMdClose size={32} className="cursor-pointer" />
          </button>
        </div>

        <div className="h-[500px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center w-full">
                <label htmlFor="" className="text-[20px] pt-0 py-6">
                  Proposal ID:{" "}
                  {data?.proposalID ? data?.proposalID : proposalSrNo}
                </label>
              </div>
            </div>
            <div className="w-full max-w-6xl mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <label className="w-40 text-right text-base font-normal pr-3">
                      Subject :
                    </label>
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm"
                      name="subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.subject}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-40 text-right pr-3 text-base font-normal">
                      Proposal Name :
                    </label>
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm"
                      name="proposalName"
                      value={formik.values.proposalName}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.proposalName &&
                    formik.errors.proposalName ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.proposalName}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-40 text-right pr-3 text-base font-normal">
                      Client Name :
                    </label>
                    <select
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm bg-white"
                      name="clientName"
                      value={formik.values.clientName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Client Name</option>
                      {clientNames?.map((item) => (
                        <option key={item._id} value={item.dealerName}>
                          {item.dealerName}
                        </option>
                      ))}
                    </select>
                    {formik.touched.clientName && formik.errors.clientName ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.clientName}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-40 text-right pr-3 text-base font-normal">
                      Client Contact info. :
                    </label>
                    <input
                      type="email"
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm"
                      name="clientContactInfo"
                      value={formik.values.clientContactInfo}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.clientContactInfo &&
                    formik.errors.clientContactInfo ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.clientContactInfo}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-40 text-right pr-3 text-base font-normal">
                      Responsible Department :
                    </label>
                    <select
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm bg-white"
                      name="responsibleDepartment"
                      value={formik.values.responsibleDepartment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Department</option>
                      {responsibleDepartments?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {formik.touched.responsibleDepartment &&
                    formik.errors.responsibleDepartment ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.responsibleDepartment}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-40 text-right pr-3 text-base font-normal">
                      Assigned To :
                    </label>
                    <select
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm bg-white"
                      name="assignedTo"
                      value={formik.values.assignedTo}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Assignee</option>
                      {assignedTo?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {formik.touched.assignedTo && formik.errors.assignedTo ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.assignedTo}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-40 text-right pr-3 text-base font-normal">
                      Proposal Type :
                    </label>
                    <select
                      className="flex-1 border border-gray-300 rounded h-8 px-2 text-sm bg-white"
                      name="proposalType"
                      value={formik.values.proposalType}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Proposal Type</option>
                      {proposalType?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {formik.touched.proposalType &&
                    formik.errors.proposalType ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.proposalType}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3 md:pl-8">
                  <div className="flex items-center">
                    <label className="w-32 text-right pr-3 text-base font-normal">
                      Proposal Date :
                    </label>
                    <input
                      type="date"
                      className="flex-1 border border-[#BDC3C9] rounded h-8 px-2 text-sm"
                      name="proposalDate"
                      value={formik.values.proposalDate}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.proposalDate &&
                    formik.errors.proposalDate ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.proposalDate}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center">
                    <label className="w-32 text-right pr-3 text-base font-normal">
                      Due Date :
                    </label>
                    <input
                      type="date"
                      className="flex-1 border border-[#BDC3C9] rounded h-8 px-2 text-sm"
                      name="dueDate"
                      value={formik.values.dueDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.dueDate && formik.errors.dueDate ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.dueDate}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/*  Proposal Details :.... */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center font-semibold text-xl w-full">
                <label htmlFor="" className="py-6">
                  Proposal Details
                </label>
              </div>
            </div>
            <div className="w-full max-w-4xl mx-auto p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                  <label className="min-w-[180px] mb-2 md:mb-0 text-right pr-2">
                    Introduction :
                  </label>
                  <textarea
                    className="w-full md:w-[calc(100%-200px)] h-28 border border-gray-300 rounded p-3 resize-none"
                    name="introduction"
                    value={formik.values.introduction}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.introduction && formik.errors.introduction ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.introduction}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                  <label className="min-w-[180px] mb-2 md:mb-0 text-right pr-2">
                    Scope of Work :
                  </label>
                  <input
                    type="text"
                    className="w-full md:w-[calc(100%-460px)] h-8 border border-gray-300 rounded px-3"
                    name="scopeOfWork"
                    value={formik.values.scopeOfWork}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.scopeOfWork && formik.errors.scopeOfWork ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.scopeOfWork}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                  <label className="min-w-[180px] mb-2 md:mb-0 text-right pr-2">
                    Deliverables :
                  </label>
                  <input
                    type="text"
                    className="w-full md:w-[calc(100%-460px)] h-8 border border-gray-300 rounded px-3"
                    name="deliverables"
                    value={formik.values.deliverables}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.deliverables && formik.errors.deliverables ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.deliverables}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                  <label className="min-w-[180px] mb-2 md:mb-0 text-right pr-2">
                    Timelines :
                  </label>
                  <input
                    type="text"
                    className="w-full md:w-[calc(100%-460px)] h-8 border border-gray-300 rounded px-3"
                    name="timeline"
                    value={formik.values.timeline}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.timeline && formik.errors.timeline ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.timeline}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                  <label className="min-w-[180px] mb-2 md:mb-0 text-right pr-2">
                    Budget / Cost estimation :
                  </label>
                  <textarea
                    className="w-full md:w-[calc(100%-200px)] h-32 border border-gray-300 rounded p-3 resize-none"
                    name="budgetEstimation"
                    value={formik.values.budgetEstimation}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.budgetEstimation &&
                  formik.errors.budgetEstimation ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.budgetEstimation}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                  <label className="min-w-[180px] mb-2 md:mb-0 text-right pr-2">
                    Terms & Conditions :
                  </label>
                  <textarea
                    className="w-full md:w-[calc(100%-200px)] h-28 border border-gray-300 rounded p-3 resize-none"
                    name="termsConditions"
                    value={formik.values.termsConditions}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.termsConditions &&
                  formik.errors.termsConditions ? (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.termsConditions}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/*  Attachment & Notes :....... */}
            <div className="w-full mx-auto p-0">
              <h2 className="text-xl font-semibold mb-6">Attachment & Notes</h2>

              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 pl-10">
                  {/* Document Label */}
                  <div className="text-base md:min-w-[100px] md:mr-4 self-start">
                    Document :
                  </div>

                  {/* File Upload Sections */}
                  <div className="flex flex-wrap md:flex-nowrap gap-20 w-full">
                    {/* Covering Letter Upload */}
                    <div className="space-y-2 w-full md:w-auto">
                      <div className="text-sm font-medium mb-2">
                        <span className="border border-gray-300 px-2">
                          Covering letter
                        </span>
                      </div>
                      <div className="space-y-3">
                        <label className="bg-gray-200 hover:bg-gray-300 px-6 py-1 rounded-full cursor-pointer text-xs whitespace-nowrap text-gray-600">
                          Choose File
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                "coveringLetter",
                                setCoveringLetterPreview
                              )
                            }
                            required
                          />
                          {formik.touched.coveringLetter &&
                          formik.errors.coveringLetter ? (
                            <div className="text-red-500 text-xs mt-1">
                              {formik.errors.coveringLetter}
                            </div>
                          ) : null}
                        </label>
                        {coveringLetterPreview ? (
                          <img
                            alt="Covering Letter Preview"
                            src={coveringLetterPreview}
                            className="w-10 h-10 ml-5"
                          />
                        ) : (
                          <CollectionsIcon fontSize="large" color="primary" />
                        )}
                        <div className="text-xs">[Covering Letter Preview]</div>
                        <span className="text-[0.65rem] text-gray-400">
                          No File Chosen
                        </span>
                        <div className="text-[0.65rem] text-gray-400">
                          Max File Size: 5 MB
                        </div>
                        <div className="text-[0.65rem] text-gray-400">
                          Allowed File: jpeg, doc, docx, csv, pdf
                        </div>
                      </div>
                    </div>

                    {/* Specification Upload */}
                    <div className="space-y-2 w-full md:w-auto">
                      <div className="text-sm font-medium mb-2">
                        <span className="border border-gray-300 px-2">
                          Specification
                        </span>
                      </div>
                      <div className="space-y-3">
                        <label className="bg-gray-200 hover:bg-gray-300 px-6 py-1 rounded-full cursor-pointer text-xs whitespace-nowrap text-gray-600">
                          Choose File
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                "specification",
                                setSpecificationPreview
                              )
                            }
                          />
                          {formik.touched.specification &&
                          formik.errors.specification ? (
                            <div className="text-red-500 text-xs mt-1">
                              {formik.errors.specification}
                            </div>
                          ) : null}
                        </label>
                        {specificationPreview ? (
                          <img
                            alt="Specification Preview"
                            src={specificationPreview}
                            className="w-10 h-10 ml-5"
                          />
                        ) : (
                          <CollectionsIcon fontSize="large" color="primary" />
                        )}
                        <div className="text-xs">[Specification Preview]</div>
                        <span className="text-[0.65rem] text-gray-400">
                          No File Chosen
                        </span>
                        <div className="text-[0.65rem] text-gray-400">
                          Max File Size: 5 MB
                        </div>
                        <div className="text-[0.65rem] text-gray-400">
                          Allowed File: jpeg, doc, docx, csv, pdf
                        </div>
                      </div>
                    </div>

                    {/* Quotation Upload */}
                    <div className="space-y-2 w-full md:w-auto">
                      <div className="text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="border border-gray-300 px-2">
                          Quotation
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                          <Import size={15} /> Import
                        </button>
                      </div>
                      <div className="space-y-3">
                        <label className="bg-gray-200 hover:bg-gray-300 px-6 py-1 rounded-full cursor-pointer text-xs whitespace-nowrap text-gray-600">
                          Choose File
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                "quotation",
                                setQuotationPreview
                              )
                            }
                          />
                          {formik.touched.quotation &&
                          formik.errors.quotation ? (
                            <div className="text-red-500 text-xs mt-1">
                              {formik.errors.quotation}
                            </div>
                          ) : null}
                        </label>
                        {quotationPreview ? (
                          <img
                            alt="Quotation Preview"
                            src={quotationPreview}
                            className="w-10 h-10 ml-5"
                          />
                        ) : (
                          <CollectionsIcon fontSize="large" color="primary" />
                        )}
                        <div className="text-xs">[Quotation Preview]</div>
                        <span className="text-[0.65rem] text-gray-400">
                          No File Chosen
                        </span>
                        <div className="text-[0.65rem] text-gray-400">
                          Max File Size: 5 MB
                        </div>
                        <div className="text-[0.65rem] text-gray-400">
                          Allowed File: jpeg, doc, docx, csv, pdf
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="flex flex-col md:flex-row gap-4 pl-10">
                <label className="text-base whitespace-nowrap">
                  Comments :
                </label>
                <textarea
                  className="flex-1 border border-gray-300 rounded p-3 h-32 resize-none"
                  placeholder="Write Here ..."
                  name="comments"
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                />
                {formik.touched.comments && formik.errors.comments ? (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.comments}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex justify-end items-center gap-4 py-4">
              <button
                type="submit"
                className="border border-white text-white bg-[#56AAC5]  px-4 py-2 rounded-md shadow-md hover w-[120px]"
              >
                {data ? "Update" : "Create"}
              </button>
              <button
                onClick={onClose}
                className="bg-[#f14138a4] border border-white text-white px-4 py-2 rounded-md shadow-md hover w-[120px]"
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

export default AddNewProposalDialog;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import PASTEL from "../../assets/images/newWarehouse-pastel.png";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useTender } from "../../hooks/tender/useTender";
import { useNavigate } from "react-router-dom";

const TendorsViewDetails = ({ onClose, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { fetchTenderById, tenderById, updateTender, editTender } = useTender();
  console.log("idd ", id);

  useEffect(() => {
    fetchTenderById(id);
  }, []);

  const handleFormSubmit = (values) => {
    console.log("🚀 Submission Values FULL:", JSON.stringify(values, null, 2));
    console.log("🔍 Tender ID from Data:", values.tenderID);
    console.log(
      "🔍 Original Tender Data:",
      JSON.stringify(tenderById?.data, null, 2)
    );

    console.log("Comparing IDs:", {
      valuesID: values.tenderID,
      originalID: tenderById?.data?.tenderID,
    });

    updateTender(id, values)
      .then((response) => {
        console.log(
          "✅ Update Full Response:",
          JSON.stringify(response, null, 2)
        );
        if (response?.success) {
          setIsEditing(false);
          onClose && onClose();
        }
      })
      .catch((error) => {
        console.error(
          "❌ Detailed Update Error:",
          JSON.stringify(error, null, 2)
        );
        toast.error("Failed to update tender. Please check the details.");
      });
  };

  return (
    <div className="fixed inset-0 justify-center z-50 ">
      <div className="h-full w-screen flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg w-[950px] mx-auto">
          <div
            className="w-full flex items-center h-[53px] rounded-t-xl"
            style={{ backgroundImage: `url(${PASTEL})` }}
          >
            <div className="flex-1 flex justify-center text-black text-2xl font-semibold">
              Tender
            </div>
            <div className="pr-8">
              <button onClick={onClose} className="flex items-center">
                <IoMdClose size={28} className="cursor-pointer" />
              </button>
            </div>
          </div>
          <Formik
            initialValues={{
              //tenderID: tenderById?.data?.tenderID,
              tenderName: tenderById?.data?.tenderName || "",
              title: tenderById?.data?.title || "",
              issueDate: tenderById?.data?.issueDate?.split("T")[0] || "",
              tenderFloatingDate:
                tenderById?.data?.tenderFloatingDate?.split("T")[0] || "",
              description: tenderById?.data?.description || "",
              bidderName: tenderById?.data?.bidderName || "",
              documentDownloadStartDate:
                tenderById?.data?.documentDownloadStartDate?.split("T")[0] ||
                "",
              documentDownloadEndDate:
                tenderById?.data?.documentDownloadEndDate?.split("T")[0] || "",
              bidSubmissionStartDate:
                tenderById?.data?.bidSubmissionStartDate?.split("T")[0] || "",
              bidSubmissionEndDate:
                tenderById?.data?.bidSubmissionEndDate?.split("T")[0] || "",
              bidValidity: tenderById?.data?.bidValidity || "",
              prebidMeetingAddressPortal:
                tenderById?.data?.prebidMeetingAddressPortal?.split("T")[0] ||
                "",
              technicalBidOpeningDate:
                tenderById?.data?.technicalBidOpeningDate?.split("T")[0] || "",
              periodOfWork: tenderById?.data?.periodOfWork || "",
              location: tenderById?.data?.location || "",
              pincode: tenderById?.data?.pincode || "",
              bidOpeningPlace: tenderById?.data?.bidOpeningPlace || "",
              productCategory: tenderById?.data?.productCategory || "",
              natureOfWork: tenderById?.data?.natureOfWork || "",
              proposalsInvitedBy: tenderById?.data?.proposalsInvitedBy || "",
              dateOfOpeningFinancialProposals:
                tenderById?.data?.dateOfOpeningFinancialProposals?.split(
                  "T"
                )[0] || "",
              modeOfSubmittingProposals:
                tenderById?.data?.modeOfSubmittingProposals || "",
              tenderWebsite: tenderById?.data?.tenderWebsite || "",
              costOfRPFDocument: tenderById?.data?.costOfRPFDocument || "",
              earnestMoneyDeposit: tenderById?.data?.earnestMoneyDeposit || "",
              modeOfPayment: tenderById?.data?.modeOfPayment || "",
              amount: tenderById?.data?.amount || "",
              bankName: tenderById?.data?.bankName || "",
              performanceSecurity: tenderById?.data?.performanceSecurity || "",
              methodOfSelection: tenderById?.data?.methodOfSelection || "",
              objectionCharges: tenderById?.data?.objectionCharges || "",
              authorizedManager: tenderById?.data?.authorizedManager || "",
              authorizedPerson: tenderById?.data?.authorizedPerson || "",
            }}
            enableReinitialize={true}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="max-h-[600px] overflow-y-auto p-4 scrollbar-hide">
                  <div className="space-y-1 text-sm">
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Tender ID:</strong>
                      <span className="text-left">
                        {tenderById?.data?.tenderID}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Tender Name:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="tenderName"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.tenderName}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Title:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="title"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.title}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Issue Date:</strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="issueDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.issueDate?.split("T")[0]}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Tender Floating Date:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="tenderFloatingDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.tenderFloatingDate?.split("T")[0]}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Description:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="description"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.description}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Bidder Name:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="bidderName"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.bidderName}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Document Download/Sale Start Date:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="documentDownloadStartDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {
                            tenderById?.data?.documentDownloadStartDate?.split(
                              "T"
                            )[0]
                          }
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Document Download/Sale End Date:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="documentDownloadEndDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {
                            tenderById?.data?.documentDownloadEndDate?.split(
                              "T"
                            )[0]
                          }
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Bid Submission Start Date:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="bidSubmissionStartDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {
                            tenderById?.data?.bidSubmissionStartDate?.split(
                              "T"
                            )[0]
                          }
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Bid Submission End Date:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="bidSubmissionEndDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {
                            tenderById?.data?.bidSubmissionEndDate?.split(
                              "T"
                            )[0]
                          }
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Bid Validity:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="bidValidity"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.bidValidity}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Prebid Meeting Address Portal:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="prebidMeetingAddressPortal"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.prebidMeetingAddressPortal}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Technical Bid Opening Date:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="technicalBidOpeningDate"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {
                            tenderById?.data?.technicalBidOpeningDate?.split(
                              "T"
                            )[0]
                          }
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Period of Work:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="periodOfWork"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.periodOfWork}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Location:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="location"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.location}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Pincode:</strong>
                      {isEditing ? (
                        <Field
                          type="number"
                          name="pincode"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.pincode}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Bid Opening Place:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="bidOpeningPlace"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.bidOpeningPlace}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Product Category:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="productCategory"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.productCategory}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Nature of Work:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="natureOfWork"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.natureOfWork}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Proposals Invited By:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="proposalsInvitedBy"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.natureOfWork}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Date of Opening of Financial Proposals:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="date"
                          name="dateOfOpeningFinancialProposals"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {
                            tenderById?.data?.dateOfOpeningFinancialProposals?.split(
                              "T"
                            )[0]
                          }
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Mode of Submitting Proposals:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="modeOfSubmittingProposals"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.modeOfSubmittingProposals}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Tender Website:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="tenderWebsite"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.tenderWebsite}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Cost of RPF document:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="number"
                          name="costOfRPFDocument"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.costOfRPFDocument}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Earnest Money Deposit:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="earnestMoneyDeposit"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.earnestMoneyDeposit}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Mode of Payment:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="modeOfPayment"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.modeOfPayment}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Amount:</strong>
                      {isEditing ? (
                        <Field
                          type="number"
                          name="amount"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.amount}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">Bank:</strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="bankName"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.bankName}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Performance Security:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="performanceSecurity"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.performanceSecurity}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Method of Selection:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="methodOfSelection"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.methodOfSelection}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 w-full py-2">
                      <strong className="text-left pl-16">
                        Objection Charges:
                      </strong>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="objectionCharges"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <span className="text-left">
                          {tenderById?.data?.objectionCharges}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-end items-end p-10 mr-6">
                    <div className="flex ">
                      <h1 className="text-base font-medium ">
                        Authorised Manager :{" "}
                      </h1>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="authorizedManager"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <p className="pl-4">
                          {tenderById?.data?.authorizedManager}
                        </p>
                      )}
                    </div>
                    <div className="flex">
                      <h1 className="text-base font-medium ">
                        Authorised Person :{" "}
                      </h1>
                      {isEditing ? (
                        <Field
                          type="text"
                          name="authorizedPerson"
                          className="border-b-2 border-gray-400 ml-2 w-[250px] outline-none focus:ring-0 focus:outline-none"
                        />
                      ) : (
                        <p className="pl-4">
                          {tenderById?.data?.authorizedPerson}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex space-x-3 pl-12">
                      {!isEditing && (
                        <button
                          className="bg-[#3ba831] w-[60px] h-[20px] rounded-md text-white text-sm font-medium flex items-center justify-center"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                          <span className="ml-2">
                            <FaEdit />
                          </span>
                        </button>
                      )}
                      <button className="bg-[#df6464] w-[60px] h-[20px] rounded-md text-white text-sm font-medium flex items-center justify-center">
                        PDF
                        <span className="ml-2">
                          <MdOutlineFileDownload size={20} />
                        </span>
                      </button>
                    </div>
                    <div className="flex space-x-5 pr-10 mb-4">
                      <button
                        onClick={() =>
                          navigate(
                            "/tender-management-documents/6746e105004fadff1fbb7229"
                          )
                        }
                        className="bg-[#56AAC5] w-[150px] h-[40px] rounded-md text-white text-lg font-medium"
                      >
                        View Documents
                      </button>
                      {isEditing ? (
                        <button
                          type="submit"
                          className="bg-[#56AAC5] w-[80px] h-[40px] rounded-md text-white text-lg font-medium"
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          onClick={onClose}
                          className="bg-[#56AAC5] w-[80px] h-[40px] rounded-md text-white text-lg font-medium"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TendorsViewDetails;

import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  empId: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Employee ID must be alphanumeric")
    .required("Employee ID is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  grade: Yup.string().required("Grade is required"),
  company: Yup.string().required("Company Name is required"),
  birthDate: Yup.date().required("Date of Birth is required"),
  address: Yup.string().required("Address is required"),
  maritalStatus: Yup.string()
    .notOneOf(["Select", ""], "Please select your Marital Status")
    .required("Marital Status is required"),
  anniversaryDate: Yup.date().required("Anniversary Date is required"),
  city: Yup.string()
    .notOneOf(["Select", ""], "Please select City")
    .required("City is required"),
  zipCode: Yup.number()
    .typeError("Zip code must be a number")
    .integer("Zip code must be an integer")
    .min(10000, "Zip code must be at least 5 digits")
    .max(99999, "Zip code cannot be more than 5 digits")
    .required("Zip code is required"),
  qualification: Yup.array()
    .min(1, "At least one qualification must be selected")
    .required("This field is required"),
  country: Yup.string()
    .notOneOf(["Select", ""], "Please select Country")
    .required("Country is required"),
  state: Yup.string()
    .notOneOf(["Select", ""], "Please select State")
    .required("State is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  emergencyNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Number must be at least 10 digits")
    .required("Emergency Number is required"),
  relationWithPerson: Yup.string()
    .notOneOf(["Select", ""], "Please select Relation")
    .required("Relation is required"),
  officialEmailId: Yup.string()
    .email("Invalid email address")
    .required("Official Email ID is required"),
  personalEmailId: Yup.string()
    .email("Invalid email address")
    .required("Personal Email ID is required"),
  department: Yup.string()
    .notOneOf(["Select", ""], "Please select Department")
    .required("Deepartment is required"),
  jobTitle: Yup.string().required("Job Tittle is required"),
  salary: Yup.string().required("Salary is required"),
  employeeType: Yup.string().required("Employee Type is required"),
  startDate: Yup.date().required("Start Date is required"),
  aadharCard: Yup.string().required("Adhar Card no. is required"),
  panCard: Yup.string().required("Pan Card no. is required"),
  bankAccountName: Yup.string().required("Bank Account Name is required"),
  accountNumber: Yup.string().required("Account no. is required"),
  bankName: Yup.string().required("Bank Name is required"),
  branchName: Yup.string().required("Branch Name is required"),
  ifscCode: Yup.string().required("IFSC Code is required"),
  empPassword: Yup.string().required("Password is required"),
});

const CreateNewOrderDialog = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      companyName: "",
      model: "",
      modelNos: "",
      productType: "",
      proposedCompany: "",
      skuCode: "",
      hsnSacCode: "",
      amcCmc: "",
      warrenty: "",
      expireyDate: "",
      startDate: "",
      endDate: "",
      productdescription: "",
      productImage: "",
      quantuty: "",
      price: "",
      availableGst: "",
      productBrochure: "",
      pptAvailable: "",
      coveringLetter: "",
      isoCertificate: "",
      technicalSpecification: "",
      dimension: "",
      materials: "",
      performance: "",
      amount: "",
      freight: "",
      taxes: "",
      netAmount: "",
      approvedBy: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        //createProduct(values)
      } catch (error) {
        console.error("Error while creating product:", error);
      }
    },
  });
  return (
    <div className="fixed h-full w-screen inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ">
      <div className=" bg-white rounded-2xl shadow-md w-[1000px]">
        <div className="w-full flex rounded-t-2xl items-center justify-between h-[60px] bg-blue-300">
          <h1 className="text-[#000000] ml-10 text-opacity-22 text-2xl font-semibold">
            Create New Order
          </h1>

          <button onClick={onClose}>
            <IoMdClose size={32} className="cursor-pointer mr-8" />
          </button>
        </div>

        <div className="h-[500px] overflow-y-scroll scrollbar-hide bg-white shadow-lg rounded-lg p-8 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 py-2">
              <h2 className="col-span-1 font-bold text-[18px]">
                Purchase Form
              </h2>
              <h2 className="col-span-1 font-bold text-[18px]">
                Ship & Bill to Address
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  Client Name :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  Vendor Name :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  Address :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  Address Line 1 :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  City, State, ZipCode :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  Address Line 2 :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  Contact :{" "}
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1 flex justify-between items-center w-full">
                <label htmlFor="" className="font-medium">
                  City, State, ZipCode :
                </label>{" "}
                <input
                  type="text"
                  className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                  name=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-4">
              <label htmlFor="">Cost Estimation</label>
              <div className="w-full grid grid-cols-4 border rounded-xl">
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4">Quantity</h3>
                  </div>

                  <div className="h-[100px] flex justify-center items-center">
                    quantity
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4">MRP</h3>
                  </div>
                  <div className="h-[100px] flex justify-center items-center">
                    MRP
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center border-r-2">
                  <div className="h-[50px] w-full flex flex-col items-center">
                    <h3 className="pt-2">Aplicable Taxes</h3>
                    <div className="w-full grid grid-cols-2">
                      <p className="col-span-1 flex justify-center items-center w-full">
                        Rate %
                      </p>
                      <p className="col-span-1 flex justify-center items-center w-full">
                        Amt (Rs)
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full">
                    <div className="h-[100px] col-span-1 flex justify-center items-center">
                      taxes
                    </div>

                    <div className="h-[100px] col-span-1 flex justify-center items-center">
                      taxes
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <div className="h-[50px flex justify-between]">
                    <h3 className="pt-2 py-4">Amount</h3>
                  </div>
                  <div className="h-[100px] flex justify-center items-center">
                    amount
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 py-[30px] gap-4">
              <div className="flex flex-col col-span-1 bg-[#D9D9D9] px-2 py-2">
                <div className="py-1">
                  <h2 className="font-semibold text-[19px]">
                    Terms and Conditions
                  </h2>
                </div>

                <p className="flex">
                  <span className="font-medium">Expiry Terms :</span>
                  This order is valid until 2024-12-12
                </p>
                <p className="flex">
                  <span className="font-medium">Payment Terms : </span>
                  payment due within 30 days of invoice date
                </p>
                <p className="flex">
                  <span className="font-medium">Delivery Terms : </span>
                  shipping details, expected delivery date etc.
                </p>
                <p className="flex">
                  <span className="font-medium">Return Policy :</span>
                  condition under which items can be returned
                </p>
              </div>
              <div className="w-full flex flex-col justify-start gap-2 pl-4">
                <h2 className="py-2">Subtotal</h2>
                <h2>Shipping & Handling</h2>

                <h2>Taxes</h2>
                <h2 className="font-bold text-[20px]">NetAmount</h2>
              </div>
            </div>

            <div className="w-full">
              <div className="w-[50%] flex flex-col gap-4">
                <h2>Authorise Signatory & Date</h2>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="" className="font-medium">
                    Name :{" "}
                  </label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                    name=""
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="" className="font-medium">
                    Designation :{" "}
                  </label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                    name=""
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="" className="font-medium">
                    Email :{" "}
                  </label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                    name=""
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <label htmlFor="" className="font-medium">
                    Contact :{" "}
                  </label>{" "}
                  <input
                    type="text"
                    className="border border-gray-400 rounded-full w-[65%] h-[35px] px-2"
                    name=""
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end items-center gap-4 py-4 px-[100px]">
              <button
                type="submit"
                className="border border-white text-white bg-[#56AAC5]  px-4 py-2 rounded-md shadow-md hover w-[120px]"
              >
                Create
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

export default CreateNewOrderDialog;

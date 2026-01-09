import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GroupedInput } from "../Components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../admin/Nav";
import SideNav from "../agent/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { createdDate, formatDate } from "../helper/commonHelperFunc";
import {
  fuelType,
  locationOption,
  modelOption,
  PlanOption,
  regTypeOption,
  subPlanOption,
} from "../data";
import Header from "../Components/Header";
import { fetchEwById } from "../features/EwSlice";
import { addNewEw, updateEw } from "../features/EwApi";
import { logo } from "../assets";
const EwSalesForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formattedDate = createdDate();
  const { ewByIdorStatus } = useSelector((state) => state.ewPolicy);
  const { _id, roleType } = useSelector((state) => state.users.users);
  const id = location?.state?.docId;
  const [ewData, setEwData] = useState({
    customerDetails: {
      customerName: "",
      address: "",
      customerGst: "",
      contact: "",
      stateCode: "",
      email: "",
      pan: "",
      zipCode: "",
      city: "",
      state: "",
      dob: "",
    },
    vehicleDetails: {
      vehicleModel: "",
      vinNumber: "",
      dealerLocation: "",
      validityMilage: "",
      deliveryDate: "",
      saleDate: "",
      presentKm: "",
      fuelType: "",
      warrantyLimit: "",
      engineNumber: "",
      registrationNumber: "",
      rmEmail: "",
      rmName: "",
      rmEmployeeId: "",
      gmEmail: "",
    },
    ewDetails: {
      policyDate: id
        ? formatDate(ewByIdorStatus?.data?.createdAt)
        : formattedDate,

      warrantyAmount: "",
      planType: "",
      planSubType: "",
      registrationType: "",
      warrantyCoveragePeriod: "",
      startKm: "",
      endKm: "",
      ewStatus: "",
    },
    createdBy: _id,
  });

 const leftFields = [
    {
      name: "customerName",
      type: "text",
      placeholder: "Customer Name",
      label: "Customer Name",
      required: true,
    },
        { name: "address", type: "text", placeholder: "Address", label: "Address" },

    {
      name: "contact",
      type: "number",
      placeholder: "Contact",
      label: "Contact",
      required: true,
    },
     {
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
  
    {
      name: "dob",
      type: "date",
      placeholder: "D.O.B",
      label: "D.O.B",
    },
    {
      name: "zipCode",
      type: "number",
      placeholder: "Zip Code",
      label: "Zip Code",
    },
  ];
  const rightFields = [
   
     {
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
    },
      {
      name: "state",
      type: "text",
      placeholder: "State",
      label: "State",
    },
      {
      name: "pan",
      type: "text",
      placeholder: "Pan Number",
      label: "Pan Number",
    },
  
    {
      name: "customerGst",
      type: "text",
      placeholder: "Customer Gst",
      label: "Customer Gst",
    },
   
    {
      name: "stateCode",
      type: "text",
      placeholder: "State Code",
      label: "State Code",
    },
  ];
  const rightEwFields = [
      {
      name: "registrationType",
      type: "select",
      placeholder: "Registration Type",
      label: "Registration Type",
      options: regTypeOption,
    },
    
  
    {
      name: "startKm",
      type: "text",
      placeholder: "Start Kilometers",
      label: "Start Kilometers",
    },
       {
      name: "endKm",
      type: "text",
      placeholder: "End Kilometers",
      label: "End Kilometers",
    },
    {
      name: "ewStatus",
      type: "text",
      placeholder: "Status",
      label: "Status",
    },
  ];
  const lefEwFields = [
    {
      name: "warrantyAmount",
      type: "text",
      placeholder: "Warranty Amount",
      label: "Warranty Amount",
      required: true,
    },
    {
      name: "planType",
      type: "select",
      placeholder: "Plan Type",
      label: "Plan Type",
      options: PlanOption,
      required: true,
      customText: "(Plan Type A : New care & Plan Type B : Used or Pre - owned warranty)"
    },
    {
      name: "planSubType",
      type: "select",
      placeholder: "Plan Sub Type",
      label: "Plan Sub Type",
      options: subPlanOption,
    },
    {
      name: "warrantyCoveragePeriod",
      type: "text",
      placeholder:
        "Warranty Coverage Period (Kms/Hours) Whichever occurs earlier: Period",
      label:
        "Warranty Coverage Period (Kms/Hours) Whichever occurs earlier: Period",
    },
 
    
  ];
  const rightVehicleFields = [
    {
      name: "saleDate",
      type: "date",
      placeholder: "Date of Sale",
      label: "Date of Sale",
      required: true,
    },
    {
      name: "deliveryDate",
      type: "date",
      placeholder: "Date of Delivery",
      label: "Date of Delivery",
      required: true,
    },

    {
      name: "dealerLocation",
      type: "select",
      options: locationOption,
      placeholder: "Location of the Dealer",
      label: "Location of the Dealer",
      required: true,
    },
   
{
      name: "rmName",
      type: "text",
      placeholder: "Relationship Manager / Service Advisor Name",
      label: "Name of Relationship Manager / Service Advisor",
      required: true,
    },
     {
      name: "rmEmployeeId",
      type: "text",
      placeholder: "Employee Id of Relationship Manager/ Service Advisor",
      label: "Employee Id of Relationship Manager/ Service Advisor",
      required: true,
    },
    {
      name: "rmEmail",
      type: "email",
      placeholder: " Relationship Manager/ Service Advisor Email Id",
      label: "Email Id of Relationship Manager/ Service Advisor ",
      required: true,
    },
      
    {
      name: "gmEmail",
      type: "email",
      placeholder: "General Manager Email Id",
      label: "General Manager Email",
    },
  ];

  const leftVehicleFields = [
    {
      name: "vehicleModel",
      type: "select",
      placeholder: "Model",
      label: "Model",
      options: modelOption,
      required: true,
    },
      {
      name: "fuelType",
      type: "select",
      placeholder: "Fuel Type",
      label: "Fuel Type",
      options: fuelType,
      required: true,
    },
    {
      name: "registrationNumber",
      type: "text",
      placeholder: "Registration Number",
      label: "Registration Number",
      required: true,
    },
    {
      name: "vinNumber",
      type: "text",
      placeholder: "Vin Number",
      label: "Vin Number",
      required: true,
    },
     {
      name: "engineNumber",
      type: "text",
      placeholder: "Engine Number",
      label: "Engine Number",
      required: true,
    },
  
   {
      name: "warrantyLimit",
      type: "text",
      placeholder: "Warranty Limit",
      label: "Warranty Limit",
      required: true,
    },
    {

      name: "presentKm",
      type: "text",
      placeholder: "Present Kilometers",
      label: "Present Kilometers",
      required: true,
    },
 
    

  
  ];
  const [errors, setErrors] = useState({});

  // Calculate `agreementValidDate` if necessary fields are available
  const handleInput = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset?.section;

    setEwData((prev) => {
      const updatedSection = {
        ...prev[section],
        [name]: value,
      };

      // Calculate `agreementValidDate` if necessary fields are available
      if (name === "vehicleModel" || name === "agreementStartDate") {
        const vehicleModel =
          name === "vehicleModel" ? value : updatedSection?.vehicleModel;
        const agreementStartDate =
          name === "agreementStartDate"
            ? value
            : updatedSection?.agreementStartDate;

        // Handle date parsing safely
        if (vehicleModel === "Astor") {
          updatedSection.agreementValidDate = "NA";
        } else if (vehicleModel === "Comet" && agreementStartDate) {
          const startDate = new Date(agreementStartDate);
          if (!isNaN(startDate)) {
            // Ensure the date is valid
            startDate.setFullYear(startDate.getFullYear() + 5);
            updatedSection.agreementValidDate = startDate
              .toISOString()
              .split("T")[0];
          } else {
            updatedSection.agreementValidDate = null;
          }
        } else if (agreementStartDate) {
          const startDate = new Date(agreementStartDate);
          if (!isNaN(startDate)) {
            // Ensure the date is valid
            startDate.setFullYear(startDate.getFullYear() + 8);
            updatedSection.agreementValidDate = startDate
              .toISOString()
              .split("T")[0];
          } else {
            updatedSection.agreementValidDate = null;
          }
        }
      }

      if (name === "vehicleModel") {
        switch (value) {
          case "Hector":
            updatedSection.validityMilage = 120000;
            break;
          case "Astor":
            updatedSection.validityMilage = 0;
            break;
          case "Comet":
            updatedSection.validityMilage = 70000;
            break;
          case "ZS EV":
            updatedSection.validityMilage = 120000;
            break;
          case "Gloster":
            updatedSection.validityMilage = 150000;
            break;
          case "Windsor":
            updatedSection.validityMilage = 120000;
            break;
          default:
            updatedSection.validityMilage = "Unknown";
            break;
        }
      }

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const validateFields = () => {
    const newErrors = {};

    // Customer Details Validation
    const {
      customerName,

      contact,
      email,
    } = ewData.customerDetails;

    if (!customerName) newErrors.customerName = "Customer name is required.";
    if (!/^\d{10}$/.test(contact))
      newErrors.contact = "Contact must be a valid 10-digit number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email must be valid.";
    // if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) newErrors.pan = "PAN must be valid.";

    // Vehicle Details Validation
    const {
      vehicleModel,
      vinNumber,

      fuelType,
      deliveryDate,

      rmEmail,
      rmName,
      rmEmployeeId,
    } = ewData.vehicleDetails;

    if (!vehicleModel) newErrors.vehicleModel = "Model is required.";
    if (!fuelType) newErrors.fuelType = "Fuel type is required.";
    if (!deliveryDate) newErrors.deliveryDate = "Delivery date is required.";

    if (!vinNumber) newErrors.vinNumber = "VIN number is required.";

    if (!rmEmail) newErrors.rmEmail = "Email is required.";
    if (!rmName) newErrors.rmName = "Name is required.";
    if (!rmEmployeeId) newErrors.rmEmployeeId = "Id is required.";
    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchEwById({ id }));
    }
  }, [id]);
  useEffect(() => {
    setEwData((prev) => ({
      ...prev,
      ...ewByIdorStatus?.data,
    }));
  }, [ewByIdorStatus?.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form data is valid:", ewData);
    } else {
      console.log("Validation errors:", errors);
      toast.error("Please fill in all required fields");
      return;
    }
    try {
        const path = "/add-new-sales-ew"
      const res = await addNewEw(path, ewData);
      toast.success(res?.message || "EW Added successfully");
        navigate("/submitted-form", {
  state: { path: "/sales/new-ew" }
});
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      console.log("Error:", error);
    }
  };
  return (
    <>
      <img
             src={logo}
             alt="img"
             className="w-32 h-20 rounded-full ml-6"
             loading="lazy"
           />

      <span className="flex md:flex-row flex-col md:items-center justify-between md:mx-20 mx-6 font-head  ">
        <p className="md:text-[23px] text-[18px] font-semibold pt-12 ">
          Add New EW Warranty
        </p>
        <p className="md:text-[18px] text-[16px] font-medium md:pt-12 pt-4 sm:ml-[25%]">
          EW Issue Date -{" "}
          {id ? formatDate(ewByIdorStatus?.data?.createdAt) : formattedDate}
        </p>
      </span>

      <div className="sm:ml-[9.5%] md:ml-[5%]  w-full">
        <p className="text-[20px] font-head font-semibold mt-5">
          Customer Personal Details
        </p>
        <GroupedInput
          leftFields={leftFields}
          rightFields={rightFields}
          stateName={ewData.customerDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "customerDetails" } },
            });
          }}
        />

        <p className="text-[20px] font-head font-semibold mt-12">
          Extended Warranty Policy Details
        </p>

        <GroupedInput
          leftFields={lefEwFields}
          rightFields={rightEwFields}
          stateName={ewData.ewDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "ewDetails" } },
            });
          }}
        />
        <p className="text-[20px] font-head font-semibold mt-5">
          Vehicle Details
        </p>
        <GroupedInput
          leftFields={leftVehicleFields}
          rightFields={rightVehicleFields}
          stateName={ewData.vehicleDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "vehicleDetails" } },
            });
          }}
        />
        <div
          onClick={handleSubmit}
          className="bg-primary text-white mt-16 rounded-md px-6 py-2 cursor-pointer w-28 text-center mb-20"
        >
          Submit
        </div>
      </div>
    </>
  );
};

export default EwSalesForm;

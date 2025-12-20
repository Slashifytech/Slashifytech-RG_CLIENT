import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GroupedInput } from "../Components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../admin/Nav";
import SideNav from "../agent/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { createdDate, formatDate } from "../helper/commonHelperFunc";
import { addNewBuyBack, updateBuyBack } from "../features/BuybackApi";
import { fuelType, locationOption, modelOption } from "../data";
import { fetchbuyBackDataById } from "../features/BuyBackSlice";
import Header from "../Components/Header";
const BuyBackForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formattedDate = createdDate();
  const { buyBackByIdorStatus } = useSelector((state) => state.buyBack);

  const { _id, roleType } = useSelector((state) => state.users.users);
  const [buyBack, setBuyBack] = useState({
    customerDetails: {
      customerName: "",
      address: "",
      customerGst: "",
      contact: "",
      stateCode: "",
      email: "",
      pan: "",
      zipCode: "",
    },
    vehicleDetails: {
      vehicleModel: "",
      vinNumber: "",
      dealerLocation: "",
      validityMilage: "",
      agreementStartDate: "",
      agreementValidDate: "",
      totalPayment: "",
      fuelType: "",
      rmEmail: "",
      rmName: "",
      rmEmployeeId: "",
      gmEmail: "",
    },
    createdBy: _id,
  });

  const rightFields = [
    {
      name: "customerName",
      type: "text",
      placeholder: "Customer Name",
      label: "Customer Name",
      required: true,
    },
    {
      name: "contact",
      type: "number",
      placeholder: "Contact",
      label: "Contact",
      required: true,
    },
    {
      name: "pan",
      type: "text",
      placeholder: "Pan Number",
      label: "Pan Number",
    },
    {
      name: "zipCode",
      type: "number",
      placeholder: "Zip Code",
      label: "Zip Code",
    },
  ];
  const leftFields = [
    { name: "address", type: "text", placeholder: "Address", label: "Address" },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
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
  const rightVehicleFields = [
    {
      name: "fuelType",
      type: "select",
      placeholder: "Fuel Type",
      label: "Fuel Type",
      options: fuelType,
      required: true,
    },
    {
      name: "agreementStartDate",
      type: "date",
      placeholder: "Agreement Start Date",
      label: "Agreement Start Date",
      required: true,
    },

    {
      name: "deliveryDate",
      type: "date",
      placeholder: "Delivery Date",
      label: "Delivery Date",
      required: true,
    },
    {
      name: "validityMilage",
      type: "text",
      placeholder: "Validity Milage",
      label: "Validity Milage",
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
      name: "rmEmail",
      type: "email",
      placeholder: " Relationship Manager/ Service Advisor Email Id",
      label: "Email Id of Relationship Manager/ Service Advisor ",
      required: true,
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
      name: "vinNumber",
      type: "text",
      placeholder: "Vin Number",
      label: "Vin Number",
      required: true,
    },
    {
      name: "agreementValidDate",
      type: "date",
      placeholder: "Agreement Valid Date",
      label: "Agreement Valid Date ",
      required: true,
    },
    {
      name: "totalPayment",
      type: "text",
      placeholder: "Total Payment",
      label: "Total Payment",
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
      name: "rmEmployeeId",
      type: "text",
      placeholder: "Employee Id of Relationship Manager/ Service Advisor",
      label: "Employee Id of Relationship Manager/ Service Advisor",
      required: true,
    },
    {
      name: "gmEmail",
      type: "email",
      placeholder: "General Manager Email Id",
      label: "General Manager Email",
    },
  ];
  const [errors, setErrors] = useState({});
  const id = location?.state?.docId;

  // Calculate `agreementValidDate` if necessary fields are available
  const handleInput = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset?.section;

    setBuyBack((prev) => {
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
    } = buyBack.customerDetails;

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
      agreementStartDate,
      agreementValidDate,
      validityMilage,
      fuelType,
      deliveryDate,
      totalPayment,
      rmEmail,
      rmName,
      rmEmployeeId,
    } = buyBack.vehicleDetails;

    if (!vehicleModel) newErrors.vehicleModel = "Model is required.";
    if (!fuelType) newErrors.fuelType = "Fuel type is required.";
    if (!deliveryDate) newErrors.deliveryDate = "Delivery date is required.";

    if (!vinNumber) newErrors.vinNumber = "VIN number is required.";
    if (!agreementStartDate)
      newErrors.agreementStartDate = "Agreement start date is required.";
    if (!agreementValidDate)
      newErrors.agreementValidDate = "Agreement valid date is required.";

    if (!/^\d+$/.test(validityMilage))
      newErrors.validityMilage = "Valid mileage must be a number.";
    if (!/^\d+(\.\d{1,2})?$/.test(totalPayment))
      newErrors.totalPayment = "Total Payment must be a valid number.";
    if (!rmEmail) newErrors.rmEmail = "Email is required.";
    if (!rmName) newErrors.rmName = "Name is required.";
    if (!rmEmployeeId) newErrors.rmEmployeeId = "Id is required.";
    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchbuyBackDataById({ id }));
    }
  }, [id]);
  useEffect(() => {
    setBuyBack((prev) => ({
      ...prev,
      ...buyBackByIdorStatus?.data,
    }));
  }, [buyBackByIdorStatus?.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form data is valid:", buyBack);
    } else {
      console.log("Validation errors:", errors);
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      let res;
      res = id
        ? await updateBuyBack(buyBack, id)
        : await addNewBuyBack(buyBack);
      toast.success(res?.message || "Buyback Added successfully");
      navigate(-1);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="fixed">
        <div className="absolute">
          {roleType === "0" ? <Nav /> : roleType === "2" ? <SideNav /> : null}
        </div>
      </div>

      <div>
        <Header />
      </div>

      <span className="flex md:flex-row flex-col md:items-center justify-between md:mx-36 mx-6 font-head md:pt-10 ">
        <p className="md:text-[23px] text-[18px] font-semibold pt-20 md:ml-[13.5%] sm:ml-[25%]">
          Add New Buy Back
        </p>
        <p className="md:text-[18px] text-[16px] font-medium md:pt-12 pt-4 sm:ml-[25%]">
          AMC Issue Date -{" "}
          {id ? formatDate(buyBackByIdorStatus?.createdAt) : formattedDate}
        </p>
      </span>

      <div className="sm:ml-[26.5%] md:ml-[21%]  w-full">
        <p className="text-[20px] font-head font-semibold mt-5">
          Customer Personal Details
        </p>
        <GroupedInput
          leftFields={leftFields}
          rightFields={rightFields}
          stateName={buyBack.customerDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "customerDetails" } },
            });
          }}
        />
        <p className="text-[20px] font-head font-semibold mt-12">
          Vehicle Details
        </p>

        <GroupedInput
          leftFields={leftVehicleFields}
          rightFields={rightVehicleFields}
          stateName={buyBack.vehicleDetails}
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

export default BuyBackForm;

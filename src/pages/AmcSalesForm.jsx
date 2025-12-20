import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FileUpload, GroupedInput } from "../Components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { addNewAMC, addNewSalesAMC, updateAMC } from "../features/AMCapi";
import { useDispatch, useSelector } from "react-redux";
import { fetchamcDataById } from "../features/amcSlice";
import { createdDate, formatDate } from "../helper/commonHelperFunc";
import {
  amcType,
  departmentOpt,
  fuelType,
  locationOption,
  modelOption,
  upcomingServiceOpt,
} from "../data";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { logo } from "../assets";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../Util/fireBase";

const AmcSalesForm = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formattedDate = createdDate();
  const { amcByIdorStatus } = useSelector((state) => state.amc);
  const { _id, roleType } = useSelector((state) => state.users.users);
  const [AMCData, setAMCData] = useState({
    customerDetails: {
      customerName: "",
      address: "",
      customerGst: "",
      contact: "",
      stateCode: "",
      email: "",
      pan: "",
      zipCode: "",
      amcType: "",
    },
    vehicleDetails: {
      model: "",
      fuelType: "",
      vinNumber: "",
      agreementPeriod: "",
      agreementStartDate: "",
      agreementValidDate: "",
      agreementStartMilage: "",
      agreementValidMilage: "",
      MaximumValidPMS: "",
      dealerLocation: "",
      total: "",
      rmEmail: "",
      rmName: "",
      rmEmployeeId: "",
      gmEmail: "",
      salesTeamEmail: "",
      department: "",
      paymentReceivedDateForPackage: "",
      bookingId: "",
      custUpcomingService: "",
      paymentScreenshot: "",
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
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      name: "contact",
      type: "number",
      placeholder: "Contact",
      label: "Contact",
      required: true,
    },
    { name: "address", type: "text", placeholder: "Address", label: "Address" },

    {
      name: "amcType",
      type: "select",
      options: amcType,
      placeholder: "Select Amc Type",
      label: "Amc Type",
      required: true,
    },
  ];
  const rightFields = [
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
    {
      name: "zipCode",
      type: "number",
      placeholder: "Zip Code",
      label: "Zip Code",
    },
    {
      name: "pan",
      type: "text",
      placeholder: "Pan Number",
      label: "Pan Number",
    },
  ];
  const leftVehicleFields = [
    {
      name: "model",
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
      name: "vinNumber",
      type: "text",
      placeholder: "Vin Number",
      label: "Vin Number",
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
      name: "agreementPeriod",
      type: "text",
      placeholder: "Agreement Period",
      label: "Agreement Period",
      required: true,
    },
    {
      name: "agreementValidDate",
      type: "date",
      placeholder: "Agreement Valid Date",
      label: "Agreement Valid Date",
      required: true,
    },

    {
      name: "agreementStartMilage",
      type: "text",
      placeholder: "Agreement Start Milage",
      label: "Agreement Start Milage",
      required: true,
    },

    {
      name: "agreementValidMilage",
      type: "text",
      placeholder: "Agreement Valid Milage",
      label: "Agreement Valid Milage",
      required: true,
    },
    // {
    //   name: "MaximumValidPMS",
    //   type: "text",
    //   placeholder: "Maximum Valid Number of PMS",
    //   label: "Maximum Valid Number of PMS",
    //   required: true,
    // },

    {
      name: "total",
      type: "text",
      placeholder: "Total Amount",
      label: "Total Amount",
      required: true,
    },
  ];

  const rightVehicleFields = [
    {
      name: "custUpcomingService",
      type: "multiselect",
      placeholder: "Customer Upcoming Service",
      label: "Customer Upcoming Service",
      options: upcomingServiceOpt,
      // required: true,
    },

    {
      name: "rmEmployeeId",
      type: "text",
      placeholder: "Employee Id of Relationship Manager/ Service Advisor",
      label: "Employee Id of Relationship Manager/ Service Advisor",
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
    {
      name: "gmEmail",
      type: "email",
      placeholder: "General Manager Email Id",
      label: "General Manager Email",
    },
    {
      name: "salesTeamEmail",
      type: "email",
      placeholder: "Sales Team Email",
      label: "Sales Team Email",
    },
    {
      name: "department",
      type: "select",
      placeholder: "Department",
      label: "Department",
      options: departmentOpt,
      // required: true,
    },

    {
      name: "paymentReceivedDateForPackage",
      type: "date",
      placeholder: "Payment Received Date for Package",
      label: "Payment Received Date for Package",
      // required: true,
      limitDate: true,
    },
    {
      name: "bookingId",
      type: "text",
      placeholder: "Bookinng Id",
      label: "Booking Id",
    },
    {
      name: "dealerLocation",
      type: "select",
      options: locationOption,
      placeholder: "Location of the Dealer",
      label: "Location of the Dealer",
      required: true,
    },
  ];
  const [errors, setErrors] = useState({});
  const id = location?.state?.docId;

  const handleInput = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset?.section;

    setAMCData((prev) => {
      const updatedSection = {
        ...prev[section],
        [name]: value,
      };
      if (name === "agreementPeriod") {
        updatedSection.MaximumValidPMS = parseFloat(value) || 0;
      }
      if (name === "agreementPeriod" || name === "agreementStartDate") {
        const agreementPeriod = parseFloat(
          name === "agreementPeriod" ? value : updatedSection.agreementPeriod
        );
        const agreementStartDate =
          name === "agreementStartDate"
            ? value
            : updatedSection.agreementStartDate;

        if (agreementPeriod && agreementStartDate) {
          const validDate = new Date(agreementStartDate);

          const years = Math.floor(agreementPeriod);
          const months = Math.round((agreementPeriod - years) * 12);

          validDate.setFullYear(validDate.getFullYear() + years);
          validDate.setMonth(validDate.getMonth() + months);

          updatedSection.agreementValidDate = validDate
            ?.toISOString()
            ?.split("T")[0];
        }
      }

      // Calculate `agreementValidMilage` if necessary fields are available
      if (
        name === "agreementPeriod" ||
        name === "agreementStartMilage" ||
        name === "fuelType" ||
        name === "model"
      ) {
        const agreementPeriod = parseFloat(
          name === "agreementPeriod" ? value : updatedSection.agreementPeriod
        );
        const agreementStartMilage = parseInt(
          name === "agreementStartMilage"
            ? value
            : updatedSection.agreementStartMilage,
          10
        );
        const fuelType = name === "fuelType" ? value : updatedSection.fuelType;
        const model = name === "model" ? value : updatedSection.model;

        if (agreementPeriod && agreementStartMilage && fuelType) {
          const mileageMultiplier =
            fuelType === "Petrol"
              ? 10000
              : fuelType === "Electric Vehicle" &&
                (model === "Comet" || model === "ZS EV")
              ? 10000
              : fuelType === "Electric Vehicle" && model === "Windsor"
              ? 15000
              : fuelType === "Electric Vehicle" &&
                (model !== "Comet" || model !== "ZS EV")
              ? null
              : 15000;
          if (
            fuelType === "Electric Vehicle" &&
            model !== "Comet" &&
            model !== "Windsor" &&
            model !== "ZS EV"
          ) {
            updatedSection.agreementValidMilage = 0;
          } else {
            updatedSection.agreementValidMilage =
              agreementStartMilage + agreementPeriod * mileageMultiplier;
          }
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

    const { customerName, contact, email } = AMCData.customerDetails;

    if (!customerName) newErrors.customerName = "Customer name is required.";

    if (!/^\d{10}$/.test(contact))
      newErrors.contact = "Contact must be a valid 10-digit number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email must be valid.";
    // if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) newErrors.pan = "PAN must be valid.";

    // Vehicle Details Validation
    const {
      model,
      fuelType,
      vinNumber,
      agreementPeriod,
      agreementStartDate,
      agreementValidDate,
      agreementStartMilage,
      agreementValidMilage,
      MaximumValidPMS,
      dealerLocation,
      total,
      rmEmail,
      rmName,
      rmEmployeeId,
    } = AMCData.vehicleDetails;

    if (!model) newErrors.model = "Model is required.";
    if (!fuelType) newErrors.fuelType = "Fuel type is required.";

    if (!vinNumber) newErrors.vinNumber = "VIN number is required.";
    if (!agreementPeriod)
      newErrors.agreementPeriod = "Agreement period is required.";
    if (!agreementStartDate)
      newErrors.agreementStartDate = "Agreement start date is required.";
    if (!agreementValidDate)
      newErrors.agreementValidDate = "Agreement valid date is required.";
    if (!/^\d+$/.test(agreementStartMilage))
      newErrors.agreementStartMilage = "Start mileage must be a number.";
    if (!/^\d+$/.test(agreementValidMilage))
      newErrors.agreementValidMilage = "Valid mileage must be a number.";
    if (!/^\d+$/.test(MaximumValidPMS))
      newErrors.MaximumValidPMS = "PMS must be a number.";
    if (!dealerLocation)
      newErrors.dealerLocation = "Dealer location is required.";
    if (!rmEmail) newErrors.rmEmail = "Email is required.";
    if (!rmName) newErrors.rmName = "Name is required.";
    if (!rmEmployeeId) newErrors.rmEmployeeId = "Id is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(total))
      newErrors.total = "Total must be a valid number.";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = async (name, file) => {
    // console.log("Selected file:", file);
    if (!file) return;

    // const storageRef = ref(storage, `files/${file?.name}`);
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `files/rgamc/${uniqueFileName}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded file:", snapshot);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at:", downloadURL);

      setAMCData((prevData) => ({
        ...prevData,
        vehicleDetails: {
          ...prevData.vehicleDetails,
          paymentScreenshot: downloadURL,
        },
      }));

      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };

  const deleteFile = async (fileUrl, uploadType) => {
    if (!fileUrl) return;

    const storageRef = ref(storage, fileUrl);

    try {
      // toast.success("File deleted successfully!");

      setAMCData((prevData) => ({
        ...prevData,
        vehicleDetails: {
          ...prevData.vehicleDetails,
          paymentScreenshot: "",
        },
      }));

      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting file:", error);
      // toast.error("Error deleting file. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchamcDataById({ id, option: null }));
    }
  }, [id]);
  useEffect(() => {
    setAMCData((prev) => ({
      ...prev,
      ...amcByIdorStatus?.data,
    }));
  }, [amcByIdorStatus?.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form data is valid:", AMCData);
    } else {
      console.log("Validation errors:", errors);
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const previousAgreementPeriod =
        amcByIdorStatus?.data?.vehicleDetails?.agreementPeriod || 0;

      const currentAgreementPeriod =
        AMCData?.vehicleDetails?.agreementPeriod || 0;

      const clonedAmcData = JSON.parse(JSON.stringify(AMCData)); // Deep clone
      delete clonedAmcData.amcCredit; // Remove amcCredit

      const payload = { ...clonedAmcData };

      if (previousAgreementPeriod !== currentAgreementPeriod) {
        payload.amcCredit = currentAgreementPeriod;
      }
      console.log("Final Payload:", payload);
      let res;
      res = await addNewSalesAMC(AMCData);
      toast.success(res?.message || "Added successfully");
      setAMCData({
        customerDetails: {
          customerName: "",
          address: "",
          customerGst: "",
          contact: "",
          stateCode: "",
          email: "",
          pan: "",
          zipCode: "",
          amcType: "",
        },
        vehicleDetails: {
          model: "",
          fuelType: "",
          vinNumber: "",
          agreementPeriod: "",
          agreementStartDate: "",
          agreementValidDate: "",
          agreementStartMilage: "",
          agreementValidMilage: "",
          MaximumValidPMS: "",
          dealerLocation: "",
          total: "",
          rmEmail: "",
          rmName: "",
          rmEmployeeId: "",
          gmEmail: "",
          department: "",
          salesTeamEmail: "",
          paymentReceivedDateForPackage: "",
          bookingId: "",
          custUpcomingService: "",
          paymentScreenshot: "",
        },
        createdBy: "",
      });
      navigate("/submitted-amc-form");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
      console.log("Error:", error);
    }
  };

  return (
    <>
      {/* // logo add */}
      <img
        src={logo}
        alt="img"
        className="w-32 h-20 rounded-full ml-6"
        loading="lazy"
      />
      <span className="flex md:flex-row flex-col md:items-center justify-between md:mx-20 mx-6 font-head  ">
        <p className="md:text-[23px] text-[18px] font-semibold pt-12 ">
          {"Add New AMC"}
        </p>
        <p className="md:text-[18px] text-[16px] font-medium md:pt-12 pt-4 sm:ml-[25%]">
          AMC Issue Date -{" "}
          {id ? formatDate(amcByIdorStatus?.data?.createdAt) : formattedDate}
        </p>
      </span>

      <div className="sm:ml-[9.5%] md:ml-[5%]  w-full">
        <p className="text-[20px] font-head font-semibold mt-5 md:ml-0 ml-6">
          Customer Personal Details
        </p>
        <GroupedInput
          leftFields={leftFields}
          rightFields={rightFields}
          stateName={AMCData.customerDetails}
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
          stateName={AMCData.vehicleDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "vehicleDetails" } },
            });
          }}
        />
        <div className=" md:mt-[-80px] mt-6 w-96 ">
          <FileUpload
            imp={true}
            label="Payment/Ledger Screensort"
            onFileSelect={(file) => handleFileSelect("paymentScreenshot", file)}
            deleteFile={() =>
              deleteFile(
                AMCData.vehicleDetails.paymentScreenshot,
                "paymentScreenshot"
              )
            }
            name="paymentScreenshot"
            fileUrl={AMCData.vehicleDetails.paymentScreenshot}
            customClass="md:mx-0 mx-6"
          />
          {errors.paymentScreenshot && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.paymentScreenshot}
            </p>
          )}
        </div>

        <div
          onClick={handleSubmit}
          className="bg-primary text-white mt-16 rounded-md px-6 py-2 cursor-pointer w-28 text-center mb-20 md:ml-0 ml-6"
        >
          Submit
        </div>
      </div>
    </>
  );
};

export default AmcSalesForm;

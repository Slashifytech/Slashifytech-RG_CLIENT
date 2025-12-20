import React, { useEffect, useState } from "react";
import Nav from "../admin/Nav";
import InputField, { SelectInput } from "./Input";
import {
  addYearsEndDate,
  createdDate,
  formatDate,
  formatFieldName,
} from "../helper/commonHelperFunc";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMbOptions,
  fetchAllMgOptions,
} from "../features/VehcleOptionsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { submitPolicy } from "../features/policySlice";
import SideNav from "../agent/SideNav";
import { getPolicyById } from "../../Util/UtilityFunction";
import { toast } from "react-toastify";
import { editPolicyData, submitPolicyData } from "../features/policyapi";
import { fetchTeamData } from "../features/teamSlice";
import { updateTeams } from "../features/teamApi";
import { locationOption } from "../data";

const PolicyComponenet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [policyData, setPolicydata] = useState({
    customerName: "",
    address: "",
    email: "",
    panNumber: "",
    contactNumber: "",
    customerGstNumber: "",
    vehicleManufacturer: "",
    vehicleModel: "",
    ewVehicleEntryAge: "",
    vehicleEngineNumber: "",
    vehicleIdNumber: "",
    vehicleRegNumber: "",
    fuelType: "",
    vehiclePurchaseDate: "",
    exshowroomPrice: "",
    odometerReading: "",
    coolingOffPeriod: "30 days",
    extWarrantyStartDate: "",
    extWarrantyEndDate: "",
    product: "",
    typeOfPackage: "",
    productPrice: "",
    gst: "",
    cgst: "",
    sgst: "",
    totalPrice: "",
    price: "",
    variant: "",
    hypothecation: "",
    transactionId: "",
    manufacturingYear: "",
    totalPriceInWords: "",
    vehicleFirstRegDate: "",
    teams: {
      leadName: "",
      teamName: "",
      location: "",
      employeeName: "",
    },
  });
  const dispatch = useDispatch();
  console.log(location);
  const policyType = location?.state?.policyType
    ? location.state.policyType
    : policyData.vehicleManufacturer === "Mercedes-Benz"
    ? "MB"
    : policyData.vehicleManufacturer === "Morris Garage"
    ? "MG"
    : null;

  const { mgData, mbData } = useSelector((state) => state.master);
  const { allTeams } = useSelector((state) => state.team);
  const token = useSelector((state) => state.auth.token);
  const { _id, roleType } = useSelector((state) => state.users.users);
  const update = location?.state?.update;
  const addNew = location?.state?.addNew;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userId = _id;
  const [availablePackages, setAvailablePackages] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [isAddingNewName, setIsAddingNewName] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [policyDataGet, setPolicyDataGet] = useState();
  const [errors, setErrors] = useState({});
  const [isEmailValid, setEmailValid] = useState("");
  const [isCreatedDate, setIsCreatedDate] = useState("");
  const id = location?.state?.id;
  const [pId, setPid] = useState();
  const [maxDate, setMaxDate] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setMaxDate(formattedDate);
  }, []);
  useEffect(() => {
    dispatch(fetchAllMgOptions());
    dispatch(fetchAllMbOptions());
    dispatch(fetchTeamData());
  }, [dispatch]);
  useEffect(() => {
    const getPolicies = async () => {
      const res = await getPolicyById(id);
      setPid(res?.data[0]?._id);
      setIsCreatedDate(res?.data[0]?.createdAt);
      setPolicyDataGet(res?.data);
    };
    getPolicies();
  }, [id]);

  const getData = () => {
    if (policyDataGet) {
      setPolicydata({
        customerName: policyDataGet[0].customerName || "",
        address: policyDataGet[0].address || "",
        email: policyDataGet[0].email || "",
        panNumber: policyDataGet[0].panNumber || "",
        contactNumber: policyDataGet[0].contactNumber || "",
        customerGstNumber: policyDataGet[0].customerGstNumber || "",
        vehicleManufacturer: policyDataGet[0].vehicleManufacturer || "",
        vehicleModel: policyDataGet[0].vehicleModel || "",
        ewVehicleEntryAge: policyDataGet[0].ewVehicleEntryAge || "",
        vehicleEngineNumber: policyDataGet[0].vehicleEngineNumber || "",
        vehicleIdNumber: policyDataGet[0].vehicleIdNumber || "",
        vehicleRegNumber: policyDataGet[0].vehicleRegNumber || "",
        fuelType: policyDataGet[0].fuelType || "",
        vehiclePurchaseDate: policyDataGet[0].vehiclePurchaseDate || "",
        exshowroomPrice: policyDataGet[0].exshowroomPrice || "",
        odometerReading: policyDataGet[0].odometerReading || "",
        coolingOffPeriod: policyDataGet[0].coolingOffPeriod || "30 days",
        extWarrantyStartDate: policyDataGet[0].extWarrantyStartDate || "",
        extWarrantyEndDate: policyDataGet[0].extWarrantyEndDate || "",
        product: policyDataGet[0].product || "360 Car Protect Warranty",
        typeOfPackage: policyDataGet[0].typeOfPackage || "",
        productPrice: policyDataGet[0].productPrice || "",
        gst: policyDataGet[0].gst || "",
        totalPrice: policyDataGet[0].totalPrice || "",
        price: policyDataGet[0].price || "",
        variant: policyDataGet[0].variant || "",
        hypothecation: policyDataGet[0].hypothecation || "",
        transactionId: policyDataGet[0]?.transactionId || "",
        cgst: policyDataGet[0]?.cgst || "",
        sgst: policyDataGet[0]?.sgst || "",
        vehicleFirstRegDate: policyDataGet[0]?.vehicleFirstRegDate || "",
        manufacturingYear: policyDataGet[0]?.manufacturingYear || "",
        totalPriceInWords: policyDataGet[0]?.totalPriceInWords || "",

        teams: {
          leadName: policyDataGet[0]?.teams?.leadName || "",
          teamName: policyDataGet[0]?.teams?.teamName || "",
          location: policyDataGet[0]?.teams?.location || "",
          employeeName: policyDataGet[0]?.teams?.employeeName || "",
        },
      });
    }
  };

  useEffect(() => {
    getData();
  }, [policyDataGet]);

  useEffect(() => {
    if (policyType === "MG") {
      setPolicydata((data) => ({
        ...data,
        vehicleManufacturer: "Morris Garage",
      }));
    } else if (policyType === "MB") {
      setPolicydata((data) => ({
        ...data,
        vehicleManufacturer: "Mercedes-Benz",
      }));
    }
  }, [location?.state?.policyType]);

  useEffect(() => {
    if (policyData.vehicleManufacturer === "Mercedes-Benz") {
      // Fetch MB Data
      setModelOptions(mbData.map((item) => item.model));
    } else if (policyData.vehicleManufacturer === "Morris Garage") {
      // Fetch MG Data
      setModelOptions(mgData.map((item) => item.model));
    }
  }, [policyData.vehicleManufacturer, mgData, mbData]);

  const handleLocationChange = (e) => {
    const location = e.target.value;

    setPolicydata((prev) => {
      const updatedTeams = {
        ...prev.teams,
        location, // Update location
        leadName: "", // Reset dependent fields
        teamName: "",
        employeeName: "",
      };

      // Filter leads based on location
      const leads = allTeams?.teams
        ?.filter((team) => team.location === location)
        .map((team) => team.leadName);

      setFilteredLeads([...new Set(leads)]); // Remove duplicates
      setFilteredTeams([]); // Reset filtered teams
      setFilteredEmployees([]); // Reset filtered employees

      return {
        ...prev,
        teams: updatedTeams,
      };
    });
  };

  const handleLeadNameChange = (e) => {
    const leadName = e.target.value;

    setPolicydata((prev) => {
      const updatedTeams = {
        ...prev.teams,
        leadName,
        teamName: "", // Reset dependent fields
        employeeName: "",
      };

      // Filter teams based on leadName and location
      const teams = allTeams?.teams
        ?.filter(
          (team) =>
            team.location === prev.teams.location && team.leadName === leadName
        )
        .map((team) => team.teamName);

      setFilteredTeams([...new Set(teams)]); // Remove duplicates
      setFilteredEmployees([]); // Reset filtered employees

      return {
        ...prev,
        teams: updatedTeams,
      };
    });
  };

  const handleTeamNameChange = (e) => {
    const teamName = e.target.value;

    setPolicydata((prev) => {
      const updatedTeams = {
        ...prev.teams,
        teamName, // Update teamName
        employeeName: "", // Reset dependent field
      };

      // Filter employees based on teamName, leadName, and location
      const employees = allTeams?.teams
        ?.filter(
          (team) =>
            team.location === prev.teams.location &&
            team.leadName === prev.teams.leadName &&
            team.teamName === teamName
        )
        .map((team) => team.employeeName);

      setFilteredEmployees([...new Set(employees)]); // Remove duplicates

      return {
        ...prev,
        teams: updatedTeams,
      };
    });
  };

  const handleAddNewName = () => {
    setIsAddingNewName(true);
  };

  const handleSaveNewName = async () => {
    try {
      const res = await updateTeams(
        newEmployeeName,
        policyData.teams.leadName,
        policyData.teams.location,
        policyData.teams.teamName
      );
      toast.success(res?.message || "Employee name replaced successfully");
      setPolicydata((prevData) => ({
        ...prevData,
        teams: {
          ...prevData.teams,
          employeeName: newEmployeeName,
        },
      }));
      // setIsAddingNewName(false);
      // dispatch(fetchTeamData());
      // setNewEmployeeName("");
    } catch (e) {
      console.log(e);
      toast.error(
        e.message || "Something went wrong while replacing employee name"
      );
    }
  };
  const handleInput = (e) => {
    const { value, name } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    const updatedValue =
      name === "panNumber" ||
      name === "transactionId" ||
      name === "customerGstNumber"
        ? value.toUpperCase()
        : value;

    setPolicydata((data) => ({
      ...data,

      [name]: updatedValue,
    }));

    if (name === "vehiclePurchaseDate") {
      const purchaseDate = new Date(value);
      const extWarrantyStartDate = new Date(
        purchaseDate.setFullYear(purchaseDate.getFullYear() + 3)
      );
      const formattedDate = `${String(extWarrantyStartDate.getDate()).padStart(
        2,
        "0"
      )}-${String(extWarrantyStartDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${extWarrantyStartDate.getFullYear()}`;

      setPolicydata((data) => ({
        ...data,
        extWarrantyStartDate: formattedDate,
      }));
    }

    // Trigger age calculation and update fields based on input
    if (name === "vehiclePurchaseDate" || name === "vehicleModel") {
      handleDateAndModelChange(value, name);
    }
    if (name === "typeOfPackage") {
      updatePriceBasedOnPackage(value);
    }
  };
  useEffect(() => {
    if (policyType === "MG") {
      setPolicydata((prevData) => ({
        ...prevData,
        product: "Shine Car Protect",
      }));
    } else if (policyType === "MB") {
      setPolicydata((prevData) => ({
        ...prevData,
        product: "360 Car Protect ",
      }));
    }
  }, [policyType]);
  const packageMappings = {
    fourthYear: "4th Year",
    prevPlusFifthYear: "4th + 5th Year",
    prevPlusSixthYear: "4th + 5th + 6th Year",
    twelveMonthPerhundredK_KMS: "12 Month / 100 KMS",
    twentyFourMonthPerhundredK_KMS: "24 Month / 100 KMS",
    twelveMonthPerUnlimited_KMS: "12 Month / Unlimited KMS",
    twentyFourMonthPerUnlimited_KMS: "24 Month / Unlimited KMS",
  };

  const handleDateAndModelChange = () => {
    const currentDate = new Date();
    const purchaseDate = new Date(policyData.vehiclePurchaseDate);
    const model = policyData.vehicleModel;

    // Calculate the difference in days
    const timeDiff = currentDate - purchaseDate;
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let entryAge = "Not applicable";

    if (policyData.vehicleManufacturer === "Mercedes-Benz") {
      // Calculate entry age for Mercedes-Benz
      const monthDiff =
        currentDate.getMonth() -
        purchaseDate.getMonth() +
        12 * (currentDate.getFullYear() - purchaseDate.getFullYear());

      if (monthDiff <= 6) {
        entryAge = "0 - 6 Months";
      } else if (monthDiff > 6 && monthDiff <= 12) {
        entryAge = "6 - 12 Months";
      } else if (monthDiff > 12 && monthDiff <= 24) {
        entryAge = "1 to 2 year";
      } else if (monthDiff > 24 && monthDiff <= 36) {
        entryAge = "2 to 3 year";
      }

      const modelData = mbData.find((item) => item.model === model);
      if (modelData && entryAge !== "Not applicable") {
        setPolicydata((data) => ({
          ...data,
          ewVehicleEntryAge: entryAge,
        }));

        const mbDataEntry = mbData.find(
          (item) => item.model === model && item.entryAge === entryAge
        );

        if (mbDataEntry) {
          // Store original keys in the state
          const originalPackages = Object.keys(mbDataEntry).filter((key) =>
            ["fourthYear", "prevPlusFifthYear", "prevPlusSixthYear"].includes(
              key
            )
          );

          // Convert original keys to user-friendly text
          const displayPackages = originalPackages.map((key) => ({
            value: key,
            label: packageMappings[key],
          }));

          setAvailablePackages(displayPackages);
        } else {
          setAvailablePackages([]);
        }
      } else {
        setPolicydata((data) => ({
          ...data,
          ewVehicleEntryAge: "Not applicable",
        }));
        setAvailablePackages([]);
      }
    } else if (policyData.vehicleManufacturer === "Morris Garage") {
      // Calculate entry age for Morris Garage
      if (dayDiff <= 30) {
        entryAge = "0-30 days";
      } else if (dayDiff > 30 && dayDiff <= 180) {
        entryAge = "31-180 days";
      } else if (dayDiff > 180 && dayDiff <= 365) {
        entryAge = "181-365 days";
      } else if (dayDiff > 365 && dayDiff <= 700) {
        entryAge = "366-700 days";
      } else if (dayDiff > 700 && dayDiff <= 1065) {
        entryAge = "731-1065 days";
      }

      const modelData = mgData.find((item) => item.model === model);
      if (modelData && entryAge !== "Not applicable") {
        setPolicydata((data) => ({
          ...data,
          ewVehicleEntryAge: entryAge,
        }));

        const mgDataEntry = mgData.find(
          (item) => item.model === model && item.entryAge === entryAge
        );

        if (mgDataEntry) {
          // Store original keys in the state
          const originalPackages = Object.keys(mgDataEntry).filter((key) =>
            [
              "twelveMonthPerhundredK_KMS",
              "twentyFourMonthPerhundredK_KMS",
              "twelveMonthPerUnlimited_KMS",
              "twentyFourMonthPerUnlimited_KMS",
            ].includes(key)
          );

          // Convert original keys to user-friendly text
          const displayPackages = originalPackages.map((key) => ({
            value: key,
            label: packageMappings[key],
          }));

          setAvailablePackages(displayPackages);
        } else {
          setAvailablePackages([]);
        }
      } else {
        setPolicydata((data) => ({
          ...data,
          ewVehicleEntryAge: "Not applicable",
        }));
        setAvailablePackages([]);
      }
    }
  };

  useEffect(() => {
    if (policyData.vehiclePurchaseDate && policyData.vehicleModel) {
      handleDateAndModelChange();
    }
  }, [policyData.vehiclePurchaseDate, policyData.vehicleModel]);

  const calculateAndSetPriceDetails = (price, gstRate, sgstRate, cgstRate) => {
    const gstValue = price * (gstRate / 100);
    let sgstValue = 0;
    let cgstValue = 0;
    let totalPrice = parseFloat(price) + parseFloat(gstValue);

    if (policyType === "MB") {
      sgstValue = price * (sgstRate / 100);
      cgstValue = price * (cgstRate / 100);
      totalPrice += parseFloat(sgstValue) + parseFloat(cgstValue);
    }

    setPolicydata((data) => ({
      ...data,
      gst: gstValue.toFixed(2),
      sgst: sgstValue.toFixed(2),
      cgst: cgstValue.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    }));
  };

  const handlePackageChange = (e) => {
    const selectedPackage = e.target.value;
    setPolicydata((data) => ({
      ...data,
      typeOfPackage: selectedPackage,
    }));

    let price;
    if (policyData.vehicleManufacturer === "Mercedes-Benz") {
      const modelData = mbData.find(
        (item) =>
          item.model === policyData.vehicleModel &&
          item.entryAge === policyData.ewVehicleEntryAge
      );

      if (modelData) {
        price = modelData[selectedPackage];
      }
      setPolicydata((data) => ({
        ...data,
        price: price || "",
        productPrice: price || "",
      }));
      calculateAndSetPriceDetails(price || 0, 18, 9, 9);
    } else if (policyData.vehicleManufacturer === "Morris Garage") {
      const modelData = mgData.find(
        (item) =>
          item.model === policyData.vehicleModel &&
          item.entryAge === policyData.ewVehicleEntryAge
      );

      if (modelData) {
        price = modelData[selectedPackage];
      }
      // calculateAndSetPriceDetails(policyData.productPrice || 0, 18);
    }

    let duration = 0;
    if (selectedPackage === "fourthYear") {
      duration = 1;
    } else if (selectedPackage === "prevPlusFifthYear") {
      duration = 2;
    } else if (selectedPackage === "prevPlusSixthYear") {
      duration = 3;
    } else if (selectedPackage === "twelveMonthPerhundredK_KMS") {
      duration = 1;
    } else if (selectedPackage === "twentyFourMonthPerhundredK_KMS") {
      duration = 2;
    } else if (selectedPackage === "twelveMonthPerUnlimited_KMS") {
      duration = 1;
    } else if (selectedPackage === "twentyFourMonthPerUnlimited_KMS") {
      duration = 2;
    }

    const startDate = new Date(
      policyData.extWarrantyStartDate.split("-").reverse().join("-")
    );
    const endDate = addYearsEndDate(startDate, duration);

    const formattedEndDate = `${String(endDate.getDate()).padStart(
      2,
      "0"
    )}-${String(endDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${endDate.getFullYear()}`;

    setPolicydata((data) => ({
      ...data,
      extWarrantyEndDate: formattedEndDate,
    }));
  };

  const validateFields = () => {
    let newErrors = {};
    const requiredFields = [
      "customerName",
      "address",
      "email",
      "panNumber",
      "contactNumber",
      "customerGstNumber",
      "vehicleManufacturer",
      "vehicleModel",
      "ewVehicleEntryAge",
      "vehicleEngineNumber",
      "vehicleIdNumber",
      "vehicleRegNumber",
      "fuelType",
      "vehiclePurchaseDate",
      "exshowroomPrice",
      "odometerReading",
      "extWarrantyStartDate",
      "extWarrantyEndDate",
      "typeOfPackage",
      "productPrice",
      "gst",
      "totalPrice",
      "price",
      "transactionId",
    ];

    requiredFields.forEach((field) => {
      if (!policyData[field]) {
        newErrors[field] = `Please provide a value for ${formatFieldName(
          field
        )}.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateFields()) {
      try {
        // Validate email
        if (emailRegex.test(policyData.email)) {
          setEmailValid("");
        } else {
          setEmailValid("Please Enter a Valid Email");
          return;
        }
  
        const response =
          location?.state?.addNew === "isNew"
            ? await submitPolicyData(userId, policyData, token, addNew, update, pId)
            : await editPolicyData(policyDataGet?._id, policyData, token, pId);
  
        // Handle success based on response
        if (response?.message) {
          toast.success(response?.message || "Policy Saved Successfully");
          navigate(-1); // Navigate back
        } else {
          // Handle cases where success is ambiguous
          throw new Error(response?.error || "Unexpected response format");
        }
      } catch (err) {
        // Log full error object for debugging
        console.log("Caught error object:", err);
  
        // Extract and log meaningful error message
        const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";
        console.error("Error submitting policy data:", errorMessage);
  
        // Display error to user
        toast.error(errorMessage);
  
        // Optionally set errors in state for UI handling
        setErrors(errorMessage);
      }
    } else {
      // Form validation failed
      console.log("Form data is invalid. Please correct the errors.");
      toast.info("Form data is invalid. Please correct the errors.");
    }
  };
  

  const formattedDate = createdDate();
  const uniqueModels = Array.from(
    new Map(
      (policyData.vehicleManufacturer === "Morris Garage"
        ? mgData
        : mbData
      ).map((item) => [item.model, item])
    ).values()
  );
  // console.log(filteredTeams, filteredLeads, filteredEmployees, locationOption)
  return (
    <>
      <div className="fixed">
        <span className="absolute">
          {roleType === "0" ? <Nav /> : <SideNav />}
        </span>
      </div>

      <span className="flex md:flex-row flex-col md:items-center justify-between md:mx-36 mx-6 font-head md:pt-0 pt-12 ">
        <p className="md:text-[23px] text-[18px] font-semibold pt-12 md:ml-[14%] sm:ml-[34%]">
          {id ? "Update" : "Add"} {policyData?.vehicleManufacturer} Policy
        </p>
        <p className="md:text-[18px] text-[16px] font-medium md:pt-12 pt-4 sm:ml-[34%]">
          Certificate Issues Date -{" "}
          {id ? formatDate(isCreatedDate) : formattedDate}
        </p>
      </span>
      <div className="md:ml-[22%] sm:ml-[34%] md:mx-0 sm:mx-0 mx-6 pt-12 ">
        <form onSubmit={handleSubmit}>
          <p className="text-[20px] font-head font-semibold pb-2">
            Customer Personal Details
          </p>
          <div className="flex md:flex-row sm:flex-row flex-col font-body md:gap-12 sm:gap-12">
            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2 ">
                <label className="font-semibold">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2 "
                  placeholder="Customer Name"
                  name="customerName"
                  onchange={handleInput}
                  type="text"
                  value={policyData.customerName}
                />
                {errors?.customerName && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.customerName}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2 ">
                <label className="font-semibold">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2 "
                  placeholder="Contact Number"
                  name="contactNumber"
                  onchange={handleInput}
                  type="text"
                  value={policyData?.contactNumber}
                />
                {errors?.contactNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.contactNumber}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  PAN Number <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2 "
                  placeholder="Pan Number"
                  name="panNumber"
                  onchange={handleInput}
                  type="text"
                  value={policyData.panNumber}
                />
                {errors?.panNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.panNumber}
                  </p>
                )}
              </div>
            </span>
            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2 ">
                <label className="font-semibold">
                  Address <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Address"
                  name="address"
                  onchange={handleInput}
                  type="text"
                  value={policyData.address}
                />
                {errors?.address && (
                  <p className="text-red-500 mt-1 text-sm">{errors?.address}</p>
                )}
              </div>
              <div className="pt-3 pb-2 ">
                <label className="font-semibold">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2 "
                  placeholder="Email"
                  name="email"
                  onchange={handleInput}
                  type="email"
                  value={policyData.email}
                />
                {errors?.email && (
                  <p className="text-red-500 mt-1 text-sm">{errors?.email}</p>
                )}
                <p className="text-red-500 text-sm font-DMsan">
                  {isEmailValid}
                </p>
              </div>
              <div className="pt-3 pb-2 ">
                <label className="font-semibold">
                  Customer GST Number <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2 "
                  placeholder="GST Number"
                  name="customerGstNumber"
                  onchange={handleInput}
                  type="text"
                  value={policyData.customerGstNumber}
                />
                {errors?.customerGstNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.customerGstNumber}
                  </p>
                )}
              </div>
            </span>
          </div>
          {policyType === "MB" && (
            <>
              <p className="text-[20px] font-head font-semibold pb-2 pt-6">
                Pckage Created By
              </p>
              <div className="flex md:flex-row sm:flex-row flex-col font-body md:gap-12 sm:gap-12">
                <span className="md:w-[40%] sm:w-[40%]">
                  <div className="pt-3 pb-2">
                    <label className="font-semibold">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={policyData.teams.location}
                      onChange={handleLocationChange}
                      className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                    >
                      <option value="">Select Location</option>
                      {locationOption.map((loc) => (
                        <option key={loc.id} value={loc.value}>
                          {loc.label}
                        </option>
                      ))}
                    </select>
                    {errors?.location && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors?.location}
                      </p>
                    )}
                  </div>
                  <div className="pt-3 pb-2">
                    <label className="font-semibold">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={policyData.teams.teamName}
                      onChange={handleTeamNameChange}
                      disabled={!filteredTeams.length}
                      className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                    >
                      <option value="">Select Team Name</option>
                      {filteredTeams.map((team, index) => (
                        <option key={index} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                    {errors?.teamName && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors?.teamName}
                      </p>
                    )}
                  </div>
                </span>
                <span className="md:w-[40%] sm:w-[40%]">
                  <div className="pt-3 pb-2">
                    <label className="font-semibold">
                      Lead Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={policyData.teams.leadName}
                      onChange={handleLeadNameChange}
                      disabled={!filteredLeads.length}
                      className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                    >
                      <option value="">Select Lead Name</option>
                      {filteredLeads.map((lead, index) => (
                        <option key={index} value={lead}>
                          {lead}
                        </option>
                      ))}
                    </select>
                    {errors?.leadName && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors?.leadName}
                      </p>
                    )}
                  </div>
                  <div className="pt-3 pb-2">
                    <label className="font-semibold">
                      Employee Name<span className="text-red-500">*</span>
                    </label>

                    <div>
                      {isAddingNewName ? (
                        <div className="flex md:flex-row sm:flex-col items-center gap-2 mt-2">
                          <input
                            type="text"
                            value={newEmployeeName}
                            onChange={(e) => setNewEmployeeName(e.target.value)}
                            placeholder="Enter New Employee Name"
                            className="w-full h-10 bg-secondary rounded-md px-3 outline-none"
                          />
                          <span className="flex  items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleSaveNewName();
                                setIsAddingNewName(false); // Reset to dropdown after saving
                              }}
                              className="px-3 py-2 bg-primary text-white rounded-md"
                            >
                              Save
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setIsAddingNewName(false); // Reverse toggle
                              }}
                              className="px-3 py-2 bg-gray-300 text-black rounded-md"
                            >
                              Cancel
                            </button>
                          </span>
                        </div>
                      ) : (
                        <div className="flex md:flex-row sm:flex-col items-center gap-2 mt-2">
                          <select
                            disabled={!filteredEmployees.length}
                            value={policyData.teams?.employeeName || ""}
                            onChange={(e) =>
                              setPolicydata((prev) => ({
                                ...prev,
                                teams: {
                                  ...prev.teams,
                                  employeeName: e.target.value,
                                },
                              }))
                            }
                            className="md:w-[60%] h-10 bg-secondary rounded-md px-3 outline-none"
                          >
                            <option value="">Select Employee Name</option>
                            {filteredEmployees.map((employee, index) => (
                              <option key={index} value={employee}>
                                {employee}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setIsAddingNewName(true);
                            }}
                            className="px-3 py-2 text-[13px] bg-primary text-white rounded-md"
                          >
                            Add Employee Name
                          </button>
                        </div>
                      )}
                    </div>

                    {errors?.employeeName && (
                      <p className="text-red-500 mt-1 text-sm">
                        {errors?.employeeName}
                      </p>
                    )}
                  </div>
                </span>
              </div>
            </>
          )}

          <p className="text-[20px] font-head font-semibold pt-10">
            Vehicle Details
          </p>
          <div className="flex md:flex-row sm:flex-row flex-col font-body gap-12">
            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Model <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  name="vehicleModel"
                  onChange={handleInput}
                  value={policyData.vehicleModel}
                >
                  <option value="">Select Model</option>
                  {uniqueModels.map((item, index) => (
                    <option key={index} value={item.model}>
                      {item.model}
                    </option>
                  ))}
                </select>
                {errors?.vehicleModel && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.vehicleModel}
                  </p>
                )}
              </div>

              <div className="pt-3 pb-2">
                <label className="font-semibold">Variant (Optional)</label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Variant"
                  name="variant"
                  onchange={handleInput}
                  type="text"
                  value={policyData.variant}
                />
                {errors?.variant && (
                  <p className="text-red-500 mt-1 text-sm">{errors?.variant}</p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Fuel Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full h-10 bg-secondary rounded-md px-3 mt-2"
                  name="fuelType"
                  value={policyData.fuelType}
                  onChange={handleInput}
                  autoComplete="off"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol </option>
                  <option value="diesel">Diesel</option>
                  <option value="EV">Electric Vehicle</option>
                </select>
                {errors?.fuelType && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.fuelType}
                  </p>
                )}
              </div>

              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Vehicle Engine Number <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Vehicle Engine Number"
                  name="vehicleEngineNumber"
                  onchange={handleInput}
                  type="text"
                  value={policyData.vehicleEngineNumber}
                />
                {errors?.vehicleEngineNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.vehicleEngineNumber}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  EW Vehicle Entry Age <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="EW Vehicle Entry Age"
                  name="ewVehicleEntryAge"
                  onchange={handleInput}
                  type="text"
                  value={policyData.ewVehicleEntryAge}
                />
                {errors?.ewVehicleEntryAge && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.ewVehicleEntryAge}
                  </p>
                )}
              </div>

              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Price <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Price"
                  name="price"
                  type="text"
                  value={policyData?.price}
                  onchange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    console.log("Entered Price:", value); // Log the entered value
                    setPolicydata((data) => ({
                      ...data,
                      price: value,
                      productPrice: value,
                    }));
                    calculateAndSetPriceDetails(value, 18, 9, 9);
                  }}
                />
                {errors?.price && (
                  <p className="text-red-500 mt-1 text-sm">{errors?.price}</p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Odometer Reading <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Odomenter Reading"
                  name="odometerReading"
                  onchange={handleInput}
                  type="text"
                  value={policyData?.odometerReading}
                />
                {errors?.odometerReading && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.odometerReading}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  {policyType === "MB"
                    ? "360 Car Protect Extended Warranty Start Date"
                    : "Shine Car Protect Extended warranty Start Date"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Warranty Start Date"
                  name="extWarrantyStartDate"
                  type="text"
                  value={policyData?.extWarrantyStartDate}
                />
                {errors?.extWarrantyStartDate && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.extWarrantyStartDate}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Vehicle First Registration Date
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Warranty Start Date"
                  name="vehicleFirstRegDate"
                  type="date"
                  onchange={handleInput}
                  value={policyData?.vehicleFirstRegDate}
                />
              </div>

              <span className="font-medium">Cooling Off Period :- 30 Days</span>
            </span>
            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Vehicle Manufacturer <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  name="vehicleManufacturer"
                  type="text"
                  value={policyData.vehicleManufacturer}
                />
                {errors?.vehicleManufacturer && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.vehicleManufacturer}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">Manufacturing year </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Manufacturing year"
                  name="manufacturingYear"
                  onchange={handleInput}
                  type="number"
                  value={policyData.manufacturingYear}
                />
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Vehicle Identification Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Ex Showroom Price "
                  name="vehicleIdNumber"
                  onchange={handleInput}
                  type="text"
                  value={policyData.vehicleIdNumber}
                />
                {errors?.vehicleIdNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.vehicleIdNumber}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Vehicle Registration Number{" "}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Vehicle Registration Number"
                  name="vehicleRegNumber"
                  onchange={handleInput}
                  type="text"
                  value={policyData.vehicleRegNumber}
                />
                {errors?.vehicleRegNumber && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.vehicleRegNumber}
                  </p>
                )}
              </div>

              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Vehicle Purchase Date <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Vehicle Registration Number"
                  name="vehiclePurchaseDate"
                  onchange={handleInput}
                  type="date"
                  id="date"
                  max={maxDate}
                  value={policyData.vehiclePurchaseDate}
                />
                {errors?.vehiclePurchaseDate && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.vehiclePurchaseDate}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Type of Packages <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  name="typeOfPackage"
                  onChange={handlePackageChange}
                  value={policyData.typeOfPackage}
                >
                  <option value="">Select Package</option>
                  {availablePackages.length > 0 ? (
                    availablePackages.map((pkg, index) => (
                      <option key={index} value={pkg.value}>
                        {pkg.label}
                      </option>
                    ))
                  ) : (
                    <option disabled>No packages available</option>
                  )}
                </select>
                {errors?.typeOfPackage && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.typeOfPackage}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Ex-Showroom Price of Vehicle{" "}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Ex Showroom Price "
                  name="exshowroomPrice"
                  onchange={handleInput}
                  type="text"
                  value={policyData.exshowroomPrice}
                />
                {errors?.exshowroomPrice && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.exshowroomPrice}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Hypothecation (Optional)
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Hypothecation"
                  name="hypothecation"
                  onchange={handleInput}
                  type="text"
                  value={policyData.hypothecation}
                />
                {errors?.hypothecation && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.hypothecation}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  {policyType === "MB"
                    ? "360 Car Protect Extended Warranty End Date"
                    : "Shine Car Protect Extended Warranty End Date"}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Extended Warranty End Date"
                  name="extWarrantyEndDate"
                  type="text"
                  value={policyData.extWarrantyEndDate}
                />
                {errors?.extWarrantyEndDate && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.extWarrantyEndDate}
                  </p>
                )}
              </div>
            </span>
          </div>

          <p className="text-[20px] font-head font-semibold pt-10">
            Customer Billing Details
          </p>
          <div className="flex md:flex-row sm:flex-row flex-col font-body md:gap-12 sm:gap-12">
            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Product <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="product"
                  name="product"
                  type="text"
                  value={policyData.product}
                  handleInput={handleInput}
                  disabled={policyType === "MG" || policyType === "MB"}
                />
                {errors?.product && (
                  <p className="text-red-500 mt-1 text-sm">{errors?.product}</p>
                )}
              </div>
              {policyType === "MB" && (
                <div className="pt-3 pb-2">
                  <label className="font-semibold">
                    CGST @9% <span className="text-red-500">*</span>
                  </label>
                  <InputField
                    className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                    placeholder="CGST"
                    name="sgst"
                    type="text"
                    value={policyData.cgst}
                    disabled={policyType === "MB"}
                  />
                  {errors?.cgst && (
                    <p className="text-red-500 mt-1 text-sm">{errors?.cgst}</p>
                  )}
                </div>
              )}
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  {policyType === "MB" ? "IGST" : "GST"} @ 18%{" "}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="IGST"
                  name="gst"
                  type="text"
                  value={policyData.gst}
                />
                {errors?.gst && (
                  <p className="text-red-500 mt-1 text-sm">{errors?.gst}</p>
                )}
              </div>

              <div className="pt-3 pb-2">
                <label className="font-semibold">Total Price In Words</label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Total price in words"
                  name="totalPriceInWords"
                  type="text"
                  value={policyData.totalPriceInWords}
                  onchange={handleInput}
                />
              </div>
            </span>

            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Product Price <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Product Price"
                  name="productPrice"
                  type="text"
                  value={policyData.productPrice}
                />
                {errors?.productPrice && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.productPrice}
                  </p>
                )}
              </div>
              {policyType === "MB" && (
                <div className="pt-3 pb-2">
                  <label className="font-semibold">
                    SGST @9% <span className="text-red-500">*</span>
                  </label>
                  <InputField
                    className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                    placeholder="SGST"
                    name="sgst"
                    type="text"
                    value={policyData.sgst}
                    disabled={policyType === "MB"}
                  />
                  {errors?.sgst && (
                    <p className="text-red-500 mt-1 text-sm">{errors?.sgst}</p>
                  )}
                </div>
              )}
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Grand Total Price (incl. Taxes){" "}
                  <span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Extended Warranty End Date"
                  name="totalPrice"
                  type="text"
                  value={policyData.totalPrice}
                />
                {errors?.totalPrice && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.totalPrice}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">
                  Transaction Id<span className="text-red-500">*</span>
                </label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Transaction Id"
                  name="transactionId"
                  type="text"
                  value={policyData.transactionId}
                  onchange={handleInput}
                />
                {errors?.transactionId && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors?.transactionId}
                  </p>
                )}
              </div>
            </span>
          </div>

          <div className=" mt-12 mb-20">
            <button
              type="submit"
              className="rounded-md px-6 py-2 bg-primary text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PolicyComponenet;

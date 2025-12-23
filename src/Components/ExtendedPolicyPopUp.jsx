import React, { useEffect, useState } from "react";
import InputField, { FileUpload, MultiSelectInput } from "./Input";
import { extendedAMC } from "../features/AMCapi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../Util/fireBase";

import { v4 as uuidv4 } from "uuid";
import { upcomingServiceOpt } from "../data";
import { fetchamcLists } from "../features/amcSlice";
import { useDispatch } from "react-redux";
export const ExtendedPolicyPopUp = ({ isPopUpOpen, closePopUp, item }) => {
  const [formData, setFormData] = useState({
    extendedPolicyPeriod: "",
    additionalPrice: "",
    validDate: "",
    validMileage: "",
    paymentCopyProof: "",
    upcomingPackage: [],
  });
  const dispatch = useDispatch();
  // Handle input updates
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      // Auto update Valid Date when extendedPolicyPeriod changes
      if (name === "extendedPolicyPeriod" && value) {
        const baseDate = new Date(item?.vehicleDetails?.agreementStartDate);

        if (!isNaN(baseDate)) {
          const newDate = new Date(
            baseDate.setFullYear(baseDate.getFullYear() + Number(value))
          );
          updatedData.validDate = newDate.toISOString().split("T")[0]; // format YYYY-MM-DD
        }
      }

      return updatedData;
    });
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

      setFormData((prevData) => ({
        ...prevData,
          paymentCopyProof: downloadURL,
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

    
        setFormData((prevData) => ({
          ...prevData,
          paymentCopyProof: "",
        }));
      
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting file:", error);
      // toast.error("Error deleting file. Please try again.");
    }
  };

  useEffect(() => {
    if (isPopUpOpen && item) {
      setFormData({
        extendedPolicyPeriod:
          item?.extendedPolicy?.[item?.extendedPolicy.length - 1]
            ?.extendedPolicyPeriod || "",
        additionalPrice:
          item?.extendedPolicy?.[item?.extendedPolicy.length - 1]
            ?.additionalPrice || "",
        paymentCopyProof:
          item?.extendedPolicy?.[item?.extendedPolicy.length - 1]
            ?.paymentCopyProof || "",
        validDate:
          item?.extendedPolicy?.[item?.extendedPolicy.length - 1]?.validDate ||
          item?.vehicleDetails?.agreementValidDate ||
          "",
        validMileage:
          item?.extendedPolicy?.[item?.extendedPolicy.length - 1]
            ?.validMileage ||
          item?.vehicleDetails?.agreementValidMilage ||
          "",
        upcomingPackage:
          item?.extendedPolicy?.[item?.extendedPolicy.length - 1]
            ?.upcomingPackage ||
          item?.vehicleDetails?.custUpcomingService ||
          [],
      });
    } else if (isPopUpOpen) {
      // Reset when popup opens with no existing data
      setFormData({
        extendedPolicyPeriod: "",
        additionalPrice: "",
        paymentCopyProof: "",
        validDate: "",
        validMileage: "",
      });
    }
  }, [isPopUpOpen, item]);
  useEffect(() => {
    // console.log("Existing Data:", item?.vehicleDetails?.custUpcomingService);
    // console.log("Form Value Before Set:", formData.upcomingPackage);
  }, [item]);

  const existingServices = [
    ...(item?.extendedPolicy?.upcomingPackage || []),
    ...(item?.vehicleDetails?.custUpcomingService || []),
  ];
  const filteredOptions = upcomingServiceOpt.filter(
    (opt) => !existingServices?.includes(opt.value)
  );

  const latestExtendedPolicy =
  item?.extendedPolicy
    ?.slice() // avoid mutating original array
    ?.sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    )[0];

const latestStatus = latestExtendedPolicy?.extendedStatus;

const validateForm = () => {
  const {
    extendedPolicyPeriod,
    additionalPrice,
    validDate,
    validMileage,
    paymentCopyProof,
    upcomingPackage,
  } = formData;

  if (!extendedPolicyPeriod) {
    toast.error("Extended Policy Period is required");
    return false;
  }

  if (!additionalPrice) {
    toast.error("Additional Price is required");
    return false;
  }

  if (!validDate) {
    toast.error("Valid Date is required");
    return false;
  }

  if (!validMileage) {
    toast.error("Valid Mileage is required");
    return false;
  }

  if (!paymentCopyProof) {
    toast.error("Payment Copy Proof is required");
    return false;
  }

  if (!Array.isArray(upcomingPackage) || upcomingPackage.length === 0) {
    toast.error("Please select at least one Upcoming Package");
    return false;
  }

  return true;
};
  // Handle form submit
 const handleSubmit = async (e) => {
  e.preventDefault();


  if (!validateForm()) return;

  try {
    const payload = {
      extendedPolicyPeriod: formData.extendedPolicyPeriod,
      additionalPrice: formData.additionalPrice,
      validDate: formData.validDate,
      validMileage: formData.validMileage,
      paymentCopyProof: formData.paymentCopyProof,
      upcomingPackage: formData.upcomingPackage,
      edit: latestStatus === "pending",
    };

    const res = await extendedAMC(
      payload,
      item?.vehicleDetails?.vinNumber
    );

    toast.success(res?.message || "Submitted successfully");

    // Reset form
    setFormData({
      extendedPolicyPeriod: "",
      additionalPrice: "",
      validDate: "",
      validMileage: "",
      paymentCopyProof: "",
      upcomingPackage: [],
    });

    // Refresh AMC list
    dispatch(
      fetchamcLists({
        page: 1,
        perPage: 10,
        searchTerm: null,
        userId: null,
        status: false,
      })
    );

    closePopUp();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong"
    );
    console.log("Error:", error);
  }
};

// console.log(latestStatus)
  return (
    <>
      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center popup-backdrop z-50 sm:px-52 px-6">
          <div
            className="bg-white pb-9 rounded-lg md:w-full w-full relative p-9 app-open-animation 
       max-h-[90vh] overflow-y-auto"
          >
            <span
              className="cursor-pointer text-[25px] absolute right-3 top-2"
              onClick={closePopUp}
            >
              <RxCross2 />
            </span>
            <p className="text-center font-DMsans text-black font-semibold text-[20px]">
              Extended Policy
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                {/* Titles + Inputs */}

                <div>
                  <label className="font-semibold">
                    Extended Policy Period
                  </label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="extendedPolicyPeriod"
                    value={formData.extendedPolicyPeriod}
                    onchange={handleChange}
                    placeholder="Enter Years"
                    className="w-full h-12 px-3 mt-1 bg-[#f1f1f1] rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold">Additional Price</label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="additionalPrice"
                    value={formData.additionalPrice}
                    onchange={handleChange}
                    placeholder="₹ Amount"
                    className="w-full h-12 px-3 mt-1 bg-[#f1f1f1] rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Current Agreement Period
                  </label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    value={item.vehicleDetails.agreementPeriod || ""}
                    disabled
                    className="w-full h-12 px-3 mt-1 bg-gray-200 rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold">Start Date</label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    value={item.vehicleDetails.agreementStartDate || ""}
                    disabled
                    className="w-full h-12 px-3 mt-1 bg-gray-200 rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold">Start Mileage</label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    value={item.vehicleDetails.agreementStartMilage}
                    disabled
                    className="w-full h-12 px-3 mt-1 bg-gray-200 rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold">Valid Date</label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="validDate"
                    value={formData.validDate}
                    className="w-full h-12 px-3 mt-1 bg-[#f1f1f1] rounded-md"
                    disabled
                  />
                </div>

                <div>
                  <label className="font-semibold">Valid Mileage</label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="validMileage"
                    value={formData.validMileage}
                    onchange={handleChange}
                    className="w-full h-12 px-3 mt-1 bg-[#f1f1f1] rounded-md"
                  />
                </div>
                <div>
                  <label className="font-semibold">
                    Previously Service Offered
                  </label>{" "}
                  <span className="text-red-500">*</span>
                  <div className="w-full h-auto px-3 flex items-center mt-1 bg-[#f1f1f1] rounded-md">
                    {[
                      ...(item?.extendedPolicy?.upcomingPackage || []),
                      ...(item?.vehicleDetails?.custUpcomingService || []),
                    ].length > 0
                      ? [
                          ...(item?.extendedPolicy?.upcomingPackage || []),
                          ...(item?.vehicleDetails?.custUpcomingService || []),
                        ].join(", ")
                      : "No data"}
                  </div>
                </div>
                {/* MULTI SELECT */}
                <MultiSelectInput
                  label="Service Offered"
                  name="upcomingPackage"
                  value={formData.upcomingPackage}
                  onChange={handleChange}
                  options={filteredOptions}
                />
              </div>

              <div>
                <FileUpload
                  label="Payment Copy Proof"
                  name="paymentCopyProof"
                  fileUrl={formData.paymentCopyProof}
                  onFileSelect={(f) => handleFileSelect("paymentCopyProof", f)}
                  deleteFile={() => deleteFile(formData.paymentCopyProof)}
                  imp={true}
                />
              </div>

              <button className="w-28 bg-primary text-white py-2 rounded-lg mt-6">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

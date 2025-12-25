import React, { useState } from "react";
import InputField, { FileUpload, MultiSelectInput } from "../Components/Input";
import { extendedAMCOpen, getAMCbyId, getAMCbyIdPublic } from "../features/AMCapi";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../Util/fireBase";
import { useEffect } from "react";
import { upcomingServiceOpt } from "../data";
import { useNavigate } from "react-router-dom";

export const ExtendedPolicyOpenForm = () => {
  const [formData, setFormData] = useState({
    extendedPolicyPeriod: "",
    additionalPrice: "",
    validDate: "",
    validMileage: "",
    paymentCopyProof: "",
    upcomingPackage: [],
    vinNumber: "",
    salesTeamEmail: "",
  });
  const [item, setItem] = useState(null);
  const [vinVerified, setVinVerified] = useState(false);
  const [loadingVin, setLoadingVin] = useState(false);
  const navigate = useNavigate();
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

  const validateFinalSubmit = () => {
    if (!vinVerified) {
      toast.error("Please verify VIN number first");
      return false;
    }

    if (!formData.extendedPolicyPeriod) {
      toast.error("Extended Policy Period is required");
      return false;
    }

    if (!formData.additionalPrice) {
      toast.error("Additional Price is required");
      return false;
    }

    if (!formData.validDate) {
      toast.error("Valid Date is required");
      return false;
    }

    if (!formData.validMileage) {
      toast.error("Valid Mileage is required");
      return false;
    }

    if (!formData.paymentCopyProof) {
      toast.error("Payment Copy Proof is required");
      return false;
    }

    if (
      !Array.isArray(formData.upcomingPackage) ||
      formData.upcomingPackage.length === 0
    ) {
      toast.error("Please select at least one Upcoming Package");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFinalSubmit()) return;

    const uniqueUpcomingPackage = [...new Set(formData.upcomingPackage)];

    const finalData = {
      ...formData,
      upcomingPackage: uniqueUpcomingPackage,
      openForm: true,
    };

    try {
      const res = await extendedAMCOpen(finalData, formData.vinNumber);

      toast.success(res?.message || "Submitted successfully");

      setFormData({
        extendedPolicyPeriod: "",
        additionalPrice: "",
        paymentCopyProof: "",
        vinNumber: "",
        validDate: "",
        validMileage: "",
        salesTeamEmail: "",
        upcomingPackage: [],
      });

      setVinVerified(false);
      navigate("/extended-amc-submitted");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  const submitVinVerify = async () => {
    if (!formData.vinNumber) {
      return toast.error("Please enter VIN number");
    }

    setLoadingVin(true);

    try {
      const res = await getAMCbyIdPublic(formData?.vinNumber);
      const fetchedData = res?.data;

      if (!fetchedData) {
        setVinVerified(false);
        setItem(null);
        toast.error("VIN doesn't exist or invalid!");
        return;
      }

      setItem(fetchedData);
      setVinVerified(true);
      toast.success("VIN Verified Successfully!");

    
      setFormData((prev) => ({
        ...prev,
        validMileage: fetchedData?.vehicleDetails?.agreementValidMilage || "",
        extendedPolicyPeriod: "",
         upcomingPackage: [],
      }));
    } catch (error) {
      setVinVerified(false);
      setItem(null);
      console.error(error);
      toast.error("Invalid VIN number or not found");
    } finally {
      setLoadingVin(false);
    }
  };



const extendedPolicies = Array.isArray(item?.extendedPolicy)
  ? item.extendedPolicy.flatMap((ep) =>
      Array.isArray(ep?.upcomingPackage) ? ep.upcomingPackage : []
    )
  : [];


console.log(extendedPolicies)
const usedServices = new Set([
  ...(Array.isArray(item?.vehicleDetails?.custUpcomingService)
    ? item.vehicleDetails.custUpcomingService
    : []),
  ...extendedPolicies,
]);


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center popup-backdrop z-50 sm:px-52 px-6">
        <div
          className="bg-white pb-9 rounded-lg md:w-full w-full relative p-9 app-open-animation 
       max-h-[90vh] overflow-y-auto"
        >
          <p className="text-center font-DMsans text-black font-semibold text-[16px]">
            Extend AMC Policy
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {/* Titles + Inputs */}
              <div>
                <label className="font-semibold">Verify Vin Number</label>
                <span className="text-red-500">*</span>

                <InputField
                  name="vinNumber"
                  value={formData.vinNumber}
                  onchange={handleChange}
                  className="w-full h-12 px-3 mt-3 bg-[#f1f1f1] rounded-md"
                  placeholder="Enter Vin number"
                />

                <button
                  type="button"
                  onClick={submitVinVerify}
                  disabled={loadingVin}
                  className={`text-white text-sm px-4 py-2 mt-3 rounded-md ${
                    loadingVin ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {loadingVin ? "Verifying..." : "Verify VIN"}
                </button>
              </div>

              <div>
                <label className="font-semibold">Extended Policy Period</label>{" "}
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
                  value={item?.vehicleDetails?.agreementPeriod || ""}
                  disabled
                  className="w-full h-12 px-3 mt-1 bg-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="font-semibold">Start Date</label>{" "}
                <span className="text-red-500">*</span>
                <InputField
                  value={item?.vehicleDetails?.agreementStartDate || ""}
                  disabled
                  className="w-full h-12 px-3 mt-1 bg-gray-200 rounded-md"
                />
              </div>

              <div>
                <label className="font-semibold">Start Mileage</label>{" "}
                <span className="text-red-500">*</span>
                <InputField
                  value={item?.vehicleDetails?.agreementStartMilage}
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
                 <div className="w-full h-auto px-3 flex items-center mt-1 bg-[#f1f1f1] rounded-md">
                      {
                        /* 1️⃣ Latest Extended Policy (n-1) */
                        Array.isArray(item?.extendedPolicy) &&
                        item.extendedPolicy.length > 0 &&
                        Array.isArray(
                          item.extendedPolicy[item.extendedPolicy.length - 1]
                            ?.upcomingPackage
                        ) &&
                        item.extendedPolicy[item.extendedPolicy.length - 1]
                          .upcomingPackage.length > 0
                          ? item.extendedPolicy[
                              item.extendedPolicy.length - 1
                            ].upcomingPackage
                              .map((s) => s?.value ?? s)
                              .join(", ")
                          : /* 2️⃣ Vehicle services ONLY when no extended policy exists */
                          (!Array.isArray(item?.extendedPolicy) ||
                              item.extendedPolicy.length === 0) &&
                            Array.isArray(
                              item?.vehicleDetails?.custUpcomingService
                            ) &&
                            item.vehicleDetails.custUpcomingService.length > 0
                          ? item.vehicleDetails.custUpcomingService.join(", ")
                          : /* 3️⃣ Fallback */
                            "No data"
                      }
                    </div>

                </div>
                <div className="mt-6">
                  <label className="font-semibold">Sales Team Email</label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="salesTeamEmail"
                    type="email"
                    value={formData.salesTeamEmail}
                    onchange={handleChange}
                    placeholder="Enter sales team email"
                    className="w-full h-12 px-3 mt-1 bg-[#f1f1f1] rounded-md"
                  />
                </div>
              </div>
              {/* MULTI SELECT */}
              <MultiSelectInput
                label="Service Offered"
                name="upcomingPackage"
                value={formData.upcomingPackage}
                onChange={handleChange}
                      options={upcomingServiceOpt.filter(
                (opt) => !usedServices.has(opt.value)
              )}
              />
            </div>

            <div className="mt-6">
              <FileUpload
                label="Payment Copy Proof"
                name="paymentCopyProof"
                fileUrl={formData.paymentCopyProof}
                imp={true}
                onFileSelect={(f) => handleFileSelect("paymentCopyProof", f)}
                deleteFile={() =>
                  deleteFile(formData.paymentCopyProof, "paymentCopyProof")
                }
              />
            </div>

            <button className="w-28 bg-primary text-white py-2 rounded-lg mt-6">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

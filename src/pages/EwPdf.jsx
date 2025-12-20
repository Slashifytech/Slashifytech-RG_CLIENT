import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  carVector,
  coverageOne,
  coverageTwo,
  faq,
  generalCond,
  generalTerms,
  motorWarranty,
  pdfHeaderFour,
  pdfHeaderOne,
  pdfHeaderThree,
  pdfHeaderTwo,
  topHeaderPdf,
  typeThreePageFour,
  typeTwoPageFive,
  typeTwoPageFour,
} from "../assets";
import { useLocation } from "react-router-dom";
import { getEwId } from "../features/EwApi";
import html2pdf from "html2pdf.js";
import Loader from "../Components/Loader";

const EwPdf = forwardRef(({ id }, ref) => {
  const location = useLocation();
  const pdfRef = useRef();
  const [data, setData] = useState();
  const ewId = id ? id : location?.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEwId(ewId, null);
        setData(res?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [ewId]);

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${data?.vehicleDetails?.vinNumber}_EW_Policy` || "Ew_Policy",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a2", orientation: "portrait" },
      pagebreak: { mode: "avoid-all" },
    };
    html2pdf().from(input).set(opt).save();
  };

  useImperativeHandle(ref, () => ({
    handleDownloadPDF,
  }));
  useEffect(() => {
    if (data) {
      setTimeout(() => setData({ ...data }), 100);
    }
  }, [data]);

  const evModels = ["Windsor", "Comet", "ZS EV"];
  const nonEvModels = ["Hector", "Astor", "Gloster"];
  const allModels = [...evModels,...nonEvModels];
  const pageTypeAData = useMemo(() => {
    const comprehensiveData = data?.ewDetails?.planSubType === "Comprehensive";
    
    if (comprehensiveData && data?.ewDetails?.planType === "Type A" || comprehensiveData && data?.ewDetails?.planType === "Type B" ) {
      if (evModels.some(model => data?.vehicleDetails?.vehicleModel.includes(model))) {
        return "defaultPages";
      } else if (nonEvModels.some(model => data?.vehicleDetails?.vehicleModel.includes(model))) {
        return "typeTwoPages";
      }
    }
    return null;
  }, [data]);
  const pageTypeBData = useMemo(() => {
    const comprehensiveData = data?.ewDetails?.planSubType === "Comprehensive";
    const standardData = data?.ewDetails?.planSubType === "Standard";
  
    if (comprehensiveData && data?.ewDetails?.planType === "Type B" || comprehensiveData && data?.ewDetails?.planType === "Type A" ) {
      if (nonEvModels.some(model => data?.vehicleDetails?.vehicleModel.includes(model))) {
        return "typeTwoPages";
      }
    } else if (standardData && data?.ewDetails?.planType === "Type B") {
      if (allModels.some(model => data?.vehicleDetails?.vehicleModel.includes(model))) {
        return "typeThreePages";
      }
    }
    return null;
  }, [data]);
console.log(pageTypeAData, pageTypeBData, "dataCheck");
  if (!data) {
    return (
      <div className="mt-64 flex justify-center md:ml-32 sm:ml-32">
        <Loader />
      </div>
    );
  }
  return (
    <div ref={pdfRef} className={` bg-white p-6 border  shadow-md `}>
      <img
        src={topHeaderPdf}
        alt="img"
        className={`w-full mt-[24%] ${
          location.pathname === "/ew-view" ? "hidden " : "block"
        }`}
      />
      <div
        className={`border border-black pt-6 px-6 mb-6 ${
          location.pathname === "/ew-view" ? "hidden" : "block"
        }`}
      >
        The contract under <b>policy number</b> {data?.customId} has been
        concluded based on the details and declarations provided by you. The
        summarized transcript of the same is outlined below. You are required to
        review and confirm the accuracy of this information. <br />
        <br />
        <p>
          If you identify any discrepancies, require modifications, or disagree
          with any aspect of the details mentioned, you must notify us within 15
          days from the date of receipt of this document. Failure to respond
          within this timeframe will be considered as your acceptance of the
          accuracy of the provided details.
        </p>
        <br />
        <p>
          Please be advised that the statements and disclosures contained within
          this transcript serve as the foundation for the issuance of this
          policy. It is imperative that all material facts have been truthfully
          disclosed, as any misrepresentation, omission, or non-disclosure of
          critical information will render the policy void from inception. In
          such cases, no claims will be entertained, and any paid amount may be
          forfeited
        </p>
        <img src={carVector} alt="img" loading="lazy" className="mb-[4%]" />
      </div>
      <div className="w-full block mt-[15%]">
        <img
          src={pdfHeaderOne}
          alt="header"
          loading="lazy"
          className={`${location.pathname === "/ew-view" ? "hidden" : "block"}`}
        />
      </div>
      {/* CUSTOMER DETAILS */}
      <div className="bg-[#1F2A44] text-white font-bold p-2 text-sm uppercase tracking-widest mt-14 pb-4">
        Customer Details
      </div>
      <div className="p-4 space-y-2 bg-white">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center mt-3">
            <span className="font-semibold w-44 ">Name :</span>{" "}
            <span className="flex-1 border border-gray-400 p-1  bg-blue-100 h-10  mt-3">
              {data?.customerDetails?.customerName}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-44 ">Address :</span>{" "}
            <span className="flex-1 border border-gray-400 p-1  bg-blue-100 h-10  mt-3">
              {data?.customerDetails?.address}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full ">
          <div className="flex items-center w-full mt-6">
            <span className="font-semibold w-44">City :</span>
            <div className="border border-gray-400 p-1  bg-blue-100 h-10 flex-1 flex items-center">
              {data?.customerDetails?.city}
            </div>
          </div>

          <div className="flex items-center w-full">
            <span className="font-semibold w-44 ">State :</span>
            <span className="border border-gray-400 p-1  bg-blue-100 h-10  mt-3 flex-1 w-3/4">
              {data?.customerDetails?.state}
            </span>
          </div>
          <div className="flex items-center w-full">
            <span className="font-semibold w-44 ">Pin Code :</span>
            <span className="border border-gray-400 p-1  bg-blue-100 h-10  mt-3 flex-1 w-3/4">
              {data?.customerDetails?.zipCode}
            </span>
          </div>
          <div className="flex items-center w-full">
            <span className="font-semibold w-44 ">Mobile No. :</span>
            <span className="border border-gray-400 p-1  bg-blue-100 h-10  mt-3 flex-1 w-3/4">
              {data?.customerDetails?.contact}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="font-semibold w-44 ">Email :</span>{" "}
            <span className="flex-1 border border-gray-400 p-1  bg-blue-100 h-10  mt-3">
              {data?.customerDetails?.email}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-44 ">DOB :</span>
            <span className="flex-1 border border-gray-400 p-1  bg-blue-100 h-10  mt-3">
              {data?.customerDetails?.dob}
            </span>
          </div>
        </div>
      </div>
      {/* EXTENDED WARRANTY POLICY DETAILS */}
      <div className="bg-[#1F2A44] text-white font-bold p-2 text-sm uppercase tracking-widest mt-10 pb-4">
        Extended Warranty Policy Details
      </div>
      <div className="flex items-center mt-11">
        <span className="font-semibold w-44 "> Policy Number :</span>{" "}
        <span className="flex-1 border border-gray-400 p-1  bg-blue-100 h-10  mt-3">
          {data?.customId}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full mt-3">
        <div className="flex items-center w-full">
          <span className="font-semibold w-44  ">Policy Issue Date:</span>
          <span className="border border-gray-400 p-1  bg-blue-100 h-10 mt-3 flex-1 w-2/3">
            {data?.ewDetails?.policyDate}
          </span>
        </div>
        <div className="flex items-center w-full">
          <span className="font-semibold w-44  ">Warranty Amount :</span>
          <span className="border border-gray-400 p-1  bg-blue-100 h-10 mt-3 flex-1 w-2/3">
            {data?.ewDetails?.warrantyAmount}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full mt-3">
        <div className="flex items-center w-full">
          <span className="font-semibold w-44  ">Plan Type :</span>
          <span className="border border-gray-400 p-1  bg-blue-100 h-10 mt-3 flex-1 w-2/3">
            {data?.ewDetails?.planType}
          </span>
        </div>
        <div className="flex items-center w-full">
          <span className="font-semibold w-44  ">Plan Sub Type :</span>
          <span className="border border-gray-400 p-1  bg-blue-100 h-10 mt-3 flex-1 w-2/3">
            {data?.ewDetails?.planSubType}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="font-semibold w-44 ">Registration Type :</span>{" "}
        <span className="flex-1 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.ewDetails?.registrationType}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full mt-3">
        <div className="flex items-center w-full">
          <span className="font-semibold w-44  ">Kilometers :</span>
          <span className="border border-gray-400 p-1  bg-blue-100 h-10 mt-3 flex-1 w-2/3">
            {data?.ewDetails?.startKm}
          </span>
        </div>
        <div className="flex items-center w-full">
          <span className="font-semibold w-44  "> KM To :</span>
          <span className="border border-gray-400 p-1  bg-blue-100 h-10 mt-3 flex-1 w-1/2">
            {data?.ewDetails?.endKm} KM
          </span>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="font-semibold w-44  ">Status :</span>{" "}
        <span className="flex-1  border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.ewDetails?.ewStatus}
        </span>
      </div>
      {/* VEHICLES DETAILS */}
      <div className="bg-[#1F2A44] text-white font-bold p-2 text-sm uppercase tracking-widest mt-16 pb-4">
        Vehicles Details
      </div>
      <div
        className={`flex items-center  ${
          location.pathname === "/ew-view" ? "mt-6" : "mt-[60%] "
        }`}
      >
        <span className="font-semibold w-44  ">Registration Number :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.registrationNumber}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Date of Sale :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.saleDate}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Present Kilometer :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.presentKm}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Date of Delivery:</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.deliveryDate}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Warranty Limit :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.warrantyLimit}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Model :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.vehicleModel}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Fuel Type :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.fuelType}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Vin Number/ Chesis No. :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.vinNumber}
        </span>
      </div>{" "}
      <div className="flex items-center">
        <span className="font-semibold w-44  ">Engine Number :</span>{" "}
        <span className="flex-1 ml-3 border border-gray-400 p-1  bg-blue-100 h-10 mt-3">
          {data?.vehicleDetails?.engineNumber}
        </span>
      </div>
      <hr className="border border-black mt-8" />
      <p className="pt-9 font-bold">
        RSA (Roadside Assistance) Coverage Details:
      </p>
      <p className="mt-6  ">
        One towing service per policy year from the breakdown location to the
        nearest authorized OEM service center, up to a distance of 50 km. <br />
        Onsite repair assistance, including battery jump-start, minor repairs,
        tire replacement, and more. <br />
        Toll-Free Number for RSA Assistance: 1800-209-1030.
      </p>
      <div
        className={`${
          location.pathname === "/ew-view" ? "hidden" : "block mt-[100%]"
        }`}
      >
<img
  src={
    pageTypeAData === "defaultPages"
      ? coverageOne
      : pageTypeAData === "typeTwoPages" || pageTypeBData === "typeTwoPages"
      ? typeTwoPageFour
      : pageTypeBData === "typeThreePages"
      ? typeThreePageFour
      : coverageOne
  }
  alt="header"
  loading="lazy"
  className="mt-9"
/>

{pageTypeBData !== "typeThreePages" && (
  <img
    src={pageTypeBData === "typeTwoPages" ? typeTwoPageFive : coverageTwo}
    alt="header"
    loading="lazy"
    className="mt-9"
  />
)}

        <img src={faq} alt="header" loading="lazy" className="pt-[16%] w-[98%]" />
        <img src={motorWarranty} alt="header" loading="lazy" className="mt-9 pt-[4%] w-[98%]" />
        <img src={generalTerms} alt="header" loading="lazy" className="mt-9" />
        <img src={generalCond} alt="header" loading="lazy" className="mt-9" />
      </div>
    </div>
  );
});

export default EwPdf;
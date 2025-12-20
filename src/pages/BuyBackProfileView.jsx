import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { useLocation } from "react-router-dom";
import { fetchbuyBackDataById } from "../features/BuyBackSlice";
import { BiSolidCar } from "react-icons/bi";
import Nav from "./../admin/Nav";
import Header from "./../Components/Header";
import { FaRegIdCard } from "react-icons/fa6";
import { GroupedInput } from "../Components/Input";
import { toast } from "react-toastify";
import { updateBuyBack } from "../features/BuybackApi";
import { TbCircuitSwitchClosed } from "react-icons/tb";

const BuyBackProfileView = () => {
  const { buyBackByIdorStatus } = useSelector((state) => state.buyBack);
  const dispatch = useDispatch();
  const location = useLocation();
  const [buyBackDetails, setBuyBackDetails] = useState({
    deliveryDate: "",
    raamGroupPrice: "",
    marketPrice: "",
    priceDifference: "",
  });
  const [loading, setLoading] = useState();
  const id = location?.state?.id;
  const [errors, setErrors] = useState({});
  const leftFields = [
    {
      name: "deliveryDate",
      type: "date",
      placeholder: "Delivery Date",
      label: "Delivery Date",
      required: true,
    },
    {
      name: "raamGroupPrice",
      type: "number",
      placeholder: "RaamGroup price",
      label: "RammGroup Price",
      required: true,
    },
  ];
  const rightFields = [
    {
      name: "marketPrice",
      type: "number",
      placeholder: "Market Price",
      label: "Market Price",
      required: true,
    },
    {
      name: "priceDifference",
      type: "number",
      placeholder: "Price Difference",
      label: "Price Difference",
      required: true,
    },
  ];
  const handleInput = (e) => {
    const { name, value } = e.target;
  
    setBuyBackDetails((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };
  
      if (updatedState.raamGroupPrice && updatedState.marketPrice) {
        updatedState.priceDifference =
        parseFloat(updatedState.raamGroupPrice || 0)-
          parseFloat(updatedState.marketPrice || 0) ;
      }
  
      return updatedState;
    });
  };
  
  useEffect(() => {
    if (buyBackByIdorStatus?.data?.vehicleDetails?.deliveryDate) {
      setBuyBackDetails((prevState) => ({
        ...prevState,
        deliveryDate: buyBackByIdorStatus.data.vehicleDetails.deliveryDate,
      }));
    }
  }, [buyBackByIdorStatus]);
  const validateForm = () => {
    let newErrors = {};
    Object.keys(buyBackDetails).forEach((key) => {
      if (!buyBackDetails[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", buyBackDetails);
    }
  
  try{
   const res =  await updateBuyBack({buyBackDetails: buyBackDetails}, buyBackByIdorStatus?.data?._id)
   dispatch(fetchbuyBackDataById({ id }));
   toast.success(res?.message || "Added Buyback details ")
  }catch(error){
    console.log(error)
    toast.error(error?.message || "Something went wrong")
  }};
  useEffect(() => {
    if (id) {
      dispatch(fetchbuyBackDataById({ id }));
    }
  }, [id]);

  return (
    <>
      <Header customLink="/agent/shortlist" />
      <div>
        <span className="fixed overflow-y-scroll scrollbar-hide bg-white">
          <Nav />
        </span>
      </div>

      <div className="md:ml-[19%] sm:ml-[26.5%] mt-20">
        {loading && (
          <div className="w-full ml-[53%] mt-12">
            <Loader />
          </div>
        )}

        {!loading && !buyBackByIdorStatus && (
          <div className="text-center text-lg font-semibold text-red-500">
            Profile Not Found
          </div>
        )}

        {!loading && buyBackByIdorStatus && (
          <div className="mr-6">
            <div className="bg-white rounded-md px-6 py-4 font-poppins mt-28 ">
              <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
                <span className="flex flex-row gap-4 items-center pb-3">
                  <span className="text-[24px]">
                    <FaRegIdCard />
                  </span>
                  <span className="font-semibold text-[22px]">
                    Customer Personal Information
                  </span>
                </span>
              </div>
              <div className="flex flex-row w-full justify-between mt-6">
                <span className="w-1/2 flex flex-col text-[15px]">
                  <span className="font-light">Customer Name </span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.customerName ||
                      "NA"}
                  </span>
                  <span className="font-light mt-4">Email</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.email || "NA"}
                  </span>
                  <span className="font-light mt-4">Pan Number</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.pan || "NA"}
                  </span>
                  <span className="font-light mt-4">Zip Code</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.zipCode ||
                      "NA"}
                  </span>
                </span>
                <span className="w-1/2 flex flex-col text-[15px]">
                  <span className="font-light">Address </span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.address ||
                      "NA"}
                  </span>
                  <span className="font-light mt-4">Phone Number</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.contact ||
                      "NA"}
                  </span>

                  <span className="font-light mt-4">Gst Number</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.customerGst ||
                      "NA"}
                  </span>
                  <span className="font-light mt-4">State Code</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.customerDetails?.stateCode ||
                      "NA"}
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-white rounded-md px-6 py-4 font-poppins mt-6 mb-6">
              <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
                <span className="flex flex-row gap-4 items-center pb-3">
                  <span className="text-[24px]">
                    <BiSolidCar />
                  </span>
                  <span className="font-semibold text-[22px]">
                    Vehicle Details
                  </span>
                </span>
              </div>
              <div className="flex flex-row w-full justify-between mt-6">
                <span className="w-1/2 flex flex-col text-[15px]">
                  <span className="font-light mt-4">Model</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails?.vehicleModel ||
                      "NA"}
                  </span>
                  <span className="font-light mt-4">Agreement Start Date</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails
                      ?.agreementStartDate || "NA"}
                  </span>
                  <span className="font-light mt-4">Agreement Valid Date</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails
                      ?.agreementValidDate || "NA"}
                  </span>
                  <span className="font-light mt-4">
                    Location of the Dealer
                  </span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails
                      ?.dealerLocation || "NA"}
                  </span>
                </span>
                <span className="w-1/2 flex flex-col text-[15px]">
                  <span className="font-light">Vin Number </span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails?.vinNumber ||
                      "NA"}
                  </span>
                  <span className="font-light mt-4">Delivery Date</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails?.deliveryDate ||
                      "NA"}
                  </span>{" "}
                  <span className="font-light mt-4">Validity Milage</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails
                      ?.validityMilage || "NA"}
                  </span>
                  <span className="font-light mt-4">Total Amount</span>
                  <span className="font-medium">
                    {buyBackByIdorStatus?.data?.vehicleDetails?.totalPayment ||
                      "NA"}
                  </span>
                </span>
              </div>
            </div>
            {buyBackByIdorStatus?.data?.buyBackDetails && (
              <div className="bg-white rounded-md px-6 py-4 font-poppins mt-6 mb-20">
                <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
                  <span className="flex flex-row gap-4 items-center pb-3">
                    <span className="text-[24px]">
                    <TbCircuitSwitchClosed />

                    </span>
                    <span className="font-semibold text-[22px]">
                      Buy Back Details
                    </span>
                  </span>
                </div>
                <div className="flex flex-row w-full justify-between mt-6">
                  <span className="w-1/2 flex flex-col text-[15px]">
                    <span className="font-light mt-4">Delivery Date</span>
                    <span className="font-medium">
                      {buyBackByIdorStatus?.data?.buyBackDetails
                        ?.deliveryDate || "NA"}
                    </span>

                    <span className="font-light mt-4">RaamGroup Price</span>
                    <span className="font-medium">
                      {buyBackByIdorStatus?.data?.buyBackDetails
                        ?.raamGroupPrice || "NA"}
                    </span>
                  </span>
                  <span className="w-1/2 flex flex-col text-[15px]">
                    <span className="font-light">Market Price of Car</span>
                    <span className="font-medium">
                      {buyBackByIdorStatus?.data?.buyBackDetails?.marketPrice ||
                        "NA"}
                    </span>
                    <span className="font-light mt-4">Price Difference</span>
                    <span className="font-medium">
                      {buyBackByIdorStatus?.data?.buyBackDetails
                        ?.priceDifference || "NA"}
                    </span>{" "}
                  </span>
                </div>
              </div>
            )}

            {!buyBackByIdorStatus?.data?.buyBackDetails && (
              <div className=" rounded-md px-6 py-4 font-poppins mt-6 mb-20">
                <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
                  <span className="flex flex-row gap-4 items-center pb-3">
                    <span className="text-[24px]">
                    <TbCircuitSwitchClosed />

                    </span>
                    <span className="font-semibold text-[22px]">
                      Buy Back Details
                    </span>
                  </span>
                </div>

                <GroupedInput
                  leftFields={leftFields}
                  rightFields={rightFields}
                  stateName={buyBackDetails}
                  errors={errors || {}}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    handleInput({
                      target: {
                        name,
                        value,
                        dataset: { section: "customerDetails" },
                      },
                    });
                  }}
                />
                <div className="flex justify-start mt-9">
                  <span onClick={handleSubmit} className="bg-primary text-white rounded-md cursor-pointer px-6 py-2">Submit</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BuyBackProfileView;

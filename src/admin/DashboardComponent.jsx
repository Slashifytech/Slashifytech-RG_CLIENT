import React, { useEffect, useState } from "react";
import HeaderTab from "./HeaderTabs";
import Nav from "./Nav";
import Header from "../Components/Header";
import Cards from "../Components/AdminComponents/Cards";
import { toast } from "react-toastify";
import { getDashboardData } from "../features/adminApi";
import { graphLine, icon, TwoUser } from "../assets";
import { useSelector } from "react-redux";
import { CustomInput, CustomSelect, SelectInput } from "../Components/Input";
import { locationOption, modelOption } from "../data";
import Loader from "../Components/Loader";

const DashboardComponent = () => {
  const { roleType, agentName, email } = useSelector(
    (state) => state.users.users
  );
  const [loading, setLoading] = useState(true);

  const [amcData, setAmcData] = useState({
    location: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    totalAmc: "",
    totalRevenue: "",
    totalExpense: "",
    vasPriceCount: "",
    partsPriceCount: "",
    labourPriceCount: "",
    serviceTypeAmount: "",
  });
  const [amcAssuredData, setAmcAssuredData] = useState({
    location: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    statsData: "",
    totalAmcAssured: "",
    totalRevenue: "",
    totalExpense: "",
  });
  const [buyBackData, setBuyBackData] = useState({
    location: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    statsData: "",
    totalBuyBack: "",
    totalRevenue: "",
    totalExpense: "",
  });
  const [ewPolicyData, setEwPolicyData] = useState({
    location: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    statsData: "",
    totalEwPolicy: "",
    totalRevenue: "",
  });
  const amcPath = "/amc-stats-data";
  const amcAssuredPath = "/amc-assured-stats";
  const buyBackPath = "/buy-back-stats-data";
  const ewPolicyPath = "/ew-stats";

  const handleInputChange = (e, dataType) => {
    const { name, value } = e.target;

    if (dataType === "amc") {
      setAmcData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (dataType === "buyBack") {
      setBuyBackData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (dataType === "amcAssured") {
      setAmcAssuredData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (dataType === "ewPolicy") {
      setEwPolicyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const getAmcData = async () => {
    try {
      const res = await getDashboardData(
        amcPath,
        amcData.location,
        amcData.vehicleModel,
        amcData.startDate,
        amcData.endDate
      );
      setAmcData((prev) => ({
        ...prev,
        totalAmc: res?.totalamcCount,
        totalRevenue: res?.totalRevenue,
        totalExpense: res?.totalExpense,
        vasPriceCount: res?.totalVasPrice,
        partsPriceCount: res?.totalPartsPrice,
        labourPriceCount: res?.totalLabourPrice,
        serviceTypeAmount: res?.serviceTypeAmount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getAmcAssuredData = async () => {
    try {
      const res = await getDashboardData(
        amcAssuredPath,
        amcAssuredData.location,
        amcAssuredData.vehicleModel,
        amcAssuredData.startDate,
        amcAssuredData.endDate
      );
      console.log(res);

      setAmcAssuredData((prev) => ({
        ...prev,
        totalAmcAssured: res?.totalamcAssured,
        totalRevenue: res?.totalAmcAssuredRevenue,
        totalExpense: res?.totalAmcAssuredExpense,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getBuyBackData = async () => {
    try {
      const res = await getDashboardData(
        buyBackPath,
        buyBackData.location,
        buyBackData.vehicleModel,
        buyBackData.startDate,
        buyBackData.endDate
      );
      setBuyBackData((prev) => ({
        ...prev,
        totalBuyBack: res?.totalBuyBackCount,
        totalRevenue: res?.totalRevenue,
        totalExpense: res?.totalExpense,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getEwData = async () => {
    try {
      const res = await getDashboardData(
        ewPolicyPath,
        ewPolicyData.location,
        ewPolicyData.vehicleModel,
        ewPolicyData.startDate,
        ewPolicyData.endDate
      );
      setEwPolicyData((prev) => ({
        ...prev,
        totalEwPolicy: res?.totalEwCount,
        totalRevenue: res?.totalRevenue,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAmcData();
  }, [
    amcData.endDate,
    amcData.startDate,
    amcData.location,
    amcData.vehicleModel,
  ]);
  useEffect(() => {
    getAmcAssuredData();
  }, [
    amcAssuredData.endDate,
    amcAssuredData.startDate,
    amcAssuredData.location,
    amcAssuredData.vehicleModel,
  ]);

  useEffect(() => {
    getBuyBackData();
  }, [
    buyBackData.endDate,
    buyBackData.startDate,
    buyBackData.location,
    buyBackData.vehicleModel,
  ]);

  useEffect(() => {
    getEwData();
  }, [
    ewPolicyData.endDate,
    ewPolicyData.startDate,
    ewPolicyData.location,
    ewPolicyData.vehicleModel,
  ]);

  const amcCardData = [
    {
      countData: amcData?.totalAmc,
      title: "Total AMC Policies",
      bgImg: graphLine,
      icon: TwoUser,
    },
    {
      countData: amcData?.totalRevenue,
      title: "Total AMC Revenue",
      icon: icon,
    },
    {
      countData: amcData?.totalExpense,
      title: "Total AMC Expense",
      icon: icon,
      isAmcData: true,
      vasPriceCount: amcData?.vasPriceCount,
      partsPriceCount: amcData?.partsPriceCount,
      labourPriceCount: amcData?.labourPriceCount,
      serviceTypeAmount: amcData?.serviceTypeAmount,
    },
  ];

  const amcAssuredCardData = [
    {
      countData: amcAssuredData?.totalAmcAssured,
      title: "Total AMC Assured",
      bgImg: graphLine,
      icon: TwoUser,
    },
    {
      countData: amcAssuredData?.totalRevenue,
      title: "Total AMC Assured Revenue",
      icon: icon,
    },
    {
      countData: amcAssuredData?.totalExpense,
      title: "Total AMC Assured Expense",
      icon: icon,
    },
  ];

  const buyBackCardData = [
    {
      countData: buyBackData?.totalBuyBack,
      title: "Total Buy Back  Policies",
      bgImg: graphLine,
      icon: TwoUser,
    },
    {
      countData: buyBackData?.totalRevenue,
      title: "Total Buy Back Revenue",
      icon: icon,
    },
    {
      countData: buyBackData?.totalExpense,
      title: "Total Buy Back Expense",
      icon: icon,
    },
  ];
  const ewPolicyCardData = [
    {
      countData: ewPolicyData?.totalEwPolicy,
      title: "Total Ew Policies",
      bgImg: graphLine,
      icon: TwoUser,
    },
    {
      countData: ewPolicyData?.totalRevenue,
      title: "Total Ew Policy Revenue",
      icon: icon,
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

 const freeServices = [];
const pmsServices = [];

const serviceData = amcCardData?.[2]?.serviceTypeAmount;
if (serviceData && typeof serviceData === "object") {
  Object.entries(serviceData).forEach(([key, value]) => {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey.includes("free service")) {
      freeServices.push({
        label: key,
        amount: value,
      });
    } 
    else if (
      normalizedKey.includes("preventive") ||
      normalizedKey.includes("(pms)")
    ) {
      pmsServices.push({
        label: key,
        amount: value,
      });
    }
  });
}

  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div>
        <Header />
      </div>

      <div className="ml-0 sm:ml-[28%] md:ml-[20%] mt-20 ">
        <p className="text-[30px] font-bold">Dashboard</p>
        <p className="text-[16px] font-normal">
          Hi, {agentName} welcome back to RaamGroup Portal!
        </p>
      </div>

      {loading ? (
        <div className="mt-28 flex justify-center md:ml-32 sm:ml-32">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center gap-6 sm:ml-[28%] md:ml-[20%] mr-6 mt-6">
            <CustomSelect
              options={locationOption}
              name={"location"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={amcData.location}
              onChange={(e) => handleInputChange(e, "amc")}
              placeholder={"Choose Location"}
            />
            <CustomSelect
              options={modelOption}
              name={"vehicleModel"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={amcData.vehicleModel}
              onChange={(e) => handleInputChange(e, "amc")}
              placeholder={"Choose Model"}
            />
            <CustomInput
              type={"date"}
              name={"startDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={amcData.startDate}
              onChange={(e) => handleInputChange(e, "amc")}
            />
            <CustomInput
              type={"date"}
              name={"endDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={amcData.endDate}
              onChange={(e) => handleInputChange(e, "amc")}
            />
          </div>

          <div className="ml-8 sm:ml-[33%] md:ml-[20%] md:w-[70%] gap-9 pt-3 pb-6 grid grid-cols-3">
            {amcCardData.map((item, index) => (
              <Cards
                key={index}
                countData={item.countData}
                titleData={item.title}
                bgImg={item.bgImg}
                icon={item.icon}
                vasPriceCount={item.vasPriceCount}
                partsPriceCount={item.partsPriceCount}
                labourPriceCount={item.labourPriceCount}
                isAmcData={item.isAmcData}
                // serviceTypeAmount={item.serviceTypeAmount}
              />
            ))}
          </div>
          <div className="max-w-4xl border  rounded-md p-6 bg-white ml-8 sm:ml-[33%] md:ml-[20%] md:w-[70%] mb-9">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white text-sm">
                📄
              </div>
              <h2 className="text-lg font-semibold text-gray-700">
                AMC Expenses by Customer Upcoming Service Wise
              </h2>
            </div>
            {console.log("test", pmsServices  )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <ul className="space-y-2">
    {freeServices.length > 0 ? (
      freeServices.map((item, index) => (
        <li key={index}>
          {item.label} – <span className="font-semibold">{item.amount}</span>
        </li>
      ))
    ) : (
      <li className="text-gray-400">No Free Services</li>
    )}
  </ul>

  {/* PMS Services */}
  <ul className="space-y-2">
    {pmsServices.length > 0 ? (
      pmsServices.map((item, index) => (
        <li key={index}>
          {item.label} – <span className="font-semibold">{item.amount}</span>
        </li>
      ))
    ) : (
      <li className="text-gray-400">No PMS Services</li>
    )}
  </ul>
            </div>
          </div>

          <div className="flex flex-row items-center gap-6 sm:ml-[28%] md:ml-[20%] mr-6  ">
            <CustomSelect
              options={locationOption}
              name={"location"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={amcAssuredData.location}
              onChange={(e) => handleInputChange(e, "amcAssured")}
              placeholder={"Choose Location"}
            />
            <CustomSelect
              options={modelOption}
              name={"vehicleModel"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={amcAssuredData.vehicleModel}
              onChange={(e) => handleInputChange(e, "amcAssured")}
              placeholder={"Choose Model"}
            />
            <CustomInput
              type={"date"}
              name={"startDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={amcAssuredData.startDate}
              onChange={(e) => handleInputChange(e, "amcAssured")}
            />
            <CustomInput
              type={"date"}
              name={"endDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={amcAssuredData.endDate}
              onChange={(e) => handleInputChange(e, "amcAssured")}
            />
          </div>
          <div className="ml-8 sm:ml-[33%] md:ml-[20%] md:w-[70%] gap-9  pb-20 grid grid-cols-3 mt-6">
            {amcAssuredCardData.map((item, index) => (
              <Cards
                key={index}
                countData={item.countData}
                titleData={item.title}
                bgImg={item.bgImg}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="flex flex-row items-center gap-6 sm:ml-[28%] md:ml-[20%] mr-6  ">
            <CustomSelect
              options={locationOption}
              name={"location"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={buyBackData.location}
              onChange={(e) => handleInputChange(e, "buyBack")}
              placeholder={"Choose Location"}
            />
            <CustomSelect
              options={modelOption}
              name={"vehicleModel"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={buyBackData.vehicleModel}
              onChange={(e) => handleInputChange(e, "buyBack")}
              placeholder={"Choose Model"}
            />
            <CustomInput
              type={"date"}
              name={"startDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={buyBackData.startDate}
              onChange={(e) => handleInputChange(e, "buyBack")}
            />
            <CustomInput
              type={"date"}
              name={"endDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={buyBackData.endDate}
              onChange={(e) => handleInputChange(e, "buyBack")}
            />
          </div>
          <div className="ml-8 sm:ml-[33%] md:ml-[20%] md:w-[70%] gap-9  pb-20 grid grid-cols-3 mt-6">
            {buyBackCardData.map((item, index) => (
              <Cards
                key={index}
                countData={item.countData}
                titleData={item.title}
                bgImg={item.bgImg}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="flex flex-row items-center gap-6 sm:ml-[28%] md:ml-[20%] mr-6 -mt-14">
            <CustomSelect
              options={locationOption}
              name={"location"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={ewPolicyData.location}
              onChange={(e) => handleInputChange(e, "ewPolicy")}
              placeholder={"Choose Location"}
            />
            <CustomSelect
              options={modelOption}
              name={"vehicleModel"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={ewPolicyData.vehicleModel}
              onChange={(e) => handleInputChange(e, "ewPolicy")}
              placeholder={"Choose Model"}
            />
            <CustomInput
              type={"date"}
              name={"startDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={ewPolicyData.startDate}
              onChange={(e) => handleInputChange(e, "ewPolicy")}
            />
            <CustomInput
              type={"date"}
              name={"endDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={ewPolicyData.endDate}
              onChange={(e) => handleInputChange(e, "ewPolicy")}
            />
          </div>
          <div className="ml-8 sm:ml-[33%] md:ml-[20%] md:w-[70%] gap-9  pb-20 grid grid-cols-3 mt-6">
            {ewPolicyCardData.map((item, index) => (
              <Cards
                key={index}
                countData={item.countData}
                titleData={item.title}
                bgImg={item.bgImg}
                icon={item.icon}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardComponent;

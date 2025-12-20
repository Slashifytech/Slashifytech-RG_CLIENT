import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cards = ({
  countData,
  linkData,
  titleData,
  icon,
  bgImg,
  isAmcData,
  labourPriceCount,
  partsPriceCount,
  vasPriceCount,
  // serviceTypeAmount
}) => {
    // const [isOpen, setIsOpen] = useState(false);

  // const toggleDropdown = () => setIsOpen((prev) => !prev);

  const serviceTypeOrder = [
  "1st Free Service",
  "2nd Free Service",
  "3rd Free Service",
  "4th Free Service",
  "5th Free Service",
  "1st Preventive Maintenance Service (PMS)",
  "2nd Preventive Maintenance Service (PMS)",
  "3rd Preventive Maintenance Service (PMS)",
  "4th Preventive Maintenance Service (PMS)",
  "5th Preventive Maintenance Service (PMS)",
  "6th Preventive Maintenance Service (PMS)",
  "7th Preventive Maintenance Service (PMS)"
];

   return (
    <Link to={linkData}>
      <div
        className="bg-white px-6 text-black rounded-md border relative font-poppins border-[#E8E8E8] flex flex-col justify-between h-[230px] w-full transition-all duration-300 hover:shadow-md"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top Section */}
        <div>
          <span className="pt-3 rounded-md w-12 mt-1 block">
            <img src={icon} alt="img" className="w-7 z-20" />
          </span>
          <p className="mt-3 text-[15px]">{titleData}</p>
          <p className="text-[23px] mt-2 font-semibold">{countData}</p>
        </div>

        {/* Bottom Section (Only for AMC cards) */}
        {isAmcData && (
          <div className="text-[12px] font-semibold space-y-1 pb-2">
            <p>Total VAS Price: {vasPriceCount}</p>
            <p>Total Labour Price: {labourPriceCount}</p>
            <p>Total Parts Price: {partsPriceCount}</p>

            {/* Dropdown Toggle */}
            {/* <div
              className="cursor-pointer flex items-center justify-between border p-2 rounded bg-gray-100 w-[220px]"
              onClick={toggleDropdown}
            >
              <span>Total Service Type</span>
              <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
            </div> */}

            {/* Dropdown Content */}
         {/* {isOpen && (
  <div className="absolute top-full left-0 mt-1 border p-2 rounded bg-white max-h-60 overflow-y-auto w-[350px] z-50 shadow-lg">
    {serviceTypeOrder.map((key) =>
      serviceTypeAmount[key] ? (
        <div
          key={key}
          className="flex justify-between py-1 px-1 border-b last:border-b-0"
        >
          <span>{key}</span>
          <span>{serviceTypeAmount[key]}</span>
        </div>
      ) : null
    )}
  </div>
)} */}
          </div>
        )}
      </div>
    </Link>
  );
};


export default Cards;

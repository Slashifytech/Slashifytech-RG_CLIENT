import {  SiMg } from "react-icons/si";
import { SiMercedes } from "react-icons/si";

import { Link, useLocation } from 'react-router-dom';

const ManufacturerTab = ({ selectedManufacturer, handleTabClick }) => {
  return (
    <div className="flex flex-row md:justify-center sm:justify-center scrollbar-hide justify-between overflow-x-auto whitespace-nowrap md:gap-20 sm:gap-12 gap-6 pt-3 md:ml-28 sm:ml-[30%] ml-6 ">
      <span
        className={`bg-secondary font-semibold gap-3 rounded-2xl flex items-center text-center font-head text-[18px] px-6 py-2 cursor-pointer ${
          selectedManufacturer === "Mercedes-Benz"
            ? "border border-primary"
            : "shadow"
        }`}
        onClick={() => handleTabClick("MB")}
      >
        <SiMercedes />
        <span>Mercedes Benz</span>
      </span>
      
   
      <span
        className={`bg-secondary flex items-center gap-3 font-semibold rounded-2xl text-center font-head text-[18px] px-6 py-2 cursor-pointer ${
          selectedManufacturer === "Morris Garage"
            ? "border border-primary"
            : "shadow"
        }`}
        onClick={() => handleTabClick("MG")}
      >
        <SiMg />
        <span>Morris Garage</span>
      </span>
    </div>
  );
};

export default ManufacturerTab;

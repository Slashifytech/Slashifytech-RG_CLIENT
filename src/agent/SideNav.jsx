import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import LogoutPop from "../Components/LogoutPop";
import { logo } from "../assets";
import { BiSolidCarMechanic } from "react-icons/bi";
import { FaCarOn } from "react-icons/fa6";
import { HiClipboardDocumentList } from "react-icons/hi2";

const SideNav = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(
    JSON.parse(localStorage.getItem("isOpen")) ?? true
  );
  const [isLogoutOpen, setisLogoutOpen] = useState(false);

  const openLogoutPopup = () => {
    setisLogoutOpen(true);
  };

  const closeLogout = () => {
    setisLogoutOpen(false);
  };
  const sidebarList = [
    {
      pathPage: "/agent/amcs-list",
      icon: <BiSolidCarMechanic />,
      label: "AMC Lists",
      otherPath: "/agent/edit-AMC",
      otherPathTwo: "/agent/amc-form",
    },
    {
      pathPage: "/agent/ewpolicy-list",
      icon: <HiClipboardDocumentList />,
      label: "Ew Policy Lists",
      otherPath: "/agent/edit-ewpolicy",
      otherPathTwo: "/agent/ewpolicy-form",
    },
    {
      pathPage: "/agent/buybacks-list",
      icon: <FaCarOn />,
      label: "Buyback Lists",
      otherPath: "/agent/buyback-form",
      otherPathTwo: "/agent/edit-buyback",
    },
  ];

  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);
  return (
    <>
      <div className="bg-white md:w-[17.5vw] sm:w-[24vw] h-[100vh]    overflow-y-auto scrollbar-hide border-r-2 border-[#E8E8E8]">
        <span>
          <img
            loading="lazy"
            src={logo}
            alt="logo"
            className="md:w-44 sm:w-32 md:h-32 sm:h-16 ml-6 "
          />
        </span>
        {sidebarList.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer py-4 hover:bg-[#d3d3d3] hover:text-primary hover:border-l-4 hover:font-medium ${
              path === item.pathPage ||
              path === item?.otherPath ||
              path === item?.otherPathTwo ||
              path === item?.otherPathThree
                ? "bg-[#c0c0c0] text-primary border-l-4 border-primary font-medium"
                : "text-sidebar"
            }`}
          >
            <Link
              to={item.pathPage}
              className="flex items-center gap-3 md:pl-6 lg:px-6 sm:pl-6 "
            >
              <span className="text-[20px]"> {item.icon}</span>{" "}
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
        {/* <div
          className={`cursor-pointer py-4 hover:bg-[#d3d3d3] hover:text-primary hover:border-l-4 hover:font-medium ${
            path === "/admin/ticket"
              ? "bg-[#c0c0c0] text-primary border-l-4 border-primary font-medium"
              : "text-sidebar"
          }`}
        >
          <Link
            to="/admin/ticket"
            className="flex items-center gap-3 md:pl-6 lg:px-6 sm:pl-6 "
          >
            <span className="text-[20px]">
              {" "}
              <BsFillTicketPerforatedFill />
            </span>{" "}
            <span>Ticket Support</span>
          </Link>
        </div> */}

        {/* <div
          className={`cursor-pointer py-4 hover:bg-[#f5ebeb] hover:text-primary hover:border-l-4 hover:font-medium ${
            path === "/student/payment-details"
              ? "bg-[#c0c0c0] text-primary border-l-4 border-primary font-medium"
              : "text-sidebar"
          }`}
        >
          <Link
            to="/student/payment-details"
            className="flex items-center gap-3 px-6"
          >
            <span className="text-[20px]">
              {" "}
              <MdOutlineHistory />
            </span>{" "}
            <span>Payment Details</span>
          </Link>
        </div> */}

        <div
          className={`cursor-pointer py-4 hover:bg-[#d3d3d3] hover:text-primary hover:border-l-4 hover:font-medium text-primary`}
        >
          <div
            className="flex items-center gap-3 px-6 "
            onClick={openLogoutPopup}
          >
            <span className="text-[20px]">
              {" "}
              <RiLogoutBoxRLine />
            </span>{" "}
            <span>Logout</span>
          </div>
        </div>
        <p className="text-primary pl-6 pt-8 font-bold text-[14px]">
          Raam Group
        </p>
        <p className="font-light text-primary pl-6 text-[12px] pt-1 mb-20">
          © 2025 All Rights Reserved
        </p>
      </div>
      <LogoutPop isLogoutOpen={isLogoutOpen} closeLogout={closeLogout} />
    </>
  );
};

export default SideNav;

import React, { useEffect, useState } from "react";
import { BsFillClipboard2CheckFill, BsPieChartFill } from "react-icons/bs";
import { BiSolidCarMechanic } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdDocumentScanner, MdOutlineFreeCancellation } from "react-icons/md";
import { RiLogoutBoxRLine, RiTeamFill } from "react-icons/ri";
import { FaCarOn, FaFileInvoiceDollar } from "react-icons/fa6";
import LogoutPop from "../Components/LogoutPop";
import { logo } from "../assets";
import { HiClipboardDocumentList, HiDocumentText, HiUsers } from "react-icons/hi2";
import { useSelector } from "react-redux";

const Nav = () => {
  const { roleType } = useSelector((state) => state.users?.users);

  const location = useLocation();
  const role = roleType;
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
      pathPage: "/admin/dashboard",
      icon: <BsPieChartFill />,
      label: "Dashboard",
      otherPathTwo: "/admin/add-policies",
    },
    {
      pathPage: "/admin/team-lists",
      icon: <HiUsers />,
      label: "Accounts Team",
      otherPath: "/admin/team-invoices",
      otherPathTwo: "/admin/new-team",
      otherPathThree: "/admin/update-team"
    },
    {
      pathPage: "/admin/cancelled-policy",
      icon: <HiDocumentText />,
      label: "Cancelled Policies",
    },

    {
      pathPage: "/admin/agent-lists",
      icon: <RiTeamFill />,
      label: "Agent Lists ",
      otherPath: "/admin/agent-policies",
      otherPathTwo: "/admin/add-agent",
      otherPathThree: "/admin/update-agent",
    },

    {
      pathPage: "/admin/amc-lists",
      icon: <BiSolidCarMechanic />,
      label: "AMC Lists",
      otherPath: "/admin/add-amc",
      otherPathTwo: "/admin/update-AMC",
      otherPathThree: "/amc/profile-view"
    },
    {
      pathPage: "/admin/ew-list",
      icon: <HiClipboardDocumentList />,
      label: "EW Lists",
      otherPath: "/admin/add-ewpolicy",
      otherPathTwo: "/admin/update-ewpolicy",
    },
    {
      pathPage: "/admin/buyback-lists",
      icon: <FaCarOn />,
      label: "Buy Back Lists",
      otherPath: "/admin/add-buyback",
      otherPathTwo: "/admin/update-buyback",
      otherPathThree: "/buyback/profile-view"
    },
    {
      pathPage: "/admin/invoice-lists",
      icon: <FaFileInvoiceDollar />,
      label: "Invoice Lists",
      otherPath: "/admin/edit-invoice",
      otherPathTwo: "/admin/invoice-form",
      otherPathThree: "/admin/invoice-edit"
    },
    {
      pathPage: "/admin/approval-lists",
      icon: <BsFillClipboard2CheckFill />,
      label: "Approval Page",
    },
    {
      pathPage: "/admin/cancel-approval-lists",
      icon: <MdOutlineFreeCancellation />,
      label: "Cancelled Approvals",
    },
  ];
  const filteredSidebarList =
    roleType === "1"
      ? sidebarList.filter(
          (item) =>
            item.label === "Invoice Lists"  ||  item.label === "Approval Page"
        )
      : sidebarList;

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
        {filteredSidebarList.map((item, index) => (
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
       
        {role === "0" && (
          <>
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center mt-2 bg-transparent py-2 relative hover:text-primary hover:bg-[#d3d3d3] px-5 text-sidebar cursor-pointer"
            >
              <span className="text-[23px]">
                <CgProfile />
              </span>
              <span className="flex items-center pl-[12px]">
                My Account
                {isOpen ? (
                  <IoIosArrowUp className="text-[18px] absolute right-6" />
                ) : (
                  <IoIosArrowDown className="absolute right-6" />
                )}
              </span>
            </div>

            {/* Dropdown menu */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden  ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="sm:mt-2 list-none text-[16px]">
                {/* <Link to="/admin/profile">
                  <li
                    className={`text-sidebar py-2 mb-2 cursor-pointer md:pl-14 lg:px-14 sm:pl-14 md:ml-0 hover:bg-[#f5ebeb] hover:text-primary ${
                      path === "/admin/profile" &&
                      "bg-[#c0c0c0] border-l-4 border-primary text-primary"
                    }`}
                  >
                    Edit Profile
                  </li>
                </Link> */}
                <Link to="/admin/change-password">
                  <li
                    className={`text-sidebar py-2 mb-2 cursor-pointer md:pl-[52px] sm:pl-14 md:ml-1  hover:bg-[#f5ebeb] hover:text-primary ${
                      path === "/admin/change-password" &&
                      "bg-[#c0c0c0] border-l-4 border-primary text-primary"
                    }`}
                  >
                    Change Password
                  </li>
                </Link>
                <Link to="/admin/change-email">
                  <li
                    className={`text-sidebar py-2 mb-2 cursor-pointer md:pl-14 sm:pl-14 md:ml-0  hover:bg-[#f5ebeb] hover:text-primary ${
                      path === "/admin/change-email" &&
                      "bg-[#c0c0c0] border-l-4 border-primary text-primary"
                    }`}
                  >
                    Change Email
                  </li>
                </Link>
                {/*   <Link to="/settings/delete-account">
              <li
                className={`text-sidebar py-2 mb-2 cursor-pointer md:px-14 sm:pl-14 md:ml-0  hover:bg-[#f5ebeb] hover:text-primary ${
                  path === "/settings/delete-account" &&
                  "bg-[#c0c0c0] border-l-4 border-primary text-primary"
                }`}
              >
                Delete Account
              </li>
            </Link> */}
              </ul>
            </div>
          </>
        )}
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

export default Nav;

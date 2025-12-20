import React from "react";
import { useSelector } from "react-redux";
import { logo } from "../assets";

const Header = () => {
  const { roleType, agentName, email } = useSelector((state) => state.users.users);

  // console.log(studentInfoData);
  return (
    <>
      <div
        className={`flex flex-row items-center justify-end w-[82.5vw]  py-2.5 z-10 bg-primary font-poppins pr-6 fixed md:ml-[17.5vw] sm:ml-[23.5vw]
        } `}
      >
        <span className="w-auto sm:mr-9 md:mr-0 ">
            <span className="bg-[#dfdede] rounded-full flex items-center gap-3 px-2 pr-6 py-[4px] cursor-pointer">
              <img
                src={logo}
                alt="img"
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />

              <span className="flex flex-col">
                <span className="font-normal text-[14px]">{agentName}</span>
                <span className="font-light text-[13px]">{email}</span>
              </span>
            </span>
          </span>
      </div>
    </>
  );
};

export default Header;

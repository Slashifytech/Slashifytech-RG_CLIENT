import React from "react";

export const CancelReqPopUp = ({
  isPopUpOpen,
  closePopUp,
  item,
  cancelPolicyRequest,
  text,
}) => {
  return (
    <>
      {isPopUpOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isPopUpOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[38%] w-full  relative p-9 app-open-animation  ">
            <p className="text-center font-DMsans text-black font-semibold text-[16px]">
              {text}
            </p>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <span
                onClick={closePopUp}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary"
              >
                No
              </span>
              <span
                onClick={() => {
                  cancelPolicyRequest(item);
                  closePopUp();
                }}
                className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
              >
                Yes
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const AgentCancelReqPopUp = ({ isPopUpAgentOpen, closeAgentPopUp, text, item, cancelPolicyAgentRequest }) => {
  const handleClick = () => {
    cancelPolicyAgentRequest(item, "reqCancel", null);
  };

  return (
    <>
      {isPopUpAgentOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isPopUpAgentOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[38%] w-full  relative p-9 app-open-animation  ">
            <p className="text-center font-DMsans text-black font-semibold text-[16px]">
              {text}
            </p>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <span
                onClick={closeAgentPopUp}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary"
              >
                No
              </span>
              <span
                onClick={() => {
                  handleClick();
                  closeAgentPopUp();
                }}
                className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
              >
                Yes
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

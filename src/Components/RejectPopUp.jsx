import React, { useState } from "react";

const RejectPopUp = ({
  isReasonPopUp,
  closeReasonPopUp,
  item,
  handlePolicyStatus,
  subTitle,
}) => {
  const [rejectreason, setRejectreason] = useState();

  const handleInput = (e) => {
    const { value} = e.target;
    setRejectreason(value);
  };

  return (
    <>
      {isReasonPopUp && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isReasonPopUp ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[50%] w-full  relative p-9 app-open-animation   ">
            <p className="text-center font-DMsans text-black font-semibold text-[16px]">
            {subTitle}
            </p>
            <input
              type="text"
              className="w-full h-20 rounded-md mt-3 bg-secondary outline-none shadow px-3"
              placeholder = "Please Enter the reason"
              onChange={handleInput}
              value={rejectreason}
              name="rejectreason"
            />

            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <span
                onClick={closeReasonPopUp}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary"
              >
                Cancel
              </span>
              <span
                onClick={() => {
                    handlePolicyStatus(item._id, "rejected", rejectreason);
                  closeReasonPopUp();
                }}
                className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
              >
                Reject
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RejectPopUp;

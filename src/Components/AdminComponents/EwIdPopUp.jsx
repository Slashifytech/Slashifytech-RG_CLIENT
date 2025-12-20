import { useState } from "react";
import InputField from "../Input";
import { toast } from "react-toastify";
import { updateEw } from "../../features/EwApi";
import { useDispatch } from "react-redux";
import { fetchEwLists } from "../../features/EwSlice";

export const EwIdPopup = ({ isOpen, closePopUp, id, text }) => {
  const dispatch = useDispatch();
  const [backendPolicyId, setBackendPolicyId] = useState("");
  const handleClick = async () => {
    try {
      const res = await updateEw({ backendPolicyId: backendPolicyId }, id);
      dispatch(fetchEwLists({}));
      toast.success(res?.message || "Backend Id updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[38%] w-full  relative p-9 app-open-animation  ">
            <p className="text-center font-DMsans text-black font-semibold text-[16px]">
              {text}
            </p>
            <InputField
              name="backendPolicyId"
              value={backendPolicyId}
              className="w-full h-12 px-3 mt-3 bg-[#f1f1f1]"
              placeholder="Enter backend Id"
              onchange={(e) => setBackendPolicyId(e.target.value)}
            />
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <span
                onClick={closePopUp}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary"
              >
                No
              </span>
              <span
                onClick={() => {
                  handleClick();
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

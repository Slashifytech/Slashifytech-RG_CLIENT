import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setEmptyAMC } from "../features/amcSlice";
import { setEmptytBuyback } from "../features/BuyBackSlice";

const InvoicePopUp = ({ isOpen, closePopUp, docType, id }) => {
  const dispatch =useDispatch()
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[50%] w-full  relative p-9   app-open-animation">
              <span onClick={closePopUp} className="absolute text-primary text-[32px] cursor-pointer right-2 top-2"><IoMdCloseCircle/></span>
            <p className="font-semibold  text-center text-[20px]">
              Create a Invoice for this {docType}{" "}
            </p>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <Link
                // onClick={dispatch(docType === "AMC" ? setEmptytBuyback() :  setEmptyAMC())}
                to="/admin/invoice-form"
                state={{id: id, type: docType}}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary hover:bg-black hover:text-white"
              >
                Create Invoice
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoicePopUp;

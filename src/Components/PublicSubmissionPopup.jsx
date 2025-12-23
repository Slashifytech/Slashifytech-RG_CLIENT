import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const PublicSubmissionPopup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-6 text-center">
        <AiOutlineCheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold mb-2">Extended AMC Form Submitted</h2>
        <p className="text-gray-600 mb-6">
          Your AMC form has been successfully submitted and is waiting for approval.
        </p>
        <Link to = "/extend-amc" className="bg-black  text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full md:w-auto">
          Extend Another AMC
        </Link>
      </div>
    </div>
  );
};

export default PublicSubmissionPopup;

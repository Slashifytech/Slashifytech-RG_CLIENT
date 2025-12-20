import React, { useState } from "react";
import Nav from "../admin/Nav";
import AmcApproval from "../Components/AdminComponents/AmcApproval";
import BuyBackApproval from "../Components/AdminComponents/BuyBackApproval";
import Header from "../Components/Header";
import EwApproval from "../Components/AdminComponents/EwApproval";

const Approval = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "AMC Approval", component: <AmcApproval /> },
    { id: 1, label: "Buyback Approval", component: <BuyBackApproval /> },
    { id: 2, label: "Ew Policy Approval", component: <EwApproval /> },

  ];

  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div>
      <Header/>
    </div>
      <div className="w-full p-4 mt-20 ">
        <div className="flex justify-center gap-4 mb-6 md:ml-0 sm:ml-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-2 text-sm font-semibold rounded-2xl border ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black border-black"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>{tabs.find((tab) => tab.id === activeTab)?.component}</div>
      </div>
    </>
  );
};

export default Approval;

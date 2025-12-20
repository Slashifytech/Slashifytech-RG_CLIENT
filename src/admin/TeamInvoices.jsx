import React, { useState } from "react";
import Nav from "../admin/Nav";
import InvoiceAmcList from "../Components/AdminComponents/InvoiceAmcList";
import InvoiceBuyBackList from "../Components/AdminComponents/InvoiceBuyBackList";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import EwInvoiceList from "../Components/AdminComponents/EwInvoiceList";

const TeamInvoices = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
   const createdBy = location?.state?.agentId;

  const tabs = [
    { id: 0, label: "AMC Invoice Lists", component: <InvoiceAmcList  createdBy={createdBy}/> },
    { id: 1, label: "Buyback Invoice Lists", component: <InvoiceBuyBackList createdBy={createdBy}/> },
    { id: 2, label: "EW Invoice Lists", component: <EwInvoiceList createdBy={createdBy}/> },

  ];

  return (
    <>
    <div>
      <Header/>
    </div>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div className="w-full p-4 mt-20">
        <div className="flex justify-center gap-4 ">
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

export default TeamInvoices;
